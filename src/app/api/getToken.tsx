import {createAsyncThunk} from "@reduxjs/toolkit";


const AUTH_URL = 'https://webdev-music-003b5b991590.herokuapp.com/user/token/';

export const getToken = createAsyncThunk(
    'auth/getToken',
    async ({email, password}: { email: string, password: string }, {rejectWithValue}) => {
        try {
            const response = await fetch(AUTH_URL, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            if (!response.ok) {
                if (response.status === 400) {
                    return rejectWithValue(json.message || "Заполните все поля");
                } else if (response.status === 500) {
                    return rejectWithValue(json.message || "Сервер сломался");
                } else if (response.status === 401) {
                    return rejectWithValue(json.message || "Неверный email или пароль");
                } else {
                    return rejectWithValue(json.message || "Произошла ошибка при получении токена");
                }
            }

            return json;

        } catch (error: any) {
            return rejectWithValue(error.message || 'Произошла неизвестная ошибка');
        }
    }
);