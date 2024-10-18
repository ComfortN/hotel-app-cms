import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LuxeStay Hotel logo (1).png';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth || { status: 'idle', error: null, user: null });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box 
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
                justifyContent: 'center', height: '100vh', backgroundColor: '#2f343b', m: 0, p: 0, color: 'black' 
            }}
        >
            <Box sx={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems:'center' }}>
                <img src={logo} alt="Logo" style={{ width: '120px', marginBottom: '20px' }} />
                <Typography variant="h4" gutterBottom sx={{mx:5}}>
                    Admin Login
                </Typography>
                <TextField
                    label="Email" variant="outlined" fullWidth margin="normal"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: '90%', mx:3, color: 'white' }}
                />
                <TextField
                    label="Password" type="password" variant="outlined" fullWidth
                    margin="normal" value={password} onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: '90%', mx:3, color: 'white' }}
                />
                <Button
                    variant="contained"
                    fullWidth onClick={handleLogin} disabled={status === 'loading'}
                    sx={{ mt: 2, mb:2, width: '90%', mx: 3, backgroundColor: '#1e1e1e' }}
                >
                    {status === 'loading' ? <CircularProgress size={24} /> : 'Login'}
                </Button>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Box>
        </Box>
    );
}
