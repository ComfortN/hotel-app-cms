import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Define async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const querySnapshot = await getDocs(collection(database, 'users'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});


// Define async thunk for updating a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, updates }) => {
    const userDocRef = doc(database, 'users', id);
    await updateDoc(userDocRef, updates);
    return { id, ...updates };
});

// Define async thunk for blocking a user
export const blockUser = createAsyncThunk('users/blockUser', async (id) => {
    const userDocRef = doc(database, 'users', id);
    await updateDoc(userDocRef, { blocked: true });
    return id;
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