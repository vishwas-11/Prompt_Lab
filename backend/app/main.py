from fastapi import FastAPI
from app.api import react, test, roles, cot, self_consistency
from app.api import react_agent, react, tot

app = FastAPI(title="Prompt Engineering Lab")

app.include_router(test.router)
app.include_router(roles.router)
app.include_router(self_consistency.router)
app.include_router(cot.router)
# app.include_router(react_agent.router)
app.include_router(react.router)
app.include_router(tot.router)

@app.get("/")
def root():
    return {"message": "Backend is running......"}