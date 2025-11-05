# from langgraph.graph import StateGraph, END
# from agent.agent_state import AgentState
# from langchain_core.runnables import RunnableConfig
# from typing_extensions import Literal
# from langgraph.types import Command
# import json

# async def query_products_node(state: AgentState, config: RunnableConfig) -> Command[Literal["chat_node", "__end__"]]:
#     # init pinecone client and query products
#     # update state after querying
#     data = {'products': [
#         {'id': 1, 'name': "Product A", 'price': 100},
#     ]}

#     print("Called query_products_node, found products:", data)

#     # products_json = json.dumps(products)
#     state["messages"][-1].additional_kwargs['tool_calls'][0]['function']['arguments']=json.dumps(data)
#     state["messages"][-1].tool_calls[0]['args']= data

#     print(state["messages"][-1])
#     # state["messages"][-1]["content"] = state["messages"][-1]["content"].append(f"\n\Đây là kết quả đã tìm kiếm ở dạng json. Hãy trả về cho khách hàng:\n{products_json}")

#     return Command(
#         goto="__end__",
#     )