'use client';

import {useRef} from "react";
import {AppStore, makeStore} from "@/store/store";
import {Provider} from "react-redux";

export default function ReduxProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}