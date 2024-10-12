const LIKE_TRACK_URL = 'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/';

export const likeTrack = async (trackId: number, token: string) => {
    try {
        const response = await fetch(`${LIKE_TRACK_URL}${trackId}/favorite/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Ошибка при постановке лайка:', errorData);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка в likeTrack:', error);
        throw error;
    }
};

export const unlikeTrack = async (trackId: number, token: string) => {
    try {
        const response = await fetch(`${LIKE_TRACK_URL}${trackId}/favorite/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Ошибка при снятии лайка:', errorData);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка в unlikeTrack:', error);
        throw error;
    }
};