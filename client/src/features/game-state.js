import { createSlice } from '@reduxjs/toolkit';

import { NEW_GAME } from '../constants/game-states';

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    value: NEW_GAME,
  },
  reducers: {
    updateGameState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default gameStateSlice.reducer;
