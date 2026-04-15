from fastapi import APIRouter
from app.schemas.react_schema import ReActRequest
from app.core.prompt_engine import build_react_prompt
from app.core.llm import get_llm
from app.core.tools import calculator_tool, search_tool, text_lookup_tool
from app.utils.react_parser import parse_action, extract_final_answer

router = APIRouter(prefix="/generate", tags=["ReAct"])


@router.post("/react")
async def run_react(request: ReActRequest):
    llm = get_llm()

    prompt = build_react_prompt(request.input)

    steps = []
    current_input = prompt

    for step in range(request.max_steps):

        response = llm.invoke(current_input)
        output = response.content

        steps.append({
            "step": step + 1,
            "llm_output": output
        })

        # Check final answer
        final = extract_final_answer(output)
        if final:
            return {
                "input": request.input,
                "steps": steps,
                "final_answer": final
            }

        # Parse action
        tool, tool_input = parse_action(output)

        if not tool:
            break

        # Execute tool
        if tool == "calculator":
            observation = calculator_tool(tool_input)
        elif tool == "search":
            observation = search_tool(tool_input)
        elif tool == "lookup":
            observation = text_lookup_tool(tool_input)
        else:
            observation = "Unknown tool"

        # Append observation and continue loop
        current_input += f"\n{output}\nObservation: {observation}\n"

    return {
        "input": request.input,
        "steps": steps,
        "final_answer": "Could not reach final answer"
    }