export interface Track {
    id: number;
    name: string;
    album: string;
    author: string;
    duration_in_seconds: number;
    genre: string[];
    logo: {
        type: string;
        data: number[];
    };
    release_date: string;
    staredUser: number[];
    track_file: string;
}
