import os
import tempfile
import requests
from tqdm import tqdm
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings

from utils import create_index_if_not_exists

from dotenv import load_dotenv
script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=f"{script_dir}/.env")

# ---------- CONFIGURATION ----------
PINECONE_INDEX_NAME = "policy-pdf-embeddings"
PDF_FILES = [
    "" # TODO: change this to pdf url
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

def upsert_to_pinecone(index, embedder, chunks):
    for i in tqdm(range(0, len(chunks), 100)):
        batch = chunks[i:i+100]
        texts = [doc.page_content for doc in batch]
        metas = [doc.metadata for doc in batch]
        ids = [
            f"{meta['url'].split('/')[-1]}-p{meta.get('page', 0)}-c{i+j}"
            for j, meta in enumerate(metas)
        ]
        vectors = [
            {
                "id": ids[j],
                "values": embedder.embed_query(texts[j]),
                "metadata": metas[j]
            }
            for j in range(len(texts))
        ]
        index.upsert(vectors=vectors)

if __name__ == "__main__":
    embedder = OpenAIEmbeddings(model="text-embedding-3-small",
                                base_url=os.getenv("EMBEDDING_BASE_URL"),
                                api_key=os.getenv("EMBEDDING_API_KEY")
                                )    

    index = create_index_if_not_exists(PINECONE_INDEX_NAME)

    docs = load_all_pdfs(PDF_FILES)
    print(f"Loaded {len(docs)} pdf documents!")

    chunks = chunk_documents(docs)
    print(f"Splitted into {len(chunks)} chunks!")

    upsert_to_pinecone(index, embedder, chunks)
    print(f"✅ Upserted {len(chunks)} chunks of documents into index '{PINECONE_INDEX_NAME}'")
    print("Completed!!")
