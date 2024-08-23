import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IntroSection from '../components/IntroSection';
import RoomSlider from '../components/RoomsSlider';

const Homepage = () => {
  return (
    <Box>
      <Navbar />
      <Hero />
      <IntroSection />
      <Box id="features" sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 5 }}>
          Rooms
        </Typography>
        <RoomSlider />
      </Box>
    </Box>
  );
};

export default Homepage;
