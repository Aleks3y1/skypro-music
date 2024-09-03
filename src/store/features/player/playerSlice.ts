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
    volume: number | null;
    isLoop: boolean;
    currentTime: number | null;
    currentTrackNum: number | null;
    currentTrack: Track | null;
}

const initialState: PlayerState = {
    currentTrackId: null,
    isPlaying: false,
    isPaused: false,
    trackArray: null,
    isShuffle: false,
    volume: 0.5,
    isLoop: false,
    currentTime: 0,
    currentTrackNum: 0,
    currentTrack: null,
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
        },
        setVolume(state, action: PayloadAction<number | null>) {
            state.volume = action.payload;
        },
        setIsLoop(state, action: PayloadAction<boolean>) {
            state.isLoop = action.payload;
        },
        setCurrentTime(state, action: PayloadAction<number | null>) {
            state.currentTime = action.payload;
        },
        setCurrentTrackNum(state, action: PayloadAction<number | null>) {
            state.currentTrackNum = action.payload;
        },
        setCurrentTrack(state, action: PayloadAction<Track>) {
            state.currentTrack = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.fulfilled, (state, action) => {
            state.trackArray = action.payload;
            if (action.payload.length > 0) {
                state.currentTrack = action.payload[0];
            }
        });
    }
});

export const {
    setCurrentTrackId,
    setIsPlaying,
    setPaused,
    setTrackArray,
    setShuffle,
    setVolume,
    setIsLoop,
    setCurrentTime,
    setCurrentTrackNum,
    setCurrentTrack
} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;