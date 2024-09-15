import styles from "@/components/MainContent/MainContent.module.css";
import MainContentTitle from "@/components/MainContentTitle/MainContentTitle";
import PlaylistFavorites from "@/components/Favorites/PlaylistFavorites/PlaylistFavorites";

export default function MainContentFavorites() {
    return (
        <div className={`${styles.centerblock__content} ${styles.playlistContent}`}>
            <MainContentTitle/>
            <PlaylistFavorites />
        </div>
    );
}