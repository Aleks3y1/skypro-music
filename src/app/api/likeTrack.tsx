const LIKE_TRACK_URL = 'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/';

export const likeTrack = async (trackId: number, token: string) => {
    const response = await fetch(`${LIKE_TRACK_URL}${trackId}/favorite/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Не удалось поставить лайк');
    }

    return await response.json();
};

export const unlikeTrack = async (trackId: number, token: string) => {
    const response = await fetch(`${LIKE_TRACK_URL}${trackId}/favorite/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Не удалось снять лайк');
    }

    return await response.json();
};