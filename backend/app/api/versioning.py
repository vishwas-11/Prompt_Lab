from fastapi import APIRouter
from app.schemas.version_schema import CreatePromptRequest, TestPromptRequest
from app.db.prompt_repo import create_prompt, get_prompt_versions, get_latest_prompt
from app.core.llm import get_llm
from app.utils.diff import simple_diff

router = APIRouter(prefix="/version", tags=["Prompt Versioning"])


# Create new version
@router.post("/create")
async def create_new_prompt(request: CreatePromptRequest):
    doc = await create_prompt(request.name, request.content)

    return {
        "message": "Prompt version created",
        "data": doc
    }


#  Get all versions
@router.get("/history/{name}")
async def get_history(name: str):
    versions = await get_prompt_versions(name)

    return {
        "name": name,
        "versions": versions
    }


#  Test latest version
@router.post("/test")
async def test_prompt(request: TestPromptRequest):
    llm = get_llm()

    prompt = await get_latest_prompt(request.name)

    if not prompt:
        return {"error": "Prompt not found"}

    final_prompt = f"{prompt['content']}\n\nInput:\n{request.input}"

    response = llm.invoke(final_prompt)

    return {
        "version": prompt["version"],
        "output": response.content
    }


#  Compare versions
@router.get("/diff/{name}")
async def compare_versions(name: str):
    versions = await get_prompt_versions(name)

    if len(versions) < 2:
        return {"error": "Not enough versions to compare"}

    old = versions[-2]["content"]
    new = versions[-1]["content"]

    diff = simple_diff(old, new)

    return {
        "old_version": versions[-2]["version"],
        "new_version": versions[-1]["version"],
        "diff": diff
    }