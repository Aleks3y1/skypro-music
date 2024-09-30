import styles from "@/components/SidebarBlock/SidebarBlock.module.css";
import Link from "next/link";
import Image from "next/image";

export default function SidebarBlock() {
    return (
        <div className={styles.sidebar__block}>
            <div className={styles.sidebar__list}>
                <div className={styles.sidebar__item}>
                    <Link className={styles.sidebar__link} href="/selection/2">
                        <Image
                            className={styles.sidebar__img}
                            src="/img/playlist01.png"
                            alt="day's playlist"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <div className={styles.sidebar__item}>
                    <Link className={styles.sidebar__link} href="/selection/3">
                        <Image
                            className={styles.sidebar__img}
                            src="/img/playlist02.png"
                            alt="day's playlist"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <div className={styles.sidebar__item}>
                    <Link className={styles.sidebar__link} href="/selection/4">
                        <Image
                            className={styles.sidebar__img}
                            src="/img/playlist03.png"
                            alt="day's playlist"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}