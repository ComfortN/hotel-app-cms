import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, useTheme } from '@mui/material';

export default function Sidebar({ open, onClose }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const drawerContent = (
        <List>
        <ListItem button component={Link} to="/admin/dashboard">
            <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/accommodations">
            <ListItemText primary="Manage Accommodations" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/reservations">
            <ListItemText primary="Manage Reservations" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
            <ListItemText primary="Manage Users" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/gallery">
            <ListItemText primary="Manage Gallery" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button component={Link} to="/admin/reviews">
            <ListItemText primary="Manage Reviews" sx={{ color: 'white' }} />
        </ListItem>
        </List>
    );

    return (
        <>
        <Drawer variant={isSmallScreen ? "temporary" : "permanent"}
            open={open} onClose={onClose}
            sx={{
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box',
                backgroundColor: '#2F343B', color: 'white', marginTop: '64px',
            },
            }}
            ModalProps={{ keepMounted: true, }} >
            {drawerContent}
            <Divider />
        </Drawer>
        </>
    );
}
