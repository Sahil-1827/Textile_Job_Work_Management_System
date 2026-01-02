import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, MenuItem, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', password: '', role: 'admin' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupUser(formData);
            alert("Signup successful! Please login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <Box className="flex h-screen items-center justify-center bg-gray-100">
            <Paper elevation={3} className="p-8 w-full max-w-md">
                <Typography variant="h5" className="text-center font-bold mb-6">Create Account</Typography>

                {error && <Alert severity="error" className="mb-4">{error}</Alert>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        fullWidth label="Username" required
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        required
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        fullWidth label="Password" type="password" required
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <TextField
                        fullWidth select label="Role" value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>

                    <Button fullWidth variant="contained" color="primary" type="submit" size="large">
                        Sign Up
                    </Button>
                    <Button fullWidth variant="text" onClick={() => navigate('/login')}>
                        Already have an account? Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Signup;