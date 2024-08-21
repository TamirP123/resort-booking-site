import { useQuery } from "@apollo/client";
import { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Navbar from "../components/Navbar";
import { QUERY_ROOMS } from "../utils/queries";

import WifiIcon from '@mui/icons-material/Wifi';
import KingBedIcon from '@mui/icons-material/KingBed';
// import NoSmokingIcon from '@mui/icons-material/NoSmoking';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TvIcon from '@mui/icons-material/Tv';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const KingRoom = () => {
  const { loading, data } = useQuery(QUERY_ROOMS);
  const rooms = data?.rooms || [];
  const [showReceipt, setShowReceipt] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Filter to find king room
  const kingroom = rooms.find(room => room.type === 'King');

  const handleBookClick = () => {
    setShowReceipt(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!kingroom) {
    return <div>No King Room available</div>;
  }

  const images = [kingroom.image, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCBgw6S52f_Cz0wjwr7Wg2ebttBbUsdCpdi94FyckTvB0kQZlG17Keun-ILYiOzLDUZMs&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2UW5rWLWi209xUUEAXTrecNuSn09-YV7csbgzgnRrFLSdYJI3RtHDJyqmd25_LQFGib8&usqp=CAU"];

  const handleOpenModal = (index) => {
    setCurrentImage(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box>
      <Navbar />
      <Grid container spacing={4} sx={{ p: 4, mt: 10 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>
                {kingroom.name}
              </Typography>

              <CardMedia
                component="img"
                image={kingroom.image}
                alt={kingroom.name}
                sx={{ cursor: 'pointer', marginBottom: 2 }}
                onClick={() => handleOpenModal(0)}
              />

              <Grid container spacing={1}>
                {images.slice(1).map((img, index) => (
                  <Grid item xs={4} key={index}>
                    <CardMedia
                      component="img"
                      image={img}
                      alt={`small-image-${index}`}
                      onClick={() => handleOpenModal(index + 1)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Button variant="contained" color="primary" onClick={handleBookClick} sx={{ mt: 2 }}>
                Book - ${kingroom.cost}
              </Button>

              <Tabs sx={{ mt: 4 }} centered>
                <Tab
                  label={
                    <Box display="flex" alignItems="center">
                      <WifiIcon color="primary" sx={{ marginRight: 1 }} /> Wifi
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box display="flex" alignItems="center">
                      <KingBedIcon color="primary" sx={{ marginRight: 1 }} /> King Bed
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box display="flex" alignItems="center">
                       No Smoking
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box display="flex" alignItems="center">
                      <LocalParkingIcon color="primary" sx={{ marginRight: 1 }} /> Free Parking
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box display="flex" alignItems="center">
                      <KitchenIcon color="primary" sx={{ marginRight: 1 }} /> Kitchen
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box display="flex" alignItems="center">
                      <TvIcon color="primary" sx={{ marginRight: 1 }} /> TV
                    </Box>
                  }
                />
              </Tabs>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Receipt Details</Typography>
              {showReceipt ? (
                <Box mt={2}>
                  <Typography variant="body1">Room: {kingroom.name}</Typography>
                  <Typography variant="body1">Cost: ${kingroom.cost}</Typography>
                </Box>
              ) : (
                <Typography variant="body2">Click "Book" to see receipt details.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal} sx={modalStyle}>
        <Box sx={{ position: 'relative', width: '80%', height: '80%' }}>
          <img
            src={images[currentImage]}
            alt={`Zoomed-${currentImage}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          <Button
            onClick={handlePrevImage}
            sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
          >
            &#8592;
          </Button>
          <Button
            onClick={handleNextImage}
            sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
          >
            &#8594;
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default KingRoom;
