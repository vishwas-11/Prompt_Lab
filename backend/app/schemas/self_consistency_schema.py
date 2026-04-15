from pydantic import BaseModel

class SelfConsistencyRequest(BaseModel):
    input: str
    num_runs: int = 5   # default runs