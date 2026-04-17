import re
from typing import List, Dict


def parse_react_steps(text: str) -> List[Dict]:
    """
    Parse full ReAct output into structured steps.

    Supports multiple iterations:
    Thought → Action → Observation → Thought → ...
    """

    steps = []

    # Split by Thought blocks 
    thought_blocks = re.split(r"(?=Thought:)", text)

    for block in thought_blocks:
        block = block.strip()
        if not block:
            continue

        # Thought
        thought_match = re.search(r"Thought:\s*(.*?)(Action:|$)", block, re.DOTALL)
        if thought_match:
            steps.append({
                "type": "thought",
                "content": thought_match.group(1).strip()
            })

        # Action
        action_match = re.search(r"Action:\s*(\w+)\[(.*?)\]", block)
        if action_match:
            steps.append({
                "type": "action",
                "tool": action_match.group(1),
                "input": action_match.group(2)
            })

        # Observation 
        observation_match = re.search(
            r"Observation:\s*(.*?)(Thought:|FINAL_ANSWER:|$)",
            block,
            re.DOTALL
        )
        if observation_match:
            steps.append({
                "type": "observation",
                "content": observation_match.group(1).strip()
            })

    return steps


def extract_final_answer(text: str):
    match = re.search(r"FINAL_ANSWER:\s*(.*)", text)
    if match:
        return match.group(1).strip()
    return None