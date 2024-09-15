"use client";
import styles from "@/app/page.module.css";
import MainFavorites from "@/components/Favorites/MainFavorites/MainFavorites";
import PlayerBarFavorites from "@/components/Favorites/PlayerBarFavorites/PlayerBarFavorites";

export default function Page() {


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <MainFavorites/>
                <PlayerBarFavorites/>
            </div>
        </div>
    );
}