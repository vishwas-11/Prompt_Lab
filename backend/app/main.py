import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import react, test, roles, cot, self_consistency, tot, optimize, versioning, injection, auth


app = FastAPI(title="Prompt Engineering Lab")


def _csv_env(name: str) -> list[str]:
    value = os.getenv(name, "")
    return [item.strip() for item in value.split(",") if item.strip()]


def _normalize_origin(origin: str) -> str:
    normalized = origin.strip().rstrip("/")
    if not normalized:
        return ""
    if normalized.startswith(("http://", "https://")):
        return normalized
    if normalized.startswith("localhost") or normalized.startswith("127.0.0.1"):
        return f"http://{normalized}"
    return f"https://{normalized}"


def get_allowed_origins() -> list[str]:
    configured_origins = [_normalize_origin(origin) for origin in _csv_env("CORS_ALLOWED_ORIGINS")]
    configured_origins = [origin for origin in configured_origins if origin]
    if configured_origins:
        return configured_origins

    fallback_origins = [
        _normalize_origin(os.getenv("FRONTEND_URL", "")),
        _normalize_origin(os.getenv("VERCEL_URL", "")),
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    return [origin for origin in fallback_origins if origin]


app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(test.router)
app.include_router(roles.router)
app.include_router(self_consistency.router)
app.include_router(cot.router)
app.include_router(react.router)
app.include_router(tot.router)
app.include_router(injection.router)
app.include_router(optimize.router)
app.include_router(versioning.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Backend is running......"}
