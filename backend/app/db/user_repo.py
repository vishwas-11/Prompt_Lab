from app.db.mongo import db
from bson import ObjectId

collection = db["users"]

async def create_user(email: str, password: str):
    user = {"email": email, "password": password}
    result = await collection.insert_one(user)
    user["_id"] = str(result.inserted_id)
    return user

async def get_user_by_email(email: str):
    return await collection.find_one({"email": email})