import {createAsyncThunk} from "@reduxjs/toolkit";


const AUTH_URL = 'https://webdev-music-003b5b991590.herokuapp.com/user/signup/';

export const signUp = createAsyncThunk(
    'user/signUp',
    async ({email, password, username}:
               { email: string, password: string, username: string }, {rejectWithValue}) => {
        try {
            const response = await fetch(AUTH_URL, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            if (!response.ok) {
                if (response.status === 403) {
                    return rejectWithValue(json.message || "Введенный Email уже занят");
                } else if (response.status === 500) {
                    return rejectWithValue(json.message || "Сервер сломался");
                } else {
                    return rejectWithValue(json.message || "Произошла ошибка при регистрации");
                }
            }

            return json;

        } catch (error: any) {
            return rejectWithValue(error.message || 'Произошла неизвестная ошибка');
        }
    }
);