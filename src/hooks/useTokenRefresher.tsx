import { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { refreshAccessToken } from "@/app/api/refreshAccessToken";

export const useTokenRefresher = () => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [newAccessToken, setNewAccessToken] = useState<string | null>(null);

    const handleRefresh = async () => {
        try {
            const token = await dispatch(refreshAccessToken()).unwrap();
            setNewAccessToken(token);
            localStorage.setItem('access_token', token);
            setErrorMessage(null);
            return token;
        } catch (error: any) {
            setErrorMessage(error.message || 'Не удалось обновить токен');
            setNewAccessToken(null);
        }
    };

    return { handleRefresh, newAccessToken, errorMessage };
};