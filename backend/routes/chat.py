from fastapi import APIRouter

from models.schemas import ChatRequest, ChatResponse
from services.rag_service import ask_question

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "/",
    response_model=ChatResponse,
    summary="Ask a question about uploaded documents"
)
def chat(request: ChatRequest):

    response = ask_question(request.question)

    return ChatResponse(
        question=response["question"],
        answer=response["answer"],
        context=response["context"]
    )