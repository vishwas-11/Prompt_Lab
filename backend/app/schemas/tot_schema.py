from pydantic import BaseModel, Field

class ToTRequest(BaseModel):
    input: str
    num_branches: int = Field(default=3, ge=2, le=4)
    max_depth: int = Field(default=2, ge=2, le=4)
