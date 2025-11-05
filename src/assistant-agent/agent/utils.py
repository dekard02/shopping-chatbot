from langchain_openai import ChatOpenAI
from config import env

def get_openai_model():
    return ChatOpenAI(model=env.OPENAI_MODEL,
                        base_url=env.OPENAI_BASE_URL,
                        api_key=env.OPENAI_API_KEY
                        )