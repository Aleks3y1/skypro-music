"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { Track } from "@/components/Interfaces/Interfaces";
import { useParams } from "next/navigation";
import styles from "@/app/main/page.module.css";
import Main from "@/components/Main/Main";
import {useDispatch} from "react-redux";
import {setCurrentArrayTracks} from "@/store/features/player/playerSlice";

export default function SelectionPage() {
    const { id } = useParams();
    const { trackArray, selection } = useAppSelector((state) => state.player);
    const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selection && selection.length > 0 && id) {
            const currentSelection = selection.find((sel) => String(sel._id) === id);

            if (currentSelection) {
                const tracksInSelection = currentSelection.items
                    .map((trackId: number) =>
                        trackArray.find((track) => track._id === trackId)
                    )
                    .filter(Boolean) as Track[];

                setSelectedTracks(tracksInSelection);
                dispatch(setCurrentArrayTracks(tracksInSelection));
            }
        }
    }, [id, selection, trackArray]);

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
                <Main tracks={selectedTracks} />
            </div>
        </div>
    );
}