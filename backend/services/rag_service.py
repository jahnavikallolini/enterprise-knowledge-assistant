from rag.document_loader import load_pdf
from rag.chunker import chunk_text
from rag.embedding_service import generate_embeddings
from rag.vector_store import store_documents
from rag.retriever import retrieve_context
from rag.llm_service import generate_answer


def process_document(file_path: str):
    """
    Process a PDF and store its embeddings in the vector database.
    """

    # Step 1: Extract text
    text = load_pdf(file_path)

    # Step 2: Split into chunks
    chunks = chunk_text(text)

    # Step 3: Generate embeddings
    embeddings = generate_embeddings(chunks)

    # Step 4: Store in ChromaDB
    store_documents(chunks, embeddings)

    return {
        "status": "success",
        "message": "Document processed successfully.",
        "total_chunks": len(chunks)
    }


def ask_question(question: str):
    """
    Retrieve relevant context and generate an answer.
    """

    # Step 1: Retrieve relevant chunks
    context = retrieve_context(question)

    # Step 2: Generate answer
    answer = generate_answer(
        question=question,
        context_chunks=context
    )

    return {
        "question": question,
        "answer": answer,
        "context": context
    }