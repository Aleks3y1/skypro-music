import {Track} from "@/components/Interfaces/Interfaces";

const URL_API = 'https://webdev-music-003b5b991590.herokuapp.com';

export async function getTrack(): Promise<Track[]> {
    const response = await fetch(`${URL_API}/catalog/track/all/`, {cache: 'default'});
    const responseData = await response.json();
    if (!responseData.success) {
        throw new Error(responseData.statusText);
    }
    return responseData.data;
}

export async function getFavoriteTracks(token: string) {
    try {
        const response = await fetch(`${URL_API}/catalog/track/favorite/all/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            cache: 'default',
        });

        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.success) {
            throw new Error(`Ошибка данных: ${responseData.statusText}`);
        }

        return responseData.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        return null;
    }
}