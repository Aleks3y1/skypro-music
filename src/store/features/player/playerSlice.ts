import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTrack} from "@/app/api";
import {Track} from "@/components/Interfaces/Interfaces";

export const fetchTracks = createAsyncThunk<Track[]>(
    "player/fetchTrack",
    async () => {
        return await getTrack();
    }
)

interface PlayerState {
    currentTrackId: number | null;
    isPlaying: boolean;
    isPaused: boolean;
    trackArray: Track[] | null;
    isShuffle: boolean;
}

const initialState: PlayerState = {
    currentTrackId: null,
    isPlaying: false,
    isPaused: false,
    trackArray: null,
    isShuffle: false,
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
        },
        setTrackArray(state, action: PayloadAction<Track[]>) {
            state.trackArray = action.payload;
        },
        setShuffle(state, action: PayloadAction<boolean>) {
            state.isShuffle = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.fulfilled, (state, action) => {
            state.trackArray = action.payload;
        });
    }
});

export const {setCurrentTrackId, setIsPlaying, setPaused, setTrackArray, setShuffle} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;