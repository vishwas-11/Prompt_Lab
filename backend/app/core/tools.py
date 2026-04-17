import ast
import logging
import operator


logger = logging.getLogger(__name__)

_ALLOWED_BINARY_OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.FloorDiv: operator.floordiv,
    ast.Mod: operator.mod,
    ast.Pow: operator.pow,
}

_ALLOWED_UNARY_OPERATORS = {
    ast.UAdd: operator.pos,
    ast.USub: operator.neg,
}


def _safe_eval(expression: str):
    """Evaluate a basic arithmetic expression without using eval()."""
    node = ast.parse(expression, mode="eval")

    def _evaluate(current_node):
        if isinstance(current_node, ast.Expression):
            return _evaluate(current_node.body)

        if isinstance(current_node, ast.Constant) and isinstance(
            current_node.value, (int, float)
        ):
            return current_node.value

        if isinstance(current_node, ast.BinOp):
            left = _evaluate(current_node.left)
            right = _evaluate(current_node.right)
            operator_fn = _ALLOWED_BINARY_OPERATORS.get(type(current_node.op))

            if operator_fn is None:
                raise ValueError("Unsupported operator")

            return operator_fn(left, right)

        if isinstance(current_node, ast.UnaryOp):
            operand = _evaluate(current_node.operand)
            operator_fn = _ALLOWED_UNARY_OPERATORS.get(type(current_node.op))

            if operator_fn is None:
                raise ValueError("Unsupported unary operator")

            return operator_fn(operand)

        raise ValueError("Unsupported expression")

    return _evaluate(node)


def calculator_tool(expression: str):
    try:
        result = _safe_eval(expression)
        return str(result)
    except Exception as e:
        logger.exception("calculator_tool failed for expression=%r", expression)
        return f"Error in calculation: {str(e)}"


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
