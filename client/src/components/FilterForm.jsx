import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const FilterForm = ({ 
  bedrooms, 
  bathrooms, 
  sortOrder, 
  setBedrooms, 
  setBathrooms, 
  setSortOrder 
}) => {
  const [openFilter, setOpenFilter] = useState(null);

  const handleToggle = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <Box sx={{ 
      flex: '0 0 20%', 
      padding: 2, 
      borderRight: '1px solid #e0e0e0', 
      backgroundColor: '#f5f5f5',
      color: 'rgb(193, 163, 98)'
    }}>
      <Typography variant="h6" gutterBottom sx={{color: 'black'}}>Filters</Typography>
      <Box sx={{ mb: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            cursor: 'pointer', 
            userSelect: 'none',
            
          }} 
          onClick={() => handleToggle('bedrooms')}
        >
          <Typography variant="subtitle1">Bedrooms</Typography>
          <IconButton>
            {openFilter === 'bedrooms' ? 
              <ExpandLessIcon /> : 
              <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {openFilter === 'bedrooms' && (
          <Select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ 
              mt: 1, 
              border: '1px solid #e0e0e0',
              
              borderRadius: '4px',
              '& .MuiSelect-select': {
                padding: '10px'
              }
            }}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
          </Select>
        )}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            cursor: 'pointer', 
            userSelect: 'none'
          }} 
          onClick={() => handleToggle('bathrooms')}
        >
          <Typography variant="subtitle1">Bathrooms</Typography>
          <IconButton>
            {openFilter === 'bathrooms' ? 
              <ExpandLessIcon /> : 
              <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {openFilter === 'bathrooms' && (
          <Select
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ 
              mt: 1, 
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              '& .MuiSelect-select': {
                padding: '10px'
              }
            }}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
          </Select>
        )}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            cursor: 'pointer', 
            userSelect: 'none'
          }} 
          onClick={() => handleToggle('sortOrder')}
        >
          <Typography variant="subtitle1">Sort By</Typography>
          <IconButton>
            {openFilter === 'sortOrder' ? 
              <ExpandLessIcon /> : 
              <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {openFilter === 'sortOrder' && (
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ 
              mt: 1, 
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              '& .MuiSelect-select': {
                padding: '10px'
              }
            }}
          >
            <MenuItem value="Recommended">Recommended</MenuItem>
            <MenuItem value="Price low to high">Price low to high</MenuItem>
            <MenuItem value="Price high to low">Price high to low</MenuItem>
          </Select>
        )}
      </Box>
    </Box>
  );
};

export default FilterForm;
