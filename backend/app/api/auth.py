from fastapi import APIRouter, Depends, HTTPException
from app.schemas.auth_schema import RegisterRequest, LoginRequest
from app.db.user_repo import create_user, get_user_by_email
from app.core.deps import get_current_user
from app.core.security import create_token
import bcrypt

router = APIRouter(prefix="/auth", tags=["Auth"])

def hash_password(password: str):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str):
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


@router.post("/register")
async def register(req: RegisterRequest):
    existing = await get_user_by_email(req.email)

    if existing:
        raise HTTPException(409, "User already exists")

    hashed = hash_password(req.password)

    user = await create_user(req.email, hashed)

    token = create_token({"user_id": str(user["_id"])})

    return {"authenticated": True, "token": token}


@router.post("/login")
async def login(req: LoginRequest):
    user = await get_user_by_email(req.email)

    if not user or not verify_password(req.password, user["password"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"user_id": str(user["_id"])})

    return {"authenticated": True, "token": token}


@router.post("/logout")
async def logout():
    return {"authenticated": False}


@router.get("/session")
async def get_session(user_id: str = Depends(get_current_user)):
    return {"authenticated": True, "user_id": user_id}
