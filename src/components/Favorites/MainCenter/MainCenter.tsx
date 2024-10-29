import styles from "@/components/MainCenterBlock/MainCenterBlock.module.css";
import FilterFavorites from "@/components/Favorites/FilterFavorites/FilterFavorites";
import MainContentFavorites from "@/components/Favorites/MainContentFavorites/MainContentFavorites";

export default function MainCenter() {
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
            <FilterFavorites/>
            <MainContentFavorites/>
        </div>
    );
}