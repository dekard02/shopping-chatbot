import openai
import tools
from prompt import prompt, text_to_speech_prompt
from config import config
import json

client = openai.OpenAI(
    base_url=config.LLM_BASE_URL,
    api_key=config.LLM_API_KEY
)

em_client = openai.OpenAI(
    base_url=config.EMBEDDING_BASE_URL,
    api_key=config.EMBEDDING_API_KEY
)

def tokenize_prompt(prompt: str):
    """Uses OpenAI API to tokenize input text."""
    resp = em_client.embeddings.create(
        model=config.EMBEDDING_MODEL,
        input=prompt
    )
    return resp.data[0].embedding

def _extract_tool_call(message):
    # support different shapes (object attrs or dict)
    tc = getattr(message, "tool", None) or getattr(message, "tool_call", None)
    if tc is None and isinstance(message, dict):
        tc = message.get("tool") or message.get("tool_call")
    if not tc:
        return None, None

    name = getattr(tc, "name", None) or (tc.get("name") if isinstance(tc, dict) else None)
    args = getattr(tc, "arguments", None) or (tc.get("arguments") if isinstance(tc, dict) else None)

    # arguments may be a JSON string
    if isinstance(args, str):
        try:
            args = json.loads(args)
        except json.JSONDecodeError:
            # fall back to passing raw string under 'input'
            args = {"input": args}
    return name, args

def get_chat_response(conversation, user_prompt, products_collection):
    """Get response from OpenAI model based on the conversation history."""
    messages = [{"role": "system", "content":prompt }]
    messages += conversation
    messages.append(user_prompt)

    completion = client.chat.completions.create(
        model= config.LLM_MODEL,
        messages=messages,
        tool_choice="auto",
        tools=tools.tool_defs
    )
    if completion.choices[0].finish_reason == "tool_calls":
        tool_call = completion.choices[0].message.tool_calls[0]
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)
        if function_name == "query_products":
            results = tools.query_products(function_args['query_text'], products_collection)
            
            messages.append(completion.choices[0].message)
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": results
            })
            
            final_completion = client.chat.completions.create(
                model=config.LLM_MODEL,
                messages=messages,
                tool_choice="none",  # we've already executed the tool
                tools=tools.tool_defs
            )
            return final_completion.choices[0].message.content
        else:
            return "Something went wrong. Please try again."

    else:
        return completion.choices[0].message.content
        
def get_readable_response(response: str):
    """Convert the raw response into a user-friendly format."""
    # For this example, we assume the response is already user-friendly.
    msg = client.chat.completions.create(
                model=config.LLM_MODEL,
                messages=[{"role": "system", "content": text_to_speech_prompt},
                          {"role": "user", "content": response}],
                tool_choice="none",  # we've already executed the tool
                tools=tools.tool_defs
            )
    return msg.choices[0].message.content

