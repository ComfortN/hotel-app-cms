import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const initialState = {
    user: null,
    status: 'idle',
    error: null,
};


const defaultAdminEmail = 'admin@lexestay.com';
const defaultAdminPassword = 'admin123';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }) => {
        if (email === defaultAdminEmail && password === defaultAdminPassword) {
            // Simulate successful login for default admin
            return { email, uid: 'admin123' };
        } else {
            try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
            } catch (error) {
            throw new Error(error.message);
            }
        }
        }
    );

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser(state) {
        state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
