from typing import Any

from langchain.agents import create_agent as create_langchain_agent
from langchain_openai import ChatOpenAI

from app.core.agent_tools import calculator, lookup, search


SYSTEM_PROMPT = "You are a helpful AI agent that can use tools."


class AgentRunner:
    """Small compatibility wrapper around LangChain's graph-based agent API."""

    def __init__(self) -> None:
        llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
        self._agent = create_langchain_agent(
            model=llm,
            tools=[calculator, search, lookup],
            system_prompt=SYSTEM_PROMPT,
        )

    def invoke(self, payload: dict[str, Any]) -> dict[str, str]:
        user_input = str(payload.get("input", "")).strip()
        result = self._agent.invoke(
            {"messages": [{"role": "user", "content": user_input}]}
        )
        messages = result.get("messages", [])

        for message in reversed(messages):
            content = getattr(message, "content", "")
            if isinstance(content, str) and content.strip():
                return {"output": content}

        return {"output": ""}


def create_agent() -> AgentRunner:
    return AgentRunner()
