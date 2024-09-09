import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: null,
    },
    reducers: {
        updateAdminProfile(state, action) {
            state.admin = { ...state.admin, ...action.payload };
        },
    },
});

export const { updateAdminProfile } = adminSlice.actions;

export default adminSlice.reducer;
