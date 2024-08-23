import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { arrivalDate, departureDate, totalCost, roomType } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFakePurchase = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Redirect after displaying success
      setTimeout(() => {
        navigate('/');
      }, 3000); // Show success for 3 seconds
    }, 5000); // Payment processing for 5 seconds
  };

  useEffect(() => {
    // Redirect if booking data is invalid
    if (!arrivalDate || !departureDate || !totalCost || !roomType) {
      navigate('/');
    }
  }, [arrivalDate, departureDate, totalCost, roomType, navigate]);

  if (!arrivalDate || !departureDate || !totalCost || !roomType) {
    return <Typography variant="h6">Invalid booking data. Please try again.</Typography>;
  }

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      {!isProcessing && !isSuccess && (
        <>
          <Typography variant="h4" gutterBottom>
            Transaction Summary
          </Typography>
          <Typography variant="h6">Room: {roomType}</Typography>
          <Typography variant="h6">Arrival Date: {arrivalDate}</Typography>
          <Typography variant="h6">Departure Date: {departureDate}</Typography>
          <Typography variant="h6">Total Cost: ${totalCost}</Typography>

          <Button
            variant="contained"
            onClick={handleFakePurchase}
            sx={{
              backgroundColor: 'green',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '25px',
              mt: 4,
              '&:hover': {
                backgroundColor: 'darkgreen',
              },
            }}
          >
            Simulate Purchase
          </Button>
        </>
      )}

      {isProcessing && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <CircularProgress size={80} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Processing your payment...
          </Typography>
        </Box>
      )}

      {isSuccess && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <CheckCircleIcon sx={{ color: 'green', fontSize: 80 }} />
          <Typography variant="h6" sx={{ mt: 2, color: 'green' }}>
            Payment Successful!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Transaction;
