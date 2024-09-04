import styles from "../../app/page.module.css"
import Navigation from "@/components/Navigation/Navigation";
import MainCenterBlock from "@/components/MainCenterBlock/MainCenterBlock";
import MainSidebar from "@/components/MainSidebar/MainSidebar";
import {RefObject} from "react";


export default function Main({audioRef}: { audioRef: RefObject<HTMLAudioElement> }) {
    return (
        <main className={styles.main}>
            <Navigation/>
            <MainCenterBlock audioRef={audioRef}/>
            <MainSidebar/>
        </main>
    )
}