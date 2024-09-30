
import styles from "../../app/page.module.css"
import Navigation from "@/components/Navigation/Navigation";
import MainCenterBlock from "@/components/MainCenterBlock/MainCenterBlock";
import MainSidebar from "@/components/MainSidebar/MainSidebar";
import {Track} from "@/components/Interfaces/Interfaces";

export interface PlaylistProps {
    tracks: Track[];
}

export default function Main({tracks}: PlaylistProps) {
    return (
        <main className={styles.main}>
            <Navigation/>
            <MainCenterBlock tracks={tracks}/>
            <MainSidebar/>
        </main>
    )
}