import { configureStore } from '@reduxjs/toolkit';
import accommodationReducer from './accommodationSlice';
import reservationReducer from './reservationSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import reviewsReducer from './reviewsSlice';
import { notificationReducer } from './notificationReducer';

const store = configureStore({
    reducer: {
        accommodations: accommodationReducer,
        reservations: reservationReducer,
        users: userReducer,
        auth: authReducer,
        reviews: reviewsReducer,
        notifications: notificationReducer,
    },
});

export default store;
