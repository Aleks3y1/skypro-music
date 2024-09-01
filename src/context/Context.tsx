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
    const [currentTrackNum, setCurrentTrackNum] = useState(0);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(trackList[0] || null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoop, setIsLoop] = useState(false);

    const duration = audioRef.current?.duration || 0;




    return (
        <Context.Provider
            value={{
                trackList,
                audioRef,
                setCurrentTrackNum,
                currentTrackNum,
                currentTrack,
                setCurrentTrack,
                isPlaying,
                setIsPlaying,
                setCurrentTime,
                duration,
                currentTime,
                isLoop,
                setIsLoop,
            }}>
            {children}
        </Context.Provider>
    );
};