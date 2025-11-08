import os
import tempfile
import requests
from tqdm import tqdm
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

from utils import create_index_if_not_exists

from dotenv import load_dotenv
script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=f"{script_dir}/.env")

# ---------- CONFIGURATION ----------
PINECONE_INDEX_NAME = "policy-pdf-embeddings"
PDF_FILES = [
    "https://thaiviettrung.com/wp-content/uploads/2025/03/CHINH-SACH-TRA-HANG-HOAN-TIEN.pdf" # TODO: change this to pdf url
]

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

def load_pdf_from_url_tempfile(url):
    response = requests.get(url)
    response.raise_for_status()

    tmp = tempfile.NamedTemporaryFile(suffix=".pdf", delete=False)
    try:
        tmp.write(response.content)
        tmp.close()  # close so other processes can access it
        
        loader = PyPDFLoader(tmp.name)
        docs = loader.load()
        
        # Add URL metadata
        for d in docs:
            d.metadata["url"] = url
    finally:
        # Remove file manually
        os.remove(tmp.name)
    
    return docs

def load_all_pdfs(urls):
    all_docs = []
    for url in urls:
        docs = load_pdf_from_url_tempfile(url)
        all_docs.extend(docs)
    return all_docs


# ---------- STEP 3: Split into chunks ----------
def chunk_documents(docs, chunk_size=1000, chunk_overlap=200):
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    chunks = splitter.split_documents(docs)
    return chunks

if __name__ == "__main__":
    embedder = OpenAIEmbeddings(model="text-embedding-3-small",
                                base_url=os.getenv("EMBEDDING_BASE_URL"),
                                api_key=os.getenv("EMBEDDING_API_KEY")
                                )    

    index = create_index_if_not_exists(PINECONE_INDEX_NAME, delete_old=True)
    vectorstore = PineconeVectorStore(index_name=PINECONE_INDEX_NAME, 
                                    embedding=embedder,
                                    pinecone_api_key=PINECONE_API_KEY
                                        )
    docs = load_all_pdfs(PDF_FILES)
    print(f"Loaded {len(docs)} pdf documents!")

    chunks = chunk_documents(docs)
    print(f"Splitted into {len(chunks)} chunks!")

    vectorstore.add_documents(documents=chunks)

    print(f"✅ Added {len(chunks)} chunks of documents into index '{PINECONE_INDEX_NAME}'")
    print("Completed!!")
