const { createServer } = require('node:http');
const {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNodeHttpEndpoint,
  LangGraphHttpAgent,
} = require('@copilotkit/runtime');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

const serviceAdapter = new ExperimentalEmptyAdapter();

const runtime = new CopilotRuntime({
  agents: {
    'assistant-chatbot': new LangGraphHttpAgent({
      url: process.env.CHATBOT_AGENT_URL,
    }),
  },
});

const handler = copilotRuntimeNodeHttpEndpoint({
  endpoint: '/copilotkit',
  runtime,
  serviceAdapter,
});

const server = createServer(async (req, res) => {
  try {
    // Only handle CopilotKit endpoint
    if (req.url.startsWith('/copilotkit')) {
      await handler(req, res);
    } else if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', message: 'Server running 🚀' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  } catch (err) {
    console.error('❌ Error handling request:', err);

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: 'Internal Server Error',
        message: err.message,
      })
    );
  }
});

// --- Error Handling Middleware ---
server.on('error', (err) => {
  console.error('💥 Server error:', err);
  process.exit(1);
});

// --- Graceful Shutdown ---
process.on('SIGTERM', () => {
  console.log('🧹 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

server.listen(PORT, () => {
  console.log('Listening at port 4000');
});
