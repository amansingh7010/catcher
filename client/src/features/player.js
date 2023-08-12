import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    value: null,
  },
  reducers: {
    updatePlayerId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updatePlayerId } = playerSlice.actions;

export default playerSlice.reducer;
