import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@apollo/client';
import { QUERY_ROOMS } from '../utils/queries';
import '../styles/RoomSlider.css';

const RoomsSlider = () => {
  const { loading, error, data } = useQuery(QUERY_ROOMS);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const rooms = data.rooms;
  const isMobile = window.innerWidth <= 768;

  const nextSlide = () => {
    if (currentIndex < rooms.length - (isMobile ? 1 : 3)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Assign unique routes for each room since I wanted to style each page individually.
  const roomRoutes = {
    "King Luxury Suite": "/rooms/king-room",
    "Room 2": "/room-two",
    "Room 3": "/room-three"
  };

  return (
    <Box className="slider-container">
      <IconButton onClick={prevSlide} disabled={currentIndex === 0}>
        <ArrowBackIosIcon />
      </IconButton>

      <Box className="slider-wrapper">
        <Box
          className="slider"
          sx={{
            transform: `translateX(-${currentIndex * (100 / (isMobile ? 1 : 3))}%)`,
            width: `${rooms.length * (100 / (isMobile ? 1 : 3))}%`,
          }}
        >
          {rooms.map((room) => (
            <Box key={room._id} className="slider-card">
              <Typography variant="h6" sx={{ mb: 2 }}>${room.cost}/Night</Typography>
              <Link to={roomRoutes[room.name] || `/room-default`} className="room-link">
                <img src={room.image} alt={room.name} className="slider-image" />
                <Typography variant="h6" sx={{ mt: 2 }}>{room.name}</Typography>
                <Typography variant="body1">{room.description}</Typography>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>

      <IconButton onClick={nextSlide} disabled={currentIndex >= rooms.length - (isMobile ? 1 : 3)}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default RoomsSlider;
