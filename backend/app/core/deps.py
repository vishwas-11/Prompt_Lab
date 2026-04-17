from fastapi import Cookie, Header, HTTPException
from jose.exceptions import ExpiredSignatureError, JWTError
from app.core.security import AUTH_COOKIE_NAME, verify_token

async def get_current_user(
    authorization: str = Header(None),
    auth_cookie: str | None = Cookie(None, alias=AUTH_COOKIE_NAME),
):
    token = None

    # Prefer Authorization header first so stale cookies cannot override
    # a freshly issued bearer token from the frontend.
    if authorization:
        parts = authorization.split()
        if len(parts) != 2 or parts[0].lower() != "bearer" or not parts[1]:
            raise HTTPException(401, "Invalid authorization header")
        token = parts[1]
    elif auth_cookie:
        token = auth_cookie

    if not token:
        raise HTTPException(401, "Missing token")

    try:
        payload = verify_token(token)
        return payload["user_id"]
    except ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except JWTError:
        raise HTTPException(401, "Invalid token")
    except KeyError:
        raise HTTPException(401, "Invalid token")
