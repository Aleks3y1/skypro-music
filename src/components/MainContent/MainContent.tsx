import styles from "@/components/MainContent/MainContent.module.css";
import Playlist from "@/components/Playlist/Playlist";
import MainContentTitle from "@/components/MainContentTitle/MainContentTitle";
import {Track} from "@/components/Interfaces/Interfaces";

export default function MainContent({trackList}: {trackList: Track[]}) {
    return (
        <div className={`${styles.centerblock__content} ${styles.playlistContent}`}>
            <MainContentTitle/>
            <Playlist trackList={trackList}/>
        </div>
    );
}