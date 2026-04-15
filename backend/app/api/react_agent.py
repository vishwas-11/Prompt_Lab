from fastapi import APIRouter
from pydantic import BaseModel
from app.core.agent import create_agent

router = APIRouter(prefix="/agent", tags=["LangChain Agent"])


class AgentRequest(BaseModel):
    input: str


@router.post("/run")
async def run_agent(request: AgentRequest):
    agent = create_agent()  # create fresh agent per request

    try:
        response = agent.invoke({
            "input": request.input
        })

        return {
            "input": request.input,
            "output": response["output"]
        }

    except Exception as e:
        return {
            "error": str(e)
        }