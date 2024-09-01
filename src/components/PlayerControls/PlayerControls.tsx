import {useEffect, useState} from "react";
import styles from "@/components/PlayerBar/PlayerBar.module.css";
import {UseContext} from "@/hooks/UseContext";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setCurrentTrackId, setIsPlaying, setPaused} from "@/store/features/player/playerSlice";
import {Track} from "@/components/Interfaces/Interfaces";
import ShuffledSVG from "@/components/ShuffledSVG/ShuffledSVG";
import RepeatSVG from "@/components/RepeatSVG/RepeatSVG";

export default function PlayerControls() {
    const context = UseContext();
    if (!context) {
        return <div>Контекст не доступен</div>;
    }

    const {
        isLoop,
        currentTrack,
        audioRef,
        setCurrentTrack,
        trackList,
        currentTrackNum,
        setCurrentTrackNum,
        setIsLoop,
    } = context;

    const dispatch = useAppDispatch();
    const currentTrackId = useAppSelector((state) => state.player.currentTrackId);
    const isPlaying = useAppSelector((state) => state.player.isPlaying);
    const volume = useAppSelector((state) => state.player.volume);
    const [newArr, setNewArr] = useState<Track[]>([]);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isNext, setNext] = useState(false);

    const togglePlaying = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => console.log("Ошибка воспроизведения: ", error));
                }
            }
            dispatch(setIsPlaying(!isPlaying));
        }
    };

    const handlePlay = () => {
        if (currentTrackNum < trackList.length - 1 && !audioRef.current?.loop) {
            setCurrentTrackNum(currentTrackNum + 1);
            setCurrentTrack(trackList[currentTrackNum + 1]);
        } else {
            setCurrentTrackNum(0);
            setCurrentTrack(trackList[0]);
        }
    };

    const handleLoop = () => {
        setIsLoop((prevLoop) => {
            const newLoopState = !prevLoop;
            if (audioRef.current) {
                audioRef.current.loop = newLoopState;
            }
            return newLoopState;
        });
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        setCurrentTrack(trackList[currentTrackNum]);
    }, [trackList, currentTrackNum]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && currentTrack) {
            audio.src = currentTrack.track_file;
            audio.addEventListener("ended", handlePlay);

            return () => {
                audio.removeEventListener("ended", handlePlay);
            };
        }
    }, [currentTrack]);

    const nextTrack = (num: number) => {
        console.log(currentTrackId);
        if (!trackList || currentTrackId === null) return;

        const arrTracks = newArr.length > 0 ? [...newArr] : [...trackList];

        const currentTrackIndex = arrTracks.findIndex(item => item._id === currentTrackId);
        if (currentTrackIndex === -1 || (currentTrackIndex === trackList.length - 1 && isNext)) return;

        let newTrackIndex = currentTrackIndex - num;
        if (newTrackIndex < 0) {
            newTrackIndex = arrTracks.length - num;
        }

        const newTrack = arrTracks[newTrackIndex];
        setCurrentTrack(newTrack);
        dispatch(setCurrentTrackId(newTrack._id));
        dispatch(setPaused(true));
        dispatch(isPlaying ? setPaused(true) : setPaused(false));

        const audio = audioRef.current;
        if (audio) {
            const onCanPlay = () => {
                audio.play().then(() => {
                    dispatch(setPaused(false));
                    dispatch(setIsPlaying(true));
                }).catch(error => {
                    console.log("Ошибка воспроизведения: ", error);
                    dispatch(setPaused(true));
                });
            };

            audio.pause();
            audio.src = newTrack.track_file;
            audio.removeEventListener('canplay', onCanPlay);
            audio.addEventListener('canplay', onCanPlay);
            audio.load();
        } else {
            console.log("Проблема с ссылкой на аудио элемент");
        }
    };

    const shuffle = () => {
        setIsShuffled(!isShuffled);
        if (newArr.length === trackList.length) {
            setNewArr([]);
            return;
        }
        const currArr = [...trackList];
        const shuffledArr: Track[] = [];
        while (currArr.length > 0) {
            const randomIndex = Math.floor(Math.random() * currArr.length);
            const item = currArr.splice(randomIndex, 1)[0];
            shuffledArr.push(item);
        }
        setNewArr(shuffledArr);
    }

    return (
        <div className={styles.player__controls}>
            <div className={`${styles.player__btnPrev} ${styles._btnStyle}`} onClick={() => {
                setNext(false);
                nextTrack(1);
            }}>
                <svg className={styles.player__btnPrevSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
            </div>
            <div className={`${styles.player__btnPlay} ${styles._btnStyle}`} onClick={() => {
                togglePlaying();
                if (currentTrack) {
                    dispatch(setCurrentTrackId(currentTrack._id));
                    dispatch(isPlaying ? setPaused(true) : setPaused(false));
                }
            }}>
                {isPlaying ? (
                    <svg width="15" height="19" viewBox="0 0 15 19" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="5" height="19" fill="#D9D9D9"/>
                        <rect x="10" width="5" height="19" fill="#D9D9D9"/>
                    </svg>
                ) : (
                    <svg className={styles.player__btnPlaySvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                    </svg>
                )}
            </div>
            <div className={`${styles.player__btnNext} ${styles._btnStyle}`} onClick={() => {
                nextTrack(-1);
                setNext(true);
            }}>
                <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
            </div>
            <div className={`${styles.player__btnRepeat} ${styles._btnIcon}`} onClick={handleLoop}>
                {isLoop ? <RepeatSVG/> : (
                    <svg className={styles.player__btnRepeatSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                )}
            </div>
            <div className={`${styles.player__btnShuffle} ${styles._btnIcon}`} onClick={shuffle}>
                <svg className={styles.player__btnShuffleSvg}>
                    {isShuffled ? <ShuffledSVG/> : (
                        <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                    )}
                </svg>
            </div>
        </div>
    );
}