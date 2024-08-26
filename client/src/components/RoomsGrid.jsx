import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_ROOMS } from '../utils/queries';
import '../styles/RoomsGrid.css';

const RoomsGrid = () => {
  const { loading, error, data } = useQuery(QUERY_ROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const rooms = data.rooms;

  return (
    <Box className="rooms-grid-container">
      {rooms.map((room) => (
        <Box key={room._id} className="room-card">
          <img src={room.image} alt={room.name} className="main-image" />
          <Box className="room-details">
            <Box className="room-text">
              <Typography variant="h3" className="room-title" sx={{fontFamily: 'Nunito'}}>
                {room.name}
              </Typography>
              <Typography variant="h6" className="room-description" sx={{fontFamily: 'Nunito'}}>
                {room.description}
              </Typography>
            </Box>
            <Box className="room-actions" sx={{mt: 2}}>
              
              <Link to={`/availability`} className="more-details" >
                Check Availability →
              </Link>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RoomsGrid;
