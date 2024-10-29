"use client";
import styles from "./page.module.css";
import Main from "@/components/Main/Main";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {fetchTracks} from "@/store/features/player/playerSlice";
import {useEffect} from "react";
import {setUser} from "@/store/features/users/userSlice";


export default function Home() {
    const filteredTracks = useAppSelector((state) => state.player.currentArrayTracks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTracks());
    }, [dispatch]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Main tracks={filteredTracks}/>
                <footer className={styles.footer}></footer>
            </div>
        </div>
    );
}