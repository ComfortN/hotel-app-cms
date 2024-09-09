import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database} from '../firebase/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';


// Define initial state
const initialState = {
    reservations: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Create async thunks for fetching, adding, updating, and deleting reservations
export const fetchReservations = createAsyncThunk(
'reservations/fetchReservations',
async () => {
    const bookingsRef = collection(database, 'bookings');
    const snapshot = await getDocs(bookingsRef);
    const reservationsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('fetch: ', reservationsList)
    return reservationsList;
}
);

export const addReservation = createAsyncThunk(
'reservations/addReservation',
async (reservation) => {
    const bookingsRef = collection(database, 'bookings');
    const docRef = await addDoc(bookingsRef, reservation);
    return { id: docRef.id, ...reservation };
}
);

export const updateReservation = createAsyncThunk(
    'reservations/updateReservation',
    async ({ id, updatedReservation }) => {
    const reservationRef = doc(database, 'bookings', id);
    await updateDoc(reservationRef, updatedReservation);
    return { id, ...updatedReservation };
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

// Create the reservations slice
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
            const index = state.reservations.findIndex(res => res.id === action.payload.id);
            if (index !== -1) {
            state.reservations[index] = action.payload;
            }
        })
        .addCase(deleteReservation.fulfilled, (state, action) => {
            state.reservations = state.reservations.filter(res => res.id !== action.payload);
        });
    },
});

export default reservationSlice.reducer;
