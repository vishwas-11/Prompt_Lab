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


# def build_cot_prompts(user_input: str):
#     normal_prompt = user_input

#     cot_prompt = f"""
#     Solve the following problem step by step.
#     Explain your reasoning clearly before giving the final answer.

#     Problem:
#     {user_input}
#     """

#     return normal_prompt, cot_prompt






def build_cot_prompts(user_input: str):
    normal_prompt = user_input

    cot_prompt = f"""
    Solve the following problem step by step.

    After solving, you MUST give the final answer in this exact format:
    FINAL_ANSWER: <your answer>

    Problem:
    {user_input}
    """

    return normal_prompt, cot_prompt



def build_react_prompt(user_input: str):
    return f"""
    You are an AI agent that can think and use tools.

    Follow this format STRICTLY:

    Thought: describe what you think
    Action: tool_name[input]
    Observation: result of action
    ... (repeat)

    When you reach final answer:
    FINAL_ANSWER: <answer>

    Available tools:
    - calculator
    - search
    - lookup

    User Question:
    {user_input}
    """



def build_tot_prompt(problem: str, context: str = ""):
    return f"""
    You are solving a problem step by step.

    Problem:
    {problem}

    Current reasoning:
    {context}

    Continue reasoning.

    If you reach the solution, output:
    FINAL_ANSWER: <answer>
    """