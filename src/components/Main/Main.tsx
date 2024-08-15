import styles from "../../app/page.module.css"
import Navigation from "@/components/Navigation/Navigation";
import MainCenterBlock from "@/components/MainCenterBlock/MainCenterBlock";
import MainSidebar from "@/components/MainSidebar/MainSidebar";
import {Track} from "@/components/Interfaces/Interfaces";


export default function Main({trackList}: {trackList: Track[]}) {
    return (
        <main className={styles.main}>
            <Navigation/>
            <MainCenterBlock trackList={trackList}/>
            <MainSidebar/>
        </main>
    )
}