import os
from typing_extensions import Literal
from langchain_core.messages import SystemMessage, AIMessage
from langchain_core.runnables import RunnableConfig
from langchain.tools import tool, ToolRuntime
from langgraph.graph import StateGraph, END
from langgraph.types import Command
from langgraph.prebuilt import ToolNode
from copilotkit.langgraph import copilotkit_emit_state
from agent.agent_state import AgentState
from agent.utils import get_openai_model
from agent.prompt import SYSTEM_MESSAGE
from langgraph.types import interrupt
import asyncio


@tool
def get_weather(location: str):
    """
    Get the weather for a given location.
    """
    return f"The weather for {location} is 70 degrees."

@tool
async def query_products(query: str, runtime: ToolRuntime):
    """
    Tìm sản phẩm theo thông tin của khách hàng.
    Response trả về chỉ cần nhắc đến tên của các sản phẩm
    """
    runtime.state["filter_spec"] = interrupt({"type": "filter_spec", "content": "Minh xin them thong tin nha"})

    asyncio.sleep(3)
    print("called query_products with query:", query)
    products = [
        {'id': 1, 'name': "Product A", 'price': 100, 'slug': 'that-lung-da-bo-y'},
        {'id': 2, 'name': "Product B", 'price': 150, 'slug': 'o-nho-gon'},
        {'id': 3, 'name': "Product C", 'price': 200, 'slug': 'that-lung-khoa-tron'},
    ]

    return products

tools = [
    get_weather,
    query_products
]

async def chat_node(state: AgentState, config: RunnableConfig) -> Command[Literal["tool_node", "__end__"]]:

    model_with_tools = get_openai_model().bind_tools(
        [
            *state["copilotkit"]["actions"],
            get_weather,
            query_products,
        ],
        parallel_tool_calls=False,
    )

    if config is None:
        config = RunnableConfig(recursion_limit=25)

    response = await model_with_tools.ainvoke([
        SYSTEM_MESSAGE,
        *state["messages"],
    ], config)

    # Check for tool calls in the response and handle them. We ignore
    #    CopilotKit actions, as they are handled by CopilotKit.
    if isinstance(response, AIMessage) and response.tool_calls:
        actions = state["copilotkit"]["actions"]
        
        #Check for any non-copilotkit actions in the response and
        #     if there are none, go to the tool node.
        if not any(
            action.get("name") == response.tool_calls[0].get("name")
            for action in actions
        ):
            return Command(goto="tool_node", update={"messages": response})

    # We've handled all tool calls, so we can end the graph.
    return Command(
        goto=END,
        update={
            "messages": response
        }
    )

# Define the workflow graph
workflow = StateGraph(AgentState)
workflow.add_node("chat_node", chat_node)
workflow.add_node("tool_node", ToolNode(tools=tools))
workflow.add_edge("tool_node", "chat_node")
workflow.set_entry_point("chat_node")

# Conditionally use a checkpointer based on the environment
# Check for multiple indicators that we're running in LangGraph dev/API mode
is_langgraph_api = os.environ.get("LANGGRAPH_API_DIR") is not None
if os.environ.get("LANGGRAPH_API", None) is not None:
    is_langgraph_api = os.environ.get("LANGGRAPH_API", None).lower() == "true"

if is_langgraph_api:
    # When running in LangGraph API/dev, don't use a custom checkpointer
    graph = workflow.compile()
else:
    # For CopilotKit and other contexts, use MemorySaver
    from langgraph.checkpoint.memory import MemorySaver
    memory = MemorySaver()
    graph = workflow.compile(checkpointer=memory)