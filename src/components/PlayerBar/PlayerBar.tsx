"use client";
import styles from "@/components/PlayerBar/PlayerBar.module.css";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import PlayerControls from "@/components/PlayerControls/PlayerControls";
import PlayerTrackPlay from "@/components/PlayerTrackPlay/PlayerTrackPlay";
import Volume from "@/components/Volume/Volume";
import {ChangeEvent, RefObject, SyntheticEvent} from "react";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setCurrentTime} from "@/store/features/player/playerSlice";

export default function PlayerBar({audioRef}: { audioRef: RefObject<HTMLAudioElement> }) {
    const currentTime = useAppSelector((state) => state.player.currentTime);
    const currentTrack = useAppSelector((state) => state.player.currentTrack);
    const duration = useAppSelector((state) => state.player.duration);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.bar}>
            <div className={styles.bar__content}>
                <audio
                    ref={audioRef}
                    src={currentTrack?.track_file || ""}
                    onTimeUpdate={(e: SyntheticEvent<HTMLAudioElement>) =>
                        dispatch(setCurrentTime(e.currentTarget.currentTime))}
                />
                <ProgressBar
                    max={Number(duration)}
                    value={Number(currentTime)}
                    step={0.01}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = parseFloat(e.target.value);
                        }
                    }}
                    currentTime={Number(currentTime)}
                    duration={Number(duration)}
                />
                <div className={styles.bar__playerBlock}>
                    <div className={`${styles.bar__player} ${styles.player}`}>
                        <PlayerControls audioRef={audioRef}/>
                        <PlayerTrackPlay/>
                    </div>
                    <Volume/>
                </div>
            </div>
        </div>
    );
}