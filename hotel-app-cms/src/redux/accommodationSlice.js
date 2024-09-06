import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const fetchAccommodations = createAsyncThunk('accommodations/fetchAccommodations', async () => {
    const querySnapshot = await getDocs(collection(database, 'accommodations'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addAccommodation = createAsyncThunk('accommodations/addAccommodation', async (newAccommodation) => {
    const docRef = await addDoc(collection(database, 'accommodations'), newAccommodation);
    return { id: docRef.id, ...newAccommodation };
});

export const updateAccommodation = createAsyncThunk('accommodations/updateAccommodation', async ({ id, updatedAccommodation }) => {
    const docRef = doc(database, 'accommodations', id);
    await updateDoc(docRef, updatedAccommodation);
    return { id, ...updatedAccommodation };
});

export const deleteAccommodation = createAsyncThunk('accommodations/deleteAccommodation', async (id) => {
    await deleteDoc(doc(database, 'accommodations', id));
    return id;
});

const initialState = {
    accommodations: [],
    status: 'idle',
    error: null,
};

const accommodationSlice = createSlice({
    name: 'accommodation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAccommodations.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAccommodations.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.accommodations = action.payload;
        })
        .addCase(fetchAccommodations.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addAccommodation.fulfilled, (state, action) => {
            state.accommodations.push(action.payload);
        })
        .addCase(updateAccommodation.fulfilled, (state, action) => {
            const index = state.accommodations.findIndex(acc => acc.id === action.payload.id);
            state.accommodations[index] = action.payload;
        })
        .addCase(deleteAccommodation.fulfilled, (state, action) => {
            state.accommodations = state.accommodations.filter(acc => acc.id !== action.payload);
        });
    },
});

export default accommodationSlice.reducer;
