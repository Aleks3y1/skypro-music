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