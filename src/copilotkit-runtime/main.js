const { createServer } = require('node:http');
const {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNodeHttpEndpoint,
  LangGraphHttpAgent,
} = require('@copilotkit/runtime');

const serviceAdapter = new ExperimentalEmptyAdapter();

const server = createServer((req, res) => {
  const runtime = new CopilotRuntime({
    agents: {
      'assistant-chatbot': new LangGraphHttpAgent({
        url: 'http://0.0.0.0:8000/assistant-chatbot',
      }),
    },
  });

  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: '/copilotkit',
    runtime,
    serviceAdapter,
  });

  return handler(req, res);
});

server.listen(4000, () => {
  console.log('Listening at http://localhost:4000/copilotkit');
});
