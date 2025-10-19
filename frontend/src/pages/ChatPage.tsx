import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import Chatbot from '../components/chatbot/Chatbot';
import { ChatMode } from '../models/type';

const ChatPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ height: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Chat with our AI Assistant
      </Typography>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          display: 'flex',
          minHeight: '400px'
        }}
      >
        <Chatbot mode={ChatMode.Full} />
      </Paper>
    </Container>
  );
};

export default ChatPage;
