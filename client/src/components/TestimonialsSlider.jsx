import React from 'react';
import { Box, Typography, Card, Avatar, Rating } from '@mui/material';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Fanny Spencer',
    rating: 4.5,
    text: 'Harmonia Oasis was everything we dreamed of! The staff were attentive and the infinity pool is breathtaking.',
  },
  {
    name: 'John Doe',
    rating: 5,
    text: 'An amazing experience! The resort is stunning and the cocktails by the pool are the best.',
  },
  {
    name: 'Jane Smith',
    rating: 4,
    text: 'A peaceful retreat with wonderful views and exceptional service. Will definitely come back.',
  },
  {
    name: 'Carlos Mendoza',
    rating: 4.5,
    text: 'The perfect getaway! Great food, cozy atmosphere, and the views are unparalleled.',
  },
  {
    name: 'Emily White',
    rating: 5,
    text: 'Absolutely loved our stay at Harmonia Oasis. It was relaxing and luxurious. Highly recommend!',
  }
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + 3;
    if (endIndex <= testimonials.length) {
      return testimonials.slice(startIndex, endIndex);
    } else {
      return [...testimonials.slice(startIndex), ...testimonials.slice(0, endIndex - testimonials.length)];
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 5, backgroundColor: '#f9f9f9' }}>
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
        Testimonials
      </Typography>
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Nunito' }}>
        Testimonial from our Clients
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          overflowX: 'auto', 
          gap: 2,
          px: 2,
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        {getVisibleTestimonials().map((testimonial, index) => (
          <Card 
            key={index} 
            sx={{ 
              p: 3, 
              maxWidth: '100%', 
              flex: '1 0 300px', // Ensures cards are responsive and take up available space
              '@media (max-width: 600px)': {
                maxWidth: '90%',
                marginBottom: 2,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar alt={testimonial.name} src={`/path-to-avatar-${index + 1}.jpg`} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {testimonial.name}
                </Typography>
                <Rating value={testimonial.rating} precision={0.5} readOnly />
              </Box>
            </Box>
            <Typography variant="body2">{testimonial.text}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TestimonialsSlider;
