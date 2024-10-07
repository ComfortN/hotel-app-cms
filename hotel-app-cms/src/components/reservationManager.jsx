import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

    const handleApprove = (reservation) => {
        dispatch(updateReservation({ 
            id: reservation.id,
            updatedReservation: { ...reservation, status: 'approved' } 
        }));
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
        const reservation = reservations.find(r => r.id === selectedReservationId);
        dispatch(updateReservation({ 
            id: selectedReservationId, 
            updatedReservation: { ...reservation, status: 'rejected', rejectionReason } 
        }));
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
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Reservation ID</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Image</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Accommodation Name</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Check-in</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Check-out</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Guest Name</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Status</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Price</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                    <TableCell>{reservation.id}</TableCell>
                                    <TableCell>
                                        {reservation.cartItems && reservation.cartItems[0]?.image && (
                                            <img
                                                src={reservation.cartItems[0]?.image}
                                                alt={reservation.cartItems[0]?.name}
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{reservation.cartItems && reservation.cartItems[0]?.name || 'N/A'}</TableCell>
                                    <TableCell>{reservation.checkInDate}</TableCell>
                                    <TableCell>{reservation.checkOutDate}</TableCell>
                                    <TableCell>{reservation.firstName} {reservation.lastName}</TableCell>
                                    <TableCell>{reservation.status || 'pending'}</TableCell>
                                    <TableCell>R{reservation.totalAmount || '0'}</TableCell>
                                    <TableCell>
                                        {(!reservation.status || reservation.status === 'pending') && (
                                            <>
                                                <Button onClick={() => handleApprove(reservation)} variant="contained" sx={{ mb: 1, backgroundColor: '#2F343B', color: '#FFFFFF' }}>
                                                    Approve
                                                </Button>
                                                <Button onClick={() => handleOpenRejectDialog(reservation.id)} variant="contained" sx={{ mb: 1, backgroundColor: '#2F343B', color: '#FFFFFF' }}>
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        <Button onClick={() => handleCancel(reservation.id)} variant="contained">
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No reservations available.</Typography>
            )}

            <Dialog open={open} onClose={handleCloseRejectDialog}>
                <DialogTitle>Reject Reservation</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus margin="dense" id="reason" label="Reason for Rejection" type="text" fullWidth
                        variant="outlined" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)}
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