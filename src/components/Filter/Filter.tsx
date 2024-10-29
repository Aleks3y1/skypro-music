"use client";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styles from "@/components/Filter/Filter.module.css";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {Track} from "@/components/Interfaces/Interfaces";
import {setCurrentArrayTracks} from "@/store/features/player/playerSlice";

interface FilterProps {
    tracks?: Track[];
}

export default function Filter({tracks = []}: FilterProps) {
    const dispatch = useAppDispatch();
    const currentArrayTracks = useAppSelector((state) => state.player.currentArrayTracks);

    const [initialTracks, setInitialTracks] = useState<Track[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<string | null>(null);

    const [isAuthorVisible, setIsAuthorVisible] = useState(false);
    const [isYearVisible, setIsYearVisible] = useState(false);
    const [isGenreVisible, setIsGenreVisible] = useState(false);

    const initialTracksSet = useRef(false);

    const availableGenres = ["Рок музыка", "Электронная музыка", "Классическая музыка"];

    useEffect(() => {
        if (!initialTracksSet.current && tracks.length > 0) {
            setInitialTracks(tracks);
            initialTracksSet.current = true;
        }
    }, [tracks]);

    const filteredTracks = useMemo(() => {
        let sortedTracks = [...initialTracks];

        if (sortOption === "new") {
            sortedTracks.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        } else if (sortOption === "old") {
            sortedTracks.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
        }

        if (selectedAuthors.length > 0) {
            sortedTracks = sortedTracks.filter((track) => selectedAuthors.includes(track.author));
        }

        if (selectedGenres.length > 0) {
            sortedTracks = sortedTracks.filter((track) =>
                track.genre.some((genre) => selectedGenres.includes(genre))
            );
        }

        return sortedTracks;
    }, [initialTracks, sortOption, selectedAuthors, selectedGenres]);

    useEffect(() => {
        if (
            currentArrayTracks.length !== filteredTracks.length ||
            currentArrayTracks.some((track, index) => track._id !== filteredTracks[index]._id)
        ) {
            dispatch(setCurrentArrayTracks(filteredTracks));
        }
    }, [filteredTracks, currentArrayTracks, dispatch]);

    const toggleAuthor = useCallback((author: string) => {
        setSelectedAuthors((prev) =>
            prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]
        );
    }, []);

    const toggleGenre = useCallback((genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    }, []);

    const toggleAuthorVisibility = () => {
        setIsAuthorVisible(!isAuthorVisible);
        setIsYearVisible(false);
        setIsGenreVisible(false);
    };

    const toggleYearVisibility = () => {
        setIsYearVisible(!isYearVisible);
        setIsAuthorVisible(false);
        setIsGenreVisible(false);
    };

    const toggleGenreVisibility = () => {
        setIsGenreVisible(!isGenreVisible);
        setIsAuthorVisible(false);
        setIsYearVisible(false);
    };

    return (
        <div className={`${styles.centerblock__filter} ${styles.filter}`}>
            <div className={styles.filter__title}>Искать по:</div>

            {/* Фильтр по авторам */}
            <div className={`${styles.filter__button} ${styles.buttonAuthor} ${styles._btnText}`}
                 onClick={toggleAuthorVisibility}>
                исполнителю
                {isAuthorVisible && (
                    <div className={styles.filter__window}>
                        <div className={styles.filter__window__content}>
                            {initialTracks
                                .map((track) => track.author)
                                .filter((author, index, self) => self.indexOf(author) === index)
                                .map((author, index) => (
                                    <div
                                        key={index}
                                        onClick={() => toggleAuthor(author)}
                                        className={`${styles.categoryElem} ${
                                            selectedAuthors.includes(author) ? styles.active : ""
                                        }`}
                                    >
                                        {author}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Фильтр по годам */}
            <div className={`${styles.filter__button} ${styles.buttonYear} ${styles._btnText}`}
                 onClick={toggleYearVisibility}>
                году выпуска
                {isYearVisible && (
                    <div className={styles.filter__window}>
                        <div className={styles.filter__window__content}>
                            <div onClick={() => setSortOption(null)} className={styles.categoryElem}>
                                По умолчанию
                            </div>
                            <div onClick={() => setSortOption("new")} className={styles.categoryElem}>
                                Сначала новые
                            </div>
                            <div onClick={() => setSortOption("old")} className={styles.categoryElem}>
                                Сначала старые
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Фильтр по жанрам */}
            <div className={`${styles.filter__button} ${styles.buttonGenre} ${styles._btnText}`}
                 onClick={toggleGenreVisibility}>
                жанру
                {isGenreVisible && (
                    <div className={styles.filter__window}>
                        <div className={styles.filter__window__content}>
                            {availableGenres.map((genre, index) => (
                                <div
                                    key={index}
                                    onClick={() => toggleGenre(genre)}
                                    className={`${styles.categoryElem} ${
                                        selectedGenres.includes(genre) ? styles.active : ""
                                    }`}
                                >
                                    {genre}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}