import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)


def generate_answer(
    question: str,
    context_chunks: list[str]
):

    context = "\n\n".join(
        context_chunks
    )

    prompt = f"""
You are an enterprise knowledge assistant.

Use ONLY the provided context.

Context:
{context}

Question:
{question}

Answer:
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text