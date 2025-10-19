import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <Container component="main" maxWidth="md">
    <Box
      sx={{
        py: 8,
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom color="primary">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Go to Home
      </Button>
    </Box>
  </Container>
);

export default NotFoundPage;
