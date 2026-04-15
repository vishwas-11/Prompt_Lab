from fastapi import APIRouter
from app.schemas.injection_schema import InjectionRequest
from app.core.injection_guard import detect_injection
from app.utils.sanitizer import sanitize_input
from app.core.llm import get_llm

router = APIRouter(prefix="/security", tags=["Prompt Injection"])


@router.post("/check")
async def check_injection(request: InjectionRequest):
    llm = get_llm()

    is_attack, pattern = detect_injection(request.input)

    if is_attack:
        sanitized = sanitize_input(request.input)

        response = llm.invoke(sanitized)

        return {
            "status": "blocked_or_sanitized",
            "detected_pattern": pattern,
            "original_input": request.input,
            "sanitized_input": sanitized,
            "llm_response": response.content
        }

    # Safe input
    response = llm.invoke(request.input)

    return {
        "status": "safe",
        "input": request.input,
        "llm_response": response.content
    }