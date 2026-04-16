from fastapi import APIRouter
from app.schemas.tot_schema import ToTRequest
from app.core.llm import get_llm
from app.core.prompt_engine import build_tot_prompt
import re

router = APIRouter(prefix="/generate", tags=["Tree-of-Thoughts"])


def extract_final_answer(text: str):
    match = re.search(r"FINAL_ANSWER:\s*(.*)", text)
    return match.group(1).strip() if match else None


def score_thought(thought: str):
    score = 0

    if "FINAL_ANSWER" in thought:
        score += 50

    if any(char.isdigit() for char in thought):
        score += 10

    if "maybe" in thought.lower():
        score -= 5

    return score + len(thought)


# 🌳 Recursive tree builder
def expand_tree(llm, problem, node, depth, max_depth, num_branches):
    if depth >= max_depth:
        return

    node["children"] = []

    for _ in range(num_branches):
        context = node["thought"]

        prompt = build_tot_prompt(problem, context)

        response = llm.invoke(prompt)
        thought = response.content.strip()

        child_node = {
            "thought": thought,
            "score": score_thought(thought),
            "children": []
        }

        node["children"].append(child_node)

        # Recursive expansion
        expand_tree(llm, problem, child_node, depth + 1, max_depth, num_branches)


# 🏆 Extract best path
def find_best_path(node):
    best_path = []
    best_score = -1

    def dfs(n, path):
        nonlocal best_path, best_score

        current_path = path + [n]

        if not n["children"]:
            total_score = sum(x["score"] for x in current_path)

            if total_score > best_score:
                best_score = total_score
                best_path = current_path

        for child in n["children"]:
            dfs(child, current_path)

    dfs(node, [])

    return best_path


@router.post("/tree-of-thoughts")
async def generate_tot(request: ToTRequest):
    llm = get_llm()

    root = {
        "thought": "Start solving the problem",
        "score": 0,
        "children": []
    }

    # 🌳 Build full tree
    expand_tree(
        llm,
        request.input,
        root,
        depth=0,
        max_depth=request.max_depth,
        num_branches=request.num_branches
    )

    # 🏆 Find best path
    best_path_nodes = find_best_path(root)

    best_path = [node["thought"] for node in best_path_nodes]

    final_answer = None
    for node in reversed(best_path_nodes):
        final_answer = extract_final_answer(node["thought"])
        if final_answer:
            break

    return {
        "input": request.input,
        "tree": root,
        "best_path": best_path,
        "final_answer": final_answer
    }