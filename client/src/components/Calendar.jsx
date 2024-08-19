import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format, addMonths, subMonths, isSameDay, isWithinInterval } from 'date-fns';
import '../styles/Calendar.css'; 

const Calendar = ({ selectedStartDate, selectedEndDate, onSelectStartDate, onSelectEndDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleDateClick = (date) => {
    if (!selectedStartDate) {
      onSelectStartDate(date);
    } else if (!selectedEndDate) {
      if (date < selectedStartDate) {
        onSelectStartDate(date);
      } else {
        onSelectEndDate(date);
      }
    } else {
      onSelectStartDate(date);
      onSelectEndDate(null);
    }
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth(direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1));
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const days = [];

  for (let i = startOfMonth.getDay(); i > 0; i--) {
    const day = new Date(startOfMonth);
    day.setDate(day.getDate() - i);
    days.push(day);
  }

  for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  return (
    <Box>
      <Box
        className="calendar-trigger"
        onClick={() => setOpen(true)}
      >
        <Typography variant="body1">
          {selectedStartDate ? format(selectedStartDate, 'MM/dd/yyyy') : 'Start Date'} - {selectedEndDate ? format(selectedEndDate, 'MM/dd/yyyy') : 'End Date'}
        </Typography>
        <CalendarTodayIcon />
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Select Dates</DialogTitle>
        <DialogContent className="dialog-content">
          <Box className="dialog-inner">
            <Box className="calendar-header">
              {daysOfWeek.map(day => (
                <Typography key={day} className="header-typography">{day}</Typography>
              ))}
            </Box>
            <Box className="calendar-container">
              <IconButton className="navigation-button" onClick={() => handleMonthChange('prev')}>Prev</IconButton>
              <Typography className="month-label">{format(currentMonth, 'MMMM yyyy')}</Typography>
              <IconButton className="navigation-button" onClick={() => handleMonthChange('next')}>Next</IconButton>
              {days.map(date => (
                <Box
                  key={date}
                  className={`day ${isSameDay(date, selectedStartDate) || (selectedEndDate && isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate })) ? 'selected' : ''}`}
                  onClick={() => handleDateClick(date)}
                >
                  {date.getDate()}
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Calendar;
