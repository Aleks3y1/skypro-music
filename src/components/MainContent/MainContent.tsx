import styles from "@/components/MainContent/MainContent.module.css";
import Playlist from "@/components/Playlist/Playlist";
import MainContentTitle from "@/components/MainContentTitle/MainContentTitle";
import {RefObject} from "react";

export default function MainContent({audioRef}: { audioRef: RefObject<HTMLAudioElement> }) {
    return (
        <div className={`${styles.centerblock__content} ${styles.playlistContent}`}>
            <MainContentTitle/>
            <Playlist audioRef={audioRef}/>
        </div>
    );
}