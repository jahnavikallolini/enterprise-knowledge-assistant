from rag.document_loader import load_pdf
from rag.chunker import chunk_text
from rag.embedding_generator import (
    generate_embeddings
)
from rag.vector_store import (
    store_documents
)
from rag.retriever import (
    retrieve_context
)
from rag.generator import (
    generate_answer
)

text = load_pdf(
    "uploads/sample.pdf"
)

chunks = chunk_text(text)

embeddings = generate_embeddings(
    chunks
)

store_documents(
    chunks,
    embeddings
)

question = input(
    "Ask a question: "
)

context = retrieve_context(
    question
)

answer = generate_answer(
    question,
    context
)

print("\nANSWER:\n")
print(answer)