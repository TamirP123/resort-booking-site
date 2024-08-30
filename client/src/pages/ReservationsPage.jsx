import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { GET_USER_BOOKINGS } from '../utils/queries';
import { DELETE_BOOKING } from '../utils/mutations';
import Auth from "../utils/auth";
import ErrorPage from './ErrorPage';
import DeleteIcon from '@mui/icons-material/Delete';
import ClockNotification from '../components/ClockNotification';

const ReservationsPage = () => {
  const user = Auth.getProfile().authenticatedPerson; 
  const { data, loading, error, refetch } = useQuery(GET_USER_BOOKINGS, {
    variables: { userId: user._id },
  });
  
  const [deleteBooking] = useMutation(DELETE_BOOKING);
  const [notification, setNotification] = useState({ message: '', type: '' });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading bookings!</Typography>;
  if (!Auth.loggedIn()) {
    return (
      <div className="homepageContain">
        <ErrorPage />
      </div>
    );
  }

  const bookings = data.getUserBookings;

  const formatPrice = (priceInCents) => {
    const priceInDollars = priceInCents / 100;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceInDollars);
  };

  const handleDelete = async (bookingId) => {
    try {
      await deleteBooking({ variables: { bookingId } });
      setNotification({ message: 'You cancelled your booking.', type: 'error' });
      await refetch(); // Refetch the data to update the table
    } catch (err) {
      setNotification({ message: 'Error cancelling booking!', type: 'error' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <Container sx={{mt:15}}>
      <Typography variant="h4" gutterBottom>
        {Auth.getProfile().authenticatedPerson.username}'s Reservations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.room.name}</TableCell>
                <TableCell style={{ color: 'green' }}>{booking.status}</TableCell>
                <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.checkOutDate).toLocaleDateString()}</TableCell>
                <TableCell style={{ color: 'green' }}>{formatPrice(booking.totalPrice)}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(booking._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ClockNotification
        message={notification.message}
        onClose={handleCloseNotification}
        type={notification.type}
      />
    </Container>
  );
};

export default ReservationsPage;
