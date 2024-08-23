import React from 'react';
import { useQuery } from "@apollo/client";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { QUERY_ROOMS } from "../utils/queries";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';


const KingHero = () => {
  const [arrivalDate, setArrivalDate] = React.useState(null);
  const [departureDate, setDepartureDate] = React.useState(null);
  const navigate = useNavigate();

  const currentDate = dayjs();

  const { loading, data } = useQuery(QUERY_ROOMS);
  const rooms = data?.rooms || [];

  // Filter to find king room
  const kingRoom = rooms.find((room) => room.type === "King");

  // Check if both dates are selected
  const isBookNowEnabled = arrivalDate && departureDate;

  const handleBookNow = () => {
    if (isBookNowEnabled) {
      // Calculate the number of days between arrival and departure
      const numDays = departureDate.diff(arrivalDate, 'day');
      const totalCost = numDays * kingRoom.cost;

      navigate('/rooms/transaction', {
        state: {
          arrivalDate: arrivalDate.format('MM/DD/YYYY'),
          departureDate: departureDate.format('MM/DD/YYYY'),
          totalCost,
          roomType: 'King Luxury Suite',
        },
      });
    }
  };

  return (
    <Box
      id="kinghero"
      sx={{
        height: '65vh',
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
      <Box className="kinghero-overlay" />

      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '2rem', md: '3rem' }, 
            fontFamily: 'Inknut Antiqua', 
            color: '#fff', 
            mt: 5 
          }}
        >
          King Luxury Suite
        </Typography>
        <Typography 
          variant="h5" 
          component="p" 
          sx={{ 
            fontSize: { xs: '1rem', md: '1.5rem' }, 
            fontFamily: 'Inknut Antiqua', 
            color: '#fff',
            mt: 1 
          }}
        >
          Find the room for you.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Rating
            name="read-only"
            value={5}
            readOnly
            precision={0.5}
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}
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
          mt: 10, 
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
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  p: 1,
                  borderRadius: 1, 
                }}
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
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  p: 1,
                  borderRadius: 1,
                }}
              />
            )}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleBookNow}
          disabled={!isBookNowEnabled}
          sx={{
            backgroundColor: isBookNowEnabled ? 'blue' : 'grey',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '25px',
            '&:hover': {
              backgroundColor: isBookNowEnabled ? 'darkblue' : 'grey',
            },
            mt: { xs: 2, sm: 0 },
          }}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default KingHero;
