import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY=os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL=os.getenv("OPENAI_MODEL", "")
OPENAI_BASE_URL=os.getenv("OPENAI_BASE_URL", "")

# LANGSMITH_API_KEY=your_langsmith_api_key

EMBEDDING_BASE_URL=os.getenv("EMBEDDING_BASE_URL", "")
EMBEDDING_MODEL=os.getenv("EMBEDDING_MODEL", "")
EMBEDDING_API_KEY=os.getenv("EMBEDDING_API_KEY", "")

PINECONE_API_KEY=os.getenv("PINECONE_API_KEY", "")
PINECONE_PRODUCTS_INDEX=os.getenv("PINECONE_PRODUCTS_INDEX", "")
PINECONE_POLICY_INDEX=os.getenv("PINECONE_POLICY_INDEX", "")