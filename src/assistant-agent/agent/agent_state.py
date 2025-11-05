
from copilotkit import CopilotKitState

class AgentState(CopilotKitState):
    original_user_message: str = ""
    products: list = []
    process_steps: list = []
    filter_spec: dict = {}