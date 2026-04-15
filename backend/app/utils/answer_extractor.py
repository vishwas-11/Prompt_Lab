import re

def extract_final_answer(text: str):
    """
    Extract final answer from LLM output.
    Tries to find last number or final statement.
    """

    # Try to find patterns like: "Final Answer: 1081"
    match = re.search(r"(final answer[:\s]*)(.*)", text, re.IGNORECASE)
    if match:
        return match.group(2).strip()

    # Otherwise, extract last number
    numbers = re.findall(r"[-+]?\d*\.\d+|\d+", text)
    if numbers:
        return numbers[-1]

    # fallback: return last line
    lines = text.strip().split("\n")
    return lines[-1] if lines else text