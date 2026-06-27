from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.chat import router as chat_router
from routes.upload import router as upload_router
from routes.documents import router as documents_router

from models.schemas import HealthResponse

app = FastAPI(
    title="Enterprise Knowledge Assistant",
    description="AI-powered document intelligence platform using RAG and Gemini",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Home"])
def home():
    return {
        "message": "Enterprise Knowledge Assistant API"
    }


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["Health"]
)
def health():
    return HealthResponse(status="healthy")


app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(documents_router)