"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "@/store/store";
import { Track } from "@/components/Interfaces/Interfaces";
import { useParams } from "next/navigation";
import styles from "@/app/main/page.module.css";
import Main from "@/components/Main/Main";
import { useDispatch } from "react-redux";
import { setCurrentArrayTracks } from "@/store/features/player/playerSlice";

export default function SelectionPage() {
    const { id } = useParams();
    const { trackArray, selection, currentArrayTracks } = useAppSelector((state) => state.player);
    const dispatch = useDispatch();

    const selectedTracks = useMemo(() => {
        if (selection && selection.length > 0 && id) {
            const currentSelection = selection.find((sel) => String(sel._id) === id);
            if (currentSelection) {
                return currentSelection.items
                    .map((trackId: number) => trackArray.find((track) => track._id === trackId))
                    .filter(Boolean) as Track[];
            }
        }
        return [];
    }, [id, selection, trackArray]);

    useEffect(() => {
        if (selectedTracks.length > 0) {
            dispatch(setCurrentArrayTracks(selectedTracks));
        }
    }, [selectedTracks, dispatch]);

    if (!selectedTracks.length) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>Треки не найдены</div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Main tracks={currentArrayTracks} />
                <footer className={styles.footer}></footer>
            </div>
        </div>
    );
}