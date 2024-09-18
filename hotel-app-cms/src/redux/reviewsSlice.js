import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebase';

// Define initial state
const initialState = {
    reviews: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Async thunk for fetching reviews
export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async () => {
        const reviewsRef = collection(database, 'reviews');
        const snapshot = await getDocs(reviewsRef);
        const reviewsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return reviewsList;
    }
);

// Create reviews slice
const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchReviews.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchReviews.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.reviews = action.payload;
        })
        .addCase(fetchReviews.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default reviewsSlice.reducer;
