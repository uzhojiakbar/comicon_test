"use client";
import React from "react";
import Image from "next/image";
import styles from "./footer.module.css";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/languageContext";


export default function Footer() {
    const { theme } = useTheme();
    const { translate, language } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className={styles.boxfooter}>
                <div className={styles.boxfootertop}>
                    <div className={styles.boxfooterlogo}>
                        <div className={styles.boxfooterlogotext}>
                            <Image
                                src={theme === "dark" ? "/tcatsLogoDark.svg" : "/tcatsLogo.svg"}
                                alt="logo"
                                width={184}
                                height={70}
                            />
                            <div>
                                <p>Дизайн создан с
                                    <Image src={theme === "dark" ? "/heart.svg" : "/heartLight.svg"} alt="heart" width={18} height={18} />
                                </p>
                                <p>и разработан
                                    <Image src={theme === "dark" ? "/abex.svg" : "/abexLight.svg"} alt="abex" width={80} height={22} />
                                </p>
                            </div>
                        </div>
                        <div className={styles.boxsocialContainer} >
                            <div className={styles.boxsocial}>
                                <a href="#" className={styles.oneboxsocial}>
                                    <Image src='/telegramLight.svg' alt="telegram" width={28} height={24} />
                                </a>
                                <a href="https://www.instagram.com/tcats.uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    className={styles.oneboxsocial}>
                                    <Image src='/instaLight.svg' alt="instagram" width={28} height={24} />
                                </a>
                                <a href="#" className={styles.oneboxsocial}>
                                    <Image src='/youtubeLight.svg' alt="youtube" width={28} height={24} />
                                </a>
                                <a href="#" className={styles.oneboxsocial}>
                                    <Image src='/mailLight.svg' alt="mail" width={28} height={24} />
                                </a>

                            </div>
                            <p>© 2024-2025 ComiCon Inc. All rights reserved.</p>
                        </div>
                    </div>
                    <div className={styles.boxfooterlinks}>
                        <div className={styles.footerlinksPart3}>
                            <div className={styles.footerPayments}>
                                <h1>{translate("Способы оплаты")}</h1>
                                <div className={styles.boxpayments}>
                                    <div className={styles.payments}>
                                        <Image src={theme === "dark" ? '/clickDark.svg' : '/clickLight.svg'} alt="click" width={76} height={19} />
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src='/footerHumo.svg' alt="humo" width={50} height={29} />
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src='/footerPayme.svg' alt="payme" width={76} height={24} />
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src={theme === "dark" ? '/uzcardDark.svg' : '/uzcard.svg'} alt="uzcard" width={76} height={14} />
                                    </div>
                                    {/* <div className={styles.payments}>
                                        <Image src={theme === "dark" ? "visaDark.svg" : '/visaLight.svg'} alt="visa" width={70} height={21} />
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src={theme === "dark" ? "/footerMastercardDark.svg" : '/footerMastercard.svg'} alt="mastercard" width={46} height={35} />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
