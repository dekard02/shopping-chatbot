import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def tokenize_prompt(prompt: str):
    """Uses OpenAI API to tokenize input text."""
    resp = openai.embeddings.create(
        model="text-embedding-3-small",
        input=prompt
    )
    return resp.data[0].embedding

def get_chat_response(conversation, user_prompt):
    """Get response from OpenAI model based on the conversation history."""
    messages = [{"role": "system", "content": "You are a helpful chatbot."}]
    messages += conversation
    messages.append({"role": "user", "content": user_prompt})

    completion = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    return completion.choices[0].message.content
