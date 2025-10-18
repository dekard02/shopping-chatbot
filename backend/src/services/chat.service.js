const {
  setConversation,
  getConversation,
} = require("../openai/conversationStore");
const openai = require("../openai/openai");
const { SYSTEM_PROMPT } = require("../openai/prompt");
const { toolDefinitions, toolHandlers } = require("../openai/tools-defs");

const systemMessage = {
  role: "system",
  content: SYSTEM_PROMPT,
};

exports.handleChat = async (conversationId, message) => {
  const conversation = getConversation(conversationId) || [];
  const userMessage = {
    role: "user",
    content: message,
  };

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [systemMessage, ...conversation, userMessage],
    tool_choice: "auto",
    tools: toolDefinitions,
  });
  conversation.push(userMessage);

  const assistantMessage = response.choices[0].message;

  if (assistantMessage.tool_calls) {
    return handleToolCalling(conversationId, conversation, assistantMessage);
  }

  // no tool calls, return normal message content
  conversation.push(userMessage, assistantMessage);
  setConversation(conversationId, conversation);

  return assistantMessage.content;
};

const handleToolCalling = async (
  conversationId,
  conversation,
  assistantMessage
) => {
  const toolName = assistantMessage.tool_calls[0].function.name;
  const toolArguments = JSON.parse(
    assistantMessage.tool_calls[0].function.arguments || "{}"
  );

  console.info(`🔧 Calling function: ${toolName} with args:`, toolArguments);

  const toolResult = await toolHandlers[toolName](toolArguments.colors);

  conversation.push(assistantMessage);

  // Add function response message
  conversation.push({
    role: "tool",
    tool_call_id: assistantMessage.tool_calls[0].id,
    content: JSON.stringify(toolResult),
  });

  console.log(JSON.stringify(conversation));

  // Get final response after tool call
  const finalResponse = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [systemMessage, ...conversation],
    tools: toolDefinitions,
  });

  const finalMessage = finalResponse.choices[0].message;

  conversation.push(finalMessage);
  setConversation(conversationId, conversation);
  return finalMessage.content;
};
