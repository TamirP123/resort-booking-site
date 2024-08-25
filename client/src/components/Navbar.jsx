import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Auth from "../utils/auth";
import logo from "../assets/logo.png";
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <AppBar
        position="fixed"
        className={`app-bar ${scrolled ? 'scrolled' : 'transparent'}`}
      >
        <Toolbar
          className={`toolbar ${scrolled ? 'scrolled' : 'transparent'}`}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            height: 'auto',
            width: '100%',
          }}
        >
          {/* Left side */}
          <Box
            className="left-side"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button
              component={Link}
              to="/reservations"
              className="reservationsbtn"
              sx={{
                fontWeight: 'bold',
                color: scrolled ? 'black' : 'white',
                fontFamily: 'Eagle Lake'
              }}
            >
              Reservations
            </Button>
          </Box>

          {/* Center*/}
          <Box
            className="logo-container"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexGrow: 1,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {!scrolled ? (
              <Link to="/">
                <img
                  src={logo}
                  alt="Harmonia Oasis"
                  className={`logo ${scrolled ? 'hide' : ''}`}
                />
              </Link>
            ) : (
              <MenuItem
                component={Link}
                to="/"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'black',
                  fontFamily: 'Eagle Lake',
                }}
              >
                Home
              </MenuItem>
            )}
          </Box>

          {/* Right side */}
          <Box
            className="right-side"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 2,
            }}
          >
            <MenuItem sx={{ fontFamily: 'Eagle Lake', color: scrolled ? 'black' : 'inherit' }} component={Link} to="/rooms">Rooms</MenuItem>
            <MenuItem sx={{ fontFamily: 'Eagle Lake', color: scrolled ? 'black' : 'inherit' }} component={Link} to="/contact">Contact us</MenuItem>
            <MenuItem sx={{ fontFamily: 'Eagle Lake', color: scrolled ? 'black' : 'inherit' }} component={Link} to="/attractions">Attractions</MenuItem>
            {Auth.loggedIn() ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={logout}
              >
                Log out
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                component={Link}
                to="/login"
              >
                Sign in
              </Button>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <Box
            className="menu-icon"
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={toggleDrawer(false)}
            >
              <Box className="drawer-content">
                <MenuItem component={Link} to="/rooms">Rooms</MenuItem>
                <MenuItem component={Link} to="/contact">Contact us</MenuItem>
                <MenuItem component={Link} to="/attractions">Attractions</MenuItem>
                {Auth.loggedIn() && (
                  <>
                    <MenuItem component={Link} to="/bookings">Check Bookings</MenuItem>
                    <MenuItem onClick={logout}>Log out</MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
