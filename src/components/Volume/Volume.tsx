import styles from "@/components/PlayerBar/PlayerBar.module.css";
import {UseContext} from "@/hooks/UseContext";

export default function Volume() {
    const context = UseContext();

    if (!context) {
        return <div>Контекста не существует</div>
    }

    const {setVolume} = context;

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
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    )
}