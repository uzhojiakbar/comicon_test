"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import styles from "./order.module.css";
import useNumberFormatter from "@/utils/NumberFormatter";

export default function order({isOpen, onClose}) {
    const [quantity, setQuantity] = useState(0);
    const [privatyPolicy, setPrivatyPolicy] = useState(false);
    const [paymentType, setPaymentType] = useState("");
    const [promocodeVerify, setPromocodeVerify] = useState(1);


    const {formatNumber} = useNumberFormatter()

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    if (!isOpen) return null;


    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.mainContainer}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modalLeftBox}>
                    <div className={styles.boxModalLeftTop}>
                        <div className={styles.eventInfo}>
                            <div className={styles.eventName}>
                                <h1>GEEK CON</h1>
                                <button
                                    className={styles.closeIconMobile}
                                    onClick={onClose}>
                                    <Image
                                        src="/closeModal.svg"
                                        alt="closeModal"
                                        width={72}
                                        height={72}
                                    />
                                </button>
                            </div>
                            <div className={styles.eventPlace}>
                                <p>Сегодня в 12:00</p>
                                <div className={styles.boxEventPlace}>
                                    <p>Magic Cinema</p>
                                    <h6>улица Бабура, 174/12</h6>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.eventTicket}>
                        {
                            [1, 2, 3, 4, 5, 6].map((item, index) =>
                                <div key={index} className={styles.oneTypeTicket}>
                                    <div className={styles.oneTypeTicketHead}>
                                        <h6>Входной билет</h6>
                                        <svg width="4" height="4" viewBox="0 0 4 4" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2" cy="2" r="2" fill="#1C274C" fillOpacity="0.2"/>
                                        </svg>
                                        <p>{formatNumber("4000")} билетов</p>
                                    </div>

                                    <div className={styles.boxOneTypeTicektBody}>
                                        <div className={styles.boxTypeHead}>
                                            <div className={styles.boxRowGap12}>
                                                <p>Обычный</p>
                                                <h6>
                                                    <span>18+</span>
                                                </h6>
                                            </div>
                                        </div>
                                        <div className={styles.boxTypeBody}>
                                            <h3>{formatNumber(195000)} сум</h3>
                                            <div className={styles.boxTicketQuantity}>
                                                <button onClick={() => setQuantity(quantity - 1)}
                                                        disabled={quantity < 1}>
                                                    <Image
                                                        src={quantity < 1 ? "/removeTicektNotActive.svg" : "/removeTicket.svg"}
                                                        alt="remove Ticket"
                                                        width={24}
                                                        height={24}
                                                    />
                                                </button>
                                                <p>{quantity}</p>
                                                <button onClick={() => setQuantity(quantity + 1)}>
                                                    <Image
                                                        src="/addTicket.svg"
                                                        alt="add Ticket"
                                                        width={24}
                                                        height={24}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                    </div>
                    <div className={styles.boxTotalPrice}>
                        <p>Итого:</p>
                        <div className={styles.overPrice}>
                            <div className={styles.price}>
                                {formatNumber("3399000")} so’m
                            </div>
                            {
                                promocodeVerify ? <></>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.modalRightBox}>
                    <div className={styles.boxModalRightTop}>
                        <div className={styles.boxRowH1}>
                            <h1>ОПЛАТА</h1>
                            <button onClick={onClose}>
                                <Image
                                    src="/closeModal.svg"
                                    alt="closeModal"
                                    width={72}
                                    height={72}
                                />
                            </button>
                        </div>
                        <div className={styles.boxRightModal}>
                            <div className={styles.boxTimer}>
                                <Image
                                    src="/orderTimer.svg"
                                    alt="orderTimer"
                                    width={24}
                                    height={24}
                                />
                                <p>Оплатите в течении 15:00 минут</p>
                            </div>
                            <div className={styles.boxPaymentsType}>
                                <p>Способ оплаты</p>
                                <div className={styles.boxPayments}>
                                    <button
                                        onClick={() => setPaymentType("click")}
                                        className={
                                            paymentType === "click"
                                                ? styles.onePaymentTypeActive
                                                : styles.onePaymentType
                                        }
                                    >
                                        <div className={styles.paymentName}>
                                            <Image
                                                src="/click.svg"
                                                alt="click"
                                                width={32}
                                                height={32}
                                            />
                                            <p>Click</p>
                                        </div>
                                        <p>Система оплаты через Click</p>
                                    </button>
                                    <button
                                        onClick={() => setPaymentType("payme")}
                                        className={
                                            paymentType === "payme"
                                                ? styles.onePaymentTypeActive
                                                : styles.onePaymentType
                                        }
                                    >
                                        <div className={styles.paymentName}>
                                            <Image
                                                src="/payme.svg"
                                                alt="click"
                                                width={32}
                                                height={32}
                                            />
                                            <p>Payme</p>
                                        </div>
                                        <p>Система оплаты через Payme</p>
                                    </button>
                                    <button
                                        onClick={() => setPaymentType("card")}
                                        className={
                                            paymentType === "card"
                                                ? styles.onePaymentTypeActive
                                                : styles.onePaymentType
                                        }
                                    >
                                        <div className={styles.paymentName}>
                                            <Image
                                                src="/card.svg"
                                                alt="click"
                                                width={32}
                                                height={32}
                                            />
                                            <p>Банковская карта</p>
                                        </div>
                                        <p>Новая банковская карта</p>
                                    </button>
                                </div>
                                <input type="text" placeholder="Промокод или код сертификата"/>
                            </div>
                            <div className={styles.boxPrivatyPolicy}>
                                <button
                                    onClick={() => setPrivatyPolicy(!privatyPolicy)}
                                    className={
                                        privatyPolicy ? styles.boxkvadratActive : styles.boxkvadrat
                                    }
                                >
                                    {privatyPolicy ? (
                                        <Image
                                            src="/orderPrivaty.svg"
                                            alt="галочка"
                                            width={28}
                                            height={28}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </button>
                                <p>
                                    Совершая оплату, вы принимаете{" "}
                                    <a href="">пользовательское соглашение</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <button className={styles.boxButtonNext}>
                        <p>Далее: 3 399 000 so’m</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
