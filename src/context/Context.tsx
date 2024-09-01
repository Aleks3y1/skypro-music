"use client";
import {createContext, Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {Track} from "@/components/Interfaces/Interfaces";

interface ContextType {
    trackList: Track[];
    handlePlay: () => void;
    togglePlaying: () => void;
    audioRef: RefObject<HTMLAudioElement>;
    setCurrentTrackNum: Dispatch<SetStateAction<number>>;
    currentTrackNum: number;
    currentTrack: Track | null;
    setCurrentTrack: Dispatch<SetStateAction<Track | null>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    handlePlaylist: (track: Track) => void;
    setVolume: Dispatch<SetStateAction<number>>;
    setCurrentTime: Dispatch<SetStateAction<number>>;
    duration: number;
    currentTime: number;
    handleLoop: () => void;
    isLoop: boolean;
}

export const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({children, trackList}: { children: ReactNode, trackList: Track[] }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(trackList[0] || null);
    const [currentTime, setCurrentTime] = useState(0);
    const duration = audioRef.current?.duration || 0;


    return (
        <Context.Provider
            value={{
                trackList,
                audioRef,
                currentTrack,
                setCurrentTrack,
                setCurrentTime,
                duration,
                currentTime,
            }}>
            {children}
        </Context.Provider>
    );
};