"use client";

import styles from "@/components/MainSidebar/MainSidebar.module.css";
import SidebarBlock from "@/components/SidebarBlock/SidebarBlock";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {useRouter} from "next/navigation";
import {logout} from "@/store/features/users/userSlice";

interface User {
    _id: number;
    username: string;
    email: string;
}

interface UserState {
    user: User | null;
    errorMessage: string;
}


export default function MainSidebar() {
    const userState: UserState = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(logout());
        router.push("/signin");
    }


    return (
        <div className={`${styles.main__sidebar} ${styles.sidebar}`}>
            <div className={styles.sidebar__personal}>
                <p className={styles.sidebar__personalName}>{userState.user?.username || 'Авторизируйтесь'}</p>
                <div className={styles.sidebar__icon} onClick={handleLogout} data-testid="logout-icon">
                    <svg>
                        <use xlinkHref="img/icon/sprite.svg#logout"></use>
                    </svg>
                </div>
            </div>
            <SidebarBlock/>
        </div>
    );
}