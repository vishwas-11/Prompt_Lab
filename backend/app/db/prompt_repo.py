from app.db.mongo import db
from app.models.prompt_model import prompt_document

from app.utils.mongo_serializer import serialize_doc, serialize_list

collection = db["prompts"]




async def create_prompt(name: str, content: str):
    existing = await collection.find({"name": name}).sort("version", -1).to_list(1)

    version = 1
    if existing:
        version = existing[0]["version"] + 1

    doc = prompt_document(name, content, version)

    result = await collection.insert_one(doc)

    doc["_id"] = result.inserted_id

    return serialize_doc(doc)


async def get_prompt_versions(name: str):
    prompts = await collection.find({"name": name}).sort("version", 1).to_list(100)
    return serialize_list(prompts)


async def get_latest_prompt(name: str):
    prompt = await collection.find({"name": name}).sort("version", -1).to_list(1)
    return serialize_doc(prompt[0]) if prompt else None