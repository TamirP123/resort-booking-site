import { useQuery } from "@apollo/client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import KingHero from "../components/KingHero";
import { QUERY_ROOMS } from "../utils/queries";
import Carousel from "react-material-ui-carousel";
import KingBedIcon from "@mui/icons-material/KingBed";
import PoolIcon from "@mui/icons-material/Pool";
import KitchenIcon from "@mui/icons-material/Kitchen";

const KingRoom = () => {
  const { loading, data } = useQuery(QUERY_ROOMS);
  const rooms = data?.rooms || [];

  // Filter to find king room
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

  const carouselWidth = "900px"; 
  const carouselHeight = "800px"; 

  return (
    <Box>
      <Navbar />
      <KingHero />

      <Box sx={{ mt: 5, px: 3 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <KingBedIcon sx={{ fontSize: 60, color: "grey" }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              King Bed
            </Typography>
            <Typography variant="body2">
              Experience the ultimate comfort with our luxurious king-sized bed.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <PoolIcon sx={{ fontSize: 60, color: "grey" }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Pool Access
            </Typography>
            <Typography variant="body2">
              Enjoy a refreshing swim in our exclusive pool.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            <KitchenIcon sx={{ fontSize: 60, color: "grey" }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Kitchenette
            </Typography>
            <Typography variant="body2">
              Cook your favorite meals in our modern kitchen.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 5, px: 3, textAlign: "center" }}>
        <Carousel
          indicators
          navButtonsAlwaysVisible={false} 
          animation="slide"
          sx={{
            maxWidth: carouselWidth,
            height: carouselHeight, 
            mx: "auto", 
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {images.map((image, index) => (
            <Box key={index} sx={{ width: "900px", height: "700px" }}>
              <img
                src={image}
                alt={`Room ${index}`}
                style={{
                  width: "900px",
                  height: "700px",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default KingRoom;
