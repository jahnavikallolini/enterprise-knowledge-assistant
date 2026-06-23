from pydantic import BaseModel
from typing import List


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    question: str
    answer: str
    context: List[str]


class UploadResponse(BaseModel):
    status: str
    message: str
    total_chunks: int


class DocumentResponse(BaseModel):
    filename: str


class HealthResponse(BaseModel):
    status: str