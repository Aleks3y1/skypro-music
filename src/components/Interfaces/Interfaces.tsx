export interface Track {
    _id: number;
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
    track_file: string;
    staredUser: (number | undefined)[];
}

export interface Selection {
    _id: number;
    name: string;
    items: number[];
    owner: number[];
    __v: number;
}