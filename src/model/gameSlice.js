import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        isPlaying: false
    },
    reducers: {
        play: (state) => {
            state.isPlaying = !state.isPlaying
        },
    },
});


export const selectIsPlaying = state => state.game.isPlaying;

export const { play } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
