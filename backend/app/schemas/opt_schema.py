from pydantic import BaseModel
from typing import List


class PromptOptimizationRequest(BaseModel):
    input: str
    prompts: List[str]   # different prompt templates