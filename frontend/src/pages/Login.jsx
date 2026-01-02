import React, { useState } from 'react';
import {
    TextField,
    Button,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Alert,
    useTheme
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await loginAdmin(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                        : 'linear-gradient(135deg, #111827 0%, #000000 100%)'
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    p: 5,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 4,
                    bgcolor: 'background.paper'
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 800, mb: 1, color: 'primary.main' }}
                >
                    Textile MS
                </Typography>

                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Login to your account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <form
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={loading}
                        sx={{ py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Login'
                        )}
                    </Button>
                </form>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Don’t have an account?{' '}
                        <Link
                            to="/signup"
                            style={{
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                textDecoration: 'none'
                            }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
