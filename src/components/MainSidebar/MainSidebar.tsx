"use client";

import styles from "@/components/MainSidebar/MainSidebar.module.css";
import SidebarBlock from "@/components/SidebarBlock/SidebarBlock";
import {useAppSelector} from "@/store/store";
import {useRouter} from "next/navigation";

export default function MainSidebar() {
    const user = useAppSelector(state => state.user);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push("/signin");
    }

    return (
        <div className={`${styles.main__sidebar} ${styles.sidebar}`}>
            <div className={styles.sidebar__personal}>
                <p className={styles.sidebar__personalName}>{user.user?.username || 'Авторизируйтесь'}</p>
                <div className={styles.sidebar__icon} onClick={handleLogout}>
                    <svg>
                        <use xlinkHref="img/icon/sprite.svg#logout"></use>
                    </svg>
                </div>
            </div>
            <SidebarBlock/>
        </div>
    );
}