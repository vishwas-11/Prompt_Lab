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

    result = {
        "input": request.input,
        "security": {
            "is_attack": is_attack,
            "detected_pattern": pattern,
            "status": "safe"
        },
        "execution": {
            "sanitized_input": None,
            "llm_response": None
        }
    }

    #  If attack detected
    if is_attack:
        sanitized = sanitize_input(request.input)

        response = llm.invoke(sanitized)

        result["security"]["status"] = "blocked_or_sanitized"
        result["execution"]["sanitized_input"] = sanitized
        result["execution"]["llm_response"] = response.content

        return result

    #  Safe input
    response = llm.invoke(request.input)

    result["execution"]["llm_response"] = response.content

    return result