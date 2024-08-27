import React from 'react';
import { useEffect } from 'react';
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
            <Box 
                sx={{ 
                    position: 'relative', 
        height: '70vh', 
        backgroundImage: 'url(https://lh3.googleusercontent.com/fife/ALs6j_FYDF7VYZlb3NRWQ_E50sQDbbnxcLVKp_WPfohQORQpj37h3isctdiH2LowEsBmkzXM4yUEaK_XD-MlZ05arPO6cEg4UIf93K9f5UI2D5FrTmIXcRvCXkRX4-zGcD5Etkp4hNJFR_yEsxbVS02Q6UlEqZ02CO1WFfjFJePuOjJjhD_7z-cFmaWk2T_2w4pnHGdJUO30DYb8qnOb5CFK5P3Zl_tb_iUwVHhzr6HCma4aM6qCv4F9KfeXG5q3j_2gnE-gso1UaerwMaJDie2xvR5pAmxnZSPLv0BwL0NKTwNdfd8fQNQ5W_jwGhv5RjzSZqkH8P4MZb5LFKVOS5dYqRuOCw5_avgR2xry3pszqFnylZwzwx-qlW5DZaIFJ07C1vvQLK_iWkTmNsw0HFm473J81zj-J83aHCw7d5aB9HI55TsOGr0_3ge0McoKcOiKYsyC13tEOmp4T3mtri1CqqeG_e5jSpqKZNMBz2G0POJg2yS08emD8crsgGb-TQZwSHdry-oJJOXdhHYCJ1Es4i4SwnU4uupI4Z2hFdEyRmM8pxCp3QCMJNoB3c4EjIeca0dUX_TI52MK_ke5TxonUKVTSdZFCalNxchuUx4x1Jr0q7VL-A-oT51zEdxhXKCkHVEe_VBwZhjdUYzxWH_1fVpllty4Yf27Czapsf5Mg04dZFytNeQ5cqcj9-hADk45oirnei4TqRYgbGrXGOGunH1Hs8-po7ILuP9u4t2F2sOzEKZpHv97Z8ZnvDa185PRB32VPi4HTloZZagequmoNiiuChiCQwTFYPpNkjfDAm-6Nubw4NwAozJLfZRNErpUqaban5xh1GCczWsPTUU1uVgsznmOKVYX8Q6xKc3wIJKr3SrT1uG_Ow25_6SIBQjfGEl89mul-9WQDOviKEMvdtchGUinS2CcsJqiUCmHqXF9Wik8wYzKpGDe8NPW3Qx-7YWqsHpBBy9R4WwAMN7RlLqrpOk-YEFcV06EOgvq6P7Dc7oW8XXKjJRkDSs4z7_1i86Y6rJeW6kOtupCecnQOO1UDL7GcDQQY8CZkZbUY7msaqZ_E9yy8peSrB9I2K8HGMQUK01dlb8TnEZ2dTjoASe9tfTCTtO76MxU3hwIdWFLjbEgR4kKleKzPnLZTUePTyhIZAkfZB3ObSfAOp09nnfVQYyFRsdHPDpIIkjU0lvS7nye6HtkJQoQ1VDYfJI8RA4mtyZDaZP4K-Wl05kkZd4FAx1v-IY_hFBqVk80yBTqJVZAmwLXeT0ZzL_a9Tmj_hSAhW5mupabKQsKqEyxJ1EIiwdd1WlLrIU0wml4g4vhCKsl1BScbwLcTNHYsABpvoYkCgUmcaYP5FaG4rU2gZ9I1O1IUHSqehXYUsVZQYq_Jc4yOAmmjJnCw0YF_6Fk536VpL_eMVBYgAxOrbqhem6024OYNPWG6tf9hs8MK7We97l8IHMJcJe1ag=s512)', // High-resolution image URL
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', 
        backgroundRepeat: 'no-repeat', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#fff'
                }}
            >
                <Box 
                    sx={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        margin: 2
                    }}
                >
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 'bold', 
                            textAlign: 'left',
                            ml:5,
                            color: 'rgb(193, 163, 98)',
                            fontFamily: 'Eagle Lake' 
                        }}
                    >
                        Available Rooms
                    </Typography>
                </Box>
                <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: 'bold', mb: 5, fontFamily: 'Eagle Lake', color: 'rgb(193, 163, 98)'  }}
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
                        borderRadius: 2
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Arrival Date"
                            value={arrivalDate}
                            onChange={(newValue) => setArrivalDate(newValue)}
                            minDate={dayjs()}
                            renderInput={(params) => (
                                <TextField {...params} sx={{ minWidth: 200, backgroundColor: '#fff', borderRadius: '4px' }} />
                            )}
                        />
                        <DatePicker
                            label="Departure Date"
                            value={departureDate}
                            onChange={(newValue) => setDepartureDate(newValue)}
                            minDate={arrivalDate || dayjs()}
                            renderInput={(params) => (
                                <TextField {...params} sx={{ minWidth: 200, backgroundColor: '#fff', borderRadius: '4px' }} />
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
