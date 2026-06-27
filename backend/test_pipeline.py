from services.rag_service import (
    process_document,
    ask_question
)

process_document("uploads/sample.pdf")

question = input("Ask a question: ")

response = ask_question(question)

print("\nQUESTION:")
print(response["question"])

print("\nANSWER:")
print(response["answer"])