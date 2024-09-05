import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {playerReducer} from "@/store/features/player/playerSlice";
import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from "react-redux";

export const makeStore = () => {
    return configureStore({
        reducer: combineReducers({
            player: playerReducer,
        })
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;