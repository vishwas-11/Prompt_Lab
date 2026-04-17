from fastapi import APIRouter
from app.schemas.self_consistency_schema import SelfConsistencyRequest
from app.core.prompt_engine import build_cot_prompts
from app.core.llm import get_llm
from app.utils.answer_extractor import extract_final_answer
from collections import Counter

router = APIRouter(prefix="/generate", tags=["Self-Consistency"])

INVALID_ANSWERS = {"UNKNOWN", "", None}


@router.post("/self-consistency")
async def generate_self_consistency(request: SelfConsistencyRequest):
    llm = get_llm()

    _, cot_prompt = build_cot_prompts(request.input)

    results = []

    # Run multiple times
    for _ in range(request.num_runs):
        response = llm.invoke(cot_prompt)
        output_text = response.content

        answer = extract_final_answer(output_text)

        results.append({
            "full_output": output_text,
            "answer": answer
        })

    # Majority voting
    answers = [r["answer"] for r in results]
    valid_answers = [answer for answer in answers if answer not in INVALID_ANSWERS]
    answer_counts = Counter(valid_answers)

    final_answer = None
    confidence = 0.0
    consensus_reached = False

    if answer_counts:
        final_answer = answer_counts.most_common(1)[0][0]
        confidence = answer_counts[final_answer] / len(valid_answers)
        consensus_reached = True

    return {
        "input": request.input,
        "runs": request.num_runs,
        "all_attempts": results,
        "confidence": confidence,
        "answer_distribution": dict(answer_counts),
        "final_answer": final_answer,
        "consensus_reached": consensus_reached
    }
