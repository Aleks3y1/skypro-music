import styles from "@/components/PlayerBar/PlayerBar.module.css";
import {UseContext} from "@/hooks/UseContext";
import {useDispatch} from "react-redux";
import {setVolume} from "@/store/features/player/playerSlice";

export default function Volume() {
    const dispatch = useDispatch();


    return (
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
                        onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
                    />
                </div>
            </div>
        </div>
    )
}