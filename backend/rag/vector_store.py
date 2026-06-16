import chromadb

client = chromadb.PersistentClient(
    path="database/chroma_db"
)

collection = client.get_or_create_collection(
    name="enterprise_documents"
)


def store_documents(
    chunks,
    embeddings
):

    ids = [str(i) for i in range(len(chunks))]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings
    )


def get_collection():
    return collection