"use client";
import styles from "@/components/PlayerBar/PlayerBar.module.css";
import Link from "next/link";
import {Track} from "@/components/Interfaces/Interfaces";
import {UseContext} from "@/hooks/UseContext";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

export default function PlayerBar({trackList}: { trackList: Track[] }) {
    const context = UseContext();

    if (!context) {
        return <div>Контекст не доступен</div>;
    }

    const {
        audioRef,
        handlePlay,
        togglePlaying,
        currentTrack,
        setVolume,
        setCurrentTime,
        duration,
        currentTime,
        handleLoop,
        isPlaying,
        isLoop
    } = context;

    const play = "/img/icon/sprite.svg#icon-play";

    const notReleased = () => {
        return alert('Ещё не реализовано');
    };

    return (
        <div className={styles.bar}>
            <div className={styles.bar__content}>
                <audio
                    ref={audioRef}
                    src={currentTrack?.track_file || ""}
                    onTimeUpdate={(e: React.SyntheticEvent<HTMLAudioElement>) => setCurrentTime(e.currentTarget.currentTime)}
                />
                <ProgressBar
                    max={duration}
                    value={currentTime}
                    step={0.01}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = parseFloat(e.target.value);
                        }
                    }}
                    currentTime={currentTime}
                    duration={duration}
                />
                <div className={styles.bar__playerBlock}>
                    <div className={`${styles.bar__player} ${styles.player}`}>
                        <div className={styles.player__controls}>
                            <div className={`${styles.player__btnPrev} ${styles._btnStyle}`} onClick={notReleased}>
                                <svg className={styles.player__btnPrevSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                                </svg>
                            </div>
                            <div className={`${styles.player__btnPlay} ${styles._btnStyle}`} onClick={togglePlaying}>
                                {isPlaying ? (
                                    <svg width="15" height="19" viewBox="0 0 15 19" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <rect width="5" height="19" fill="#D9D9D9"/>
                                        <rect x="10" width="5" height="19" fill="#D9D9D9"/>
                                    </svg>
                                ) : (
                                    <svg className={styles.player__btnPlaySvg}>
                                        <use xlinkHref={play}></use>
                                    </svg>
                                )}
                            </div>
                            <div className={`${styles.player__btnNext} ${styles._btnStyle}`} onClick={notReleased}>
                                <svg className={styles.player__btnNextSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                                </svg>
                            </div>
                            <div className={`${styles.player__btnRepeat} ${styles._btnIcon}`} onClick={handleLoop}>
                                {isLoop ? (
                                    <svg width="18" height="12" viewBox="0 0 20 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10 3L5 0.113249V5.88675L10 3ZM7 14.5C3.96243 14.5 1.5 12.0376 1.5 9H0.5C0.5 12.5899 3.41015 15.5 7 15.5V14.5ZM1.5 9C1.5 5.96243 3.96243 3.5 7 3.5V2.5C3.41015 2.5 0.5 5.41015 0.5 9H1.5Z"
                                            fill="white"/>
                                        <path
                                            d="M10 15L15 17.8868V12.1132L10 15ZM13 3.5C16.0376 3.5 18.5 5.96243 18.5 9H19.5C19.5 5.41015 16.5899 2.5 13 2.5V3.5ZM18.5 9C18.5 12.0376 16.0376 14.5 13 14.5V15.5C16.5899 15.5 19.5 12.5899 19.5 9H18.5Z"
                                            fill="white"/>
                                    </svg>

                                ) : (<svg className={styles.player__btnRepeatSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                                    </svg>
                                )}
                            </div>
                            <div className={`${styles.player__btnShuffle} ${styles._btnIcon}`} onClick={notReleased}>
                                <svg className={styles.player__btnShuffleSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                                </svg>
                            </div>
                        </div>

                        <div className={`${styles.player__trackPlay} ${styles.trackPlay}`}>
                            <div className={styles.trackPlay__contain}>
                                <div className={styles.trackPlay__image}>
                                    <svg className={styles.trackPlay__svg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>
                                <div className={styles.trackPlay__author}>
                                    <Link className={styles.trackPlay__authorLink} href="http://"
                                    >{currentTrack?.name}</Link>
                                </div>
                                <div className={styles.trackPlay__album}>
                                    <Link className={styles.trackPlay__albumLink}
                                          href="http://">{currentTrack?.author}</Link>
                                </div>
                            </div>

                            <div className={styles.trackPlay__likeDis}>
                                <div className={`${styles.trackPlay__like} ${styles._btnIcon}`}>
                                    <svg className={styles.trackPlay__likeSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                    </svg>
                                </div>
                                <div className={`${styles.trackPlay__dislike} ${styles._btnIcon}`}>
                                    <svg className={styles.trackPlay__dislikeSvg}>
                                        <use
                                            xlinkHref="/img/icon/sprite.svg#icon-dislike"
                                        ></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.bar__volumeBlock} ${styles.volume}`}>
                        <div className={styles.volume__content}>
                            <div className={styles.volume__image}>
                                <svg className={styles.volume__svg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                                </svg>
                            </div>
                            <div className={`${styles.volume__progress} ${styles._btn}`}>
                                <input
                                    className={`${styles.volume__progressLine} ${styles._btn}`}
                                    type="range"
                                    name="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}