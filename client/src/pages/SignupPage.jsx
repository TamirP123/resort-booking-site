import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardContent, Divider, TextField, Typography } from '@mui/material';
import logo from '../assets/logo.png';
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import ClockNotification from '../components/ClockNotification';
import Navbar from '../components/Navbar';
import HotelIcon from '@mui/icons-material/Hotel';
import HailIcon from '@mui/icons-material/Hail';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AssignmentIcon from '@mui/icons-material/Assignment';
import '../styles/LoginPage.css';

const SignupPage = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password,
                },
            });

            const token = data.addUser.token;
            Auth.login(token);

            setNotification({
                message: 'User created successfully!',
                type: 'success',
            });
        } catch (err) {
            console.error(err);
            setNotification({
                message: 'Failed to create user.',
                type: 'error',
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleCloseNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundImage: 'url(https://img.freepik.com/premium-photo/young-couple-relaxing-enjoying-sunset_492154-13062.jpg)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    paddingTop: '150px',
                }}
            >
                <Card
                    sx={{
                        width: { xs: '90%', sm: '800px' },
                        height: { xs: 'auto', sm: '535px' },
                        display: 'flex',
                        flexDirection: 'row',
                        borderRadius: '16px',
                        boxShadow: 6,
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'rgba(239, 206, 13, 0.674)',
                            width: '30%',
                            padding: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 1, fontFamily: 'Nunito' }}>
                            Join Us!
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white', mb: 8, fontFamily: 'Nunito' }}>
                            Create your account today
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'white' }}>
                                <HotelIcon sx={{ mr: 1, fontSize: 32 }} />
                                <Typography variant="body2" sx={{ lineHeight: '1.5em', width: 'calc(100% - 40px)', fontFamily: 'Nunito' }}>
                                    MANAGE RESERVATIONS
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'white' }}>
                                <CurrencyExchangeIcon sx={{ mr: 1, fontSize: 32 }} />
                                <Typography variant="body2" sx={{ lineHeight: '1.5em', width: 'calc(100% - 40px)', fontFamily: 'Nunito' }}>
                                    PAY MORTGAGE & MAINTENANCE
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'white' }}>
                                <HailIcon sx={{ mr: 1, fontSize: 32 }} />
                                <Typography variant="body2" sx={{ lineHeight: '1.5em', width: 'calc(100% - 40px)', fontFamily: 'Nunito' }}>
                                    BOOK RESERVATIONS
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: 'white' }}>
                                <AssignmentIcon sx={{ mr: 1, fontSize: 32 }} />
                                <Typography variant="body2" sx={{ lineHeight: '1.5em', width: 'calc(100% - 41px)', fontFamily: 'Nunito' }}>
                                    ACCESS DOCUMENTS
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <CardContent
                        sx={{
                            backgroundColor: 'white',
                            padding: 3,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                mb: 18,
                            }}
                        >
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '150px',
                                    height: 'auto',
                                }}
                            />
                        </Box>
                        <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Nunito' }}>
                            Sign up for your account
                        </Typography>
                        <form onSubmit={handleFormSubmit}>
                            <TextField
                                variant="outlined"
                                label="Username"
                                name="username"
                                fullWidth
                                required
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                label="Email"
                                name="email"
                                type="email"
                                fullWidth
                                required
                                margin="normal"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                required
                                margin="normal"
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, backgroundColor: '#1e88e5' }}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2" align="center" sx={{ fontFamily: 'Nunito' }}>
                            Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Log in</Link>
                        </Typography>
                    </CardContent>
                </Card>

                {notification.message && (
                    <ClockNotification
                        message={notification.message}
                        onClose={handleCloseNotification}
                        type={notification.type}
                    />
                )}
            </Box>
        </>
    );
};

export default SignupPage;
