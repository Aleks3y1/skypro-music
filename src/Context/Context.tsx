"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Track } from "@/Context/interfaces";
import { getTracs } from "@/app/api";

export interface ContextValue {
    trackList: Track[];
    setTrackList: Dispatch<SetStateAction<Track[]>>;
}

export const Context = createContext<ContextValue | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [trackList, setTrackList] = useState<Track[]>([]);

    useEffect(() => {
        const loadTracks = async () => {
            try {
                const tracks:Track[] = await getTracs();
                setTrackList(tracks.data);
            } catch (error) {
                console.error("Ошибка загрузки треков:", error);
            }
        };

        loadTracks();
    }, [setTrackList]);

    return (
        <Context.Provider value={{ trackList, setTrackList }}>
            {children}
        </Context.Provider>
    );
};