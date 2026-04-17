from fastapi import APIRouter
from app.schemas.cot_schema import CoTRequest
from app.core.prompt_engine import build_cot_prompts
from app.core.llm import get_llm

router = APIRouter(prefix="/generate", tags=["Chain-of-Thought"])


def extract_steps(text: str):
    
    # splitting of the steps based on newlines, this is a simple heuristic and can be improved
    lines = text.split("\n")

    # Clean and filter meaningful steps
    steps = []
    for line in lines:
        clean_line = line.strip()
        if clean_line:
            steps.append(clean_line)

    return steps


@router.post("/cot")
async def generate_cot(request: CoTRequest):
    llm = get_llm()

    # Build prompts
    normal_prompt, cot_prompt = build_cot_prompts(request.input)

    # Run LLM calls
    normal_response = llm.invoke(normal_prompt)
    cot_response = llm.invoke(cot_prompt)

    # Extract reasoning steps
    reasoning_steps = extract_steps(cot_response.content)

    return {
        "input": request.input,
        "normal_prompt": normal_prompt,
        "cot_prompt": cot_prompt,
        "normal_output": normal_response.content,
        "cot_output": cot_response.content,
        "reasoning_steps": reasoning_steps
    }