"use client";
import styles from "@/components/Playlist/Playlist.module.css";
import Link from "next/link";
import {Track} from "@/components/Interfaces/Interfaces";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {
    setClickedTracks,
    setCurrentTrack,
    setCurrentTrackId,
    setFavoritesTracks,
    setFavTracks,
    setIsClickedFavoriteTracks,
    setIsPlaying,
} from "@/store/features/player/playerSlice";
import {useEffect} from "react";
import {unlikeTrack} from "@/app/api/likeTrack";

interface User {
    _id: number;
    username: string;
    email: string;
}

interface UserState {
    user: User | null;
    errorMessage: string;
}

export default function PlaylistFavorites() {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const dispatch = useAppDispatch();
    const {
        currentTrackId,
        isPlaying,
        favoritesTracks,
        clickedTracks,
        trackArray,
        isClickedFavoriteTracks
    } = useAppSelector((state) => state.player);
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    // Явная типизация для userState
    const userState = useAppSelector((state) => state.user) as UserState;

    useEffect(() => {
        if (userState.user) {
            dispatch(setFavoritesTracks({userId: userState.user._id, tracks: trackArray}));
        }
    }, [dispatch, trackArray, userState.user, isClickedFavoriteTracks, clickedTracks]);

    const handlePlaylist = (track: Track) => {
        dispatch(setCurrentTrack(track));
        dispatch(setCurrentTrackId(track._id));
        dispatch(setIsPlaying(false));
        dispatch(setClickedTracks(!clickedTracks));
    };

    // Асинхронная функция для удаления лайка у трека
    const handleUnlikeClick = async (trackId: number | undefined) => {
        if (token && userState.user && typeof trackId === 'number') {
            await unlikeTrack(trackId, token);
            dispatch(setFavoritesTracks({userId: userState.user._id, tracks: trackArray}));
            const updatedFavorites = trackArray.filter((track) => track.staredUser.includes(userState.user!._id));
            dispatch(setFavTracks(updatedFavorites));
            dispatch(setIsClickedFavoriteTracks(!isClickedFavoriteTracks));
            console.log("unlike", favoritesTracks);
        }
    };

    return (
        <div className={`${styles.content__playlist} ${styles.playlist}`}>
            {Array.isArray(favoritesTracks) && favoritesTracks.length > 0 ? (
                favoritesTracks.map((track, index) => (
                    <div key={track._id || index} className={styles.playlist__item}>
                        <div className={`${styles.playlist__track} ${styles.track}`}>
                            <div className={styles.track__title} onClick={() => handlePlaylist(track)}>
                                <div className={styles.track__titleImage}>
                                    <svg className={styles.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                    {String(currentTrackId) === String(track._id) && (
                                        <span
                                            className={`${styles.playingDot} ${!isPlaying ? styles.vibrating : ''}`}
                                        />
                                    )}
                                </div>
                                <div className={styles.track__titleText}>
                                    <Link className={styles.track__titleLink} href="#">
                                        {track.name} <span className={styles.track__titleSpan}></span>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.track__author} onClick={() => handlePlaylist(track)}>
                                <Link className={styles.track__authorLink} href="#">{track.author}</Link>
                            </div>
                            <div className={styles.track__album} onClick={() => handlePlaylist(track)}>
                                <Link className={styles.track__albumLink} href="#">{track.album}</Link>
                            </div>
                            <div className={styles.track__time}>
                                <svg className={styles.track__timeSvg}
                                     style={{fill: track.staredUser.includes(userState.user!._id) ? "#B672FF" : "transparent"}}
                                     onClick={() => handleUnlikeClick(track._id)}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={styles.track__timeText}>
                                    {formatDuration(track.duration_in_seconds)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>Треки не найдены</div>
            )}
        </div>
    );
}