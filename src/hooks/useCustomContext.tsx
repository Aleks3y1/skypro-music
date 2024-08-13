"use client";
import {Context} from "@/Context/Context";
import {useContext} from "react";

export const useCustomContext = () => {
    const context = useContext(Context)

    if(context === undefined) {
        throw new Error("useCustomContext должен быть использован в ContextProvider");
    }
    return context;
}