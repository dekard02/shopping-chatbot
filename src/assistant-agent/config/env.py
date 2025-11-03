import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY=os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL=os.getenv("OPENAI_MODEL", "")
OPENAI_BASE_URL=os.getenv("OPENAI_BASE_URL", "")

# LANGSMITH_API_KEY=your_langsmith_api_key