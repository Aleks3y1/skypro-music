import styles from "@/components/PlayerBar/PlayerBar.module.css";
import Link from "next/link";
import {useAppSelector} from "@/store/store";

export default function PlayerTrackPlay() {
    const currentTrack = useAppSelector((state) => state.player.currentTrack);

    return (
        <div className={`${styles.player__trackPlay} ${styles.trackPlay}`}>
            <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                    <svg className={styles.trackPlay__svg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                </div>
                <div className={styles.trackPlay__author}>
                    <Link className={styles.trackPlay__authorLink} href="#"
                    >{currentTrack?.name}</Link>
                </div>
                <div className={styles.trackPlay__album}>
                    <Link className={styles.trackPlay__albumLink}
                          href="#">{currentTrack?.author}</Link>
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
    )
}