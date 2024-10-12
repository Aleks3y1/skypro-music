"use client";
import {useState} from "react";
import styles from "@/components/Navigation/Navigation.module.css";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function NavigationFavorites() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleRoute = () => {
        return router.push("/main");
    }

    return (
        <nav className={`${styles.main__nav} ${styles.nav}`}>
            <div className={`${styles.nav__logo} ${styles.logo}`}>
                <Image className={styles.logo__image} src="/img/logo.png"
                       width={113}
                       height={17}
                       alt="logo"/>
            </div>
            <div className={`${styles.nav__burger} ${styles.burger}`} onClick={handleClick}>
                <span className={styles.burger__line}></span>
                <span className={styles.burger__line}></span>
                <span className={styles.burger__line}></span>
            </div>
            <div className={`${styles.nav__menu} ${isOpen ? styles.menu : ``}`}>
                <ul className={styles.menu__list}>
                    <li className={styles.menu__item} onClick={handleRoute}>
                        <Link href="#" className={styles.menu__link}>Главное</Link>
                    </li>
                    <li className={styles.menu__item}>
                        <Link href="/main/favorites" className={styles.menu__link}>Мой плейлист</Link>
                    </li>
                    <li className={styles.menu__item}>
                        <Link href="/signin" className={styles.menu__link}>Войти</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}