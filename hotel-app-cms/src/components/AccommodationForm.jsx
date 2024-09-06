import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, InputLabel, MenuItem, Select, FormControl, FormHelperText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { storage, database } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';


export default function AccommodationForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        location: '',
        image: '',
        amenities: [],
        policies: '',
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (id) {
        // Fetch existing accommodation details if `id` is provided
        const fetchAccommodation = async () => {
            const docRef = doc(database, 'accommodations', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            setFormData(docSnap.data());
            }
        };
        fetchAccommodation();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let imageUrl = '';
        if (imageFile) {
        // Upload image
        const imageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(imageRef, imageFile);

        uploadTask.on(
            'state_changed',
            null,
            (error) => console.error(error),
            async () => {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            await saveAccommodation(imageUrl);
            }
        );
        } else {
        await saveAccommodation(formData.imageUrl);
        }
    };

    const saveAccommodation = async (imageUrl) => {
        const accommodationRef = doc(database, 'accommodations', id || Date.now().toString());
        await setDoc(accommodationRef, { ...formData, image: imageUrl });
        navigate('/admin/accommodations');
    };
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                <TextField label="Name" name="name" value={formData.name} onChange={handleChange}
                    fullWidth required
                />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Description" name="description" value={formData.description}
                        onChange={handleChange} fullWidth multiline rows={4} required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Price" name="price" type="number" value={formData.price}
                        onChange={handleChange} fullWidth required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Location" name="location" value={formData.location} onChange={handleChange}
                        fullWidth required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel>Amenities</InputLabel>
                    <Select multiple name="amenities" value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    renderValue={(selected) => selected.join(', ')}
                    >
                    <MenuItem value="WiFi">WiFi</MenuItem>
                    <MenuItem value="Pool">Pool</MenuItem>
                    <MenuItem value="Parking">Parking</MenuItem>
                    <MenuItem value="Gym">Gym</MenuItem>
                    
                    </Select>
                    <FormHelperText>Select amenities</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField  label="Policies" name="policies" value={formData.policies}
                        onChange={handleChange} fullWidth multiline rows={3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <input type="file" onChange={handleImageChange} />
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                    {id ? 'Update Accommodation' : 'Add Accommodation'}
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/admin/accommodations')}
                >
                    Cancel
                </Button>
                </Grid>
            </Grid>
    </form>
    )
}
