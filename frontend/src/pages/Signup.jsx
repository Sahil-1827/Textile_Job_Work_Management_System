import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, MenuItem, Alert, CircularProgress, useTheme } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../services/api';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signupUser(formData);
            alert("Signup successful! Have ma login karo.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                : 'linear-gradient(135deg, #111827 0%, #000000 100%)'
        }}>
            <Paper elevation={10} sx={{ p: 5, width: '100%', maxWidth: 450, borderRadius: 4, bgcolor: 'background.paper' }}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 800, mb: 1, color: 'primary.main' }}>
                    Create Account
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                    Join Textile MS to manage your business
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <TextField
                        fullWidth label="Username" required variant="outlined"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <TextField
                        fullWidth label="Email Address" type="email" required variant="outlined"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        fullWidth label="Password" type="password" required variant="outlined"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <TextField
                        fullWidth select label="Role" value={formData.role} variant="outlined"
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>

                    <Button
                        fullWidth variant="contained" type="submit" size="large"
                        disabled={loading} sx={{ py: 1.5, mt: 1, fontWeight: 'bold', fontSize: '1rem' }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                    </Button>
                </form>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account? <Link to="/login" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>Login Here</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Signup;