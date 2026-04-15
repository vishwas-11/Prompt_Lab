from fastapi import FastAPI
from app.api import test,roles,cot

app = FastAPI(title="Prompt Engineering Lab")

app.include_router(test.router)
app.include_router(roles.router)
app.include_router(cot.router)

@app.get("/")
def root():
    return {"message": "Backend is running......"}