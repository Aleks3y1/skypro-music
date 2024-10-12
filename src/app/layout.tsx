import type {Metadata} from "next";
import "./globals.css";
import ReduxProvider from "@/store/features/providers/ReduxProvider";

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
            <body className="stratos-skyeng">
            <ReduxProvider>
            {children}
            </ReduxProvider>
            </body>
        </html>
    );
}