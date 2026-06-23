import os
import shutil

from fastapi import APIRouter, File, UploadFile, HTTPException

from models.schemas import UploadResponse
from services.rag_service import process_document

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIRECTORY = "uploads"

os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)


@router.post(
    "/",
    response_model=UploadResponse,
    summary="Upload and process a PDF document"
)
def upload_document(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = os.path.join(
        UPLOAD_DIRECTORY,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    response = process_document(file_path)

    return UploadResponse(
        status=response["status"],
        message=response["message"],
        total_chunks=response["total_chunks"]
    )