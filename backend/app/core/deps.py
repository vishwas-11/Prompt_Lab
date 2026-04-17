from fastapi import Cookie, Header, HTTPException
from jwt import ExpiredSignatureError, InvalidTokenError
from app.core.security import AUTH_COOKIE_NAME, verify_token

async def get_current_user(
    authorization: str = Header(None),
    auth_cookie: str | None = Cookie(None, alias=AUTH_COOKIE_NAME),
):
    token = None

    if auth_cookie:
        token = auth_cookie
    elif authorization:
        parts = authorization.split()
        if len(parts) != 2 or parts[0].lower() != "bearer" or not parts[1]:
            raise HTTPException(401, "Invalid authorization header")
        token = parts[1]

    if not token:
        raise HTTPException(401, "Missing token")

    try:
        payload = verify_token(token)
        return payload["user_id"]
    except ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except InvalidTokenError:
        raise HTTPException(401, "Invalid token")
    except KeyError:
        raise HTTPException(401, "Invalid token")
