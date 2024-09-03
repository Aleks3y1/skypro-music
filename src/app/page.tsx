import styles from "./page.module.css";
import Main from "@/components/Main/Main";
import PlayerBar from "@/components/PlayerBar/PlayerBar";
import {ContextProvider} from "@/context/Context";


export default async function Home() {

    return (
        <ContextProvider>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Main/>
                    <PlayerBar/>
                    <footer className={styles.footer}></footer>
                </div>
            </div>
        </ContextProvider>
    );
}