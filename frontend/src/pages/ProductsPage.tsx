import React from 'react';
import {
  Container, Grid, Card, CardMedia, CardContent, Typography,
  CardActions, Button
} from '@mui/material';

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: 'A brief description of the product goes here. High quality and durable.',
  image: `https://source.unsplash.com/random/400x300?product&sig=${i}`,
}));

const ProductsPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {mockProducts.map((product) => (
          <Grid key={product.id}   size={{ xs: 12, md: 4, lg:3 ,sm:6}} >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;