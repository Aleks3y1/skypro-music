import { createAsyncThunk } from "@reduxjs/toolkit";

const AUTH_URL = 'https://webdev-music-003b5b991590.herokuapp.com/user/login/';

export const logIn = createAsyncThunk(
    'user/logIn',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
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

            if (response.status === 400) {
                return rejectWithValue("Заполните все поля");
            } else if (response.status === 401) {
                return rejectWithValue("Неверный email или пароль");
            }

            if (!response.ok) {
                return rejectWithValue(json.message || 'Произошла ошибка при авторизации');
            }

            return json;

        } catch (error: any) {
            return rejectWithValue(error.message || 'Произошла неизвестная ошибка');
        }
    }
);