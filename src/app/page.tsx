"use client";
import styles from "./page.module.css";
import Main from "@/components/Main/Main";
import {useAppSelector} from "@/store/store";


export default function Home() {
    const arrayTracs = useAppSelector((state) => state.player.trackArray);
    console.log(arrayTracs);
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Main tracks={arrayTracs}/>
                <footer className={styles.footer}></footer>
            </div>
        </div>
    );
}