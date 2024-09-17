import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
            const user = { email, uid: 'admin123' };
            // Ensure the admin document is set up in Firestore
            const adminDocRef = doc(database, 'admins', user.uid);
            const adminDoc = await getDoc(adminDocRef);
            if (!adminDoc.exists()) {
                await setDoc(adminDocRef, {
                    firstName: 'Default',
                    lastName: 'Admin',
                    email: user.email,
                    profileImageUrl: '',
                });
            }
            return user;
        } else {
            try {
                // Perform Firebase authentication
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Ensure the admin document is set up in Firestore
                const adminDocRef = doc(database, 'admins', user.uid);
                const adminDoc = await getDoc(adminDocRef);
                if (!adminDoc.exists()) {
                    await setDoc(adminDocRef, {
                        firstName: 'Default',
                        lastName: 'Admin',
                        email: user.email,
                        profileImageUrl: '',
                    });
                }
                
                return user;
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
