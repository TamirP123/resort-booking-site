import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';

const attractions = [
  {
    name: 'Gourmet Restaurant',
    description: 'Indulge in exquisite culinary delights at our world-class restaurant.',
    icon: RestaurantIcon,
    image: 'https://img.freepik.com/free-photo/vertical-portrait-tanned-women-fashionable-clothes-smiling-talking-cozy-street-cafe_197531-18195.jpg?uid=R160620524&ga=GA1.1.1261594997.1724037380&semt=ais_hybrid',
  },
  {
    name: 'Biking Trails',
    description: 'Explore scenic routes through lush landscapes on our biking trails.',
    icon: DirectionsBikeIcon,
    image: 'https://d2y877l0hklg43.cloudfront.net/thesanctuarybeachresort.com-1708970522/cms/cache/v2/62202eaf08537.jpg/1920x1080/fit;c:0,1191,5500,3665/80/d24db94f615f8ffbd929bff365fc93e9.jpg',
  },
  {
    name: 'Mini Golf',
    description: 'Enjoy a fun-filled round of mini golf with friends and family.',
    icon: GolfCourseIcon,
    image: 'https://img.freepik.com/premium-photo/family-playing-miniature-golf_1237301-2578.jpg?uid=R160620524&ga=GA1.1.1261594997.1724037380&semt=ais_hybrid',
  },
];

const AttractionCard = styled(Card)(({ theme }) => ({
  height: '300px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  '&:hover': {
    opacity: 1,
  },
}));

const Attractions = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 8,
        opacity: 0,
        transform: 'translateY(50px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', px: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 2,
            color: 'rgb(193, 163, 98)',
            fontFamily: 'Eagle Lake',
          }}
        >
          Attractions
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', mb: 5, fontFamily: 'Nunito', color: 'white' }}
        >
          Discover Our Unique Experiences
        </Typography>
        <Grid container spacing={4}>
          {attractions.map((attraction, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AttractionCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={attraction.image}
                  alt={attraction.name}
                />
                <CardOverlay>
                  <attraction.icon sx={{ fontSize: 40, color: 'white', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    {attraction.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', px: 2 }}>
                    {attraction.description}
                  </Typography>
                </CardOverlay>
              </AttractionCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Attractions;

