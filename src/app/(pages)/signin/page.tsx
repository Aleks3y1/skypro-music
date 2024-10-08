"use client";

import styles from "@/app/(pages)/signin/signin.module.css";
import Image from "next/image";
import Link from "next/link";
import {logIn} from "@/app/api/logIn";
import {useAppDispatch} from "@/store/store";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {getToken} from "@/app/api/getToken";

export default function Page() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function saveTokens(access: string, refresh: string) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(logIn({email, password})).unwrap();
            const result = await dispatch(getToken({email, password})).unwrap();
            saveTokens(result.access, result.refresh);
            router.push('/');
            console.log('Успешно');
        } catch (error: any) {
            setErrorMessage(error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.containerEnter}>
                <div className={styles.modal__block}>
                    <form className={styles.modal__formLogin} onSubmit={handleAuth}>
                        <Link href="/">
                            <div className={styles.modal__logo}>
                                <Image src="/img/logo_modal.png" alt="logo" width={140} height={21}/>
                            </div>
                        </Link>
                        <input
                            className={`${styles.modal__input} ${styles.login}`}
                            type="text"
                            name="login"
                            placeholder="Почта"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className={`${styles.modal__input} ${styles.password}`}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                        <button className={styles.modal__btnEnter} type="submit">
                            Войти
                        </button>
                        <button className={styles.modal__btnSignup}>
                            <Link href="/signup">Зарегистрироваться</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}