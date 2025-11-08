import os
import time
from pinecone import Pinecone, ServerlessSpec, AwsRegion, CloudProvider

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

def create_index_if_not_exists(index_name, delete_old = False):
    pc = Pinecone(api_key=PINECONE_API_KEY)

    if index_name in [idx.name for idx in pc.list_indexes()]:
        if delete_old:
            pc.delete_index(name=index_name)
    if index_name not in [idx.name for idx in pc.list_indexes()]:
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(cloud=CloudProvider.AWS, region=AwsRegion.US_EAST_1)
        )

    while not pc.describe_index(index_name).status["ready"]:
        print('[create_index_if_not_exists] - wating for index to be ready...')
        time.sleep(1)

    index = pc.Index(index_name)

    return index;