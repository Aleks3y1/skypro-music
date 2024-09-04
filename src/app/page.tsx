"use client";
import styles from "./page.module.css";
import Main from "@/components/Main/Main";
import PlayerBar from "@/components/PlayerBar/PlayerBar";
import {useRef} from "react";


export default function Home() {
    const audioRef = useRef<HTMLAudioElement>(null);
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Main audioRef={audioRef}/>
                <PlayerBar audioRef={audioRef}/>
                <footer className={styles.footer}></footer>
            </div>
        </div>
    );
}