import os
import pyodbc
from langchain_openai import OpenAIEmbeddings
from utils import create_index_if_not_exists

from dotenv import load_dotenv
script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=f"{script_dir}/.env")

# ---------- CONFIGURATION ----------
MSSQL_CONN_STR = (
    "DRIVER={SQL Server};"
    f"SERVER={os.getenv("MSSQL_SERVER")};"
    f"DATABASE={os.getenv("MSSQL_DB_NAME")};"
    f"UID={os.getenv("MSSQL_USERNAME")};"
    f"PWD={os.getenv("MSSQL_PASSWORD")};"
)

PINECONE_INDEX_NAME = "sunshine-ecommerce-products"

def fetch_products():
    conn = pyodbc.connect(MSSQL_CONN_STR)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Product;")

    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()

    products = []
    for row in rows:
        row_data = [data or "" for data in row]
        product = dict(zip(columns, row_data))
        products.append(product)

    cursor.close()
    conn.close()
    return products

def create_product_embedding(embedder, product: dict) -> dict:
    # Ignore image fields
    text_to_embed = f"""
        Title: {product.get('title')}
        Category: {product.get('categorySlug')}
        Gender: {product.get('gender', "unisex")}
        Price: {product.get('price')}
        Slug: {product.get('slug')}
        Colors: {product.get('colors')}
        Size: {product.get('size')}
        Description: {product.get('descriptions')}
        Sale: {product.get('sale')}
        """
    embedding = embedder.embed_query(text_to_embed)
    return embedding

def upsert_products(index, embedder, products):
    vectors = []
    for p in products:
        embedding = create_product_embedding(embedder, p)
        vectors.append({
            "id": p["id"],
            "values": embedding,
            "metadata": p  # full row as metadata
        })

    # Batch upsert to Pinecone
    index.upsert(vectors=vectors)


# 5️⃣ Main flow
if __name__ == "__main__":
    embedder = OpenAIEmbeddings(model="text-embedding-3-small",
                                base_url=os.getenv("EMBEDDING_BASE_URL"),
                                api_key=os.getenv("EMBEDDING_API_KEY")
                                )
    print("Fetching products from mssql...")
    products = fetch_products()
    print(f"Got {len(products)} from mssql!")

    print("Getting index...")
    index = create_index_if_not_exists(PINECONE_INDEX_NAME)
    print("Upsert into pinecone...")
    upsert_products(index, embedder, products)

    print(f"✅ Upserted {len(products)} products to Pinecone index '{PINECONE_INDEX_NAME}'")
    print("Completed!")
