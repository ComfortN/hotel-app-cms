import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations } from '../redux/accommodationSlice';
import { fetchReservations } from '../redux/reservationSlice';
import { fetchUsers } from '../redux/userSlice';
import {Box, Grid, Paper, Typography, Button, IconButton,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccommodationManager from './AccommodationManager';
import ReservationManager from './reservationManager'
import UserManager from './UserManager';

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const accommodations = useSelector((state) => state.accommodations.accommodations);
    const reservations = useSelector((state) => state.reservations.reservations);
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(fetchAccommodations());
        dispatch(fetchReservations());
        dispatch(fetchUsers());
    }, [dispatch]);

    if (!accommodations) {
        return <div>Loading...</div>;
    }
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
            Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Accommodations</Typography>
                <Typography variant="h4">{accommodations.length}</Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Reservations</Typography>
                <Typography variant="h4">{reservations.length}</Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{users.length}</Typography>
            </Paper>
            </Grid>
        </Grid>

        
    </Box>
    )
}
