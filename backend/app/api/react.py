from fastapi import APIRouter
from pydantic import BaseModel

from app.core.llm import get_llm
from app.utils.react_parser import parse_react_steps, extract_final_answer

router = APIRouter(prefix="/generate", tags=["ReAct"])


class ReactRequest(BaseModel):
    input: str


def build_react_prompt(user_input: str):
    return f"""
Solve the problem using ReAct pattern.

Follow strictly:

Thought: reasoning step
Action: tool[input]
Observation: result of tool

Repeat as needed.

Finally:
FINAL_ANSWER: <answer>

Question:
{user_input}
"""


@router.post("/react")
async def run_react(request: ReactRequest):
    llm = get_llm()

    prompt = build_react_prompt(request.input)

    response = llm.invoke(prompt)
    output = response.content

    steps = parse_react_steps(output)
    final_answer = extract_final_answer(output)

    return {
        "input": request.input,
        "steps": steps,
        "final_answer": final_answer,
        "raw_output": output   # optional (debugging)
    }