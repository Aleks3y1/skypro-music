"use client"
import styles from "@/components/MainContent/MainContent.module.css";
import Playlist from "@/components/Playlist/Playlist";
import MainContentTitle from "@/components/MainContentTitle/MainContentTitle";
import {useAppDispatch} from "@/store/store";
import {useEffect} from "react";
import {fetchSelection} from "@/store/features/player/playerSlice";
import {Track} from "@/components/Interfaces/Interfaces";

export interface PlaylistProps {
    tracks: Track[];
}

export default function MainContent({ tracks }: PlaylistProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSelection());
    }, [dispatch]);

    return (
        <div className={`${styles.centerblock__content} ${styles.playlistContent}`}>
            <MainContentTitle/>
            <Playlist tracks={tracks}/>
        </div>
    );
}