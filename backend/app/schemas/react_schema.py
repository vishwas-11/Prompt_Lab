# from pydantic import BaseModel

# class ReActRequest(BaseModel):
#     input: str
#     max_steps: int = 5



from pydantic import BaseModel
from typing import List, Optional


class ReactStep(BaseModel):
    type: str
    content: Optional[str] = None
    tool: Optional[str] = None
    input: Optional[str] = None


class ReactResponse(BaseModel):
    input: str
    steps: List[ReactStep]
    final_answer: Optional[str]