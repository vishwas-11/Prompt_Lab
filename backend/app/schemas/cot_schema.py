from pydantic import BaseModel

class CoTRequest(BaseModel):
    input: str