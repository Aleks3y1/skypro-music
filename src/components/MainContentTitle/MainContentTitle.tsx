import styles from "@/components/MainContentTitle/MainContentTitle.module.css";

export default function MainContentTitle() {
    return (
        <div className={`${styles.content__title} ${styles.playlistTitle}`}>
            <div className={`${styles.playlistTitle__col} ${styles.col01}`}>Трек</div>
            <div className={`${styles.playlistTitle__col} ${styles.col02}`}>Исполнитель</div>
            <div className={`${styles.playlistTitle__col} ${styles.col03}`}>Альбом</div>
            <div className={`${styles.playlistTitle__col} ${styles.col04}`}>
                <svg className={styles.playlistTitle__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                </svg>
            </div>
        </div>
    );
}