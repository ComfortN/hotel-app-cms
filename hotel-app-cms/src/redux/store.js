import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './accommodationSlice';
import reservationReducer from './reservationSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        accommodations: accommodationReducer,
        reservations: reservationReducer,
        users: userReducer,
        auth: authReducer,
    },
});

export default store;
