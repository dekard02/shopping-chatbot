import json

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
    filter_spec = json.loads(interrupt({"type": "filter_spec", "content": "Shop xin thêm thông tin của bạn nha"}))
    print("filter_spec", filter_spec)
    limit = int(filter_spec["limit"]) or 5

    metadata_filter = build_filter(filter_spec)
    product_docs = await product_vectorstore.asimilarity_search(query=query,
                                                                k=limit,
                                                                filter=metadata_filter)

    products = [p.metadata for p in product_docs]
    return products

def build_filter(filter_spec):
    sex = filter_spec.get("sex", None)
    min_price = filter_spec.get("minPrice", 0)
    max_price = filter_spec.get("maxPrice", None)

    metadata_filter = {}

    if sex == "0" and sex =="1":
        metadata_filter["sex"] = sex

    # Price range: use Pinecone comparison operators
    price_filter = {}
    if min_price:
        price_filter["$gte"] = min_price
    if max_price:
        price_filter["$lte"] = max_price

    if price_filter:
        metadata_filter["price"] = price_filter

    return metadata_filter
