import type {Metadata} from "next";
import "./globals.css";
import ReduxProvider from "@/store/features/providers/ReduxProvider";
import PlayerBar from "@/components/PlayerBar/PlayerBar";


export const metadata: Metadata = {
    title: "Music App",
    description: "Мой музыкальный плеер",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <ReduxProvider>
            <body className="stratos-skyeng">
            <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
                <div style={{flex: 1}}>{children}</div>
                <PlayerBar/>
            </div>
            </body>
        </ReduxProvider>
        </html>
    );
}