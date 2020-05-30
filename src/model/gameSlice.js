import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        isPlaying: false,
        gameCycle: [
            {key: '1d', title: '1Д', fullTitle: 'Первый день'}, 
            {key: '1n', title: '2Н', fullTitle: 'Первая ночь'}, 
            {key: '2d', title: '2Д', fullTitle: 'Второй день'}, 
            {key: '2n', title: '2Н', fullTitle: 'Вторая ночь'}, 
            {key: '3d', title: '3Д', fullTitle: 'Третий день'}, 
            {key: '3n', title: '3Н', fullTitle: 'Третья ночь'}, 
            {key: '4d', title: '4Д', fullTitle: 'Четвёртый день'}, 
            {key: '4n', title: '4Н', fullTitle: 'Четвёртая ночь'}
        ],
        currentTimeOfDay: null
    },
    reducers: {
        play: (state) => {
            state.isPlaying = true;
            state.currentTimeOfDay = 0;
        },
        setNextTime: (state, action) => {
            if(action.payload === 'return') {
                state.currentTimeOfDay -= 1;
            } else {
                state.currentTimeOfDay += 1;
            }
        }
    },
});

// selectors
export const selectIsPlaying = state => state.game.isPlaying;
export const selectGameCycle = state => state.game.gameCycle;
export const selectCurrentTimeOfDay = state => state.game.currentTimeOfDay;

export const { play, setNextTime } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
