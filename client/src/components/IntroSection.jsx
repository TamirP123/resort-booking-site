import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../assets/logo.png';

const IntroSection = () => {

  return (
    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#E6E4E4' }}>
      <img 
        src={logo} 
        alt="Resort Logo" 
        style={{ 
          width: '175px', 
          display: 'block', 
          margin: '0 auto',
          paddingBottom: '25px',
        }} 
      />
      <Typography 
        variant="body1" 
        sx={{ 
          mt: -5,
          mb: 4,
          color: 'rgba(60, 57, 57, 0.841)',
          fontFamily: 'Inknut Antiqua' 
        }}
      >
        Welcome to Harmonia Oasis Resorts
      </Typography>
      <Typography variant="h3" sx={{ mb: 2, fontFamily: 'Inknut Antiqua' }}>
      Discover Your Perfect Escape
      </Typography>
      <Typography variant="h5" sx={{ mb: 5, fontFamily: 'Inknut Antiqua' }}>
        Discover an amazing resort where luxury meets comfort. Enjoy our world-class amenities, breathtaking views, and exceptional service designed to provide you with the ultimate relaxation and unforgettable experience.
      </Typography>
    </Box>
  );
};

export default IntroSection;
