import { createSlice } from '@reduxjs/toolkit';

export const playersSlice = createSlice({
    name: 'players',
    initialState: {
        players: Array(10).fill(null).map((_, i) => (
            {
                id: i + 1,
                key: i + 1,
                role: null,
                name: '',
                killed: false,
                kicked: false,
                isEditingName: true,
                isEditingRole: true,
                fines: {
                    first: false,
                    second: false,
                    third: false,
                },
                lifeCycle: {
                    '1d': null,
                    '1n': null,
                    '2d': null,
                    '2n': null,
                    '3d': null,
                    '3n': null,
                    '4d': null,
                    '4n': null,
                }
            }
        )),
    },
    reducers: {
        kill: (state, action) => {
            console.log(action)
            state.players = state.players.map(player => {
                return player.id === action.payload.id ? {
                    ...player, 
                    killed: !player.killed,
                    lifeCycle: {
                        ...player.lifeCycle,
                        [action.payload.lifeCycleKey]: player.killed ? null : 'Убили'
                    }
                } : player;
            });
        },
        kick: (state, action) => {
            state.players = state.players.map(player => {
                return player.id === action.payload.id ? {
                    ...player, 
                    kicked: !player.kicked,
                    lifeCycle: {
                        ...player.lifeCycle,
                        [action.payload.lifeCycleKey]: player.kicked ? null : 'За решёткой'
                    }
                } : player;
            });
        },
        editName: (state, action) => {
            state.players = state.players.map(player => {
                return player.id === action.payload ? {...player, isEditingName: !player.isEditingName} : player;
            });
        },
        editRole: (state, action) => {
            state.players = state.players.map(player => {
                return player.id === action.payload ? {...player, isEditingRole: !player.isEditingRole} : player;
            });
        },
        setName: (state, action) => {
            const { id, name } = action.payload;
            state.players = state.players.map(player => {
                return player.id === id ? {...player, name} : player;
            });
        },
        setRole: (state, action) => {
            const { id, role } = action.payload;
            state.players = state.players.map(player => {
                return player.id === id ? {...player, role } : player;
            });
        },
        setFine: (state, action) => {
            const { id, fine } = action.payload;

            state.players = state.players.map(player => {
                if(player.id === id) {
                    return {...player, fines: {...player.fines, [fine]: !player.fines[fine]}};
                }
                return player;
            });
        }
    },
});


export const selectPlayers = state => state.players.players;

export const { kill, kick, editName, setName, setRole, setFine, editRole } = playersSlice.actions;
export const playersReducer = playersSlice.reducer;
