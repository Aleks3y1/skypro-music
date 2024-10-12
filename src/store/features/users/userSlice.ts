import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logIn } from "@/app/api/logIn";

const initialState = {
    user: null,  // Удаляем инициализацию из localStorage
    errorMessage: '',
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload)); // Сохраняем пользователя в localStorage после успешного входа
                console.log("Данные пользователя:", action.payload);
            })
            .addCase(logIn.rejected, (state, action) => {
                state.errorMessage = action.error.message || "Ошибка входа";
            });
    }
});

export const { logout, setUser, setErrorMessage } = userSlice.actions;
export const userReducer = userSlice.reducer;