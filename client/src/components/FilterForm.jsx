import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';

const FilterForm = ({ bedrooms, bathrooms, sortOrder, setBedrooms, setBathrooms, setSortOrder }) => (
  <Box sx={{ 
    flex: '0 0 20%', 
    padding: 2, 
    borderRight: '1px solid #e0e0e0', 
    backgroundColor: '#f5f5f5'
  }}>
    <Typography variant="h6" gutterBottom>Filters</Typography>
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1">Bedrooms</Typography>
      <Select
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">Any</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
      </Select>
    </Box>
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1">Bathrooms</Typography>
      <Select
        value={bathrooms}
        onChange={(e) => setBathrooms(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">Any</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
      </Select>
    </Box>
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1">Sort By</Typography>
      <Select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="Recommended">Recommended</MenuItem>
        <MenuItem value="Price low to high">Price low to high</MenuItem>
        <MenuItem value="Price high to low">Price high to low</MenuItem>
      </Select>
    </Box>
  </Box>
);

export default FilterForm;
