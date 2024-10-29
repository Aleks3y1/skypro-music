"use client";

import styles from "@/app/signup/signup.module.css";
import Link from "next/link";
import Image from "next/image";
import {useAppDispatch} from "@/store/store";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {signUp} from "@/app/api/signUp";

export default function Page() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await dispatch(signUp({ email, password, username })).unwrap();
            router.push('/login');
            console.log("Регистрация успешна:", result);
        } catch (error: any) {
            setErrorMessage(error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.containerSignup}>
                <div className={styles.modal__block}>
                    <form className={styles.modal__formLogin} onSubmit={handleSignUp}>
                        <Link href="/public">
                            <div className={styles.modal__logo}>
                                <Image src="/img/logo_modal.png" alt="logo" width={140} height={21}/>
                            </div>
                        </Link>{`${styles.modal__input} ${styles.passwordDouble}`}
                        <input
                            className={`${styles.modal__input} ${styles.login}`}
                            type="text"
                            name="username"
                            placeholder="Имя"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className={`${styles.modal__input} ${styles.login}`}
                            type="text"
                            name="login"
                            placeholder="Почта"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className={`${styles.modal__input} ${styles.passwordFirst}`}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            className={`${styles.modal__input} ${styles.passwordDouble}`}
                            type="password"
                            name="password"
                            placeholder="Повторите пароль"
                            onChange={(e) => e.target.value === password ?
                                setIsPasswordValid(true) : setIsPasswordValid(false)}
                        />
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                        <button className={styles.modal__btnSignupEnt} type="submit" disabled={!isPasswordValid}>
                            Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}