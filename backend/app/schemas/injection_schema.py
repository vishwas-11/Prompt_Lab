from pydantic import BaseModel

class InjectionRequest(BaseModel):
    input: str