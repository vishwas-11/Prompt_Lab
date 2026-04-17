from fastapi import APIRouter
from app.schemas.roles_schema import RolesRequest
from app.core.prompt_engine import build_roles_prompt
from app.core.llm import get_llm

router = APIRouter(prefix="/generate", tags=["Roles"])


@router.post("/roles")
async def generate_roles(request: RolesRequest):
    llm = get_llm()

    final_prompt = build_roles_prompt(
        request.system_prompt if request.enable_system else "",
        request.developer_prompt if request.enable_developer else "",
        request.user_prompt if request.enable_user else ""
    )

    response = llm.invoke(final_prompt)

    return {
        "input": {
            "system": request.system_prompt,
            "developer": request.developer_prompt,
            "user": request.user_prompt,
        },
        "enabled_roles": {
            "system": request.enable_system,
            "developer": request.enable_developer,
            "user": request.enable_user,
        },
        "final_prompt": final_prompt,
        "output": response.content
    }