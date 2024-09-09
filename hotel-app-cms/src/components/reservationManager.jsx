import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, deleteReservation, updateReservation } from '../redux/reservationSlice';

export default function ReservationManager() {
    const dispatch = useDispatch();
    const reservations = useSelector((state) => state.reservations.reservations);
    const status = useSelector((state) => state.reservations.status);
    const error = useSelector((state) => state.reservations.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReservations());
        }
    }, [status, dispatch]);

    const handleApprove = (id) => {
        dispatch(updateReservation({ id, updatedReservation: { status: 'approved' } }));
    };

    const handleCancel = (id) => {
        dispatch(deleteReservation(id));
    };

    return (
        <Box>
            {status === 'loading' && <CircularProgress />}
            {status === 'failed' && <Alert severity="error">{error}</Alert>}
            {status === 'succeeded' && reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <Card key={reservation.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Reservation ID: {reservation.id}</Typography>
                            <Typography>Check-in: {reservation.checkInDate}</Typography>
                            <Typography>Check-out: {reservation.checkOutDate}</Typography>
                            <Typography>Guest Name: {reservation.firstName} {reservation.lastName} </Typography>
                            <Typography>Status: {reservation.status}</Typography>
                            <Button onClick={() => handleApprove(reservation.id)} variant="contained" color="primary" sx={{ mr: 1 }}>
                                Approve
                            </Button>
                            <Button onClick={() => handleCancel(reservation.id)} variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No reservations available.</Typography>
            )}
        </Box>
    );
}
