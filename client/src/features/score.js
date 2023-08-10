import { createSlice } from '@reduxjs/toolkit';

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    value: 0,
  },
  reducers: {
    updateScore: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateScore } = scoreSlice.actions;

export default scoreSlice.reducer;
