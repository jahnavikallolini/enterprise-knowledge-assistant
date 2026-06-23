import os

from fastapi import APIRouter

from models.schemas import DocumentResponse

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

        for file_name in os.listdir(UPLOAD_DIRECTORY):

            if file_name.endswith(".pdf"):

                documents.append(
                    DocumentResponse(
                        filename=file_name
                    )
                )

    return documents