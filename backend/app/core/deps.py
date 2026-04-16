from fastapi import Header, HTTPException
from app.core.security import verify_token

async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "Missing token")

    token = authorization.split(" ")[1]

    try:
        payload = verify_token(token)
        return payload["user_id"]
    except:
        raise HTTPException(401, "Invalid token")