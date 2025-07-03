import { configureStore } from '@reduxjs/toolkit';
import roleReducer from './roleSlice';

export const store = configureStore({
  reducer: {
    role: roleReducer,
  },
});

export default store;
