import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Box, Typography, Card, Button, CircularProgress } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import ClockNotification from '../components/ClockNotification';
import { CREATE_PAYMENT_INTENT } from '../utils/mutations';


const TransactionPage = () => {
  const location = useLocation();
  const room = location.state?.room;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data } = await createPaymentIntent({ variables: { amount: room.cost * 100 } });
        setClientSecret(data.createPaymentIntent.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
        setNotification({ type: 'error', message: 'Failed to initiate payment. Please try again.' });
      }
    };

    if (room) {
      fetchClientSecret();
    }
  }, [room, createPaymentIntent]);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: 'Customer Name' },
        },
      });

      if (error) {
        setNotification({ type: 'error', message: 'Payment failed. Please try again.' });
        setIsProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        setTimeout(() => {
          navigate('/success');
        }, 5000);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'An error occurred during payment processing.' });
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
      {notification && (
        <ClockNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <Box sx={{ width: '60%' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Confirm Your Reservation</Typography>
        <Card sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{room.name}</Typography>
          <Typography variant="body2" color="textSecondary">{room.type}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{room.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>${room.cost} /night</Typography>
        </Card>
      </Box>

      <Box sx={{ width: '35%', bgcolor: '#f5f5f5', p: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Payment Details</Typography>
        <Box>
          <CardElement options={{ hidePostalCode: true }} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handlePayment}
          disabled={!stripe || !clientSecret || isProcessing}
        >
          {isProcessing ? <CircularProgress size={24} /> : 'Confirm Payment'}
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionPage;
