import React from 'react';
import Hero from "../components/Hero";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IntroSection from "../components/IntroSection";
import RoomsGrid from "../components/RoomsGrid";
import Banner from "../components/Banner";
import TestimonialsSlider from "../components/TestimonialsSlider";

const Homepage = () => {
  return (
    <Box>
      <Hero />
      <IntroSection />
      <Box id="features" sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 2,
            color: "rgb(193, 163, 98)",
            fontFamily: "Eagle Lake",
          }}
        >
          Rooms
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", mb: 5, fontFamily: 'Nunito' }}
        >
          View Our Available Rooms
        </Typography>
        <RoomsGrid />
      </Box>
      <Banner />
      <TestimonialsSlider />
    </Box>
  );
};

export default Homepage;
