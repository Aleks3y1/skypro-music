import {createAsyncThunk} from '@reduxjs/toolkit';

const REFRESH_URL = 'https://webdev-music-003b5b991590.herokuapp.com/user/token/refresh/';

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, {rejectWithValue}) => {

        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            return rejectWithValue('Отсутствует Refresh токен');
        }

        try {
            const response = await fetch(REFRESH_URL, {
                method: 'POST',
                body: JSON.stringify({
                    refresh: refreshToken,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const json = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    return rejectWithValue(json.message || 'Невалидный или истекший Refresh токен');
                } else if (response.status === 400) {
                    return rejectWithValue(json.message || 'Не передан Refresh токен');
                } else {
                    return rejectWithValue(json.message || 'Ошибка обновления токена');
                }
            }
            
            localStorage.setItem('access_token', json.access);
            
            return json.access;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Произошла ошибка при обновлении токена');
        }
    }
);