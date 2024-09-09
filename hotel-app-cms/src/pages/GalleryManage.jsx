import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { database, storage } from '../firebase/firebase';

export default function GalleryManage() {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, 'gallery'));
                const fetchedImages = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setImages(fetchedImages);
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };

        fetchImages();
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
            if (!image) {
                throw new Error('No image selected.');
            }

            const imageRef = ref(storage, `galleryImages/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            // Save image URL and description to Firestore
            await addDoc(collection(database, 'gallery'), {
                imageUrl,
                description,
                createdAt: new Date(),
            });

            setSuccess('Image added successfully!');
            setDescription('');
            setImage(null);

            // Refresh the images list
            const querySnapshot = await getDocs(collection(database, 'gallery'));
            const fetchedImages = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setImages(fetchedImages);
        } catch (err) {
            setError('Failed to add image.');
            console.error('Error adding image:', err);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ width: '100%', mx: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Gallery Manager
            </Typography>
            <input
                type="file" accept="image/*" onChange={handleImageChange}
                style={{ display: 'block', marginBottom: '16px' }}
            />
            <TextField
                label="Description" variant="outlined" fullWidth margin="normal" value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button
                variant="contained" color="primary" fullWidth onClick={handleSave}
                disabled={loading}
                sx={{ mt: 2 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Add Image'}
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Gallery
            </Typography>
            <Grid container spacing={2}>
                {images.map((img) => (
                    <Grid item xs={12} sm={6} md={4} key={img.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={img.imageUrl}
                                alt={img.description}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {img.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
