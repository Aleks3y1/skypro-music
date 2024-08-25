import {useContext} from "react";
import {Context} from "@/context/Context";

export const UseContext = () => {
    const context = useContext(Context);
    if (context === null) {
        throw new Error(
            "useCurrentTrack должен использоваться внутри CurrentTrackProvider"
        );
    }
    return useContext(Context);
}