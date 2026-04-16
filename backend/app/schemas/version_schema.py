from pydantic import BaseModel
from typing import Optional

class CreatePromptRequest(BaseModel):
    name: str
    content: str


class TestPromptRequest(BaseModel):
    name: str
    input: str
    version: Optional[int] = None