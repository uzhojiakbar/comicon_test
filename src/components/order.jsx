"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./order.module.css";
import useNumberFormatter from "@/utils/NumberFormatter";
import { Modak } from "next/font/google";
import { useTheme } from "next-themes";

export default function order({ isOpen, onClose }) {
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
  const inputs = useRef([]);
  const { resolvedTheme, theme } = useTheme();

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

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {modal === 1 && (
        <div
          className={styles.mainContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalLeftBox}>
            <div className={styles.boxModalLeftTop}>
              <div className={styles.eventInfo}>
                <div className={styles.eventName}>
                  <h1>GEEK CON</h1>
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
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={index} className={styles.oneTypeTicket}>
                  <div className={styles.oneTypeTicketHead}>
                    <h6>Входной билет</h6>
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
                        <button
                          onClick={() => setQuantity(quantity - 1)}
                          disabled={quantity < 1}
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
                        <p>{quantity}</p>
                        <button onClick={() => setQuantity(quantity + 1)}>
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
              className={styles.boxButtonNextAdaptive}
            >
              Далее: 3 399 000 so’m
            </button>
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
      {modal === 2 && (
        <div className={styles.mainContainer1}onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalRightBox1}>
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
                    <a href=""> пользовательское соглашение</a>
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setModal(modal + 1)}
              className={styles.boxButtonNextAdaptive}>
              <p>Далее: 3 399 000 so’m</p>
            </button>
          </div>
        </div>
      )}
      {modal === 3 && (
        <div
          className={styles.mainContainer1}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.firstPayment}>
            <h1>Реквизиты для оплаты</h1>
            <div className={styles.boxColGap4}>
              <div className={styles.boxRowGap8}>
                <div className={styles.boxInput}>
                  <Image
                    src={
                      resolvedTheme === "dark" ? "/cardDark.svg" : "/card.svg"
                    }
                    alt="card"
                    width={32}
                    height={32}
                  />
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                </div>
                <div className={styles.boxInput1}>
                  <input type="text" placeholder="ММ / ГГ" />
                </div>
              </div>
              <div className={styles.boxRowGap4}>
                <div className={styles.boxPayment}>
                  <Image src="/humo.svg" alt="humo" width={50} height={30} />
                </div>
                <div className={styles.boxPayment}>
                  <Image
                    src={theme === "dark" ? "/uzcardDark.svg" : "/uzcard.svg"}
                    alt="uzcard"
                    width={76}
                    height={14}
                  />
                </div>
              </div>
            </div>
            <div className={styles.boxRowSpaceBetween}>
              <h1>Итого: 3 399 000 so’m</h1>
              <button
                className={styles.buttonPey}
                onClick={() => setModal(modal + 1)}
              >
                Оплатить
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === 4 && (
        <div
          className={styles.mainContainer1}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.firstPayment}>
            <h1>Введите код из СМС</h1>
            <h3>Мы отправили СМС на ваш номер</h3>
            <div className={styles.boxColGap16}>
              <div className={styles.boxRowGap8}>
                {code.map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    type="text"
                    inputMode="numeric" // Ограничиваем ввод только цифрами
                    maxLength="1"
                    value={code[index]}
                    onChange={(e) => handleChangeVerification(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    onPaste={handlePaste}
                    placeholder="x"
                    id={`input-${index}`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.boxRowSpaceBetween}>
              <button
                className={styles.buttonNext}
                onClick={() => setModal(modal + 1)}
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
