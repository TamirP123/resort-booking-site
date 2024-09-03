import React from 'react';
import { Box, Grid, IconButton, Typography, Container, Paper } from '@mui/material';
import { LinkedIn, GitHub, Instagram, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', py: 6, color: '#c1a362' }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, bgcolor: '#2a2a2a', borderRadius: 2 }}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <IconButton href="https://www.linkedin.com/in/tamir-phillips-6096922ba" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" sx={{ mx: 1, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)' } }}>
              <LinkedIn sx={{ color: '#0077B5', fontSize: 40, filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }} />
            </IconButton>
            <IconButton href="https://github.com/TamirP123" target="_blank" rel="noopener noreferrer" aria-label="GitHub" sx={{ mx: 1, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)' } }}>
              <GitHub sx={{ color: '#f5f5f5', fontSize: 40, filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }} />
            </IconButton>
            <IconButton href="https://www.instagram.com/tamir" target="_blank" rel="noopener noreferrer" aria-label="Instagram" sx={{ mx: 1, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)' } }}>
              <Instagram sx={{ color: '#E1306C', fontSize: 40, filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }} />
            </IconButton>
            <IconButton href="https://twitter.com/tamir" target="_blank" rel="noopener noreferrer" aria-label="Twitter" sx={{ mx: 1, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.2)' } }}>
              <Twitter sx={{ color: '#1DA1F2', fontSize: 40, filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }} />
            </IconButton>
          </Box>

          <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
            {['About', 'Need Help?', 'Content Guide', 'Store', 'Privacy', 'Terms of Use', 'Advertising', 'Jobs'].map((item) => (
              <Grid item key={item}>
                <Typography variant="body2" sx={{ color: '#c1a362', cursor: 'pointer', transition: 'color 0.3s', '&:hover': { color: '#ffffff' } }}>
                  {item}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body1" sx={{ color: '#ffffff', mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            More from our network
          </Typography>
          <Typography variant="body2" sx={{ color: '#c1a362', mb: 3, textAlign: 'center' }}>
            Services • Hotels • Resorts • Spas • Restaurants • Bars • Events • Activities • Travel • Destinations 
          </Typography>
          <Typography variant="body2" sx={{ color: '#888888', textAlign: 'center' }}>
            © 2024 Harmonia Oasis Inc. All rights reserved.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Footer;
