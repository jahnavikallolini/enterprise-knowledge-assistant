import chromadb
import uuid

client = chromadb.PersistentClient(
    path="database/chroma_db"
)

collection = client.get_or_create_collection(
    name="enterprise_documents"
)


def store_documents(
    filename: str,
    chunks: list[str],
    embeddings: list[list[float]]
):
    ids = [
        str(uuid.uuid4())
        for _ in chunks
    ]

    metadatas = [
        {
            "source": filename
        }
        for _ in chunks
    ]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )


def delete_document(
    filename: str
):
    collection.delete(
        where={
            "source": filename
        }
    )


def get_collection():
    return collection