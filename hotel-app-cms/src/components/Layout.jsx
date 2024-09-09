import React from 'react'
import { CssBaseline, Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';


export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    ml: 3,
                    mt: 8,
                }}
            >
                {children}
            </Box>
        </Box>
  )
}
