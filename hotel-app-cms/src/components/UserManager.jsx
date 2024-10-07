import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
            <Typography variant="h5" gutterBottom>
                Manage Users
            </Typography>
            {userStatus === 'loading' && <Typography>Loading...</Typography>}
            {userStatus === 'failed' && <Typography>Error: {error}</Typography>}
            {userStatus === 'succeeded' && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>User ID</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>First Name</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Last Name</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Email</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Phone</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Address</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Favorites</TableCell>
                                <TableCell sx={{backgroundColor: '#2F343B', color: '#FFFFFF', border: '1px solid #ddd', fontWeight: 'bold', }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.favorites || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => handleOpenEditDialog(user)} sx={{ mr: 1, backgroundColor: '#2F343B', color: '#FFFFFF' }}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" onClick={() => handleBlockUser(user.id)} sx={{backgroundColor: '#2F343B', color: '#FFFFFF'}}>
                                            Block
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Edit User Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name" name="firstName" value={editUser.firstName} onChange={handleEditChange}
                        fullWidth margin="normal" />
                    <TextField
                        label="Last Name"  name="lastName" value={editUser.lastName} onChange={handleEditChange}
                        fullWidth margin="normal" />
                    <TextField
                        label="Email" name="email" type="email" value={editUser.email} onChange={handleEditChange}
                        fullWidth margin="normal" />
                    <TextField
                        label="Phone" name="phone" value={editUser.phone} onChange={handleEditChange}
                        fullWidth margin="normal" />
                    <TextField
                        label="Address" name="address" value={editUser.address} onChange={handleEditChange}
                        fullWidth  margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained" sx={{backgroundColor: '#2F343B', color: '#FFFFFF'}}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
