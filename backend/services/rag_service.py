import os

from rag.document_loader import load_pdf
from rag.chunker import chunk_text
from rag.embedding_service import generate_embeddings
from rag.vector_store import store_documents
from rag.retriever import retrieve_context
from rag.llm_service import generate_answer


def process_document(file_path: str):
    """
    Process a PDF and store its embeddings.
    """

    filename = os.path.basename(file_path)

    # Extract text
    text = load_pdf(file_path)

    if not text.strip():
        raise ValueError(
            "This PDF appears to contain no searchable text. Please upload a searchable PDF."
        )

    # Split into chunks
    chunks = chunk_text(text)

    if len(chunks) == 0:
        raise ValueError(
            "Unable to extract meaningful text from this PDF."
        )

    # Generate embeddings
    embeddings = generate_embeddings(chunks)

    if len(embeddings) == 0:
        raise ValueError(
            "Unable to generate embeddings for this document."
        )

    # Store in ChromaDB
    store_documents(
        filename=filename,
        chunks=chunks,
        embeddings=embeddings
    )

    return {
        "status": "success",
        "message": "Document processed successfully.",
        "total_chunks": len(chunks)
    }


def ask_question(question: str):
    context = retrieve_context(question)

    answer = generate_answer(
        question=question,
        context_chunks=context
    )

    return {
        "question": question,
        "answer": answer,
        "context": context
    }