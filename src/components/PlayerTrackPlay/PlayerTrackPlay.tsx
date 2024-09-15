import styles from "@/components/PlayerBar/PlayerBar.module.css";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {likeTrack, unlikeTrack} from "@/app/api/likeTrack";
import {setCurrentTrack} from "@/store/features/player/playerSlice";

export default function PlayerTrackPlay() {
    const user = useAppSelector((state) => state.user);
    const token = localStorage.getItem("access_token");
    const dispatch = useAppDispatch();
    const {currentTrackId, currentTrack} = useAppSelector((state) => state.player);

    const like = async (trackId: number, token: string) => {
        await likeTrack(trackId, token);

        if (currentTrack) {
            const updatedTrack = {
                ...currentTrack,
                staredUser: [...currentTrack.staredUser, user.user?._id]
            };
            dispatch(setCurrentTrack(updatedTrack));
        }
    };

    const unlike = async (trackId: number, token: string) => {
        await unlikeTrack(trackId, token);
        if (currentTrack) {
            const updatedTrack = {
                ...currentTrack,
                staredUser: currentTrack.staredUser.filter((id) => id !== user.user?._id)
            };
            dispatch(setCurrentTrack(updatedTrack));
        }
    };

    if (!currentTrackId || !currentTrack) {
        return null;
    }

    return (
        <div className={`${styles.player__trackPlay} ${styles.trackPlay}`}>
            <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                    <svg className={styles.trackPlay__svg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                </div>
                <div className={styles.trackPlay__author}>
                    <Link className={styles.trackPlay__authorLink} href="#">
                        {currentTrack?.name}
                    </Link>
                </div>
                <div className={styles.trackPlay__album}>
                    <Link className={styles.trackPlay__albumLink} href="#">
                        {currentTrack?.author}
                    </Link>
                </div>
            </div>

            <div className={styles.trackPlay__likeDis}>
                <div className={`${styles.trackPlay__like} ${styles._btnIcon}`}>
                    <svg className={styles.trackPlay__likeSvg}
                         style={{fill: currentTrack?.staredUser.includes(user.user?._id) ? "#B672FF" : "transparent"}}
                         onClick={() => {
                             if (token) {
                                 if (currentTrack.staredUser.includes(user.user?._id)) {
                                     unlike(currentTrack._id, token);
                                 } else {
                                     like(currentTrack._id, token);
                                 }
                             }
                         }}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                    </svg>
                </div>
            </div>
        </div>
    );
}