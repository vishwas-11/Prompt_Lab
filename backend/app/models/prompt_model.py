from datetime import datetime

def prompt_document(name: str, content: str, version: int):
    return {
        "name": name,
        "content": content,
        "version": version,
        "created_at": datetime.utcnow()
    }