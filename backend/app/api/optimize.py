from fastapi import APIRouter, HTTPException
from app.schemas.opt_schema import PromptOptimizationRequest
from app.core.prompt_runner import run_prompts
from app.utils.prompt_scorer import score_output

router = APIRouter(prefix="/optimize", tags=["Prompt Optimization"])


@router.post("/prompts")
async def optimize_prompts(request: PromptOptimizationRequest):
    if not request.prompts:
        raise HTTPException(
            status_code=400,
            detail="prompts must contain at least one prompt template"
        )

    results = run_prompts(request.input, request.prompts)

    scored_results = []

    for r in results:
        score = score_output(r["raw_output"])

        scored_results.append({
            "prompt": r["prompt"],
            "score": score,
            "structured_output": r["structured_output"]
        })

    scored_results = sorted(
        scored_results,
        key=lambda x: x["score"],
        reverse=True
    )

    best_prompt = scored_results[0] if scored_results else None

    return {
        "input": request.input,
        "results": scored_results,
        "best_prompt": best_prompt
    }
