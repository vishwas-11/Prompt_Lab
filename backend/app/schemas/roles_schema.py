from pydantic import BaseModel

class RolesRequest(BaseModel):
    system_prompt: str = ""
    developer_prompt: str = ""
    user_prompt: str

    enable_system: bool = True
    enable_developer: bool = True
    enable_user: bool = True