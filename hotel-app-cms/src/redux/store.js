import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './accommodationSlice';
import reservationReducer from './reservationSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        accommodations: accommodationReducer,
        reservations: reservationReducer,
        users: userReducer,
    },
});

export default store;
