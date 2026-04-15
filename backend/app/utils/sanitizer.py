def sanitize_input(text: str):
    """
    Remove dangerous phrases
    """
    dangerous_phrases = [
        "ignore previous instructions",
        "reveal system prompt",
        "bypass safety"
    ]

    clean_text = text.lower()

    for phrase in dangerous_phrases:
        clean_text = clean_text.replace(phrase, "")

    return clean_text