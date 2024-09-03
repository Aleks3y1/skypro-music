"use client";
import {createContext, Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useRef, useState} from "react";

interface ContextType {
    audioRef: RefObject<HTMLAudioElement>;
    duration: number;
}

export const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({children}: { children: ReactNode}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const duration = audioRef.current?.duration || 0;

    return (
        <Context.Provider
            value={{
                audioRef,
                duration,
            }}>
            {children}
        </Context.Provider>
    );
};