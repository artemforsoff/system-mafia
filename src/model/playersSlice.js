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
                fines: {
                    first: false,
                    second: false,
                    third: false,
                }
            }
        )),
    },
    reducers: {
        kill: (state, action) => {
            state.players = state.players.map(player => {
                return player.id === action.payload ? {...player, killed: !player.killed} : player;
            });
        },
        kick: (state, action) => {
            state.players = state.players.map(player => {
                return player.id === action.payload ? {...player, kicked: !player.kicked} : player;
            });
        },
        editName: (state, action) => {
            state.players = state.players.map(player => {
                return player.id === action.payload ? {...player, isEditingName: !player.isEditingName} : player;
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

export const { kill, kick, editName, setName, setRole, setFine } = playersSlice.actions;
export const playersReducer = playersSlice.reducer;
