import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        isPlaying: false,
        gameCycle: [
            {key: '1d', title: '1Д'}, 
            {key: '1n', title: '2Н'}, 
            {key: '2d', title: '2Д'}, 
            {key: '2n', title: '2Н'}, 
            {key: '3d', title: '3Д'}, 
            {key: '3n', title: '3Н'}, 
            {key: '4d', title: '4Д'}, 
            {key: '4n', title: '4Н'}
        ],
        currentTimeOfDay: 0
    },
    reducers: {
        play: (state) => {
            state.isPlaying = true
        },
        setNextTime: (state) => {
            state.currentTimeOfDay += 1 
        }
    },
});

// selectors
export const selectIsPlaying = state => state.game.isPlaying;
export const selectGameCycle = state => state.game.gameCycle;
export const selectCurrentTimeOfDay = state => state.game.currentTimeOfDay;

export const { play, setNextTime } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
