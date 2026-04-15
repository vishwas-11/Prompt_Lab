from pydantic import BaseModel

class ReActRequest(BaseModel):
    input: str
    max_steps: int = 5