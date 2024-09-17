import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';


export default function Navbar({ onDrawerToggle }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        handleMenuClose();
    };

    const open = Boolean(anchorEl);


    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor: '#2F343B'}}>
            <Toolbar>
                <IconButton edge="start" color="inherit" ia-label="menu"
                onClick={onDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    LaxeStay Admin Panel
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="account of current user" aria-controls="menu-appbar"
                    aria-haspopup="true" onClick={handleMenuOpen} >
                    <AccountCircleIcon />
                </IconButton>
                <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                    keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                    open={open} onClose={handleMenuClose} >
                    <MenuItem onClick={handleMenuClose}>
                        <Link to="/admin/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
