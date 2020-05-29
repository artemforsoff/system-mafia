import { configureStore } from '@reduxjs/toolkit';
import { playersReducer } from './playersSlice.js';
import { gameReducer } from './gameSlice.js';

export default configureStore({
    reducer: {
        players: playersReducer,
        game: gameReducer,
    },
});
