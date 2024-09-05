import React from 'react';
import { Box, Card, CardContent, Typography, } from '@mui/material';


export default function UserManager({ users }) {
    return (
        <Box>
        {users.map((user) => (
            <Card key={user.id} sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">User ID: {user.id}</Typography>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
            </CardContent>
            </Card>
        ))}
        </Box>
    )
}
