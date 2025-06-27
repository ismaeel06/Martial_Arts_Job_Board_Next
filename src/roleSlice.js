import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'admin', // default role
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
