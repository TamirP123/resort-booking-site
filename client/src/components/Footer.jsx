import React from 'react';
import { Box, Grid, IconButton, Typography, Container } from '@mui/material';
import { LinkedIn, GitHub, Instagram, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f2f2f2', py: 4, color: '#DAA520' }}>

      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 3 }}>
          <IconButton href="#" aria-label="LinkedIn">
            <LinkedIn sx={{ color: 'black', fontSize: 30 }} />
          </IconButton>
          <IconButton href="#" aria-label="GitHub">
            <GitHub sx={{ color: 'black', fontSize: 30 }} />
          </IconButton>
          <IconButton href="#" aria-label="Instagram">
            <Instagram sx={{ color: 'black', fontSize: 30 }} />
          </IconButton>
          <IconButton href="#" aria-label="Twitter">
            <Twitter sx={{ color: 'lightblue', fontSize: 30 }} />
          </IconButton>
        </Box>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#DAA520' }}>About</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#DAA520' }}>Need Help?</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#DAA520' }}>Content Guide</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#DAA520' }}>Store</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#DAA520' }}>Privacy</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#DAA520' }}>Terms of Use</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#DAA520' }}>Advertising</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ color: '#DAA520' }}>Jobs</Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ color: 'black', mb: 1 }}>
          More from our network
        </Typography>
        <Typography variant="body2" sx={{ color: '#DAA520', mb: 2 }}>
          Services, Hotels, Resorts, Spas, Restaurants, Bars, Events, Activities, Travel, Destinations 
        </Typography>
        <Typography variant="body2" sx={{ color: '#DAA520' }}>
          © 2024 Harmonia Oasis Inc.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
