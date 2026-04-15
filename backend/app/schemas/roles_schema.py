from pydantic import BaseModel
from typing import Optional

class RolesRequest(BaseModel):
    system_prompt: Optional[str] = ""
    developer_prompt: Optional[str] = ""
    user_prompt: str