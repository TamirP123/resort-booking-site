import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Calendar from '../components/Calendar'; 
import Rating from '@mui/material/Rating'; 
import '../styles/Hero.css';
import Box from '@mui/material/Box';

const Hero = () => {
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);

  return (
    <Box
      id="hero"
      sx={{
        height: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative',
        textAlign: 'center',
        padding: 2,
        overflow: 'hidden', 
      }}
    >
      <Box className="hero-overlay" />
      <Box className="hero-content" sx={{ position: 'absolute', bottom: 0, width: '100%', px: 2 }}>
        <Box
          sx={{
            mb: 3, 
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontFamily: 'Inknut Antiqua' }}>
            Harmonia Oasis Resorts
          </Typography>
          <Typography variant="h5" component="p" sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, fontFamily: 'Inknut Antiqua', mt: 1 }}>
            Discover Your Perfect Escape.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Rating
              name="read-only"
              value={4.5}
              readOnly
              precision={0.5}
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem' }, 
              }}
            />
          </Box>
        </Box>
        <Box
          component="form"
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' }, 
            width: '100%',
            maxWidth: 800, 
            mx: 'auto',
            mb: 18
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '36%', md:'25%' },
              height: 55,
              color: 'gray',
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: 1,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: 1,
              mb: { xs: 6, sm: 0}, 
            }}
          >
            <Calendar
              selectedStartDate={arrivalDate}
              selectedEndDate={departureDate}
              onSelectStartDate={setArrivalDate}
              onSelectEndDate={setDepartureDate}
            />
          </Box>
          <TextField
            label="Guests"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: '100%', sm: 200 },
              backgroundColor: 'white',
              borderRadius: '4px',
              mb: { xs: 2, sm: 0, }, 
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              borderRadius: '20px', 
              mb: { xs: 2, sm: 0 }, 
              width: { xs: '100%', sm: 'auto' }, 
            }}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
