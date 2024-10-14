// src/redux/actions/notificationActions.js
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

export const addNotification = (message) => ({
  type: ADD_NOTIFICATION,
  payload: { message, id: Date.now() }
});

export const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  payload: id
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS
});