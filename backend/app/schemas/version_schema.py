from pydantic import BaseModel

class CreatePromptRequest(BaseModel):
    name: str
    content: str


class TestPromptRequest(BaseModel):
    name: str
    input: str