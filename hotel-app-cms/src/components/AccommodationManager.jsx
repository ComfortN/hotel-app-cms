import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations, deleteAccommodation, updateAvailability  } from '../redux/accommodationSlice';
import { Container, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function AccommodationManager() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accommodations = useSelector((state) => state.accommodations?.accommodations || []);
    const status = useSelector((state) => state.accommodations.status || 'idle');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
        dispatch(fetchAccommodations());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAccommodation(id));
    };


    const handleOpen = () => {
        setOpen(true);
    };
        
    const handleClose = () => {
        setOpen(false);
    };


    const handleEdit = (id) => {
        navigate(`/admin/accommodations/edit/${id}`);
    };
    

    const handleAddNewAccommodation = () => {
        navigate('/admin/accommodations/new');
    };

    const handleUpdateAccommodation = (id) => {
        navigate(`/admin/accommodations/${id}`);
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
                variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={handleAddNewAccommodation}
            >
                Add New Accommodation
            </Button>
            <Grid container spacing={3}>
                {accommodations.map((acc) => (
                    <Grid item key={acc.id} xs={12}>
                        <Paper style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
                            <img src={acc.image} alt={acc.name} style={{ width: '150px', height: '150px', marginRight: '20px', objectFit: 'cover' }} />
                            <div>
                                <Typography variant="h6">{acc.name}</Typography>
                                <Typography variant="body2">Price: R{acc.price}</Typography>
                                <Typography variant="body1">{acc.description}</Typography>
                                
                                <Typography variant="body2">Location: {acc.location}</Typography>
                                <Typography variant="body2">Amenities: {acc.amenities.join(', ')}</Typography>
                                {/* <Typography variant="body2">Policies: {acc.policies}</Typography> */}
                                
                                <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => handleEdit(acc.id)}>
                                    Edit
                                </Button>
                                
                                
                                <Button variant="outlined" color="secondary"  sx={{ mr: 1 }} onClick={() => handleDelete(acc.id)} >
                                    Delete
                                </Button>

                                <Button
                                    variant="outlined"
                                    color={acc.availability === 'available' ? 'success' : 'warning'}
                                    onClick={() => handleUpdateAvailability(acc.id, acc.availability)}
                                    style={{ marginTop: '10px', marginLeft: '10px' }}
                                >
                                    {acc.availability === 'available' ? 'Mark as Booked' : 'Mark as Available'}
                                </Button>
                                
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
