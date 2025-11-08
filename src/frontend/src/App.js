import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './routes/AdminLayout';
import Layout from './routes/Layout';
import NoPage from './pages/NoPage';
import { CopilotKit } from '@copilotkit/react-core';
import '@copilotkit/react-ui/styles.css';

const App = () => {
  return (
    <CopilotKit
      runtimeUrl={process.env.REACT_APP_COPILOT_RUNTIME}
      agent="assistant-chatbot"
      showDevConsole={false}
    >
      <BrowserRouter>
        <Routes>
          <Route index path="/*" element={<Layout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/admin/*/*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </CopilotKit>
  );
};

export default App;
