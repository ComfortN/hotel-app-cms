import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations, deleteAccommodation, updateAvailability} from '../redux/accommodationSlice';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, IconButton, TableRow, TableContainer, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function AccommodationManager() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accommodations = useSelector((state) => state.accommodations?.accommodations || []);
    const status = useSelector((state) => state.accommodations.status || 'idle');
    const [open, setOpen] = useState(false);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null); // State to track selected accommodation

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAccommodations());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAccommodation(id));
    };

    const handleOpen = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAccommodation(null); // Clear selected accommodation
    };

    const handleEdit = (id) => {
        navigate(`/admin/accommodations/edit/${id}`);
    };

    const handleAddNewAccommodation = () => {
        navigate('/admin/accommodations/new');
    };

    const handleUpdateAvailability = (id, currentStatus) => {
        const newStatus = currentStatus === 'available' ? 'booked' : 'available';
        dispatch(updateAvailability({ id, status: newStatus }));
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Manage Accommodations
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: '20px' }}
                onClick={handleAddNewAccommodation}
                sx={{background: '#2F343B'}}
            >
                Add New Accommodation
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Image</TableCell>
                            <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Name</TableCell>
                            <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Price</TableCell>
                            <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Description</TableCell>
                            <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Location</TableCell>
                            <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Amenities</TableCell>
                            <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Actions</TableCell>
                            <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Availability</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accommodations.map((acc) => (
                            <TableRow key={acc.id}>
                                <TableCell>
                                    <img src={acc.image} alt={acc.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                </TableCell>
                                <TableCell>{acc.name}</TableCell>
                                <TableCell>R{acc.price}</TableCell>
                                <TableCell>
                                    {acc.description.length > 100 ? (
                                        <>
                                            {acc.description.substring(0, 10)}...
                                            <Button variant="text" color="primary" onClick={() => handleOpen(acc)}>
                                                Read More
                                            </Button>
                                        </>
                                    ) : acc.description}
                                </TableCell>
                                <TableCell>{acc.location}</TableCell>
                                <TableCell>{acc.amenities.join(', ')}</TableCell>
                                <TableCell>
                                <IconButton color="primary" onClick={() => handleEdit(acc.id)}>
                                        <Edit sx={{color: '#2F343B'}}/>
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(acc.id)}>
                                        <Delete sx={{color: '#2F343B'}}/>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color={acc.availability === 'available' ? 'success' : 'warning'}
                                        onClick={() => handleUpdateAvailability(acc.id, acc.availability)}
                                    >
                                        {acc.availability === 'available' ? 'Mark as Booked' : 'Mark as Available'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for accommodation details */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedAccommodation?.name}</DialogTitle>
                <DialogContent>
                    <img
                        src={selectedAccommodation?.image}
                        alt={selectedAccommodation?.name}
                        style={{ width: '60%', height: 'auto', marginBottom: '20px' }}
                    />
                    <DialogContentText>
                        <strong>Price:</strong> R{selectedAccommodation?.price} <br />
                        <strong>Description:</strong> {selectedAccommodation?.description} <br />
                        <strong>Location:</strong> {selectedAccommodation?.location} <br />
                        <strong>Amenities:</strong> {selectedAccommodation?.amenities.join(', ')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
