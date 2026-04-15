from fastapi import APIRouter
from app.core.llm import get_llm

router = APIRouter()

@router.get("/test-llm")
async def test_llm():
    llm = get_llm()
    
    response = llm.invoke("Say hello like a friendly AI teacher")

    return {
        "response": response.content
    }