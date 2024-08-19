import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/Navbar.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/logo.png';

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

  return (
    <div>
      <AppBar
        position="fixed"
        className={`app-bar ${scrolled ? 'scrolled' : 'transparent'}`}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            className={`toolbar ${scrolled ? 'scrolled' : ''}`}
            sx={{
              display: 'flex',
              justifyContent: 'space-between', 
              alignItems: 'center',
              px: 2,
              height: 'auto',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box
              className="logo-container"
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={logo}
                className="logo"
                alt="logo"
                style={{ width: '175px', height: 175 }}
              />
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
              <MenuItem sx={{fontFamily: 'Inknut Antiqua'}} onClick={() => scrollToSection('features')}>Attractions</MenuItem>
              <MenuItem sx={{fontFamily: 'Inknut Antiqua'}} onClick={() => scrollToSection('highlights')}>Rooms</MenuItem>
              <MenuItem sx={{fontFamily: 'Inknut Antiqua'}} onClick={() => scrollToSection('pricing')}>Contact us</MenuItem>
              <MenuItem sx={{fontFamily: 'Inknut Antiqua'}} onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
            </Box>
            <Box
              className="auth-buttons"
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 2,
              }}
            >
              <Button
                color="primary"
                variant="text"
                size="small"
                href="#"
                target="_blank"
              >
                Sign in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                href="#"
                target="_blank"
              >
                Sign up
              </Button>
            </Box>
            <Box className="menu-icon" sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                color="primary"
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
                  <MenuItem onClick={() => scrollToSection('features')}>Features</MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>Highlights</MenuItem>
                  <MenuItem onClick={() => scrollToSection('pricing')}>Pricing</MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
