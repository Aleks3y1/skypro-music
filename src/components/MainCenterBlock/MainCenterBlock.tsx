import styles from "@/components/MainCenterBlock/MainCenterBlock.module.css";
import Filter from "@/components/Filter/Filter";
import MainContent from "@/components/MainContent/MainContent";
import {RefObject} from "react";

export default function MainCenterBlock({audioRef}: { audioRef: RefObject<HTMLAudioElement> }) {
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
            <h2 className={styles.centerblock__h2}>Треки</h2>
            <Filter/>
            <MainContent audioRef={audioRef}/>
        </div>
    );
}