import os
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()

# ==============================
# 🔧 General App Configuration
# ==============================

class Config:
    # Flask settings
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 5000))

    # ==============================
    # 🔐 LLM (OpenAI-compatible) Config
    # ==============================
    LLM_BASE_URL = os.getenv("LLM_BASE_URL", "")
    LLM_API_KEY = os.getenv("LLM_API_KEY", "")

    # Model to be used for chat completions
    LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")

    # ==============================
    # 🧠 Embeddings (ChromaDB)
    # ==============================
    EMBEDDING_BASE_URL = os.getenv("EMBEDDING_BASE_URL", "")
    EMBEDDING_API_KEY = os.getenv("EMBEDDING_API_KEY", "")
    EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "")

    # ==============================
    # 🗣️ Text-to-Speech (Hugging Face)
    # ==============================
    TTS_MODEL = os.getenv("TTS_MODEL", "facebook/fastspeech2-en-ljspeech")


# Global config instance
config = Config()