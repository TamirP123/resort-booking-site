import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ROOMS } from "../utils/queries";
import "../styles/RoomsGrid.css";

const RoomsGrid = () => {
  const { loading, error, data } = useQuery(QUERY_ROOMS);
  const roomRefs = useRef([]);

  useEffect(() => {
    if (data && data.rooms) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0)";
              }, index * 200);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
      );

      roomRefs.current.forEach((room) => {
        if (room) observer.observe(room);
      });

      return () => {
        roomRefs.current.forEach((room) => {
          if (room) observer.unobserve(room);
        });
      };
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const rooms = data?.rooms || [];

  return (
    <Box className="rooms-grid-container">
      {rooms.map((room, index) => (
        <Box
          key={room._id}
          className="room-card"
          ref={(el) => (roomRefs.current[index] = el)}
          sx={{
            opacity: 0,
            transform: `translateX(${index % 2 === 0 ? "100px" : "-100px"})`,
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <img src={room.image} alt={room.name} className="main-image" />
          <Box className="room-details">
            <Box className="room-text">
              <Typography
                variant="h3"
                className="room-title"
                sx={{ fontFamily: "Nunito" }}
              >
                {room.name}
              </Typography>
              <Typography
                variant="h6"
                className="room-description"
                sx={{ fontFamily: "Nunito" }}
              >
                {room.description}
              </Typography>
            </Box>
            <Box className="room-actions" sx={{ mt: 2 }}>
              <Link to={`/availability`} className="more-details">
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
