import styles from "@/components/Filter/Filter.module.css";

export default function Filter() {
    return (
        <div className={`${styles.centerblock__filter} ${styles.filter}`}>
            <div className={styles.filter__title}>Искать по:</div>
            <div className={`${styles.filter__button} ${styles.buttonAuthor} ${styles._btnText}`}>
                исполнителю
            </div>
            <div className={`${styles.filter__button} ${styles.buttonYear} ${styles._btnText}`}>
                году выпуска
            </div>
            <div className={`${styles.filter__button} ${styles.buttonGenre} ${styles._btnText}`}>жанру</div>
        </div>
    );
}