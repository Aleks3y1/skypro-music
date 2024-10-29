"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import styles from "@/app/main/page.module.css";
import Main from "@/components/Main/Main";
import { fetchFavoriteTracks } from "@/store/features/player/playerSlice";
import { Track } from "@/components/Interfaces/Interfaces";

export default function MainFavorites() {
    const dispatch = useAppDispatch();
    const reduxFavoriteTracks = useAppSelector((state) => state.player.favoritesTracks);
    const [favoriteTracks, setFavoriteTracks] = useState<Track[]>(reduxFavoriteTracks);

    // Загрузка треков в локальное состояние при монтировании, костыль
    useEffect(() => {
        dispatch(fetchFavoriteTracks());
    }, [dispatch, favoriteTracks]);

    useEffect(() => {
        setFavoriteTracks(reduxFavoriteTracks);
    }, [reduxFavoriteTracks]);

    if (!favoriteTracks.length) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>Избранные треки не найдены</div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Main tracks={favoriteTracks} />
                <footer className={styles.footer}></footer>
            </div>
        </div>
    );
}