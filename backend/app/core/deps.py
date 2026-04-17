from fastapi import Header, HTTPException
from app.core.security import verify_token

async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "Missing token")

    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer" or not parts[1]:
        raise HTTPException(401, "Invalid authorization header")

    token = parts[1]

    try:
        payload = verify_token(token)
        return payload["user_id"]
    except:
        raise HTTPException(401, "Invalid token")
