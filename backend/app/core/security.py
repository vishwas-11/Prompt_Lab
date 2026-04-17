import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from jose import jwt

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
TOKEN_TTL_HOURS = int(os.getenv("TOKEN_TTL_HOURS", "24"))
AUTH_COOKIE_NAME = os.getenv("AUTH_COOKIE_NAME", "auth_token")


def _env_flag(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _app_env() -> str:
    return os.getenv("APP_ENV", os.getenv("ENVIRONMENT", "development")).strip().lower()


def get_cookie_secure() -> bool:
    return _env_flag("COOKIE_SECURE", default=_app_env() not in {"development", "dev", "local"})


def get_cookie_samesite() -> str:
    return os.getenv("COOKIE_SAMESITE", "lax").lower()

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(hours=TOKEN_TTL_HOURS)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
