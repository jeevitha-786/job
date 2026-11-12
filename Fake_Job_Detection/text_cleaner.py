import html
import re


def clean_text(text: str) -> str:
    """
    Cleans raw text for NLP models:
    - Unescapes HTML entities (e.g., &amp; -> &, &lt; -> <)
    - Strips HTML tags
    - Converts to lowercase
    - Keeps only alphabetic characters and spaces
    - Normalizes consecutive spaces
    """
    if text is None:
        return ""
    text = str(text)
    text = html.unescape(text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.lower()
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text
