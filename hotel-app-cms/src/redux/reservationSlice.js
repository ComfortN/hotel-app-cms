import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const initialState = {
    reservations: [],
    status: 'idle',
    error: null,
};

const convertTimestamps = (obj) => {
    const newObj = {...obj};
    for (let [key, value] of Object.entries(newObj)) {
        if (value && typeof value.toDate === 'function') {
            newObj[key] = value.toDate().toISOString();
        } else if (value && typeof value === 'object') {
            newObj[key] = convertTimestamps(value);
        }
    }
    return newObj;
};

export const fetchReservations = createAsyncThunk(
    'reservations/fetchReservations',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching reservations from Firestore...');
            const bookingsRef = collection(database, 'bookings');
            const snapshot = await getDocs(bookingsRef);
            
            if (snapshot.empty) {
                console.log('No reservations found in Firestore.');
                return [];
            }

            const reservationsList = snapshot.docs.map(doc => {
                const data = doc.data();
                console.log(`Fetched reservation with ID: ${doc.id}`);
                return {
                    id: doc.id,
                    ...data,
                };
            });

            console.log('Fetched reservations:', reservationsList);
            return reservationsList;
        } catch (error) {
            console.error('Error fetching reservations:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const addReservation = createAsyncThunk(
    'reservations/addReservation',
    async (reservation) => {
        const bookingsRef = collection(database, 'bookings');
        const reservationWithStatus = { ...reservation, status: 'pending' };
        const docRef = await addDoc(bookingsRef, reservationWithStatus);
        return convertTimestamps({ id: docRef.id, ...reservationWithStatus });
    }
);

export const updateReservation = createAsyncThunk(
    'reservations/updateReservation',
    async ({ id, updatedReservation }, { rejectWithValue }) => {
        try {
            console.log('Updating reservation:', id, updatedReservation);
            const reservationRef = doc(database, 'bookings', id);
            
            // Remove the id field from the update data
            const { id: _, ...updateData } = updatedReservation;

            await updateDoc(reservationRef, updateData);
            console.log('Update successful');
            return { id, ...updatedReservation };
        } catch (error) {
            console.error('Error updating reservation:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const deleteReservation = createAsyncThunk(
    'reservations/deleteReservation',
    async (id) => {
        const reservationRef = doc(database, 'bookings', id);
        await deleteDoc(reservationRef);
        return id;
    }
);

const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReservations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reservations = action.payload;
            })
            .addCase(fetchReservations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addReservation.fulfilled, (state, action) => {
                state.reservations.push(action.payload);
            })
            .addCase(updateReservation.fulfilled, (state, action) => {
                console.log('Update fulfilled:', action.payload);
                const index = state.reservations.findIndex(res => res.id === action.payload.id);
                if (index !== -1) {
                    state.reservations[index] = action.payload;
                }
            })
            .addCase(updateReservation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to update reservation';
            })
            .addCase(deleteReservation.fulfilled, (state, action) => {
                state.reservations = state.reservations.filter(res => res.id !== action.payload);
            });
    },
});

export default reservationSlice.reducer;