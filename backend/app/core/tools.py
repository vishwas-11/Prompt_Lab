def calculator_tool(expression: str):
    try:
        result = eval(expression)
        return str(result)
    except:
        return "Error in calculation"


def search_tool(query: str):
    # Mocked search
    return f"Mocked search result for: {query}"


def text_lookup_tool(query: str):
    # Simple mock DB
    knowledge = {
        "capital of france": "Paris",
        "speed of light": "299,792 km/s"
    }

    return knowledge.get(query.lower(), "No data found")