"use client";
import styles from "@/components/Playlist/Playlist.module.css";
import Link from "next/link";
import {useCustomContext} from "@/hooks/useCustomContext";


export default function Playlist() {
    const {trackList} = useCustomContext();

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className={`${styles.content__playlist} ${styles.playlist}`}>
            {Array.isArray(trackList) && trackList.length > 0 ? (
                trackList.map((track, index) => (
                    <div key={track.id || index} className={styles.playlist__item}>
                        <div className={`${styles.playlist__track} ${styles.track}`}>
                            <div className={styles.track__title}>
                                <div className={styles.track__titleImage}>
                                    <svg className={styles.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>
                                <div className={styles.track__titleText}>
                                    <Link className={styles.track__titleLink} href="http://"
                                    >{track.name} <span className={styles.track__titleSpan}></span
                                    ></Link>
                                </div>
                            </div>
                            <div className={styles.track__author}>
                                <Link className={styles.track__authorLink} href="http://">{track.author}</Link>
                            </div>
                            <div className={styles.track__album}>
                                <Link className={styles.track__albumLink} href="http://"
                                >{track.album}</Link>
                            </div>
                            <div className={styles.track__time}>
                                <svg className={styles.track__timeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>Треки не найдены</div> // Выводится сообщение, если треков нет
            )}
        </div>
    );

    // return (
    //     <div className={`${styles.content__playlist} ${styles.playlist}`}>
    //         {(trackList.map((track, index) => (
    //                 <div key={track.id || index} className={styles.playlist__item}>
    //                     <div className={`${styles.playlist__track} ${styles.track}`}>
    //                         <div className={styles.track__title}>
    //                             <div className={styles.track__titleImage}>
    //                                 <svg className={styles.track__titleSvg}>
    //                                     <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                                 </svg>
    //                             </div>
    //                             <div className={styles.track__titleText}>
    //                                 <Link className={styles.track__titleLink} href="http://"
    //                                 >{track.name} <span className={styles.track__titleSpan}></span
    //                                 ></Link>
    //                             </div>
    //                         </div>
    //                         <div className={styles.track__author}>
    //                             <Link className={styles.track__authorLink} href="http://">{track.author}</Link>
    //                         </div>
    //                         <div className={styles.track__album}>
    //                             <Link className={styles.track__albumLink} href="http://"
    //                             >{track.album}</Link>
    //                         </div>
    //                         <div className={styles.track__time}>
    //                             <svg className={styles.track__timeSvg}>
    //                                 <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                             </svg>
    //                             <span className={styles.track__timeText}>{formatDuration(track.duration_in_seconds)}</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )
    //         ))}
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Guilt <span className={styles.track__titleSpan}></span
    //                         ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">Nero</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Welcome Reality</Link>
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>4:44</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Elektro <span className={styles.track__titleSpan}></span
    //                         ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://"
    //                     >Dynoro, Outwork, Mr. Gee</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://">Elektro</Link>
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>2:22</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >I’m Fire <span className={styles.track__titleSpan}></span
    //                         ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://"
    //                     >Ali Bakgor</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://">I’m Fire</Link>
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>2:22</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Non Stop
    //                             <span className={styles.track__titleSpan}>(Remix)</span></Link
    //                         >
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://"
    //                     >Стоункат, Psychopath</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://">Non Stop</Link>
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>4:12</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Run Run
    //                             <span className={styles.track__titleSpan}
    //                             >(feat. AR/CO)</span
    //                             ></Link
    //                         >
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://"
    //                     >Jaded, Will Clarke, AR/CO</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://">Run Run</Link>
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>2:54</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Eyes on Fire
    //                             <span className={styles.track__titleSpan}
    //                             >(Zeds Dead Remix)</span
    //                             ></Link
    //                         >
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://"
    //                     >Blue Foundation, Zeds Dead</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Eyes on Fire</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>5:20</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Mucho Bien
    //                             <span className={styles.track__titleSpan}
    //                             >(Hi Profile Remix)</span
    //                             ></Link
    //                         >
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://"
    //                     >HYBIT, Mr. Black, Offer Nissim, Hi Profile</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://">Mucho Bien</Link>
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>3:41</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Knives n Cherries
    //                             <span className={styles.track__titleSpan}></span
    //                             ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">minthaze</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Captivating</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>1:48</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Knives n Cherries
    //                             <span className={styles.track__titleSpan}></span
    //                             ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">minthaze</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Captivating</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>1:48</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Knives n Cherries
    //                             <span className={styles.track__titleSpan}></span
    //                             ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">minthaze</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Captivating</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>1:48</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Knives n Cherries
    //                             <span className={styles.track__titleSpan}></span
    //                             ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">minthaze</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Captivating</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>1:48</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Knives n Cherries
    //                             <span className={styles.track__titleSpan}></span
    //                             ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">minthaze</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Captivating</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>1:48</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Knives n Cherries
    //                             <span className={styles.track__titleSpan}></span
    //                             ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">minthaze</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Captivating</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>1:48</span>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Knives n Cherries
    //                             <span className={styles.track__titleSpan}></span
    //                             ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">minthaze</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Captivating</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>1:48</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >How Deep Is Your Love
    //                             <span className={styles.track__titleSpan}></span
    //                             ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://"
    //                     >Calvin Harris, Disciples</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >How Deep Is Your Love</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>3:32</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://"
    //                         >Morena <span className={styles.track__titleSpan}></span
    //                         ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://">Tom Boxer</Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"
    //                     >Soundz Made in Romania</Link
    //                     >
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}>3:36</span>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className={styles.playlist__item}>
    //             <div className={`${styles.playlist__track} ${styles.track}`}>
    //                 <div className={styles.track__title}>
    //                     <div className={styles.track__titleImage}>
    //                         <svg className={styles.track__titleSvg}>
    //                             <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.track__titleText}>
    //                         <Link className={styles.track__titleLink} href="http://">
    //                       <span className={styles.track__titleSpan}></span
    //                       ></Link>
    //                     </div>
    //                 </div>
    //                 <div className={styles.track__author}>
    //                     <Link className={styles.track__authorLink} href="http://"></Link>
    //                 </div>
    //                 <div className={styles.track__album}>
    //                     <Link className={styles.track__albumLink} href="http://"></Link>
    //                 </div>
    //                 <div className={styles.track__time}>
    //                     <svg className={styles.track__timeSvg}>
    //                         <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
    //                     </svg>
    //                     <span className={styles.track__timeText}></span>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
    //     ;
}