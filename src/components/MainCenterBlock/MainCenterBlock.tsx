"use client";
import styles from "@/components/MainCenterBlock/MainCenterBlock.module.css";
import Filter from "@/components/Filter/Filter";
import MainContent from "@/components/MainContent/MainContent";
import { Track } from "@/components/Interfaces/Interfaces";
import { useState, useMemo } from "react";
import { useAppSelector } from "@/store/store";

export interface PlaylistProps {
    tracks: Track[];
}

export default function MainCenterBlock({ tracks }: PlaylistProps) {
    const { selection } = useAppSelector((state) => state.player);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredTracks = useMemo(() => {
        if (searchQuery.trim() === "") {
            return tracks;
        }
        const lowerCaseQuery = searchQuery.toLowerCase();
        return tracks.filter(track =>
            track.name.toLowerCase().includes(lowerCaseQuery));
    }, [searchQuery, tracks]);

    return (
        <div className={`${styles.main__centerblock} ${styles.centerblock}`}>
            <div className={`${styles.centerblock__search} ${styles.search}`}>
                <svg className={styles.search__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
                </svg>
                <input
                    className={styles.search__text}
                    type="search"
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <h1 className={styles.centerblock__h2}>
                {selection.length > 0 ? "Ваш плейлист" : "Все треки"}
            </h1>
            <Filter tracks={filteredTracks} />
            <MainContent tracks={filteredTracks} />
        </div>
    );
}