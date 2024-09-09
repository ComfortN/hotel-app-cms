import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, deleteReservation, updateReservation } from '../redux/reservationSlice';

export default function ReservationManager() {
    const dispatch = useDispatch();
    const reservations = useSelector((state) => state.reservations.reservations);
    const status = useSelector((state) => state.reservations.status);
    const error = useSelector((state) => state.reservations.error);

    const [open, setOpen] = useState(false);
    const [selectedReservationId, setSelectedReservationId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReservations());
        }
    }, [status, dispatch]);

    const handleApprove = (id) => {
        dispatch(updateReservation({ id, updatedReservation: { status: 'approved' } }));
    };


    const handleOpenRejectDialog = (id) => {
        setSelectedReservationId(id);
        setOpen(true);
    };

    const handleCloseRejectDialog = () => {
        setOpen(false);
        setSelectedReservationId(null);
        setRejectionReason('');
    };

    const handleReject = () => {
        if (rejectionReason.trim() === '') {
            return;
        }
        dispatch(updateReservation({ id: selectedReservationId, updatedReservation: { status: 'rejected', rejectionReason } }));
        handleCloseRejectDialog();
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
                            {reservation.cartItems[0]?.image && (
                                <img src={reservation.cartItems[0]?.image} alt={reservation.cartItems[0]?.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            )}
                            <Typography>Accommodation Name: {reservation.cartItems[0]?.name || 'N/A'}</Typography>
                            <Typography>Check-in: {reservation.checkInDate}</Typography>
                            <Typography>Check-out: {reservation.checkOutDate}</Typography>
                            <Typography>User Id: {reservation.userId}</Typography>
                            <Typography>Guest Name: {reservation.firstName} {reservation.lastName} </Typography>
                            <Typography>Status: {reservation.status}</Typography>
                            
                            <Typography>Price: ${reservation.cartItems[0]?.price || '0'}</Typography>
                            
                            <Button onClick={() => handleApprove(reservation.id)} variant="contained" color="primary" sx={{ mr: 1 }}>
                                Approve
                            </Button>
                            <Button onClick={() => handleOpenRejectDialog(reservation.id)} variant="contained" color="secondary" sx={{ mr: 1 }}>
                                Reject
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

<Dialog open={open} onClose={handleCloseRejectDialog}>
                <DialogTitle>Reject Reservation</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus margin="dense" id="reason" label="Reason for Rejection" type="text"
                        fullWidth variant="outlined" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRejectDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleReject} color="secondary">
                        Reject
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
