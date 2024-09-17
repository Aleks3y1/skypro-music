import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/features/providers/ReduxProvider";
import PlayerBar from "@/components/PlayerBar/PlayerBar";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

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
        <html lang="en">
        <ReduxProvider>
            <body className={montserrat.className}>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <div style={{ flex: 1 }}>{children}</div>
                <PlayerBar />
            </div>
            </body>
        </ReduxProvider>
        </html>
    );
}