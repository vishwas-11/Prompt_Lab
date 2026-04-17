from fastapi import APIRouter, Depends, HTTPException, Response
from app.schemas.auth_schema import RegisterRequest, LoginRequest
from app.db.user_repo import create_user, get_user_by_email
from app.core.deps import get_current_user
from app.core.security import (
    AUTH_COOKIE_NAME,
    TOKEN_TTL_HOURS,
    create_token,
    get_cookie_samesite,
    get_cookie_secure,
)
import bcrypt

router = APIRouter(prefix="/auth", tags=["Auth"])


def set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key=AUTH_COOKIE_NAME,
        value=token,
        httponly=True,
        secure=get_cookie_secure(),
        samesite=get_cookie_samesite(),
        max_age=TOKEN_TTL_HOURS * 60 * 60,
        path="/",
    )


def clear_auth_cookie(response: Response):
    response.delete_cookie(
        key=AUTH_COOKIE_NAME,
        httponly=True,
        secure=get_cookie_secure(),
        samesite=get_cookie_samesite(),
        path="/",
    )

def hash_password(password: str):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str):
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


@router.post("/register")
async def register(req: RegisterRequest, response: Response):
    existing = await get_user_by_email(req.email)

    if existing:
        raise HTTPException(409, "User already exists")

    hashed = hash_password(req.password)

    user = await create_user(req.email, hashed)

    token = create_token({"user_id": str(user["_id"])})
    set_auth_cookie(response, token)

    return {"authenticated": True}


@router.post("/login")
async def login(req: LoginRequest, response: Response):
    user = await get_user_by_email(req.email)

    if not user or not verify_password(req.password, user["password"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"user_id": str(user["_id"])})
    set_auth_cookie(response, token)

    return {"authenticated": True}


@router.post("/logout")
async def logout(response: Response):
    clear_auth_cookie(response)
    return {"authenticated": False}


@router.get("/session")
async def get_session(user_id: str = Depends(get_current_user)):
    return {"authenticated": True, "user_id": user_id}
