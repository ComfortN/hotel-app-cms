// import React, {useState} from 'react'
// import { CssBaseline, Box } from '@mui/material';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';


// export default function Layout({ children }) {
//     const [isSidebarOpen, setSidebarOpen] = useState(false);

//     const handleDrawerToggle = () => {
//         setSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <Box sx={{ display: 'flex' }}>
//                 <CssBaseline />
//                 <Navbar onDrawerToggle={handleDrawerToggle} />
//                 <Sidebar open={isSidebarOpen} onClose={handleDrawerToggle} />
//                 <Box
//                     component="main"
//                     sx={{
//                         flexGrow: 1,
//                         bgcolor: 'background.default',
//                         p: 3,
//                         ml: 3,
//                         mt: 8,
//                     }}
//                 >
//                     {children}
//                 </Box>
//             </Box>
//     )
// }


import React, { useState } from 'react';
import { CssBaseline, Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar onDrawerToggle={handleDrawerToggle} />
      <Sidebar open={isSidebarOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: 8,
          ml: isSmallScreen ? 0 : '240px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
