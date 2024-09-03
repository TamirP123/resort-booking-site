import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Typography from '@mui/material/Typography';
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Auth from "../utils/auth";
import ClockNotification from "./ClockNotification";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/login");
  };

  const handleReservationsClick = () => {
    if (Auth.loggedIn()) {
      navigate("/reservations");
    } else {
      setNotification({
        message: "You need to be logged in to view reservations.",
        type: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  const isAvailabilityPage = location.pathname === "/availability";
  const isReservePage = location.pathname === "/reservations";
  const isContactPage = location.pathname === "/contact";

  const handleNavClick = (sectionId) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/?scrollTo=${sectionId}`);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        className={`app-bar ${
          scrolled || isAvailabilityPage || isReservePage || isContactPage
            ? "scrolled"
            : "transparent"
        } ${isAvailabilityPage ? "availability-page" : ""} ${
          isReservePage ? "reserve-page" : ""
        } ${isContactPage ? "contact-page" : ""}`}
      >
        <Toolbar
          className={`toolbar ${
            scrolled || isAvailabilityPage || isReservePage || isContactPage
              ? "scrolled"
              : "transparent"
          }`}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            height: "auto",
            width: "100%",
          }}
        >
          {/* Left side */}
          <Box
            className="left-side"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              onClick={handleReservationsClick}
              className="reservationsbtn"
              sx={{
                fontWeight: "bold",
                color:
                  scrolled || isAvailabilityPage || isReservePage || isContactPage
                    ? "black"
                    : "white",
                fontFamily: "Eagle Lake",
              }}
            >
              Reservations
            </Button>
          </Box>

          {/* Center for desktop */}
          <Box
            className="logo-container"
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              flexGrow: 1,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {!scrolled && !isAvailabilityPage && !isReservePage && !isContactPage ? (
              <Link to="/">
                <img
                  src={logo}
                  alt="Harmonia Oasis"
                  className={`logo ${scrolled ? "hide" : ""}`}
                />
              </Link>
            ) : (
              <MenuItem
                component={Link}
                to="/"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Eagle Lake",
                }}
              >
                Home
              </MenuItem>
            )}
          </Box>

          {/* Center for mobile */}
          <Box
            className="mobile-home"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <MenuItem
              component={Link}
              to="/"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color:
                  scrolled || isAvailabilityPage || isReservePage || isContactPage
                    ? "black"
                    : "white",
                fontFamily: "Eagle Lake",
              }}
            >
              Home
            </MenuItem>
          </Box>

          {/* Right side */}
          <Box
            className="right-side"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <MenuItem
              sx={{
                fontFamily: "Eagle Lake",
                color:
                  scrolled || isAvailabilityPage || isReservePage || isContactPage
                    ? "black"
                    : "inherit",
              }}
              onClick={() => handleNavClick("rooms")}
            >
              Rooms
            </MenuItem>
            <MenuItem
              sx={{
                fontFamily: "Eagle Lake",
                color:
                  scrolled || isAvailabilityPage || isReservePage || isContactPage
                    ? "black"
                    : "inherit",
              }}
              component={Link}
              to="/contact"
            >
              Contact us
            </MenuItem>
            <MenuItem
              sx={{
                fontFamily: "Eagle Lake",
                color:
                  scrolled || isAvailabilityPage || isReservePage || isContactPage
                    ? "black"
                    : "inherit",
              }}
              onClick={() => handleNavClick("attractions")}
            >
              Attractions
            </MenuItem>
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
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                color:
                  scrolled || isAvailabilityPage || isReservePage || isContactPage
                    ? "black"
                    : "white",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: '250px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                }
              }}
            >
              <Box
                className="drawer-content"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: '20px',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Eagle Lake, cursive',
                    color: 'rgb(193, 163, 98)',
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}
                >
                  Menu
                </Typography>
                <MenuItem
                  component={Link}
                  to="/"
                  sx={{
                    marginBottom: '10px',
                    fontFamily: 'Nunito, sans-serif',
                    color: '#333',
                    '&:hover': {
                      backgroundColor: 'rgba(193, 163, 98, 0.1)',
                    },
                  }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/contact"
                  sx={{
                    marginBottom: '10px',
                    fontFamily: 'Nunito, sans-serif',
                    color: '#333',
                    '&:hover': {
                      backgroundColor: 'rgba(193, 163, 98, 0.1)',
                    },
                  }}
                >
                  Contact Us
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/login"
                  sx={{
                    marginBottom: '10px',
                    fontFamily: 'Nunito, sans-serif',
                    color: '#333',
                    '&:hover': {
                      backgroundColor: 'rgba(193, 163, 98, 0.1)',
                    },
                  }}
                >
                  Login
                </MenuItem>
                {Auth.loggedIn() && (
                  <>
                    <MenuItem
                      component={Link}
                      to="/reservations"
                      sx={{
                        marginBottom: '10px',
                        fontFamily: 'Nunito, sans-serif',
                        color: '#333',
                        '&:hover': {
                          backgroundColor: 'rgba(193, 163, 98, 0.1)',
                        },
                      }}
                    >
                      Check Bookings
                    </MenuItem>
                    <MenuItem
                      onClick={logout}
                      sx={{
                        marginTop: 'auto',
                        fontFamily: 'Nunito, sans-serif',
                        color: '#333',
                        '&:hover': {
                          backgroundColor: 'rgba(193, 163, 98, 0.1)',
                        },
                      }}
                    >
                      Log out
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ClockNotification */}
      <ClockNotification
        message={notification.message}
        onClose={handleCloseNotification}
        type={notification.type}
      />
    </div>
  );
};

export default Navbar;
