from typing import List

from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class Source(BaseModel):
    source: str
    text: str


class ChatResponse(BaseModel):
    question: str
    answer: str
    context: List[Source]


class UploadResponse(BaseModel):
    status: str
    message: str
    total_chunks: int


class DocumentResponse(BaseModel):
    filename: str


class HealthResponse(BaseModel):
    status: str