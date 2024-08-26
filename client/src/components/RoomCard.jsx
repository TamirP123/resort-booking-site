import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
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

// Function to generate a random number between 1 and 9
const getRandomRoomsLeft = () => Math.floor(Math.random() * 9) + 1;

const RoomCard = ({ room, handleBookNow }) => {
  const amenityIcons = {
    Wifi: <WifiIcon />,
    'Smoke Free': <SmokeFreeIcon />,
    'Free Parking': <LocalParkingIcon />,
    Kitchen: <KitchenIcon />,
    Tv: <TvIcon />,
    'Fitness Center': <FitnessCenterIcon />,
    'Pool Access': <PoolIcon/>,
    'Room Service': <RoomServiceIcon/>,
    'Bar Access': <SportsBarIcon/>,
    'Free Breakfast': <RestaurantIcon/>
  };

  const roomsLeft = getRandomRoomsLeft(); // Get the number of rooms left

  // Determine the color based on the number of rooms left
  const roomsLeftColor = roomsLeft <= 3 ? 'red' : 'rgb(193, 163, 98)'

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
      </Box>
      <Box sx={{ p: 2, background: 'linear-gradient(135deg, rgba(248, 244, 115, 1.0), rgba(227, 181, 41, 1.0))' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Eagle Lake' }}>{room.name}</Typography>
        <Typography variant="body4" color="textSecondary" sx={{ fontFamily: 'Eagle Lake' }}>
          {room.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          {room.amenities.map((amenity, index) => (
            <Box
              key={index}
              className='amenitybox'
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
        <Button 
          variant="contained" 
          sx={{ mt: 2, backgroundColor: 'white', color: 'rgb(193, 163, 98)' }} 
          onClick={() => handleBookNow(room)}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default RoomCard;
