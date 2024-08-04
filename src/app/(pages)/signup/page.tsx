import styles from "@/app/(pages)/signup/signup.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.containerSignup}>
                <div className={styles.modal__block}>
                    <form className={styles.modal__formLogin}>
                        <Link href="/">
                            <div className={styles.modal__logo}>
                                <Image src="/img/logo_modal.png" alt="logo" width={140} height={21}/>
                            </div>
                        </Link>{`${styles.modal__input} ${styles.passwordDouble}`}
                        <input
                            className={`${styles.modal__input} ${styles.login}`}
                            type="text"
                            name="login"
                            placeholder="Почта"
                        />
                        <input
                            className={`${styles.modal__input} ${styles.passwordFirst}`}
                            type="password"
                            name="password"
                            placeholder="Пароль"
                        />
                        <input
                            className={`${styles.modal__input} ${styles.passwordDouble}`}
                            type="password"
                            name="password"
                            placeholder="Повторите пароль"
                        />
                        <button className={styles.modal__btnSignupEnt}>
                            <Link href="/">Зарегистрироваться</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}