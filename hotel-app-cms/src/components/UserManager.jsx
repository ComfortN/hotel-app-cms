import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';


export default function UserManager() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const userStatus = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers());
        }
    }, [userStatus, dispatch]);

    return (
        <Box>
        {userStatus === 'loading' && <Typography>Loading...</Typography>}
        {userStatus === 'failed' && <Typography>Error: {error}</Typography>}
        {userStatus === 'succeeded' && users.map((user) => (
            <Card key={user.id} sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6">User ID: {user.id}</Typography>
                    <Typography>Name: {user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Favorites: {user.favorites}</Typography>
                </CardContent>
            </Card>
        ))}
    </Box>
    )
}
