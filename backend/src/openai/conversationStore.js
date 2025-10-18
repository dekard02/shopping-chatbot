const LRU = require("lru-cache");

const cache = new LRU.LRUCache({
  max: Number(process.env.MAX_CONVERSATION_CACHE) || 100, // Max 100 conversations in memory
  ttl: Number(process.env.CONVERSATION_TTL) || 1000 * 60 * 60, // 1 hour TTL per conversation
});

// Number of recent messages to keep per conversation
const CONTEXT_WINDOW_SIZE = Number(process.env.CONTEXT_WINDOW_SIZE) || 10;

function getConversation(conversationId) {
  return cache.get(conversationId) || [];
}

function setConversation(conversationId, messages) {
  const trimmedMessages = messages.slice(-CONTEXT_WINDOW_SIZE);
  cache.set(conversationId, trimmedMessages);
}

module.exports = {
  getConversation,
  setConversation,
};
