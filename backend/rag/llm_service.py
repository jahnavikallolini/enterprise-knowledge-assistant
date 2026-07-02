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
    context_chunks: list[dict]
):

    context = "\n\n".join(
        chunk["text"]
        for chunk in context_chunks
    )

    prompt = f"""
You are an enterprise knowledge assistant.

Answer the user's question using ONLY the provided context.

If the answer is not present in the context, clearly say that the information could not be found in the uploaded documents.

Write your answer in clear, well-formatted Markdown.

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