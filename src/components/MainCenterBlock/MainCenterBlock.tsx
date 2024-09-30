"use client";
import styles from "@/components/MainCenterBlock/MainCenterBlock.module.css";
import Filter from "@/components/Filter/Filter";
import MainContent from "@/components/MainContent/MainContent";
import {Track} from "@/components/Interfaces/Interfaces";
import {useAppSelector} from "@/store/store";
import {useParams} from "next/navigation";

export interface PlaylistProps {
    tracks: Track[];
}

export default function MainCenterBlock({tracks}: PlaylistProps) {
    const {selection} = useAppSelector((state) => state.player);
    const {id} = useParams();
    return (
        <div className={`${styles.main__centerblock} ${styles.centerblock}`}>
            <div className={`${styles.centerblock__search} ${styles.search}`}>
                <svg className={styles.search__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
                </svg>
                <input
                    className={styles.search__text}
                    type="search"
                    placeholder="Поиск"
                    name="search"
                />
            </div>
            <h1 className={styles.centerblock__h2}>
                {selection.find((sel) => String(sel._id) === id)?.name || "Подборка"}
            </h1>
            <Filter/>
            <MainContent tracks={tracks}/>
        </div>
    );
}