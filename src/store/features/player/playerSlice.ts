import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTrack} from "@/app/api/getTrack";
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
    trackArray: Track[];
    isShuffle: boolean;
    volume: number;
    isLoop: boolean;
    currentTime: number;
    currentTrackNum: number;
    currentTrack: Track | null;
    duration: number | null;
    likedTracks: number[];
}

const initialState: PlayerState = {
    currentTrackId: null,
    isPlaying: false,
    trackArray: [],
    isShuffle: false,
    volume: 0.5,
    isLoop: false,
    currentTime: 0,
    currentTrackNum: 0,
    currentTrack: null,
    duration: 0,
    likedTracks: [],
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
        setDuration(state, action: PayloadAction<number | null>) {
            state.duration = action.payload;
        },
        likeTrack(state, action: PayloadAction<number>) {
            state.likedTracks.push(action.payload);
        },
        unlikeTrack(state, action: PayloadAction<number>) {
            state.likedTracks = state.likedTracks.filter(id => id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.fulfilled, (state, action) => {
            state.trackArray = action.payload;
            if (action.payload.length > 0) {
                state.currentTrack = action.payload[0];
                state.currentTrackId = action.payload[0]._id;
                state.currentTrackNum = 0;
                state.duration = action.payload[0].duration_in_seconds;
            }
        });
    }
});

export const {
    setCurrentTrackId,
    setIsPlaying,
    setTrackArray,
    setShuffle,
    setVolume,
    setIsLoop,
    setCurrentTime,
    setCurrentTrackNum,
    setCurrentTrack,
    setDuration,
    likeTrack,
    unlikeTrack
} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;