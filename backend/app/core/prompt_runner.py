from app.core.llm import get_llm


def run_prompts(input_text: str, prompt_templates: list):
    llm = get_llm()

    results = []

    for prompt in prompt_templates:
        final_prompt = f"{prompt}\n\nInput:\n{input_text}"

        response = llm.invoke(final_prompt)

        results.append({
            "prompt": prompt,
            "full_prompt": final_prompt,
            "output": response.content
        })

    return results