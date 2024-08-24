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

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
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
          className="toolbar"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            height: 'auto',
            flexDirection: { xs: 'row', md: 'row' },
            width: '100%',
            backgroundColor: 'transparent', 
            transition: 'background-color 0.5s ease-in-out', 
          }}
        >
          <Box
            className="logo-container"
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' }, 
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <MenuItem
              sx={{ fontFamily: 'Inknut Antiqua', fontSize: { xs: '1.2rem', md: '1rem' }, color: 'inherit' }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Harmonia Oasis
              </Link>
            </MenuItem>
          </Box>

          <Box
            className="menu-items"
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <MenuItem sx={{ fontFamily: 'Inknut Antiqua', color: 'inherit' }} onClick={() => scrollToSection('features')}>Attractions</MenuItem>
            <MenuItem sx={{ fontFamily: 'Inknut Antiqua', color: 'inherit' }} onClick={() => scrollToSection('highlights')}>Rooms</MenuItem>
            <MenuItem sx={{ fontFamily: 'Inknut Antiqua', color: 'inherit' }} onClick={() => scrollToSection('pricing')}>Contact us</MenuItem>
            <MenuItem sx={{ fontFamily: 'Inknut Antiqua', color: 'inherit' }} onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
            {Auth.loggedIn() && (
              <>
                <MenuItem sx={{ fontFamily: 'Inknut Antiqua', color: 'inherit' }}>
                  <Link to="/bookings" style={{ textDecoration: "none", color: "inherit" }}>Check Bookings</Link>
                </MenuItem>
              </>
            )}
          </Box>

          <Box
            className="auth-buttons"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 2,
            }}
          >
            {Auth.loggedIn() ? (
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={logout}
              >
                Log out
              </Button>
            ) : (
              <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </Box>

          <Box
            className="menu-icon"
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
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
                <MenuItem onClick={() => scrollToSection('features')}>Attractions</MenuItem>
                <MenuItem onClick={() => scrollToSection('highlights')}>Rooms</MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}>Contact us</MenuItem>
                <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                {Auth.loggedIn() && (
                  <>
                    <MenuItem onClick={() => setOpen(false)}>
                      <Link to="/bookings" style={{ textDecoration: "none", color: "inherit" }}>
                        Check Bookings
                      </Link>
                    </MenuItem>
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
