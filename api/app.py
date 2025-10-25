from flask import Flask, request, jsonify
from chroma_db import init_chroma
from openai_utils import tokenize_prompt, get_chat_response
from tts_utils import text_to_speech
from conversation_store import conversation_history

import base64
import io
import soundfile as sf

app = Flask(__name__)

# Initialize ChromaDB and insert mock data
chroma_collection = init_chroma()

@app.route("/chat", methods=["POST"])
def chat():
    user_prompt = request.json.get("prompt", "")

    if not user_prompt:
        return jsonify({"error": "Missing prompt"}), 400

    # 1️⃣ Tokenize input
    embedding = tokenize_prompt(user_prompt)

    # 2️⃣ Query ChromaDB (semantic search)
    results = chroma_collection.query(
        query_embeddings=[embedding],
        n_results=2
    )

    context_docs = [doc for doc in results["documents"][0]]
    context_text = "\n".join(context_docs)

    # 3️⃣ Generate response
    conversation_history.append({"role": "user", "content": user_prompt})
    full_prompt = f"Context: {context_text}\nUser: {user_prompt}"
    response_text = get_chat_response(conversation_history, full_prompt)
    conversation_history.append({"role": "assistant", "content": response_text})

    # 4️⃣ Convert response to speech
    audio = text_to_speech(response_text)

    # Convert to WAV (base64)
    buf = io.BytesIO()
    sf.write(buf, audio, 22050, format="WAV")
    buf.seek(0)
    audio_b64 = base64.b64encode(buf.read()).decode("utf-8")

    return jsonify({
        "text": response_text,
        "audio": audio_b64
    })

if __name__ == "__main__":
    app.run(debug=True)
