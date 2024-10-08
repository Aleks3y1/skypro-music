import styles from "../../../app/page.module.css"
import MainSidebar from "@/components/MainSidebar/MainSidebar";
import NavigationFavorites from "@/components/Favorites/NavigationFavorites/NavigationFavorites";
import MainCenter from "@/components/Favorites/MainCenter/MainCenter";


export default function MainFavorites() {
    return (
        <main className={styles.main}>
            <NavigationFavorites/>
            <MainCenter/>
            <MainSidebar/>
        </main>
    )
}