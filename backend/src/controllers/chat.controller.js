const { status } = require("http-status");
const ApiError = require("../errors/ApiError");
const openai = require("../openai/openai");
const { SYSTEM_PROMPT } = require("../openai/prompt");
const {
  getConversation,
  setConversation,
} = require("../openai/conversationStore");
const catchAsync = require("../errors/catchAsync");

const systemMessage = {
  role: "system",
  content: SYSTEM_PROMPT,
};

module.exports.handleChat = catchAsync(async (req, res) => {
  const conversationId = req.params.conversationId;
  const { message } = req.body;

  const conversation = getConversation(conversationId) || [];
  const userMessage = {
    role: "user",
    content: message,
  };

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [systemMessage, ...conversation, userMessage],
  });

  const assistantMessage = response.choices[0].message;

  conversation.push(userMessage, assistantMessage);
  setConversation(conversationId, conversation);

  return res.json({
    status: status.OK,
    success: true,
    conversationId: conversationId,
    response: assistantMessage.content,
  });
});
