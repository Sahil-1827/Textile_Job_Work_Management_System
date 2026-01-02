import React from 'react';
import { Box, Typography, Button, Container, Stack, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BusinessCenter, Login, PersonAdd } from '@mui/icons-material';

const LandingPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)'
                : 'linear-gradient(135deg, #111827 0%, #000000 100%)'
        }}>
            <Container maxWidth="md">
                <Box textAlign="center" sx={{ py: 8 }}>
                    <BusinessCenter sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, color: 'text.primary' }}>
                        Textile Job Work <br />
                        <Typography component="span" variant="h2" color="primary.main" sx={{ fontWeight: 900 }}>
                            Management System
                        </Typography>
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
                        Manage your traders, invoices, and payments from a single platform.
                        Simple, fast, and secure.
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                        <Button
                            variant="contained" size="large" startIcon={<Login />}
                            onClick={() => navigate('/login')}
                            sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 'bold' }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outlined" size="large" startIcon={<PersonAdd />}
                            onClick={() => navigate('/signup')}
                            sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 'bold' }}
                        >
                            Create New Account
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default LandingPage;
