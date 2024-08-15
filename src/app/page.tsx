import styles from "./page.module.css";
import Main from "@/components/Main/Main";
import PlayerBar from "@/components/PlayerBar/PlayerBar";
import { getTracs } from "@/app/api";
import { Track } from "@/components/Interfaces/Interfaces";

export default async function Home() {
    let trackList: Track[] = [];

    try {
        trackList = await getTracs();
    } catch (error) {
        console.error("Ошибка при загрузке треков с апи:", error);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Main trackList={trackList}/>
                <PlayerBar/>
                <footer className={styles.footer}></footer>
            </div>
        </div>
    );
}