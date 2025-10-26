import chroma_db
import json

tool_defs = [
    {
        "type": "function",
        "function": {
            "name": "query_products",
            "description": "This function query products from chromadb, then return revelant products",
            "parameters": {
                "type": "object",
                "properties": { 
                    "query_text": {
                        "type": "string",
                        "description": "Query text from user input.",
                        "default": ""
                    }
                },
                "required": ["query_text"]
            },
        }
    }
]

def query_products(query_text, products_collection):
    results = chroma_db.query_products(products_collection, query_text)
    json_res = json.dumps(results, indent=4)
    print(json_res)
    return json_res