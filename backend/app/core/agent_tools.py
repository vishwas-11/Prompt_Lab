from langchain.tools import tool


@tool
def calculator(expression: str) -> str:
    """Evaluate a mathematical expression"""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Error: {str(e)}"


@tool
def search(query: str) -> str:
    """Search for general information"""
    return f"Mocked search result for: {query}"


@tool
def lookup(query: str) -> str:
    """Lookup known facts"""
    knowledge = {
        "capital of france": "Paris",
        "speed of light": "299,792 km/s"
    }

    return knowledge.get(query.lower(), "No data found")