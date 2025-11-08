import os
import pyodbc
from langchain_openai import OpenAIEmbeddings
from utils import create_index_if_not_exists
from langchain_pinecone import PineconeVectorStore
from langchain_core.documents import Document

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

def product_to_text(product: dict) -> str:
    # Ignore image fields
    return f"""
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

def product_to_doc(product: dict) -> Document:
    doc = Document(page_content=product_to_text(product=product))
    doc.metadata = product
    doc.id = product["id"]
    return doc

def create_product_docs(products: list[dict]) -> list[Document]:
    docs = [product_to_doc(p) for p in products]
    return docs

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
    index = create_index_if_not_exists(PINECONE_INDEX_NAME, delete_old=True)
    vectorstore = PineconeVectorStore(index_name=PINECONE_INDEX_NAME, 
                                    embedding=embedder,
                                    pinecone_api_key=os.getenv("PINECONE_API_KEY")
                                        )
    print("Creating product document...")
    docs = create_product_docs(products=products)

    print("Adding product document into pinecone...")
    vectorstore.add_documents(documents=docs)
    # upsert_products(index, embedder, products)

    print(f"✅ Add {len(products)} products to Pinecone index '{PINECONE_INDEX_NAME}'")
    print("Completed!")
