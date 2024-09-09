import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, blockUser } from '../redux/userSlice';


export default function UserManager() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const userStatus = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);

    const [selectedUser, setSelectedUser] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editUser, setEditUser] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '' });


    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers());
        }
    }, [userStatus, dispatch]);


    const handleOpenEditDialog = (user) => {
        setSelectedUser(user);
        setEditUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address
        });
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleEditChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = () => {
        dispatch(updateUser({ id: selectedUser.id, updates: editUser }));
        handleCloseEditDialog();
    };

    const handleBlockUser = (userId) => {
        dispatch(blockUser(userId));
    };

    return (
        <Box>
        {userStatus === 'loading' && <Typography>Loading...</Typography>}
        {userStatus === 'failed' && <Typography>Error: {error}</Typography>}
        {userStatus === 'succeeded' && users.map((user) => (
            <Card key={user.id} sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6">User ID: {user.id}</Typography>
                    <Typography>Name: {user.firstName} {user.lastName}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Phone: {user.phone}</Typography>
                    <Typography>Address: {user.address}</Typography>
                    <Typography>Favorites: {user.favorites}</Typography>

                    <Button variant="outlined" color="primary" onClick={() => handleOpenEditDialog(user)} sx={{ mr: 1 }}>
                        Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleBlockUser(user.id)}>
                        Block
                    </Button>
                </CardContent>
            </Card>
        ))}

<Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name" name="firstName" value={editUser.firstName}
                        onChange={handleEditChange} fullWidth margin="normal"
                    />
                    <TextField
                        label="Last Name" name="lastName" value={editUser.lastName} onChange={handleEditChange}
                        fullWidth margin="normal"
                    />
                    <TextField
                        label="Email" name="email" type="email" value={editUser.email} onChange={handleEditChange}
                        fullWidth margin="normal"
                    />
                    <TextField
                        label="Phone" name="phone" value={editUser.phone} onChange={handleEditChange}
                        fullWidth margin="normal"
                    />
                    <TextField
                        label="Address" name="address" value={editUser.address} onChange={handleEditChange}
                        fullWidth margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
    </Box>
    )
}
