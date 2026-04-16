from fastapi import APIRouter, HTTPException
from app.schemas.version_schema import CreatePromptRequest, TestPromptRequest
from app.db.prompt_repo import (
    create_prompt,
    get_prompt_versions,
    get_latest_prompt,
    get_prompt_by_version   
)
from app.core.llm import get_llm
from app.utils.diff import github_style_diff

from app.core.deps import get_current_user
from fastapi import Depends

router = APIRouter(prefix="/version", tags=["Prompt Versioning"])


#  Create new version
@router.post("/create")
async def create_new_prompt(request: CreatePromptRequest, user_id: str = Depends(get_current_user)):
    doc = await create_prompt(user_id, request.name, request.content)

    return {
        "message": "Prompt version created",
        "data": doc
    }


#  Get all versions
@router.get("/history/{name}")
async def get_history(name: str, user_id: str = Depends(get_current_user)):
    versions = await get_prompt_versions(user_id, name)

    return {
        "name": name,
        "versions": versions
    }


#  Test ANY version (UPDATED)
@router.post("/test")
async def test_prompt(request: TestPromptRequest, user_id: str = Depends(get_current_user)):
    llm = get_llm()

    #  NEW: support version selection
    if request.version:
        prompt = await get_prompt_by_version(user_id, request.name, request.version)
    else:
        prompt = await get_latest_prompt(user_id, request.name)

    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")

    final_prompt = f"{prompt['content']}\n\nInput:\n{request.input}"

    response = llm.invoke(final_prompt)

    return {
        "version": prompt["version"],
        "prompt": prompt["content"],
        "output": response.content
    }


#  Compare versions (structured diff)
@router.get("/diff/{name}")
async def compare_versions(name: str, user_id: str = Depends(get_current_user)):
    versions = await get_prompt_versions(user_id, name)

    if len(versions) < 2:
        raise HTTPException(status_code=409, detail="Not enough versions")

    old = versions[-2]["content"]
    new = versions[-1]["content"]

    diff = github_style_diff(old, new)

    return {
        "old_version": versions[-2]["version"],
        "new_version": versions[-1]["version"],
        "diff": diff
    }


#  ROLLBACK FEATURE
@router.post("/rollback")
async def rollback_prompt(name: str, version: int):
    prompt = await get_prompt_by_version(name, version)

    if not prompt:
        raise HTTPException(status_code=404, detail="Version not found")

    # create new version with old content
    new_doc = await create_prompt(name, prompt["content"])

    return {
        "message": f"Rolled back to version {version}",
        "new_version": new_doc["version"]
    }