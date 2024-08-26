import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import PoolIcon from '@mui/icons-material/Pool';


const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(https://img.freepik.com/premium-photo/tropical-beach-bar-drinks-sunset_894134-4158.jpg?ga=GA1.1.1261594997.1724037380&semt=ais_hybrid)`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'auto',
        minHeight: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        p: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
          p: 4,
          maxWidth: '600px',
          textAlign: 'center',
          borderRadius: '10px',
          border: '1px solid rgb(193, 163, 98)', // Border color matching the button background
        }}
      >
        <Typography variant="h3" sx={{ fontFamily: 'Eagle Lake' }}>
        Breeze Bar & Infinity Pool
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Nunito' }}>
        Experience paradise at our exclusive outdoor bar and infinity pool, where crystal-clear waters meet breathtaking views. Sip on handcrafted cocktails while lounging under the sun, or unwind in the serene poolside cabanas. Whether you're enjoying the vibrant ambiance or soaking in the tranquil beauty of the surroundings, our oasis promises the perfect blend of relaxation and indulgence.






</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          {/* Icons Section */}
          <Box sx={{ textAlign: 'center', mx: 2 }}>
            <LocalBarIcon sx={{ fontSize: 40, color: 'rgb(193, 163, 98)' }} /> {/* Pool icon */}
            <Typography variant="body2">Pool Beachbar</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', mx: 2 }}>
            <PoolIcon sx={{ fontSize: 40, color: 'rgb(193, 163, 98)' }} /> {/* Pool icon */}
            <Typography variant="body2">Infinity Pool</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', mx: 2 }}>
            <LocalBarIcon sx={{ fontSize: 40, color: 'rgb(193, 163, 98)' }} /> {/* Pool icon */}
            <Typography variant="body2">Sunbeds</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: 'rgb(193, 163, 98)',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Read More
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
