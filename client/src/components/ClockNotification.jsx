import React, { useEffect } from 'react';
import { Snackbar, Slide, Alert } from '@mui/material';

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const ClockNotification = ({ message, onClose, type }) => {
  return (
    <Snackbar
      open={!!message}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ClockNotification;
