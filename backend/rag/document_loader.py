import logging
import warnings

from pypdf import PdfReader

# Suppress non-critical PDF parsing warnings
warnings.filterwarnings("ignore")
logging.getLogger("pypdf").setLevel(logging.ERROR)


def load_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.
    """

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text