import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await loginAdmin(formData);
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (error) {
            alert("Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="flex h-screen items-center justify-center bg-gray-50">
            <Paper elevation={3} className="p-8 w-full max-w-md">
                <Typography variant="h5" className="text-center font-bold mb-6">
                    Admin Login
                </Typography>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        fullWidth label="Username"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <TextField
                        fullWidth label="Password" type="password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button fullWidth variant="contained" color="primary" type="submit" size="large">
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;