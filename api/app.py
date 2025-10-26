from flask import Flask, request, jsonify, send_from_directory
from chroma_db import init_chroma
from flask_cors import CORS
from openai_utils import tokenize_prompt, get_chat_response, get_readable_response
from conversation_store import conversation_history
import tts_utils
import uuid

import base64
import io

app = Flask(__name__)
CORS(app)
# Initialize ChromaDB and insert mock data
client, products_collection = init_chroma()

# Add this new route to serve static files
@app.route('/public/<path:filename>')
def serve_static(filename):
    return send_from_directory('./public', filename)


@app.route("/chat", methods=["GET","POST"])
def chat():
    
    user_prompt = {
        "role" : "user",
        "content" :request.json.get("message", "")
    }

    response_text = get_chat_response(conversation_history, user_prompt, products_collection)
    conversation_history.append({"role": "assistant", "content": response_text})
    
    readable_response = get_readable_response(response_text)
    
    audio_name =  uuid.uuid4().__str__() + ".wav"
    tts_utils.text_to_speech(readable_response, audio_name)
    
    return jsonify({"response": response_text,
                    "audio":audio_name })

if __name__ == "__main__":
    app.run(debug=True)
