from fastapi import APIRouter
from app.schemas.cot_schema import CoTRequest
from app.core.prompt_engine import build_cot_prompts
from app.core.llm import get_llm

router = APIRouter(prefix="/generate", tags=["Chain-of-Thought"])

@router.post("/cot")
async def generate_cot(request: CoTRequest):
    llm = get_llm()

    normal_prompt, cot_prompt = build_cot_prompts(request.input)

    # Run both prompts
    normal_response = llm.invoke(normal_prompt)
    cot_response = llm.invoke(cot_prompt)

    return {
        "input": request.input,
        "normal_output": normal_response.content,
        "cot_output": cot_response.content
    }



