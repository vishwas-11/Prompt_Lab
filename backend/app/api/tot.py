from fastapi import APIRouter
from app.schemas.tot_schema import ToTRequest
from app.core.llm import get_llm
from app.core.prompt_engine import build_tot_prompt
import re

router = APIRouter(prefix="/generate", tags=["Tree-of-Thoughts"])


#  Extract FINAL ANSWER
def extract_final_answer(text: str):
    match = re.search(r"FINAL_ANSWER:\s*(.*)", text)
    if match:
        return match.group(1).strip()
    return None


#  Better Scoring Function
def score_thought(thought: str):
    score = 0

    if "FINAL_ANSWER" in thought:
        score += 50

    if any(char.isdigit() for char in thought):
        score += 10

    if "maybe" in thought.lower():
        score -= 5

    return score + len(thought)


@router.post("/tree-of-thoughts")
async def generate_tot(request: ToTRequest):
    llm = get_llm()

    branches = [
        {
            "thoughts": [],
            "score": 0,
            "final_answer": None
        }
    ]

    #  Tree Expansion
    for depth in range(request.max_depth):
        new_branches = []

        for branch in branches:
            context = "\n".join(branch["thoughts"])

            for _ in range(request.num_branches):
                prompt = build_tot_prompt(request.input, context)

                response = llm.invoke(prompt)
                thought = response.content.strip()

                final_answer = extract_final_answer(thought)

                new_thoughts = branch["thoughts"] + [thought]
                score = score_thought(thought)

                new_branches.append({
                    "thoughts": new_thoughts,
                    "score": score,
                    "final_answer": final_answer
                })

        #  Beam Search (keep best branches)
        new_branches = sorted(
            new_branches,
            key=lambda x: x["score"],
            reverse=True
        )

        branches = new_branches[:request.num_branches]

    #  Best branch
    best_branch = branches[0]

    return {
        "input": request.input,
        "branches": branches,
        "best_path": best_branch,
        "final_answer": best_branch["final_answer"]
    }