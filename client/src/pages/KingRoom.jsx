import { useQuery } from "@apollo/client";
import { useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Navbar from "../components/Navbar";
import KingHero from "../components/KingHero";
import { QUERY_ROOMS } from "../utils/queries";
import Carousel from "react-material-ui-carousel";
import KingBedIcon from "@mui/icons-material/KingBed";
import PoolIcon from "@mui/icons-material/Pool";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WifiIcon from '@mui/icons-material/Wifi';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const KingRoom = () => {

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const { loading, data } = useQuery(QUERY_ROOMS);
  const rooms = data?.rooms || [];

  const kingroom = rooms.find((room) => room.type === "King");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!kingroom) {
    return <div>No King Room available</div>;
  }

  const images = [
    kingroom.image,
    "https://img.freepik.com/premium-photo/light-airy-coastal-kitchen-with-woven-pendant-lights_1081806-901.jpg",
    "https://img.freepik.com/free-photo/tropical-paradise-poolside-resort_1268-31144.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1719187200&semt=ais_user",
    "https://img.freepik.com/free-photo/hotel-pool-with-mosaictiled-bottom-swimup-bar-serving-refreshing-beverages_1268-31141.jpg",
  ];

  const amenities = [
    { icon: <KingBedIcon sx={{ fontSize: 40, color: "#1e88e5" }} />, name: "King Bed" },
    { icon: <PoolIcon sx={{ fontSize: 40, color: "#1e88e5" }} />, name: "Pool Access" },
    { icon: <KitchenIcon sx={{ fontSize: 40, color: "#1e88e5" }} />, name: "Kitchenette" },
    { icon: <RoomServiceIcon sx={{ fontSize: 40, color: "#1e88e5" }} />, name: "Room Service" },
    { icon: <WifiIcon sx={{ fontSize: 40, color: "#1e88e5" }} />, name: "Complimentary Wifi" },
    { icon: <RestaurantIcon sx={{ fontSize: 40, color: "#1e88e5" }} />, name: "Free Breakfast" },
    { icon: <FitnessCenterIcon sx={{ fontSize: 40, color: "#1e88e5" }} />, name: "Fitness Center" },
    { icon: <SelfImprovementIcon sx={{ fontSize: 40, color: "#1e88e5" }} />, name: "Resort Spa" }
  ];

  const propertyPolicies = [
    "Check-in: 2:00 PM",
    "Check-out: 11:00 AM",
    "No refunds for early departure",
    "Cancellation policy: 48 hours notice",
    "No pets allowed",
    "Quiet hours: 10:00 PM - 7:00 AM",
  ];

  const carouselWidth = "900px";
  const carouselHeight = "800px";

  return (
    <Box>
      <Navbar />
      <KingHero />

      {/* Section with Amenities and Property Policies */}
      <Box
        sx={{
          mt: 8,
          px: 3,
          py: 5,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "85%",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Grid container spacing={4}>
          {/* Amenities */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Amenities
            </Typography>
            <Grid container spacing={2}>
              {amenities.map((amenity, index) => (
                <Grid item xs={6} key={index}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {amenity.icon}
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {amenity.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              display: { xs: "none", md: "block" },
              backgroundColor: "#1e88e5",
              width: "1px",
            }}
          />

          {/* Property Policies */}
          <Grid item xs={12} md={5}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Property Policies
            </Typography>
            <ul>
              {propertyPolicies.map((policy, index) => (
                <p key={index}>
                  <Typography variant="body1">{policy}</Typography>
                </p>
              ))}
            </ul>
          </Grid>
        </Grid>

        {/* Divider above the Carousel */}
        <Divider sx={{ my: 5, backgroundColor: "#1e88e5" }} />

        {/*Carousel */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Carousel
            indicators
            navButtonsAlwaysVisible={false}
            animation="slide"
            sx={{
              maxWidth: carouselWidth,
              height: carouselHeight,
              mx: "auto", // Centers the carousel horizontally
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {images.map((image, index) => (
              <Box key={index} sx={{ width: carouselWidth, height: "700px" }}>
                <img
                  src={image}
                  alt={`Room ${index}`}
                  style={{
                    width: carouselWidth,
                    height: "700px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default KingRoom;
