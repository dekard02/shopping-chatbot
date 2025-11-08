from langchain.tools import tool
from agent.vectorstore.pinecone import policy_vectorstore

@tool
async def query_policies(query: str) -> list[dict]:
    """
    Tìm thông tin về chính sách (chính sách trả hàng, giao hàng, ...) để trả lời câu hỏi của khách hàng
    Kết quả trả về sẽ là thông tin người dùng cần tìm và đường dẫn dẫn đến thông tin tham khảo
    """
    print(f"[Tool][query_policies] - query with '{query}")
    policies = await policy_vectorstore.asimilarity_search(query=query)
    return [doc.model_dump() for doc in policies]