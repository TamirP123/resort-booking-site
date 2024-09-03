import React, { useState } from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import BookingModal from './BookingModal'; 
import HotelIcon from '@mui/icons-material/Hotel'; 
import BathtubIcon from '@mui/icons-material/Bathtub'; 
import ClockNotification from './ClockNotification';

const getRandomRoomsLeft = () => Math.floor(Math.random() * 9) + 1;

const RoomCard = ({ room, arrivalDate, departureDate, handleBookNow }) => {
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const roomsLeft = getRandomRoomsLeft();
  const roomsLeftColor = roomsLeft <= 3 ? 'red' : 'rgb(193, 163, 98)';

  const handleBook = () => {
    setModalOpen(true);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      borderRadius: '10px', 
      overflow: 'hidden', 
      border: '1px solid #e0e0e0', 
      width: '100%', 
      maxWidth: { xs: '100%', sm: '800px' },
      mx: 'auto',
      boxShadow: 3
    }}>
      <Box sx={{ position: 'relative' }}>
        <img 
          src={room.image} 
          alt={room.name} 
          style={{ width: '100%', height: isMobile ? '300px' : '500px', objectFit: 'cover' }}
        />
        <Box sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          maxWidth: '100%'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            ${room.cost}
          </Typography>
          <Typography variant="body2">/night</Typography>
          <Typography variant="body2" sx={{ color: roomsLeftColor, fontWeight: 'bold' }}>
            {roomsLeft} rooms left
          </Typography>
        </Box>
        <Box sx={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          width: '100%',
          padding: '0 10px'
        }}>
          <Box sx={{
            display: 'flex',
            gap: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '20px',
            padding: isMobile ? '4px 8px' : '8px 16px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <HotelIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.7rem' : '0.875rem' }}>
                {room.bedrooms} {room.bedrooms === 1 ? 'Bed' : 'Beds'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <BathtubIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.7rem' : '0.875rem' }}>
                {room.bathrooms} {room.bathrooms === 1 ? 'Bath' : 'Baths'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
          {room.name}
        </Typography>
        <Box sx={{ 
          display: isMobile ? (isExpanded ? 'block' : '-webkit-box') : 'block',
          WebkitLineClamp: isMobile && !isExpanded ? 3 : 'none',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          mb: 2, 
          textAlign: 'center',
          width: '100%'
        }}>
          <Typography variant="body2">
            {room.description}
          </Typography>
        </Box>
        {isMobile && (
          <Button onClick={toggleDescription} variant="text" size="small" sx={{ mb: 2 }}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleBook}
          fullWidth
        >
          Book Now
        </Button>
      </Box>
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        room={room}
        arrivalDate={arrivalDate}
        departureDate={departureDate}
        onBook={() => {
          handleBookNow(room);
          setNotification({
            message: 'Booking successful!',
            type: 'success'
          });
          setModalOpen(false);
        }}
      />
      {notification.message && (
        <ClockNotification
          message={notification.message}
          type={notification.type}
        />
      )}
    </Box>
  );
};

export default RoomCard;
