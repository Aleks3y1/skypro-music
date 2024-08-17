import {Track} from "@/components/Interfaces/Interfaces";

const URL_API = 'https://webdev-music-003b5b991590.herokuapp.com';

export async function getTracs(): Promise<Track[]> {
    const response = await fetch(`${URL_API}/catalog/track/all/`, { cache: 'default' })
        .then(res => res.json());
    console.log(response);
    if (!response.success) {
        throw new Error(response.statusText);
    }
    return response;
}