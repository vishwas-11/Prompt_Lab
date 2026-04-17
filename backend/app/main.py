from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import react, test, roles, cot, self_consistency, tot, optimize, versioning, injection, auth


app = FastAPI(title="Prompt Engineering Lab")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://prompt-lab-swart-nine.vercel.app/",
    ],
    allow_credentials=False,
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
