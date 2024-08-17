"use client";
import styles from "@/components/Filter/Filter.module.css";
import {useState} from "react";
import {Track} from "@/components/Interfaces/Interfaces";

export default function Filter({trackList}: {trackList: Track[]}) {
    const [isVisible, setIsVisible] = useState(false);
    const handleOnChange = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsVisible(!isVisible);
        setIsOpen(false);
        setIsVision(false);
    }

    const [isOpen, setIsOpen] = useState(false);
    const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(!isOpen);
        setIsVisible(false);
        setIsVision(false);
    }

    const [isVision, setIsVision] = useState(false);
    const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsVision(!isVision);
        setIsOpen(false);
        setIsVisible(false);
    }

    return (
        <div className={`${styles.centerblock__filter} ${styles.filter}`}>
            <div className={styles.filter__title}>Искать по:</div>
            <div className={`${styles.filter__button} ${styles.buttonAuthor} ${styles._btnText}`}
                 onClick={handleOnChange}>
                исполнителю
                {<div className={styles.filter__window} style={{visibility: isVisible ? "visible" : "hidden"}}>
                    <div className={styles.filter__window__content}>
                        {trackList.data?.map((track, numb) => (
                            <div key={track.id || numb} className={styles.filter__text}>{track.name}</div>
                        ))}
                    </div>
                </div>}
            </div>

            <div className={`${styles.filter__button} ${styles.buttonYear} ${styles._btnText}`} onClick={handleClose}>
                году выпуска
                {<div className={styles.filter__window} style={{visibility: isOpen ? "visible" : "hidden"}}>
                    <div className={styles.filter__window__content}>
                        <div className={styles.filter__text}>По умолчанию</div>
                        <div className={styles.filter__text}>Сначала новые</div>
                        <div className={styles.filter__text}>Сначала старые</div>
                    </div>
                </div>}
            </div>

            <div className={`${styles.filter__button} ${styles.buttonGenre} ${styles._btnText}`}
                 onClick={handleOnClick}>жанру
                {<div className={styles.filter__window} style={{visibility: isVision ? "visible" : "hidden"}}>
                    <div className={styles.filter__window__content}>
                        {trackList.data?.map((track, numb) => (
                            <div key={track.id || numb} className={styles.filter__text}>{track.genre}</div>
                        ))}
                    </div>
                </div>}
            </div>

        </div>

    );
}