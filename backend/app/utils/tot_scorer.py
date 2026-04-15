# def score_thought(thought: str):
#     """
#     Simple heuristic scoring:
#     - Longer reasoning = better (for now)
#     - can be upgraded later using LLM scoring
#     """
#     return len(thought)





def score_thought(thought: str):
    score = 0

    # Reward structured reasoning
    if "FINAL_ANSWER" in thought:
        score += 50

    # Reward math steps
    if any(char.isdigit() for char in thought):
        score += 10

    # Penalize vague text
    if "maybe" in thought.lower():
        score -= 5

    return score + len(thought)