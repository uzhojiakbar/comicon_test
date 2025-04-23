"use client";
import React from "react";
import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.boxfooter}>
                <div className={styles.boxfootertop}>
                    <div className={styles.boxfooterlogo}>
                        <Image
                            src="/TcatslogoLight.svg"
                            alt="logo"
                            width={184}
                            height={70}
                        />
                        <div className={styles.boxfooterlogotext}>
                            <p>Дизайн создан с
                                <Image src="/heartLight.svg" alt="heart" width={18} height={18}/>
                            </p>
                            <p>и разработан
                                <Image src="/abexLight.svg" alt="abex" width={80} height={22}/>{" "}
                            </p>
                        </div>
                        <div className={styles.boxsocial}>
                            <a href="#" className={styles.oneboxsocial}>
                                <Image src='/telegramLight.svg' alt="telegram" width={28} height={24}/>
                            </a>
                            <a href="https://www.instagram.com/tcats.uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                               className={styles.oneboxsocial}>
                                <Image src='/instaLight.svg' alt="instagram" width={28} height={24}/>
                            </a>
                            <a href="#" className={styles.oneboxsocial}>
                                <Image src='/youtubeLight.svg' alt="youtube" width={28} height={24}/>
                            </a>
                            <a href="#" className={styles.oneboxsocial}>
                                <Image src='/mailLight.svg' alt="mail" width={28} height={24}/>
                            </a>
                        </div>
                    </div>
                    <div className={styles.boxfooterlinks}>
                        <div className={styles.footerlinksPart1}>
                            <h1>TCats Афиша</h1>
                            <div className={styles.description}>
                                <a href="#">Справка</a>
                                <a href="#">Пользовательское соглашение</a>
                                <a href="#">Подарочные сертификаты</a>
                                <a href="#">Возврат билетов</a>
                            </div>
                        </div>
                        <div className={styles.footerlinksPart2}>
                            <h1>Партнерам и организаторам</h1>
                            <div className={styles.description}>
                                <a href="#">Афиша для бизнеса</a>
                                <a href="#">Обратная связь</a>
                                <a href="#">Часто задаваемые вопросы</a>
                                <a href="#">Правовая информация</a>
                            </div>
                        </div>
                        <div className={styles.footerlinksPart3}>
                            <div className={styles.footerPayments}>
                                <h1>Способы оплаты</h1>
                                <div className={styles.boxpayments}>
                                    <div className={styles.payments}>
                                        <Image src='/clickLight.svg' alt="click" width={76} height={19}/>
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src='/footerHumo.svg' alt="humo" width={50} height={29}/>
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src='/footerPayme.svg' alt="payme" width={76} height={24}/>
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src='/UzCardLight.svg' alt="uzcard" width={76} height={14}/>
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src='/visaLight.svg' alt="visa" width={70} height={21}/>
                                    </div>
                                    <div className={styles.payments}>
                                        <Image src='/footerMastercard.svg' alt="mastercard" width={46} height={35}/>
                                    </div>
                                </div>
                            </div>
                            <p>© 2024-2025 TCats Inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.boxversion}>
                    <div className={styles.version}><Image src='/stars.svg' alt="stars" width={18} height={18}/>
                        <p className={styles.versionText}>
                            β Версия: 0.1.21
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
