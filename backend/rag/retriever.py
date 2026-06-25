from .vector_store import get_collection
from .embedding_service import model


def retrieve_context(
    query: str,
    k: int = 3
):

    collection = get_collection()

    query_embedding = model.encode(
        query
    ).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=k
    )

    return results["documents"][0]