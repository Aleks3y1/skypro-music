import styles from "@/components/MainSidebar/MainSidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import MainCenterBlock from "@/components/MainCenterBlock/MainCenterBlock";
import SidebarBlock from "@/components/SidebarBlock/SidebarBlock";

export default function MainSidebar() {
    return (
        <div className={`${styles.main__sidebar} ${styles.sidebar}`}>
            <div className={styles.sidebar__personal}>
                <p className={styles.sidebar__personalName}>Sergey.Ivanov</p>
                <div className={styles.sidebar__icon}>
                    <svg>
                        <use xlinkHref="img/icon/sprite.svg#logout"></use>
                    </svg>
                </div>
            </div>
            <SidebarBlock/>
        </div>
    );
}