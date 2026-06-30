import re


def clean_text(text: str) -> str:
    """
    Clean extracted PDF text.
    """

    # Replace multiple spaces/tabs with a single space
    text = re.sub(r"[ \t]+", " ", text)

    # Replace 3 or more newlines with exactly 2
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def chunk_text(
    text: str,
    chunk_size: int = 800,
    overlap: int = 150
) -> list[str]:
    """
    Split text into paragraph-aware chunks with overlap.
    """

    text = clean_text(text)

    paragraphs = [
        p.strip()
        for p in text.split("\n\n")
        if p.strip()
    ]

    chunks = []

    current_chunk = ""

    for paragraph in paragraphs:

        # If adding this paragraph still fits, keep building
        if len(current_chunk) + len(paragraph) < chunk_size:

            if current_chunk:
                current_chunk += "\n\n"

            current_chunk += paragraph

        else:

            # Save completed chunk
            if current_chunk:
                chunks.append(current_chunk)

            # Create overlap from previous chunk
            if overlap > 0 and current_chunk:

                overlap_text = current_chunk[-overlap:]

                current_chunk = overlap_text + "\n\n" + paragraph

            else:

                current_chunk = paragraph

    # Add final chunk
    if current_chunk:
        chunks.append(current_chunk)

    return chunks