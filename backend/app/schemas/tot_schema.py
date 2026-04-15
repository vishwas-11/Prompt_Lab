from pydantic import BaseModel

class ToTRequest(BaseModel):
    input: str
    num_branches: int = 3
    max_depth: int = 2