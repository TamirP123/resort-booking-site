import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import BookingModal from './BookingModal'; 
import HotelIcon from '@mui/icons-material/Hotel'; 
import BathtubIcon from '@mui/icons-material/Bathtub'; 
import ClockNotification from './ClockNotification';

const getRandomRoomsLeft = () => Math.floor(Math.random() * 9) + 1;

const RoomCard = ({ room, arrivalDate, departureDate, handleBookNow }) => {
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const roomsLeft = getRandomRoomsLeft();
  const roomsLeftColor = roomsLeft <= 3 ? 'red' : 'rgb(193, 163, 98)';

  const handleBook = () => {
    setModalOpen(true);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      borderRadius: '10px', 
      overflow: 'hidden', 
      border: '1px solid #e0e0e0', 
      width: '100%', 
      maxWidth: '800px',
      mx: 'auto',
      boxShadow: 3
    }}>
      <Box sx={{ position: 'relative' }}>
        <img 
          src={room.image} 
          alt={room.name} 
          style={{ width: '100%', height: '500px', objectFit: 'cover' }}
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
          gap: 1
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
            padding: '8px 16px',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HotelIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {room.bedrooms} {room.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BathtubIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {room.bathrooms} {room.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {room.name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
          {room.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBook}
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
