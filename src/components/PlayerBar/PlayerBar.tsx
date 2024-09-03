"use client";
import styles from "@/components/PlayerBar/PlayerBar.module.css";
import {UseContext} from "@/hooks/UseContext";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import PlayerControls from "@/components/PlayerControls/PlayerControls";
import PlayerTrackPlay from "@/components/PlayerTrackPlay/PlayerTrackPlay";
import Volume from "@/components/Volume/Volume";
import {ChangeEvent, SyntheticEvent} from "react";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setCurrentTime} from "@/store/features/player/playerSlice";

export default function PlayerBar() {
    const context = UseContext();

    if (!context) {
        return <div>Контекст не доступен</div>;
    }

    const {
        audioRef,
        duration,
    } = context;

const currentTime = useAppSelector((state) => state.player.currentTime);
const currentTrack = useAppSelector((state) => state.player.currentTrack);
const dispatch = useAppDispatch();

    return (
        <div className={styles.bar}>
            <div className={styles.bar__content}>
                <audio
                    ref={audioRef}
                    src={currentTrack?.track_file || ""}
                    onTimeUpdate={(e: SyntheticEvent<HTMLAudioElement>) => dispatch(setCurrentTime(e.currentTarget.currentTime))}
                />
                <ProgressBar
                    max={duration}
                    value={Number(currentTime)}
                    step={0.01}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = parseFloat(e.target.value);
                        }
                    }}
                    currentTime={Number(currentTime)}
                    duration={duration}
                />
                <div className={styles.bar__playerBlock}>
                    <div className={`${styles.bar__player} ${styles.player}`}>
                        <PlayerControls/>
                        <PlayerTrackPlay/>
                    </div>
                    <Volume/>
                </div>
            </div>
        </div>
    );
}