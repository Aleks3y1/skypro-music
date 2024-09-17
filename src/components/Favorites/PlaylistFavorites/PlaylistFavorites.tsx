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
    const token = localStorage.getItem("access_token");
    const user = useAppSelector((state) => state.user);


    // Обновляем список избранных треков при монтировании и при изменении треков или пользователя
    useEffect(() => {
        if (user.user) {
            dispatch(setFavoritesTracks({userId: user.user?._id, tracks: trackArray}));
        }
    }, [dispatch, trackArray, user.user, isClickedFavoriteTracks, clickedTracks]);

    const handlePlaylist = (track: Track) => {
        dispatch(setCurrentTrack(track));
        dispatch(setCurrentTrackId(track._id));
        dispatch(setIsPlaying(false));
        dispatch(setClickedTracks(!clickedTracks));
    };

    const unlike = async (trackId: number, token: string) => {
        await unlikeTrack(trackId, token);
        // Обновляем избранные треки сразу после удаления лайка
        dispatch(setFavoritesTracks({userId: user.user?._id, tracks: trackArray}));
        const response = trackArray.filter((track) => track.staredUser.includes(trackId));
        dispatch(setFavTracks(response));
        dispatch(setIsClickedFavoriteTracks(!isClickedFavoriteTracks)); // Обновляем флаг клика для ререндера
        console.log("unlike", favoritesTracks);
    };

    return (
        <div className={`${styles.content__playlist} ${styles.playlist}`}>
            {Array.isArray(favoritesTracks) && favoritesTracks.length > 0 ? (
                favoritesTracks.map((track, index) => (
                    <div key={track._id || index} className={styles.playlist__item}>
                        <div className={`${styles.playlist__track} ${styles.track}`}>
                            <div className={styles.track__title} onClick={() => {
                                handlePlaylist(track);
                            }}>
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
                            <div className={styles.track__author} onClick={() => {
                                handlePlaylist(track);
                            }}>
                                <Link className={styles.track__authorLink} href="#">{track.author}</Link>
                            </div>
                            <div className={styles.track__album} onClick={() => {
                                handlePlaylist(track);
                            }}>
                                <Link className={styles.track__albumLink} href="#">{track.album}</Link>
                            </div>
                            <div className={styles.track__time}>
                                <svg className={styles.track__timeSvg}
                                     style={{fill: track.staredUser.includes(user.user?._id) ? "#B672FF" : "transparent"}}
                                     onClick={() => {
                                         if (token) {
                                             unlike(track._id, token);
                                         }
                                     }}>
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