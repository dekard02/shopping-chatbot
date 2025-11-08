from pinecone import Pinecone
from config import env
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

embeddings = OpenAIEmbeddings(model=env.EMBEDDING_MODEL,
                              base_url=env.EMBEDDING_BASE_URL,
                              api_key=env.EMBEDDING_API_KEY)

policy_vectorstore = PineconeVectorStore(
    index_name=env.PINECONE_POLICY_INDEX,
    embedding=embeddings,
    pinecone_api_key=env.PINECONE_API_KEY,
)


product_vectorstore = PineconeVectorStore(
    index_name=env.PINECONE_PRODUCTS_INDEX,
    embedding=embeddings,
    pinecone_api_key=env.PINECONE_API_KEY
)