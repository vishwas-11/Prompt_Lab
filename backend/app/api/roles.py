from fastapi import APIRouter
from app.schemas.roles_schema import RolesRequest
from app.core.prompt_engine import build_roles_prompt
from app.core.llm import get_llm

router = APIRouter(prefix="/generate", tags=["Roles"])

@router.post("/roles")
async def generate_roles(request: RolesRequest):
    llm = get_llm()

    final_prompt = build_roles_prompt(
        request.system_prompt,
        request.developer_prompt,
        request.user_prompt
    )

    response = llm.invoke(final_prompt)

    return {
        "final_prompt": final_prompt,
        "output": response.content
    }