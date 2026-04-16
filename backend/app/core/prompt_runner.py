from app.core.llm import get_llm
import re


def format_output(text: str):
    lines = text.split("\n")

    steps = []
    final_answer = None

    for line in lines:
        clean = line.strip()

        if not clean:
            continue

        if "FINAL_ANSWER" in clean:
            final_answer = clean.split(":")[-1].strip()
        else:
            steps.append(clean)

    return {
        "steps": steps,
        "final_answer": final_answer
    }


def run_prompts(input_text: str, prompt_templates: list):
    llm = get_llm()

    results = []

    for prompt in prompt_templates:
        final_prompt = f"{prompt}\n\nInput:\n{input_text}"

        response = llm.invoke(final_prompt)
        output_text = response.content

        structured = format_output(output_text)

        results.append({
            "prompt": prompt,
            "full_prompt": final_prompt,
            "raw_output": output_text,
            "structured_output": structured
        })

    return results