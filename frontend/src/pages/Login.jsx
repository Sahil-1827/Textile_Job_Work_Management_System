import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await loginAdmin(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || "Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="flex h-screen items-center justify-center bg-gray-100">
            <Paper elevation={6} className="p-8 w-full max-w-md rounded-lg">
                <Typography variant="h4" className="text-center font-bold mb-2 text-blue-600">
                    Textile MS
                </Typography>
                <Typography variant="body1" className="text-center text-gray-600 mb-6">
                    Admin Login
                </Typography>

                {error && <Alert severity="error" className="mb-4">{error}</Alert>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        required
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        required
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                </form>
                <Button
                    component={Link}
                    to="/signup"
                    variant="text"
                    fullWidth
                    className="mt-4"
                >
                    Don't have an account? Sign Up
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;