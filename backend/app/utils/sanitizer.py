import re


def sanitize_input(text: str) -> str:
    """Remove dangerous phrases without changing the rest of the user's text."""
    dangerous_phrases = [
        "ignore previous instructions",
        "reveal system prompt",
        "bypass safety",
        "ignore developer prompt"
    ]

    clean_text = text

    for phrase in dangerous_phrases:
        clean_text = re.sub(re.escape(phrase), "", clean_text, flags=re.IGNORECASE)

    return clean_text
