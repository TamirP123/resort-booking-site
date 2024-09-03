import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import Auth from "../utils/auth";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CloseIcon from '@mui/icons-material/Close';
import ClockNotification from './ClockNotification';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT_INTENT, CREATE_BOOKING } from '../utils/mutations';
import AmenitiesList from '../components/AmenitiesList';

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
          <AmenitiesList amenities={room.amenities} />
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
            <Box sx={{ mt: 2, borderTop: '1px solid #e0e0e0', pt: 2, backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1a237e' }}>Payment Details</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <img src="https://e7.pngegg.com/pngimages/20/987/png-clipart-logo-visa-credit-card-business-visa-text-trademark.png" alt="Visa" height="30" />
                <img src="data:image/png;base64,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" alt="Mastercard" height="30" />
                <img src="https://e7.pngegg.com/pngimages/745/624/png-clipart-american-express-logo-credit-card-payment-credit-card-blue-text-thumbnail.png" alt="American Express" height="30" />
                <img src="https://e7.pngegg.com/pngimages/846/896/png-clipart-discover-network-gift-card-illustration-discover-card-credit-card-discover-financial-services-payment-card-number-icon-credit-card-text-service-thumbnail.png" alt="Discover" height="30" />
              </Box>
              <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '4px', p: 2, backgroundColor: '#f5f5f5' }}>
                <CardElement options={{ 
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }} />
              </Box>
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
