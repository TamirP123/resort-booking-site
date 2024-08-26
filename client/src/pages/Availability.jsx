import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ROOMS } from '../utils/queries';
import { Typography, Box, TextField } from '@mui/material';
import dayjs from 'dayjs';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';
import FilterForm from '../components/FilterForm';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../styles/Availability.css'; 

const Availability = () => {

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [arrivalDate, setArrivalDate] = React.useState(dayjs(state?.arrivalDate || null));
  const [departureDate, setDepartureDate] = React.useState(dayjs(state?.departureDate || null));
  const [bedrooms, setBedrooms] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('Recommended');
  const { loading, error, data } = useQuery(QUERY_ROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const rooms = data.rooms;
  const filteredRooms = rooms
    .filter((room) => {
      return (!bedrooms || room.bedrooms === parseInt(bedrooms, 10)) &&
             (!bathrooms || room.bathrooms === parseInt(bathrooms, 10));
    })
    .sort((a, b) => {
      if (sortOrder === 'Price low to high') return a.cost - b.cost;
      if (sortOrder === 'Price high to low') return b.cost - a.cost;
      return 0;
    });

  const handleBookNow = (room) => {
    const totalCost = room.cost * (departureDate.diff(arrivalDate, 'day'));
    navigate('/transaction', {
      state: {
        arrivalDate: arrivalDate.format('MM/DD/YYYY'),
        departureDate: departureDate.format('MM/DD/YYYY'),
        totalCost,
        roomType: room.name,
      },
    });
  };

  return (
    <Box id="availability" sx={{ pt: 8 }}>
      <Navbar />
      <Box sx={{ 
        padding: 2,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 2
      }}>
        <Typography variant="h5" gutterBottom>
          Select Your Dates
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          mb: 4,
          justifyContent: 'center',
          width: '100%',
          maxWidth: 600
        }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Arrival Date"
              value={arrivalDate}
              onChange={(newValue) => setArrivalDate(newValue)}
              minDate={dayjs()}
              renderInput={(params) => (
                <TextField {...params} sx={{ minWidth: 200 }} />
              )}
            />
            <DatePicker
              label="Departure Date"
              value={departureDate}
              onChange={(newValue) => setDepartureDate(newValue)}
              minDate={arrivalDate || dayjs()}
              renderInput={(params) => (
                <TextField {...params} sx={{ minWidth: 200 }} />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', padding: 4 }}>
        <FilterForm
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          sortOrder={sortOrder}
          setBedrooms={setBedrooms}
          setBathrooms={setBathrooms}
          setSortOrder={setSortOrder}
        />
        <Box sx={{ flex: 1, padding: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'rgb(193, 163, 98)' }}>
            Available Rooms
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {filteredRooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
                handleBookNow={handleBookNow}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Availability;
