import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to ThunderWolf Store
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your one-stop shop for everything you need, powered by AI.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/products"
        >
          Shop Now
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
