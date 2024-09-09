import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import '../styles/Sidebar.css';


export default function Sidebar() {
    return (
        <Drawer
        variant="permanent"
        sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': {
            width: 240, boxSizing: 'border-box',},
        }}
        >
        <List>
            <ListItem button component={Link} to="/admin/dashboard">
            <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/admin/accommodations">
            <ListItemText primary="Manage Accommodations" />
            </ListItem>
            <ListItem button component={Link} to="/admin/reservations">
            <ListItemText primary="Manage Reservations" />
            </ListItem>
            <ListItem button component={Link} to="/admin/users">
            <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button component={Link} to="/admin/gallery">
            <ListItemText primary="Manage Gallery" />
            </ListItem>
        </List>
        <Divider />
    </Drawer>
    )
}
