import {Track} from "@/Context/interfaces";

const URL_API = 'https://webdev-music-003b5b991590.herokuapp.com';


export async function getTracs(): Promise<Track[]> {
    const response = await fetch(`${URL_API}/catalog/track/all/`, {cache: 'default'});
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const result: Track[] = await response.json();
    return result;
}