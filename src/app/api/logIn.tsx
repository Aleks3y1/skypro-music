import {createAsyncThunk} from "@reduxjs/toolkit";

const AUTH_URL = 'https://webdev-music-003b5b991590.herokuapp.com/user/login/';

export const logIn = createAsyncThunk(
    'user/logIn',
    async ({email, password}: { email: string, password: string }, {rejectWithValue}) => {
        try {
            const response = await fetch(AUTH_URL, {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            if (!response.ok) {
                return rejectWithValue(json.message || 'Произошла ошибка при авторизации');
            }

            localStorage.setItem("access_token", json.access);
            localStorage.setItem("refresh_token", json.refresh);

            return json;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Произошла неизвестная ошибка');
        }
    }
);