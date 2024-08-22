import styles from './ProgressBar.module.css';

export default function ProgressBar({ max, value, step, onChange, currentTime, duration }) {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className={styles.progressBarContainer}>
            <input
                className={styles.styledProgressInput}
                type="range"
                min="0"
                max={max}
                step={step}
                value={value}
                onChange={onChange}
            />
            <div className={styles.timeDisplay}>
                <span>{formatDuration(currentTime)}</span>
                <span>{formatDuration(duration)}</span>
            </div>
        </div>
    );
}