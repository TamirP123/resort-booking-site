import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Grid
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClockNotification from '../components/ClockNotification';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email using a backend service
    console.log('Form submitted:', formData);
    setNotification({
      message: 'Message sent successfully!',
      type: 'success'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 2 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Inknut Antiqua', color: 'rgb(193, 163, 98)' }}>
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'rgb(193, 163, 98)' } } }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'rgb(193, 163, 98)' } } }}
              />
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'rgb(193, 163, 98)' } } }}
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                margin="normal"
                required
                sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'rgb(193, 163, 98)' } } }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                  mt: 2, 
                  backgroundColor: 'rgb(193, 163, 98)', 
                  '&:hover': { 
                    backgroundColor: 'rgb(173, 143, 78)' 
                  } 
                }}
              >
                Send Message
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Inknut Antiqua', color: 'rgb(193, 163, 98)' }}>
                Get in Touch
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'rgb(193, 163, 98)' }} />
                <Typography>contact@harmoniaoasis.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: 'rgb(193, 163, 98)' }} />
                <Typography>+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 2, color: 'rgb(193, 163, 98)' }} />
                <Typography>123 Serenity Lane, Paradise City, PC 12345</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {notification.message && (
        <ClockNotification
          message={notification.message}
          type={notification.type}
        />
      )}
    </Container>
  );
};

export default Contact;


