import React from 'react';
import { Box, Typography } from '@mui/material';
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

const AmenitiesList = ({ amenities }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2, justifyContent: 'center' }}>
      {amenities.map((amenity, index) => (
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
  );
};

export default AmenitiesList;
