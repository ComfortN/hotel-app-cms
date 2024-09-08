import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth || { status: 'idle', error: null });
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
    navigate('/admin/dashboard')
  };


  return (
    <Box sx={{ width: '300px', mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <TextField
        label="Email" variant="outlined" fullWidth margin="normal"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password" type="password" variant="outlined" fullWidth
        margin="normal" value={password} onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained" color="primary"
        fullWidth onClick={handleLogin} disabled={status === 'loading'}
        sx={{ mt: 2 }}
      >
        {status === 'loading' ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  )
}
