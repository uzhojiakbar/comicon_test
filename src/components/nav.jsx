"use client";
import React, {useState} from "react";
import Image from "next/image";
import styles from "./nav.module.css";
import Link from "next/link";
import {useUser} from "@/utils/userProvider";
import LanguageSwitcher from "@/components/language";
import ThemeToggle from "./ThemeToggle";
import {useTheme} from "next-themes";
import {useLanguage} from "@/context/languageContext";


export default function Nav() {
    const [afisha, setAfisha] = useState(false);
    const {user} = useUser();
    const {translate} = useLanguage();
    const {theme} = useTheme();

    return (
        <div className={styles.Container}>
            <nav className={styles.nav}>
                <div className={styles.nanlefttbuttonAdaptive}>
                    <ThemeToggle/>
                </div>
                <div className={styles.navleftbtns}>
                    <Link href="/">
                        <Image
                            src={theme === "dark" ? "/tcatsLogoDark.svg" : "/tcatsLogo.svg"}
                            alt="TCats logo"
                            width={100}
                            height={38}
                        />
                    </Link>
                    <div className={styles.boxnavleftbtns}>
                        {/*<button className={styles.navleftbutton}>*/}
                        {/*    <p>Продукты</p>*/}
                        {/*    <Image*/}
                        {/*        src={theme === "dark" ? "/arrowbottomDark.svg" : "/arrowbottom.svg"}*/}
                        {/*        alt="arrow"*/}
                        {/*        width={20}*/}
                        {/*        height={20}*/}
                        {/*    />*/}
                        {/*</button>*/}
                        {/*<button*/}
                        {/*    onClick={() => setAfisha(!afisha)}*/}
                        {/*    className={styles.navleftbutton}*/}
                        {/*>*/}
                        {/*    <p>Афиша</p>*/}
                        {/*    <motion.div*/}
                        {/*        initial={{rotate: 0}}*/}
                        {/*        animate={afisha ? {rotate: 180} : {rotate: 0}}*/}
                        {/*        transition={{duration: 0.2, ease: "linear"}}>*/}
                        {/*        <Image*/}
                        {/*            src={theme === "dark" ? "/arrowbottomDark.svg" : "/arrowbottom.svg"}*/}
                        {/*            alt="arrow"*/}
                        {/*            width={20}*/}
                        {/*            height={20}*/}
                        {/*        />*/}
                        {/*    </motion.div>*/}
                        {/*</button>*/}
                        {/*<motion.div*/}
                        {/*    transition={{duration: 0.2, ease: "linear"}}*/}
                        {/*    initial={{display: "none", opacity: 0, y: -40}}*/}
                        {/*    animate={*/}
                        {/*        afisha*/}
                        {/*            ? {display: "flex", opacity: 1, y: 0}*/}
                        {/*            : {display: "none", opacity: 0, y: -40}*/}
                        {/*    }*/}
                        {/*    className={styles.boxhandleafisha}*/}
                        {/*>*/}
                        {/*    <div className={styles.afishainfo}>*/}
                        {/*        <h1>Афиша</h1>*/}
                        {/*        <p>*/}
                        {/*            Ваш гид по событиям. Найдите интересное мероприятие для себя!*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.verticalhr}></div>*/}
                        {/*    <div className={styles.afishatype}>*/}
                        {/*        <div className={styles.oneafishatype}>*/}
                        {/*            <Image src="/kino.svg" alt="kino" width={14} height={14}/>*/}
                        {/*            <p>Кино</p>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.oneafishatypenotactive}>*/}
                        {/*            <Image*/}
                        {/*                src="/vistavki.svg"*/}
                        {/*                alt="Выставки"*/}
                        {/*                width={14}*/}
                        {/*                height={14}*/}
                        {/*            />*/}
                        {/*            <p>Выставки</p>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.oneafishatypenotactive}>*/}
                        {/*            <Image*/}
                        {/*                src="/konserti.svg"*/}
                        {/*                alt="Концерты"*/}
                        {/*                width={14}*/}
                        {/*                height={14}*/}
                        {/*            />*/}
                        {/*            <p>Концерты</p>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.oneafishatypenotactive}>*/}
                        {/*            <Image*/}
                        {/*                src="/kino.svg"*/}
                        {/*                alt="Подборки"*/}
                        {/*                width={14}*/}
                        {/*                height={14}*/}
                        {/*            />*/}
                        {/*            <p>Подборки</p>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.oneafishatypenotactive}>*/}
                        {/*            <Image src="/teatr.svg" alt="Театр" width={14} height={14}/>*/}
                        {/*            <p>Театр</p>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.oneafishatypenotactive}>*/}
                        {/*            <Image src="/deti.svg" alt="Дети" width={14} height={14}/>*/}
                        {/*            <p>Дети</p>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.oneafishatypenotactive}>*/}
                        {/*            <Image*/}
                        {/*                src="/stendap.svg"*/}
                        {/*                alt="Стендап"*/}
                        {/*                width={14}*/}
                        {/*                height={14}*/}
                        {/*            />*/}
                        {/*            <p>Стендап</p>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.oneafishatypenotactive}>*/}
                        {/*            <Image*/}
                        {/*                src="/vechirinki.svg"*/}
                        {/*                alt="Вечеринки"*/}
                        {/*                width={14}*/}
                        {/*                height={14}*/}
                        {/*            />*/}
                        {/*            <p>Вечеринки</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</motion.div>*/}
                        <Link href="/news" className={styles.navleftbutton}>
                            <p>{translate("Новости")}</p>
                        </Link>
                        <Link href="/" className={styles.navleftbutton}>
                            <p>{translate("about_Tcats")}</p>
                        </Link>

                    </div>
                </div>
                <div className={styles.navrightbtns}>
                    <button className={styles.navrightbuttons}>
                        <Image src="/search.svg" alt="search" width={24} height={24}/>
                    </button>
                    <div className={styles.navrightbuttons}>
                        <ThemeToggle/>
                    </div>
                    <LanguageSwitcher/>
                    {user ? (
                        <Link href="/account" className={styles.authavatar}>
                            <Image
                                src={user.avatar}
                                alt="avatar"
                                width={60}
                                height={60}
                                loading="lazy"
                            />
                        </Link>
                    ) : (
                        <Link href="/login" className={styles.navrightbuttonLogin}>
                            <Image
                                src="/login.svg"
                                alt="search"
                                width={24}
                                height={24}
                                loading="lazy"
                            />
                            <p>Вход</p>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}
