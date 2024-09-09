import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Avatar, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminProfile } from '../redux/adminSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, database } from '../firebase/firebase';

export default function AdminPage() {
  const [admin, setAdmin] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const storage = getStorage();
    const dispatch = useDispatch();
    
    useEffect(() => {
      const fetchAdmin = async () => {
          try {
              const adminDoc = await getDoc(doc(database, 'admins', auth.currentUser.uid));
              if (adminDoc.exists()) {
                  setAdmin(adminDoc.data());
                  setName(adminDoc.data().name);
                  setEmail(adminDoc.data().email);
              } else {
                  
                  await setDoc(doc(database, 'admins', auth.currentUser.uid), {
                      name: 'Default Admin',
                      email: 'admin@example.com',
                      profileImageUrl: '',
                  });
                  setAdmin({
                      name: 'Default Admin',
                      email: 'admin@example.com',
                      profileImageUrl: '',
                  });
              }
          } catch (error) {
              console.error('Error fetching admin data:', error);
          }
      };
      fetchAdmin();
  }, []);
    
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            let profileImageUrl = '';
            if (image) {
                const imageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${image.name}`);
                await uploadBytes(imageRef, image);
                profileImageUrl = await getDownloadURL(imageRef);
            }
            
            await updateDoc(doc(database, 'admins', auth.currentUser.uid), {
                name,
                email,
                profileImageUrl,
            });
            
            setSuccess('Profile updated successfully!');
            dispatch(updateAdminProfile({ name, email, profileImageUrl }));
        } catch (err) {
            setError('Failed to update profile.');
            console.error('Error updating profile:', err);
        }
        setLoading(false);
    };


  return (
    <Box sx={{ width: '400px', mx: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Edit Profile
            </Typography>
            {admin && (
                <>
                    <Avatar
                        alt="Profile Image" src={admin.profileImageUrl || '/default-avatar.png'}
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <input
                        type="file" accept="image/*" onChange={handleImageChange}
                        style={{ display: 'block', marginBottom: '16px' }}
                    />
                    <TextField
                        label="Name" variant="outlined" fullWidth margin="normal" value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email" type="email" variant="outlined" fullWidth margin="normal" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        variant="contained" color="primary" fullWidth onClick={handleSave} disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                    </Button>
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
                </>
            )}
        </Box>
  )
}
