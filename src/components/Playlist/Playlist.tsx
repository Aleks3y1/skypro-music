"use client";
import styles from "@/components/Playlist/Playlist.module.css";
import Link from "next/link";
import {Track} from "@/components/Interfaces/Interfaces";
import {UseContext} from "@/hooks/UseContext";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {fetchTracks, setCurrentTrackId, setPaused, setTrackArray} from "@/store/features/player/playerSlice";
import {useEffect} from "react";


export default function Playlist({trackList}: { trackList: Track[] }) {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const dispatch = useAppDispatch();
    const currentTrackId = useAppSelector((state) => state.player.currentTrackId);
    const paused = useAppSelector((state) => state.player.isPaused);

    const {handlePlaylist} = UseContext() || {};

    useEffect(() => {
        const loadTracks = async () => {
            try {
                const response = await dispatch(fetchTracks()).unwrap();
                dispatch(setTrackArray(response));
            } catch (errorText) {
                console.error('Ошибка при загрузке треков:', errorText);
            }
        };
        loadTracks();
    }, [dispatch]);

    return (
        <div className={`${styles.content__playlist} ${styles.playlist}`}>
            {Array.isArray(trackList) && trackList.length > 0 ? (
                trackList.map((track, index) => (
                    <div key={track._id || index} className={styles.playlist__item}
                         onClick={() => {
                             handlePlaylist && handlePlaylist(track);
                             dispatch(setCurrentTrackId(track._id));
                             dispatch(setPaused(false));
                         }
                         }>
                        <div className={`${styles.playlist__track} ${styles.track}`}>
                            <div className={styles.track__title}>
                                <div className={styles.track__titleImage}>
                                    <svg className={styles.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                    {String(currentTrackId) === String(track._id) && (
                                        <span
                                            className={`${styles.playingDot} ${paused ? styles.vibrating : ''}`}/>
                                    )}
                                </div>
                                <div className={styles.track__titleText} onClick={() => {
                                    handlePlaylist?.(track);
                                    dispatch(setCurrentTrackId(track._id));
                                }}>
                                    <Link className={styles.track__titleLink} href="#">
                                        {track.name} <span className={styles.track__titleSpan}></span>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.track__author}>
                                <Link className={styles.track__authorLink} href="#">{track.author}</Link>
                            </div>
                            <div className={styles.track__album}>
                                <Link className={styles.track__albumLink} href="#">{track.album}</Link>
                            </div>
                            <div className={styles.track__time}>
                                <svg className={styles.track__timeSvg}>
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