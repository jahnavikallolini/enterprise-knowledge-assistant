import os

from fastapi import APIRouter, HTTPException

from models.schemas import DocumentResponse
from rag.vector_store import delete_document

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIRECTORY = "uploads"


@router.get(
    "/",
    response_model=list[DocumentResponse],
    summary="List uploaded documents"
)
def get_documents():

    documents = []

    if os.path.exists(UPLOAD_DIRECTORY):

        for file_name in sorted(os.listdir(UPLOAD_DIRECTORY)):

            if file_name.endswith(".pdf"):

                documents.append(
                    DocumentResponse(
                        filename=file_name
                    )
                )

    return documents


@router.delete(
    "/{filename}",
    summary="Delete document"
)
def remove_document(filename: str):

    file_path = os.path.join(
        UPLOAD_DIRECTORY,
        filename
    )

    if not os.path.exists(file_path):

        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    os.remove(file_path)

    delete_document(filename)

    return {
        "status": "success",
        "message": f"{filename} deleted successfully."
    }