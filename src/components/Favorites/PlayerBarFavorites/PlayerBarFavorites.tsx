"use client";
import styles from "@/components/PlayerBar/PlayerBar.module.css";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import PlayerTrackPlay from "@/components/PlayerTrackPlay/PlayerTrackPlay";
import Volume from "@/components/Volume/Volume";
import {ChangeEvent, SyntheticEvent, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setCurrentTime} from "@/store/features/player/playerSlice";
import PlayerControlsFavorites from "@/components/Favorites/PlayerControlsFavorites/PlayerControlsFavorites";

export default function PlayerBarFavorites() {
    const {currentTime, currentTrack} = useAppSelector((state) => state.player);
    const [duration, setDuration] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const audioRef = useRef<HTMLAudioElement>(null);

    if (!currentTrack) {
        return null;
    }

    return (
        <div className={styles.bar}>
            <div className={styles.bar__content}>
                <audio
                    ref={audioRef}
                    src={currentTrack.track_file}
                    onTimeUpdate={(e: SyntheticEvent<HTMLAudioElement>) => {
                        dispatch(setCurrentTime(e.currentTarget.currentTime));
                        setDuration(e.currentTarget.duration);
                    }
                    }
                />
                <ProgressBar
                    max={duration!}
                    value={currentTime}
                    step={0.01}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = parseFloat(e.target.value);
                        }
                    }}
                    currentTime={currentTime}
                    duration={Number(duration)}
                />
                <div className={styles.bar__playerBlock}>
                    <div className={`${styles.bar__player} ${styles.player}`}>
                        <PlayerControlsFavorites audioRef={audioRef}/>
                        <PlayerTrackPlay/>
                    </div>
                    <Volume/>
                </div>
            </div>
        </div>
    );
}