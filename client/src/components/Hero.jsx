import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import '../styles/Hero.css'; 
import HeroVideo from '../assets/Herovideo.mp4'; 

const Hero = () => {
  const [arrivalDate, setArrivalDate] = React.useState(null);
  const [departureDate, setDepartureDate] = React.useState(null);
  const navigate = useNavigate();
  const currentDate = dayjs();

  // Check if both dates are selected
  const isBookNowEnabled = arrivalDate && departureDate;

  const handleAvailability = () => {
    if (isBookNowEnabled) {
      navigate('/availability', {
        state: {
          arrivalDate: arrivalDate.format('MM/DD/YYYY'),
          departureDate: departureDate.format('MM/DD/YYYY'),
        },
      });
    }
  };

  return (
    <Box
      id="hero"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        position: 'relative',
        textAlign: 'center',
        padding: 2,
        overflow: 'hidden', 
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, 
        }}
      >
        <source src={HeroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <Box className="hero-overlay" />

      {/* Hero Content */}
      <Box 
        className="hero-content" 
        sx={{ 
          position: 'relative', 
          width: '100%', 
          px: 2, 
          mt: 10, 
        }}
      >
        {/* Logo at the top */}
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '2rem', md: '3rem' }, 
            fontFamily: 'Eagle Lake', 
            mt: 3, 
            textAlign: 'center',
            background: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);', // Gold gradient
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Harmonia Oasis Resorts
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              fontSize: { xs: '1.2rem', md: '1.8rem' }, 
              fontFamily: 'Eagle Lake', 
              mt: 2, 
            }}
          >
            Discover Your Perfect Escape.
          </Typography>
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
            mt: 43, 
            px: 4,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Arrival Date"
              value={arrivalDate}
              onChange={(newValue) => setArrivalDate(newValue)}
              minDate={currentDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="custom-textfield"
                />
              )}
            />
            <DatePicker
              label="Departure Date"
              value={departureDate}
              onChange={(newValue) => setDepartureDate(newValue)}
              minDate={arrivalDate || currentDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="custom-textfield"
                />
              )}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            onClick={handleAvailability}
            disabled={!isBookNowEnabled}
            sx={{
              backgroundColor: isBookNowEnabled ? 'primary' : 'grey',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '25px',
              '&:hover': {
                backgroundColor: isBookNowEnabled ? 'darkblue' : 'grey',
              },
              mt: { xs: 2, sm: 0 },
            }}
          >
            View Availability
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
