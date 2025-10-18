const { status } = require("http-status");
const ApiError = require("../errors/ApiError");

const catchAsync = require("../errors/catchAsync");
const { handleChat } = require("../services/chat.service");

module.exports.handleChat = catchAsync(async (req, res) => {
  const conversationId = req.params.conversationId;
  const { message } = req.body;

  const response = await handleChat(conversationId, message);

  return res.json({
    status: status.OK,
    success: true,
    conversationId: conversationId,
    response: response,
  });
});
