"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./order.module.css";
import useNumberFormatter from "@/utils/NumberFormatter";
import { Modak } from "next/font/google";
import { useTheme } from "next-themes";
import { PrepareOrder, OrderEdit } from "@/utils/server/order";
import useApi from "@/utils/api";

export default function order({ seans, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(0);
  const [privatyPolicy, setPrivatyPolicy] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [promocodeVerify, setPromocodeVerify] = useState(1);
  const [modal, setModal] = useState(1);
  const [code, setCode] = useState(new Array(6).fill(""));
  const countryCode = "+998";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const { formatNumber } = useNumberFormatter();
  const [login, setLogin] = useState();
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const { resolvedTheme, theme } = useTheme();

  const [eventData, setEventData] = useState()

  const api = useApi()
  const prepareOrderMutation = PrepareOrder(); // Hook yuqori darajada chaqiriladi
  const EditOrderMutation = OrderEdit(); // Hook yuqori darajada chaqiriladi


  const handlePrepareOrder = () => {
    prepareOrderMutation.mutate(seans, {
      onSuccess: (data) => {
        console.log("Order prepared successfully:", data);
        setEventData(data)
      },
      onError: (error) => {
        console.error("Failed to prepare order:", error);
      },
    });
  };


  const OrderEditFunc = (id = 1, value = 1) => {
    EditOrderMutation.mutate({
      "ticket_type_id": id || 1,
      "quantity": value || 1
    }, {
      onSuccess: (data) => {
        console.log("Order edited successfully:", data);
        handlePrepareOrder()
      },
      onError: (error) => {
        console.error("Failed to edit order:", error);
      },
    });
  }

  console.log("EventData", eventData);


  useEffect(() => {
    handlePrepareOrder()
  }, [isOpen])


  //  -------------------------------------- Verification --------------------------------------

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .replace(/\D/g, "")
      .split("");
    if (pasteData.every((char) => /^[0-9]$/.test(char))) {
      setCode(pasteData);
      pasteData.forEach((char, index) => {
        if (inputs.current[index]) {
          inputs.current[index].value = char;
        }
      });
      const nextFocusIndex = Math.min(pasteData.length, 6) - 1;
      if (inputs.current[nextFocusIndex]) {
        inputs.current[nextFocusIndex].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (newCode[index] === "") {
        if (index > 0) {
          newCode[index - 1] = "";
          setCode(newCode);
          if (inputs.current[index - 1]) {
            inputs.current[index - 1].focus();
          }
        }
      } else {
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handleChangeVerification = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length === 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 5 && value !== "") {
        if (inputs.current[index + 1]) {
          inputs.current[index + 1].focus();
        }
      }
    } else {
      e.target.value = "";
    }
  };

  const startTimer = (time) => {
    setIsButtonDisabled(true); // Блокируем кнопку
    setSecondsLeft(time);

    // Очищаем предыдущий таймер
    if (timerRef) clearInterval(timerRef);

    timerRef = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef);
          setIsButtonDisabled(false); // Разблокируем кнопку
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // useEffect запускает таймер, когда `login === true`
  useEffect(() => {
    if (login) {
      startTimer(60); // Начальный таймер на 60 секунд (или нужное значение)
    }
  }, [login]);

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

  if (!seans) return null;




  return (
    <div className={styles.modalOverlay} onClick={onClose}>

      {
        loading ?
          <div
            className="loaderWindow"
          >
            <div className="loader" ></div>
          </div>
          : ""
      }

      {modal === 1 && (
        <div
          className={styles.mainContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalLeftBox}>
            <div className={styles.boxModalLeftTop}>
              <div className={styles.eventInfo}>
                <div className={styles.eventName}>
                  <h1 onClick={handlePrepareOrder} >GEEK CON</h1>
                  <button className={styles.closeIconMobile} onClick={onClose}>
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

              {eventData?.sessions
                ?.filter((session) => session.session_id === isOpen)
                ?.flatMap((session) => session.tickets)
                ?.map((ticket, index) => (
                  <div key={index} className={styles.oneTypeTicket}>
                    <div className={styles.oneTypeTicketHead}>
                      <h6>{ticket.ticket_type_name}</h6>
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2"
                          cy="2"
                          r="2"
                          fill="#1C274C"
                          fillOpacity="0.2"
                        />
                      </svg>
                      <p>{formatNumber(ticket.remaining)} билетов</p>
                    </div>

                    <div className={styles.boxOneTypeTicektBody}>
                      <div className={styles.boxTypeHead}>
                        <div className={styles.boxRowGap12}>
                          <p>{ticket?.ticket_type_category ? ticket?.ticket_type_category : ticket?.ticket_type_name}</p>
                          <h6>
                            <span>{ticket.age_allowed || 18}</span>
                          </h6>
                        </div>
                      </div>
                      <div className={styles.boxTypeBody}>
                        <h3>{formatNumber(ticket.price)} сум</h3>
                        <div className={styles.boxTicketQuantity}>
                          <button
                            onClick={() => OrderEditFunc(ticket?.ticket_type_id, -1)}
                            disabled={(ticket?.quantity < 1)}
                          >
                            <Image
                              src={
                                quantity < 1
                                  ? theme === "dark"
                                    ? "removeTicektNotActiveDark.svg"
                                    : "/removeTicektNotActive.svg"
                                  : theme === "dark"
                                    ? "/removeTicketDark.svg"
                                    : "/removeTicket.svg"
                              }
                              alt="remove Ticket"
                              width={24}
                              height={24}
                            />
                          </button>
                          <p>{ticket?.quantity}</p>
                          <button onClick={() => OrderEditFunc(ticket?.ticket_type_id, 1)}>
                            <Image
                              src={
                                theme === "dark"
                                  ? "/addTicketDark.svg"
                                  : "/addTicket.svg"
                              }
                              alt="add Ticket"
                              width={24}
                              height={24}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.boxGap12}>
              <div className={styles.boxTotalPrice}>
                <p>Итого:</p>
                <div className={styles.overPrice}>
                  <div className={styles.price}>
                    {formatNumber("3399000")} so’m
                  </div>
                  {promocodeVerify ? <></> : <></>}
                </div>
              </div>
              <button
                onClick={() => setModal(modal + 1)}
                className={styles.boxButtonNextAdaptive}>
                Далее: 3 399 000 so’m
              </button>
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
                    src={
                      theme === "dark"
                        ? "/orderTimerDark.svg"
                        : "/orderTimer.svg"
                    }
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
                          src={
                            resolvedTheme === "dark"
                              ? "/cardDark.svg"
                              : "/card.svg"
                          }
                          alt="click"
                          width={32}
                          height={32}
                        />
                        <p>Банковская карта</p>
                      </div>
                      <p>Новая банковская карта</p>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Промокод или код сертификата"
                  />
                </div>
                <div className={styles.boxPrivatyPolicy}>
                  <button
                    onClick={() => setPrivatyPolicy(!privatyPolicy)}
                    className={
                      privatyPolicy
                        ? styles.boxkvadratActive
                        : styles.boxkvadrat
                    }
                  >
                    {privatyPolicy ? (
                      <Image
                        src={
                          theme === "dark"
                            ? "/orderPrivatyDark.svg"
                            : "/orderPrivaty.svg"
                        }
                        alt="галочка"
                        width={28}
                        height={28}
                      />
                    ) : (
                      <></>
                    )}
                  </button>
                  <p>
                    Совершая оплату, вы принимаете
                    <a href="">пользовательское соглашение</a>
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setModal(modal + 2)}
              className={styles.boxButtonNext}
            >
              <p>Далее: 3 399 000 so’m</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
