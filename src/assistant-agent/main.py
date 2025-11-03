import os
from fastapi import FastAPI
import uvicorn
from copilotkit import LangGraphAGUIAgent 
from ag_ui_langgraph import add_langgraph_fastapi_endpoint 
from agent.graph import graph

app = FastAPI()
add_langgraph_fastapi_endpoint(
  app=app,
  agent=LangGraphAGUIAgent(
    name="assistant", # the name of your agent defined in langgraph.json
    description="Chatbot trợ lý ảo tại website thương mại điện tử",
    graph=graph, # the graph object from your langgraph import
  ),
  path="/assistant-chatbot", # the endpoint you'd like to serve your agent on
)

# add new route for health check
@app.get("/health")
def health():
    """Health check."""
    return {"status": "ok"}

def main():
    """Run the uvicorn server."""
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
    )

if __name__ == "__main__":
    main()