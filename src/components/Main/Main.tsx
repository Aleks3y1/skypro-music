import styles from "../../app/page.module.css"
import Image from "next/image";
import Navigation from "@/components/Navigation/Navigation";
import MainCenterBlock from "@/components/MainCenterBlock/MainCenterBlock";
import MainSidebar from "@/components/MainSidebar/MainSidebar";


export default function Main() {
    return (
        <main className={styles.main}>
            <Navigation/>
            <MainCenterBlock/>
            <MainSidebar/>
        </main>
    )
}