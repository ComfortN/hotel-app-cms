// src/redux/reducers/notificationReducer.js
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, CLEAR_NOTIFICATIONS } from './actions/notificationActions';

const initialState = [];

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.payload];
    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.id !== action.payload);
    case CLEAR_NOTIFICATIONS:
      return [];
    default:
      return state;
  }
};