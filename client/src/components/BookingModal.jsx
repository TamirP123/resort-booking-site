import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import Auth from "../utils/auth";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CloseIcon from '@mui/icons-material/Close';
import WifiIcon from '@mui/icons-material/Wifi';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TvIcon from '@mui/icons-material/Tv';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ClockNotification from './ClockNotification';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT_INTENT, CREATE_BOOKING } from '../utils/mutations';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ open, onClose, room, arrivalDate, departureDate }) => {
  const [notification, setNotification] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
  const [createBooking] = useMutation(CREATE_BOOKING);
  const navigate = useNavigate();


  const arrival = dayjs(arrivalDate);
  const departure = dayjs(departureDate);

  // Check for valid dates
  if (!arrival.isValid() || !departure.isValid()) {
    return <Typography>Error: Invalid date selected.</Typography>;
  }

  // Calculate the total cost
  const duration = departure.diff(arrival, 'day');
  const baseCost = room.cost * duration;
  const taxAmount = baseCost * 0.10; // 10% tax
  const totalCost = baseCost + taxAmount;

  const amenityIcons = {
    Wifi: <WifiIcon />,
    'Smoke Free': <SmokeFreeIcon />,
    'Free Parking': <LocalParkingIcon />,
    Kitchen: <KitchenIcon />,
    Tv: <TvIcon />,
    'Fitness Center': <FitnessCenterIcon />,
    'Pool Access': <PoolIcon />,
    'Room Service': <RoomServiceIcon />,
    'Bar Access': <SportsBarIcon />,
    'Free Breakfast': <RestaurantIcon />
  };

  // Fetch client secret for Stripe
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data } = await createPaymentIntent({ variables: { amount: totalCost * 100 } });
        setClientSecret(data.createPaymentIntent.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
        setNotification({ type: 'error', message: 'Failed to initiate payment. Please try again.' });
      }
    };

    if (totalCost) {
      fetchClientSecret();
    }
  }, [totalCost, createPaymentIntent]);

  const handleReserve = async () => {
    if (!Auth.loggedIn()) {
      setNotification({ type: 'error', message: 'You must be logged in to reserve a room.' });
      return;
    }
  
    // Log Stripe and Elements status
    console.log('Stripe Loaded:', stripe);
    console.log('Elements Loaded:', elements);
    console.log('Client Secret:', clientSecret);
    console.log('User', Auth.getProfile().authenticatedPerson._id,
    'Room Id', room._id,
    'Arrival', arrivalDate,
    'Departure', departureDate,
    'Cost', totalCost);
  
    if (!stripe || !elements || !clientSecret) {
      setNotification({ type: 'error', message: 'Stripe not loaded properly. Please try again.' });
      return;
    }
  
    setIsProcessing(true);
  
    try {
      const cardElement = elements.getElement(CardElement);
      console.log('Card Element:', cardElement);
  
      // Confirm card payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: 'Customer Name' }, 
        },
      });
  
      if (error) {
        console.error('Payment Error:', error.message);
        setNotification({ type: 'error', message: `Payment failed: ${error.message}` });
        return;
      }
  
      console.log('Payment Intent:', paymentIntent);
  
      if (paymentIntent.status === 'succeeded') {
        console.log('Payment Succeeded, creating booking...');
  
        // creating booking in the database
        const { data } = await createBooking({
          variables: {
            userId: Auth.getProfile().authenticatedPerson._id,
            roomId: room._id,
            checkInDate: arrivalDate,
            checkOutDate: departureDate,
            totalPrice: totalCost * 100, // Updated to totalPrice
          },
        });
  
        console.log('Booking Created:', data);
        
        // Booking successful
        setNotification({ type: 'success', message: 'Payment successful! Your reservation is confirmed.' });
        setTimeout(() => {
          navigate('/success'); // Redirect to success page after successful payment
        }, 3000);
      } else {
        console.error('Unexpected Payment Intent Status:', paymentIntent.status);
        setNotification({ type: 'error', message: 'Payment processing error. Please try again.' });
      }
    } catch (err) {
      console.error('Payment Processing Error:', err.message);
      setNotification({ type: 'error', message: 'An error occurred during payment processing.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Notification component */}
      {notification && (
        <ClockNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: 'relative',
          overflow: 'auto'
        }}>
          {/* Header with Exit Icon and Title */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2
          }}>
            <IconButton onClick={onClose} sx={{ color: 'blue' }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Room Information
            </Typography>
          </Box>

          {/* Carousel */}
          <Carousel
            showThumbs={false}
            showArrows
            infiniteLoop
            useKeyboardArrows
          >
            {room.displayImages.map((image, index) => (
              <Box key={index} sx={{ height: '400px' }}>
                <img src={image} alt={`Room Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Carousel>

          {/* Room Name and Description */}
          <Box sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            p: 2,
            mt: 2,
            bgcolor: '#f5f5f5'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {room.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {room.type}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {room.description}
            </Typography>
          </Box>

          {/* Amenities */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2, justifyContent: 'center' }}>
            {room.amenities.map((amenity, index) => (
              <Box
                className='amenitybox'
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  gap: 1,
                  backgroundColor: '#f5f5f5'
                }}
              >
                {amenityIcons[amenity] || <HelpOutlineIcon />}
                <Typography variant="body2">{amenity}</Typography>
              </Box>
            ))}
          </Box>

          {/* Pricing and Payment Details */}
          <Box sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            mt: 2,
            p: 2,
            bgcolor: '#f5f5f5'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Room Options
            </Typography>
            <Typography variant="body2" sx={{ color: 'green' }}>
              Fully refundable
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              ${room.cost} /night
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ${taxAmount.toFixed(2)} maintenance fees applied
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
              Total cost: ${totalCost.toFixed(2)}
            </Typography>

            {/* Payment Form */}
            <Box sx={{ mt: 2, borderTop: '1px solid #e0e0e0', pt: 2 }}>
              <Typography variant="h6">Payment Details</Typography>
              <CardElement options={{ hidePostalCode: true }} />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleReserve}
              disabled={isProcessing}
              sx={{ mt: 2 }}
            >
              {isProcessing ? <CircularProgress size={24} /> : 'Reserve Now'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BookingModal;
