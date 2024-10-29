import "../globals.css";
import styles from "@/app/main/page.module.css";
import Navigation from "@/components/Navigation/Navigation";
import MainSidebar from "@/components/MainSidebar/MainSidebar";
import PlayerBar from "@/components/PlayerBar/PlayerBar";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
            <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                <main className={styles.main}>
                    <Navigation/>
                    <div>{children}</div>
                    <MainSidebar/>
                    <PlayerBar/>
                </main>
            </div>
    );
}