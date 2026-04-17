import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from jose import jwt
from jose.exceptions import JWTError

load_dotenv()

_RAW_SECRET_KEY = os.getenv("SECRET_KEY", "")
SECRET_KEY = _RAW_SECRET_KEY.strip().strip('"').strip("'") or "prompt_lab_fallback_secret"
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
    configured = os.getenv("COOKIE_SAMESITE")
    if configured:
        return configured.lower()

    # Cross-origin frontend/backend deployments need SameSite=None so the
    # browser will attach the auth cookie on XHR/fetch requests.
    if get_cookie_secure():
        return "none"

    return "lax"

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(hours=TOKEN_TTL_HOURS)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    # Accept legacy tokens signed with quoted env values during secret cleanup.
    candidates = [
        SECRET_KEY,
        _RAW_SECRET_KEY.strip(),
        _RAW_SECRET_KEY.strip().strip('"'),
        _RAW_SECRET_KEY.strip().strip("'"),
    ]
    seen: set[str] = set()
    last_error: JWTError | None = None

    for key in candidates:
        if not key or key in seen:
            continue
        seen.add(key)
        try:
            return jwt.decode(token, key, algorithms=[ALGORITHM])
        except JWTError as err:
            last_error = err

    if last_error is not None:
        raise last_error
    raise JWTError("Invalid token")
