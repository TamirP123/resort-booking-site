// Availability.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ROOMS } from '../utils/queries';
import { Typography, Box, TextField } from '@mui/material';
import dayjs from 'dayjs';
import RoomCard from '../components/RoomCard';
import FilterForm from '../components/FilterForm';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../styles/Availability.css';

const Availability = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { state } = useLocation();
    const initialArrivalDate = state?.arrivalDate ? dayjs(state.arrivalDate) : dayjs(); 
    const initialDepartureDate = state?.departureDate ? dayjs(state.departureDate) : dayjs().add(1, 'day'); 
    const [arrivalDate, setArrivalDate] = React.useState(initialArrivalDate);
    const [departureDate, setDepartureDate] = React.useState(initialDepartureDate);
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
                room
            },
        });
    };

    return (
        <Box id="availability" sx={{ pt: 8 }}>
            {/* Background and Title */}
            <Box 
                sx={{ 
                    position: 'relative', 
                    height: '75vh', 
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/images/background-hero.png)',
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundAttachment: 'fixed', 
                    backgroundRepeat: 'no-repeat', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    color: '#fff',
                    overflow: 'hidden'
                }}
            >
                <Box 
                    sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(5px)'
                    }}
                />
                <Box 
                    sx={{ 
                        position: 'relative',
                        zIndex: 1,
                        textAlign: 'center',
                        animation: 'fadeIn 1.5s ease-out'
                    }}
                >
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 'bold', 
                            color: 'rgb(193, 163, 98)', 
                            fontFamily: 'Eagle Lake',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            mb: 3
                        }}
                    >
                        Available Rooms
                    </Typography>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            fontWeight: 'bold', 
                            mb: 5, 
                            fontFamily: 'Eagle Lake', 
                            color: '#fff',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}
                    >
                        Choose your date to escape.
                    </Typography>

                    <Box 
                        sx={{ 
                            display: 'flex', 
                            gap: 2, 
                            mb: 4, 
                            justifyContent: 'center', 
                            width: '100%', 
                            maxWidth: 600, 
                            padding: 2, 
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Arrival Date"
                                value={arrivalDate}
                                onChange={(newValue) => setArrivalDate(newValue)}
                                minDate={dayjs()}
                                renderInput={(params) => (
                                    <TextField {...params} sx={{ minWidth: 200, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }} />
                                )}
                            />
                            <DatePicker
                                label="Departure Date"
                                value={departureDate}
                                onChange={(newValue) => setDepartureDate(newValue)}
                                minDate={arrivalDate || dayjs()}
                                renderInput={(params) => (
                                    <TextField {...params} sx={{ minWidth: 200, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }} />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Box>

            {/* Filter and Room Cards */}
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {filteredRooms.map((room) => (
                            <RoomCard
                                key={room._id}
                                room={room}
                                arrivalDate={arrivalDate} // Pass arrivalDate
                                departureDate={departureDate} // Pass departureDate
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
