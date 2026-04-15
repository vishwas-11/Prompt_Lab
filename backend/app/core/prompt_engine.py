def build_roles_prompt(system: str, developer: str, user: str):
    prompt_parts = []

    if system:
        prompt_parts.append(f"[SYSTEM]\n{system}")

    if developer:
        prompt_parts.append(f"[DEVELOPER]\n{developer}")

    if user:
        prompt_parts.append(f"[USER]\n{user}")

    final_prompt = "\n\n".join(prompt_parts)

    return final_prompt


def build_cot_prompts(user_input: str):
    normal_prompt = user_input

    cot_prompt = f"""
    Solve the following problem step by step.
    Explain your reasoning clearly before giving the final answer.

    Problem:
    {user_input}
    """

    return normal_prompt, cot_prompt