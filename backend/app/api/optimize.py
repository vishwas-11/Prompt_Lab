from fastapi import APIRouter
from app.schemas.opt_schema import PromptOptimizationRequest
from app.core.prompt_runner import run_prompts
from app.utils.prompt_scorer import score_output

router = APIRouter(prefix="/optimize", tags=["Prompt Optimization"])


@router.post("/prompts")
async def optimize_prompts(request: PromptOptimizationRequest):

    results = run_prompts(request.input, request.prompts)

    scored_results = []

    for r in results:
        score = score_output(r["output"])

        scored_results.append({
            "prompt": r["prompt"],
            "output": r["output"],
            "score": score
        })

    # Sort best first
    scored_results = sorted(
        scored_results,
        key=lambda x: x["score"],
        reverse=True
    )

    best_prompt = scored_results[0]

    return {
        "input": request.input,
        "results": scored_results,
        "best_prompt": best_prompt
    }