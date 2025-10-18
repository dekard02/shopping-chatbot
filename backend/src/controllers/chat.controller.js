const openai = require("../openai/openai")
const { SYSTEM_PROMPT } = require("../openai/prompt")

const systemMessage = {
  role: "system",
  content: SYSTEM_PROMPT
}
module.exports.handleChat = (req, res) => {
  const response = openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [systemMessage, {}],
    stream: true
  })



}   