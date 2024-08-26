import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PlayerState {
    currentTrackId: number | null;
    isPlaying: boolean;
    isPaused: boolean;
}

const initialState: PlayerState = {
    currentTrackId: null,
    isPlaying: false,
    isPaused: false,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setCurrentTrackId(state, action: PayloadAction<number | null>) {
            state.currentTrackId = action.payload;
        },
        setIsPlaying(state, action: PayloadAction<boolean>) {
            state.isPlaying = action.payload;
        },
        setPaused(state, action: PayloadAction<boolean>) {
            state.isPaused = action.payload;
        }
    },
});

export const {setCurrentTrackId, setIsPlaying, setPaused} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;