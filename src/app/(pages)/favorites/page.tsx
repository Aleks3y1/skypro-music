"use client";
import styles from "@/app/page.module.css";
import MainFavorites from "@/components/Favorites/MainFavorites/MainFavorites";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setFavoritesTracks} from "@/store/features/player/playerSlice";
import PlayerBarFavorites from "@/components/Favorites/PlayerBarFavorites/PlayerBarFavorites";

export default function Page() {

    const {trackArray} = useAppSelector((state) => state.player);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    useEffect(() => {
        dispatch(setFavoritesTracks({userId: user.user?._id, tracks: trackArray}));
    }, [dispatch]);


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <MainFavorites/>
                <PlayerBarFavorites/>
            </div>
        </div>
    );
}