import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Chatbot from '../chatbot/Chatbot';
import { ChatMode } from '../../models/type';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const showFloatChat = location.pathname !== '/chat';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
      {showFloatChat && <Chatbot mode={ChatMode.Float} />}
    </Box>
  );
};

export default MainLayout;
