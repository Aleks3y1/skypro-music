import styles from "@/app/page.module.css";
import MainFavorites from "@/components/Favorites/MainFavorites/MainFavorites";

export default function Page() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <MainFavorites/>
            </div>
        </div>
    );
}