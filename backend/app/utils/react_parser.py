import re

def parse_action(text: str):
    """
    Extract action and input from LLM output
    Example:
    Action: calculator[2+2]
    """

    match = re.search(r"Action:\s*(\w+)\[(.*?)\]", text)

    if match:
        tool = match.group(1)
        tool_input = match.group(2)
        return tool, tool_input

    return None, None


def extract_final_answer(text: str):
    match = re.search(r"FINAL_ANSWER:\s*(.*)", text)
    if match:
        return match.group(1).strip()

    return None