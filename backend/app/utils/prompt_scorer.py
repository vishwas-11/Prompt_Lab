def score_output(output: str):
    score = 0

    # Reward structured answers
    if "FINAL_ANSWER" in output:
        score += 30

    # Reward numbers (useful for math)
    if any(char.isdigit() for char in output):
        score += 20

    # Penalize vague words
    if "maybe" in output.lower():
        score -= 10

    # Reward clarity (length heuristic)
    score += len(output) // 10

    return score