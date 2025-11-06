from langchain.tools import tool, ToolRuntime
from langgraph.types import interrupt
from agent.vectorstore.pinecone import product_vectorstore

@tool
async def query_products(query: str, runtime: ToolRuntime):
    """
    Tìm sản phẩm theo thông tin của khách hàng.
    Response trả về chỉ cần nhắc đến tên của các sản phẩm
    """

    print(f"[Tool][query_products] - called with query {query}")
    filter_spec = interrupt({"type": "filter_spec", "content": "Minh xin them thong tin nha"})

    product_docs = await product_vectorstore.asimilarity_search(query=query)

    products = [p.metadata for p in product_docs]
    return products

