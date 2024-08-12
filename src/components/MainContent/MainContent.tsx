import styles from "@/components/MainContent/MainContent.module.css";
import Playlist from "@/components/Playlist/Playlist";
import MainContentTitle from "@/components/MainContentTitle/MainContentTitle";

export default function MainContent() {
    return (
        <div className={`${styles.centerblock__content} ${styles.playlistContent}`}>
            <MainContentTitle/>
            <Playlist/>
        </div>
    );
}