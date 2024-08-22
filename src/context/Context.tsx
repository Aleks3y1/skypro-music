"use client";
import {createContext, ReactNode, useEffect, useRef, useState} from "react";
import {Track} from "@/components/Interfaces/Interfaces";

export const Context = createContext(null);

export const ContextProvider = ({children, trackList}: { children: ReactNode, trackList: Track[] }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTrackNum, setCurrentTrackNum] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(trackList.data[0] || null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoop, setIsLoop] = useState(false);

    const duration = audioRef.current?.duration || 0;

    const togglePlaying = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => console.log("Ошибка воспроизведения: ", error));
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handlePlay = () => {
        if (currentTrackNum < trackList.data.length - 1 && !audioRef.current?.loop) {
            setCurrentTrackNum(currentTrackNum + 1);
            setCurrentTrack(trackList.data[currentTrackNum + 1]);
        } else {
            setCurrentTrackNum(0);
            setCurrentTrack(trackList.data[0]);
        }
    };

    const handlePlaylist = (track) => {
        const audio = audioRef.current;
        if (track && audio) {
            setIsPlaying(false);

            const onCanPlay = () => {
                audio.play().then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.log("Ошибка воспроизведения: ", error);
                    setIsPlaying(false);
                });
            };

            audio.pause();
            audio.src = track.track_file;
            audio.removeEventListener('canplay', onCanPlay);
            audio.addEventListener('canplay', onCanPlay);
            audio.load();

            setCurrentTrack(track);
        } else {
            console.log("Проблема с ссылкой на трек");
        }
    };

    const handleLoop = () => {
        setIsLoop((prevLoop) => {
            const newLoopState = !prevLoop;
            if (audioRef.current) {
                audioRef.current.loop = newLoopState;
            }
            return newLoopState;
        });
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        setCurrentTrack(trackList.data[currentTrackNum]);
    }, [trackList, currentTrackNum]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && currentTrack) {
            audio.src = currentTrack.track_file;
            audio.addEventListener("ended", handlePlay);

            return () => {
                audio.removeEventListener("ended", handlePlay);
            };
        }
    }, [currentTrack]);

    return (
        <Context.Provider
            value={{
                trackList,
                handlePlay,
                togglePlaying,
                audioRef,
                setCurrentTrackNum,
                currentTrackNum,
                currentTrack,
                setCurrentTrack,
                isPlaying,
                setIsPlaying,
                handlePlaylist,
                setVolume,
                setCurrentTime,
                duration,
                currentTime,
                handleLoop,
                isLoop
            }}>
            {children}
        </Context.Provider>
    );
};