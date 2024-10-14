// import React from 'react';
// import { Link } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import MenuIcon from '@mui/icons-material/Menu';


// export default function Navbar({ onDrawerToggle }) {
//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const handleMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleLogout = () => {
//         console.log("Logout clicked");
//         handleMenuClose();
//     };

//     const open = Boolean(anchorEl);


//     return (
//         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor: '#2F343B'}}>
//             <Toolbar>
//                 <IconButton edge="start" color="inherit" ia-label="menu"
//                 onClick={onDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}
//         >
//             <MenuIcon />
//         </IconButton>
//                 <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                     LaxeStay Admin Panel
//                 </Typography>
//                 <IconButton edge="end" color="inherit" aria-label="account of current user" aria-controls="menu-appbar"
//                     aria-haspopup="true" onClick={handleMenuOpen} >
//                     <AccountCircleIcon />
//                 </IconButton>
//                 <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
//                     keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
//                     open={open} onClose={handleMenuClose} >
//                     <MenuItem onClick={handleMenuClose}>
//                         <Link to="/admin/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
//                             Profile
//                         </Link>
//                     </MenuItem>
//                     <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                 </Menu>
//             </Toolbar>
//         </AppBar>
//     )
// }



import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Badge } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Navbar({ onDrawerToggle }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
    const notifications = useSelector(state => state.notifications) || [];

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationOpen = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        handleMenuClose();
    };

    const open = Boolean(anchorEl);
    const notificationOpen = Boolean(notificationAnchorEl);

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2F343B' }}>
            <Toolbar>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu"
                    onClick={onDrawerToggle} 
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    LaxeStay Admin Panel
                </Typography>
                <IconButton 
                    color="inherit" 
                    onClick={handleNotificationOpen}
                >
                    <Badge badgeContent={notifications.length} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Menu
                    anchorEl={notificationAnchorEl}
                    open={notificationOpen}
                    onClose={handleNotificationClose}
                >
                    {notifications.map((notification, index) => (
                        <MenuItem key={index} onClick={handleNotificationClose}>
                            {notification.message}
                        </MenuItem>
                    ))}
                    {notifications.length === 0 && (
                        <MenuItem>No new notifications</MenuItem>
                    )}
                </Menu>
                <IconButton 
                    edge="end" 
                    color="inherit" 
                    aria-label="account of current user" 
                    aria-controls="menu-appbar"
                    aria-haspopup="true" 
                    onClick={handleMenuOpen} 
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu 
                    id="menu-appbar" 
                    anchorEl={anchorEl} 
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted 
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open} 
                    onClose={handleMenuClose} 
                >
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