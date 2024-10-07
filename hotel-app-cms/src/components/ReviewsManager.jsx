import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../redux/reviewsSlice';

export default function ReviewsManager() {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews?.reviews || []);
    const status = useSelector((state) => state.reviews.status || 'idle');
    const error = useSelector((state) => state.reviews.error || null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReviews());
        }
    }, [status, dispatch]);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Manage Reviews
            </Typography>
            {status === 'loading' && <CircularProgress />}
            {status === 'failed' && <Alert severity="error">{error}</Alert>}
            {status === 'succeeded' && reviews.length > 0 ? (
                reviews.map((review) => (
                    <Card key={review.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Review by: {review.userName}</Typography>
                            <Typography>Booking ID: {review.bookingId}</Typography>
                            <Typography>Service Name: {review.name}</Typography>
                            <Typography>Rating: {review.rating}</Typography>
                            <Typography>Date: {new Date(review.createdAt.seconds * 1000).toLocaleDateString()}</Typography>
                            <Typography>Review: {review.text}</Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No reviews available.</Typography>
            )}
        </Box>
    );
}
