import json
import os
import chromadb
from chromadb.utils import embedding_functions
from config import config

# ---------------------------
# Initialize ChromaDB
# ---------------------------

def init_chroma():
    """Initialize in-memory ChromaDB with OpenAI embeddings and product data."""
    # Create in-memory Chroma client
    client = chromadb.Client()

    # Initialize OpenAI embedding function using config values
    openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key=config.EMBEDDING_API_KEY,
        api_base=config.EMBEDDING_BASE_URL,
        model_name=config.EMBEDDING_MODEL
    )

    # Create or get the `products` collection
    collection = client.get_or_create_collection(
        name="products",
        embedding_function=openai_ef
    )

# Load mock data from file
    data_file = "./mock-data/products.json"
    if os.path.exists(data_file):
        with open(data_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        print(f"[Warning] Data file not found: {data_file}")
        data = []

    # Populate collection if empty
    if data:
        existing_ids = collection.get()["ids"]
        if len(existing_ids) == 0:
            ids = []
            documents = []
            metadatas = []

            for item in data:
                product_id = str(item.get("id"))
                name = item.get("name", "").strip()
                description = item.get("description", "").strip()
                category = item.get("category", "")
                color = item.get("color", "")
                sizes = ", ".join(item.get("sizes", []))
                occasions = ", ".join(item.get("occasions", []))
                price = item.get("price", "")
                sold_count = item.get("soldCount", 0)
                image = item.get("image", "")

                # 🧠 Create rich, natural-language text for embeddings
                text_repr = (
                    f"title: {name}, description: {description}, "
                    f"category: {category}, color: {color}, sizes: {sizes}, "
                    f"price: {price}, suitable for: {occasions}, "
                    f"sold count: {sold_count}"
                )

                ids.append(product_id)
                documents.append(text_repr)
                metadatas.append({
                    "id": product_id,
                    "name": name,
                    "category": category,
                    "color": color,
                    "price": price,
                    "image": image
                })

            collection.add(ids=ids, documents=documents, metadatas=metadatas)
            print(f"[ChromaDB] Loaded {len(ids)} products into collection.")
        else:
            print(f"[ChromaDB] Products collection already initialized ({len(existing_ids)} items).")
    else:
        print("[ChromaDB] No product data found to load.")

    return client, collection

# ---------------------------
# Query Helper
# ---------------------------

def query_products(collection, query_text, n_results=3):
    """Query the `products` collection for relevant context."""
    if not query_text.strip():
        return []

    results = collection.query(
        query_texts=[query_text],
        n_results=n_results
    )

    items = []
    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        items.append({
            "text": doc,
            "metadata": meta
        })
    return items


# ---------------------------
# Standalone Test
# ---------------------------

if __name__ == "__main__":
    client, products = init_chroma()
    context = query_products(products, "blue demin")
    print(json.dumps(context, indent=2))
