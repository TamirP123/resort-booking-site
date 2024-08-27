import React, { useState } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CloseIcon from '@mui/icons-material/Close';
import WifiIcon from '@mui/icons-material/Wifi';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TvIcon from '@mui/icons-material/Tv';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ClockNotification from './ClockNotification'; 

const BookingModal = ({ open, onClose, room, isLoggedIn }) => {
  const [notification, setNotification] = useState(null);

  const amenityIcons = {
    Wifi: <WifiIcon />,
    'Smoke Free': <SmokeFreeIcon />,
    'Free Parking': <LocalParkingIcon />,
    Kitchen: <KitchenIcon />,
    Tv: <TvIcon />,
    'Fitness Center': <FitnessCenterIcon />,
    'Pool Access': <PoolIcon />,
    'Room Service': <RoomServiceIcon />,
    'Bar Access': <SportsBarIcon />,
    'Free Breakfast': <RestaurantIcon />
  };

  const handleReserve = () => {
    if (!isLoggedIn) {
      
      setNotification({ type: 'error', message: 'You must be logged in to reserve a room.' });
    } else {
      
      setNotification({ type: 'success', message: 'Room reserved successfully!' });
    }
  };

  return (
    <>
      {/* Notification component */}
      {notification && (
        <ClockNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)} // Reset notification when closed
        />
      )}

      <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: 'relative',
          overflow: 'auto'
        }}>
          {/* Header with Exit Icon and Title */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2 
          }}>
            <IconButton onClick={onClose} sx={{ color: 'blue' }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Room Information
            </Typography>
          </Box>

          {/* Carousel */}
          <Carousel
            showThumbs={false}
            showArrows
            infiniteLoop
            useKeyboardArrows
          >
            {room.displayImages.map((image, index) => (
              <Box key={index} sx={{ height: '400px' }}>
                <img src={image} alt={`Room Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Carousel>

          {/* Room Name */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
            {room.name}
          </Typography>

          {/* Room Type */}
          <Typography variant="body2" color="textSecondary">
            {room.type}
          </Typography>

          {/* Room Description */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            {room.description}
          </Typography>

          {/* Amenities */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2, justifyContent: 'center' }}>
            {room.amenities.map((amenity, index) => (
              <Box
                className='amenitybox'
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  gap: 1,
                  backgroundColor: '#f5f5f5'
                }}
              >
                {amenityIcons[amenity] || <HelpOutlineIcon />}
                <Typography variant="body2">{amenity}</Typography>
              </Box>
            ))}
          </Box>

          {/* Pricing and Reserve Button */}
          <Box sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            mt: 2,
            p: 2,
            bgcolor: '#f5f5f5',
            position: 'relative',
            minHeight: '150px'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Room Options
            </Typography>
            <Typography variant="body2" sx={{ color: 'green' }}>
              Fully refundable
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              ${room.cost} /night
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total cost: ${room.cost * 2} 
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              onClick={handleReserve}
            >
              Reserve
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BookingModal;
