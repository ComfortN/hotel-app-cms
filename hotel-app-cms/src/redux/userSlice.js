import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Define async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const querySnapshot = await getDocs(collection(database, 'users'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Define initial state
const initialState = {
    users: [],
    status: 'idle',
    error: null,
};

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default userSlice.reducer;