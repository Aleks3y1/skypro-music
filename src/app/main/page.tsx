"use client";
import styles from "./page.module.css";
import Main from "@/components/Main/Main";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {fetchTracks, setCurrentArrayTracks} from "@/store/features/player/playerSlice";
import {useEffect} from "react";
import {setUser} from "@/store/features/users/userSlice";


export default function Home() {
    const arrayTracks = useAppSelector((state) => state.player.trackArray);
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

    useEffect(() => {
        if (arrayTracks.length > 0) {
            dispatch(setCurrentArrayTracks(arrayTracks));
        }
    }, [arrayTracks, dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Main tracks={arrayTracks}/>
                <footer className={styles.footer}></footer>
            </div>
        </div>
    );
}