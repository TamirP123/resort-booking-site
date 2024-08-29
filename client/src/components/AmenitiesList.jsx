import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Wifi as WifiIcon,
  SmokeFree as SmokeFreeIcon,
  LocalParking as LocalParkingIcon,
  Kitchen as KitchenIcon,
  Tv as TvIcon,
  FitnessCenter as FitnessCenterIcon,
  Pool as PoolIcon,
  RoomService as RoomServiceIcon,
  SportsBar as SportsBarIcon,
  Restaurant as RestaurantIcon,
  HelpOutline as HelpOutlineIcon
} from '@mui/icons-material';

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

const AmenitiesList = ({ amenities }) => (
  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2, justifyContent: 'center' }}>
    {amenities.map((amenity, index) => (
      <Box
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

export default AmenitiesList;
