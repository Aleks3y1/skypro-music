import MainCenterBlock from "@/components/MainCenterBlock/MainCenterBlock";
import {Track} from "@/components/Interfaces/Interfaces";

export interface PlaylistProps {
    tracks: Track[];
}

export default function Main({tracks}: PlaylistProps) {
    return (
        <>
            <MainCenterBlock tracks={tracks}/>
        </>
    )
}