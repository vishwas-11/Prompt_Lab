import re


def extract_final_answer(text: str):

    match = re.search(r"FINAL_ANSWER:\s*(.*)", text)
    if match:
        return match.group(1).strip()

    return "UNKNOWN"