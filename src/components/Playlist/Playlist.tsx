"use client";
import styles from "@/components/Playlist/Playlist.module.css";
import Link from "next/link";
import {Track} from "@/components/Interfaces/Interfaces";
import {UseContext} from "@/hooks/UseContext";

interface TrackListProps {
    data: Track[];
}

export default function Playlist({trackList}: { trackList: TrackListProps }) {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const {audioRef, currentTrack, handlePlaylist} = UseContext() || {};

    return (
        <div className={`${styles.content__playlist} ${styles.playlist}`}>
            {Array.isArray(trackList.data) && trackList.data.length > 0 ? (
                trackList.data.map((track, index) => (
                    <div key={track.id || index} className={styles.playlist__item}>
                        {audioRef && currentTrack && (
                            <audio ref={audioRef} src={currentTrack.track_file}/>
                        )}
                        <div className={`${styles.playlist__track} ${styles.track}`}>
                            <div className={styles.track__title}>
                                <div className={styles.track__titleImage}>
                                    <svg className={styles.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>
                                <div className={styles.track__titleText} onClick={() => handlePlaylist?.(track)}>
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
                                <span
                                    className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
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