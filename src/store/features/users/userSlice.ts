import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {logIn} from "@/app/api/logIn";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        errorMessage: '',
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
            state.user = action.payload;
        })
            .addCase(logIn.rejected, (state, action) => {
                console.error(action.error.message);
            })
    }
});

export const { logout, setErrorMessage } = userSlice.actions;

export const userReducer = userSlice.reducer;