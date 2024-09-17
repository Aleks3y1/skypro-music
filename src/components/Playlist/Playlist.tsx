"use client";
import styles from "@/components/Playlist/Playlist.module.css";
import Link from "next/link";
import { Track } from "@/components/Interfaces/Interfaces";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
    fetchTracks,
    setClickedTracks,
    setCurrentTrack,
    setCurrentTrackId,
    setIsPlaying,
    setTrackArray,
} from "@/store/features/player/playerSlice";
import { useEffect, useState } from "react";
import { likeTrack, unlikeTrack } from "@/app/api/likeTrack";

interface User {
    _id: number;
    username: string;
    email: string;
}

interface UserState {
    user: User | null;
    errorMessage: string;
}

export default function Playlist() {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const dispatch = useAppDispatch();
    const { currentTrackId, isPlaying, trackArray, clickedTracks } = useAppSelector((state) => state.player);
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    const userState = useAppSelector((state) => state.user) as UserState;
    const [updatedTrackArray, setUpdatedTrackArray] = useState<Track[]>(trackArray);

    const handlePlaylist = (track: Track) => {
        dispatch(setCurrentTrack(track));
        dispatch(setCurrentTrackId(track._id));
        dispatch(setIsPlaying(false));
        dispatch(setClickedTracks(!clickedTracks));
    };

    useEffect(() => {
        const loadTracks = async () => {
            try {
                const response = await dispatch(fetchTracks()).unwrap();
                setUpdatedTrackArray(response);
                dispatch(setTrackArray(response));
            } catch (errorText) {
                console.error('Ошибка при загрузке треков:', errorText);
            }
        };
        loadTracks();
    }, [dispatch]);

    const like = async (trackId: number, token: string) => {
        try {
            await likeTrack(trackId, token);
            updateTrackArray(trackId, true);
        } catch (error) {
            console.error('Ошибка при постановке лайка:', error);
            alert('Ошибка при постановке лайка. Попробуйте снова.');
        }
    };

    const unlike = async (trackId: number, token: string) => {
        try {
            await unlikeTrack(trackId, token);
            updateTrackArray(trackId, false);
        } catch (error) {
            console.error('Ошибка при снятии лайка:', error);
            alert('Ошибка при снятии лайка. Попробуйте снова.');
        }
    };

    const updateTrackArray = (trackId: number, isLiked: boolean) => {
        const updatedArray = updatedTrackArray.map(track => {
            if (track._id === trackId) {
                const updatedStaredUser = isLiked
                    ? [...track.staredUser, userState.user?._id]
                    : track.staredUser.filter(userId => userId !== userState.user?._id);
                return { ...track, staredUser: updatedStaredUser };
            }
            return track;
        });

        setUpdatedTrackArray(updatedArray);
    };

    return (
        <div className={`${styles.content__playlist} ${styles.playlist}`}>
            {Array.isArray(updatedTrackArray) && updatedTrackArray.length > 0 ? (
                updatedTrackArray.map((track, index) => (
                    <div key={track._id || index} className={styles.playlist__item}>
                        <div className={`${styles.playlist__track} ${styles.track}`}>
                            <div className={styles.track__title} onClick={() => handlePlaylist(track)}>
                                <div className={styles.track__titleImage}>
                                    <svg className={styles.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                    {String(currentTrackId) === String(track._id) && (
                                        <span
                                            className={`${styles.playingDot} ${!isPlaying ? styles.vibrating : ''}`} />
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
                                     style={{ fill: track.staredUser.includes(userState.user?._id!) ? "#B672FF" : "transparent" }}
                                     onClick={() => {
                                         if (token) {
                                             if (track.staredUser.includes(userState.user?._id!)) {
                                                 unlike(track._id, token);
                                             } else {
                                                 like(track._id, token);
                                             }
                                         } else {
                                             alert('Токен отсутствует или недействителен');
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