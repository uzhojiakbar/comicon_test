"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./order.module.css";
import useNumberFormatter from "@/utils/NumberFormatter";
import { useTheme } from "next-themes";
import { PrepareOrder, OrderEdit, OrderApply, AtmosPayCreate, AtmosPayApplyWithOTP, AtmosPayPreApply, OrderPostPromocode } from "@/utils/server/order";
import useApi from "@/utils/api";
import { useToast } from "./toastProvider";
import { useLanguage } from "@/context/languageContext";

export default function order({ seans, isOpen, onClose }) {


  const prepareOrderMutation = PrepareOrder(); // Hook yuqori darajada chaqiriladi
  const EditOrderMutation = OrderEdit(); // Hook yuqori darajada chaqiriladi
  const OrderApplyMutation = OrderApply(); // Hook yuqori darajada chaqiriladi
  const AtmosPayCreateMutation = AtmosPayCreate(); // Hook yuqori darajada chaqiriladi
  const AtmosPayPreApplyMutation = AtmosPayPreApply(); // Hook yuqori darajada chaqiriladi
  const AtmosPayApplyWithOTPMutation = AtmosPayApplyWithOTP(); // Hook yuqori darajada chaqiriladi
  const OrderPostPromocodeMutation = OrderPostPromocode(); // Hook yuqori darajada chaqiriladi


  const [quantity, setQuantity] = useState(0);
  const [privatyPolicy, setPrivatyPolicy] = useState(false);
  const [paymentType, setPaymentType] = useState("click");
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
  const { addToast } = useToast();
  const { translate } = useLanguage()
  const [currentSession, setCurrentSession] = useState({})
  const [eventData, setEventData] = useState()
  const [cardData, setCardData] = useState({
    "card_number": "string",
    "expiry": "string",
    "transaction_id": 0
  })


  const [totalAmoutForModal3, setTotalAMoutFOrModal3] = useState(0)

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
        if (value === 1) {
          addToast(translate("orderEditedPlusText"), "success");
        } else {
          addToast(translate("orderEditedMinusText"), "success");
        }

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


  const CloseAndClearModal = () => {
    onClose()
    setModal(1)
    setCode(new Array(6).fill(""))
  }

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
        CloseAndClearModal();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);


  useEffect(() => {
    setCurrentSession(
      eventData?.sessions
        ?.filter((session) => session.session_id === isOpen)
    )
  }, [eventData, isOpen])

  if (!isOpen) return null;
  if (!seans) return null;



  function parseDate(inputDateString) {
    const date = new Date(inputDateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const day = date.getDate();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];

    let qachonligi = "";

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    if (isToday) {
      qachonligi = "Today";
    } else if (isTomorrow) {
      qachonligi = "Tomorrow";
    } else {
      qachonligi = `${day}-${month}`;
    }

    // Soat va minutni formatlash (00:00 shaklida)
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    return {
      day: isToday || isTomorrow ? qachonligi : day,
      month: isToday || isTomorrow ? "" : month,
      qachonligi,
      time,
    };
  }

  const AtmosPyPreApply = () => {
    AtmosPayPreApplyMutation.mutate(
      {
        ...cardData,
        "transaction_id": totalAmoutForModal3?.transaction_id
      },
      {
        onSuccess: (data) => {
          console.log("Order click successfully:", data);
          setTotalAMoutFOrModal3(data)
          setModal(4)
          addToast(translate("confirmationAndCardDetails"), "success"); // Toast qo'shish
        },
        onError: (error) => {
          console.error("Failed to click apply order:", error);
          addToast(translate("error"), "error"); // Toast qo'shish
        },
      }
    );
    return;
  }

  const AtmosPyeApply = () => {

    console.log("OTP", code.join(""));

    AtmosPayApplyWithOTPMutation.mutate(
      {
        "otp": code.join(""),
        "transaction_id": +totalAmoutForModal3?.transaction_id
      },
      {
        onSuccess: (data) => {
          console.log("Order click successfully:", data);
          setTotalAMoutFOrModal3(data?.data)
          onClose()
          addToast(translate("confirmationAndCardDetails"), "success"); // Toast qo'shish
        },
        onError: (error) => {
          console.error("Failed to click apply order:", error);
          addToast(translate("error"), "error"); // Toast qo'shish
        },
      }
    );
    return;
  }

  const AtmosPyCreate = () => {
    AtmosPayCreateMutation.mutate(
      {
        "order_id": eventData?.order_id
      },
      {
        onSuccess: (data) => {
          console.log("Order click successfully:", data);
          setTotalAMoutFOrModal3(data?.data)
          setModal(3)
          addToast(translate("confirmationAndCardDetails"), "success"); // Toast qo'shish
        },
        onError: (error) => {
          console.error("Failed to click apply order:", error);
          addToast(translate("error"), "error"); // Toast qo'shish
        },
      }
    );
    return;
  }

  const HandelPayment = () => {
    if (paymentType === "click") {
      console.log("click");
      OrderApplyMutation.mutate(
        {
          payment_method: "CLICK", // To'g'ri kalit va qiymat
          return_url: "http://localhost:3000/account", // To'g'ri URL
        },
        {
          onSuccess: (data) => {
            console.log("Order click successfully:", data);
            addToast(translate("redirectingToClick"), "success"); // Toast qo'shish
            if (data?.url) {
              setTimeout(() => {
                window.location.href = data.url; // Foydalanuvchini URL ga yo'naltirish
              }, 300);
            }
          },
          onError: (error) => {
            console.error("Failed to click apply order:", error);
            addToast(translate("error"), "error"); // Toast qo'shish
          },
        }
      );
      return;
    }

    if (paymentType === "card") {
      console.log("ATMOSPAY");
      OrderApplyMutation.mutate(
        {
          payment_method: "ATMOSPAY", // To'g'ri kalit va qiymat
          return_url: "http://localhost:3000/account", // To'g'ri URL
        },
        {
          onSuccess: (data) => {
            console.log("Order click successfully:", data);
            AtmosPyCreate()
          },
          onError: (error) => {
            console.error("Failed to click apply order:", error);
            addToast(translate("error"), "error"); // Toast qo'shish
          },
        }
      );
      return;
    }

  }



  const PostPromocode = () => {
    OrderPostPromocodeMutation.mutate(
      {
        "promo_code": promocodeVerify
      },
      {
        onSuccess: (data) => {
          console.log("Order click successfully:", data);
          handlePrepareOrder()
          addToast(translate("promoCodeApplied"), "success"); // Toast qo'shish
        },
        onError: (error) => {
          console.error("promoCodeError", error);
          addToast(translate("error"), "error"); // Toast qo'shish
        },
      }
    );
    return;
  }

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
                  <h1 onClick={handlePrepareOrder}>{
                    currentSession?.[0]?.event_name || ""
                  }</h1>
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
                  <p>{translate(parseDate(currentSession?.[0]?.session_time)?.day)}
                    {
                      translate(parseDate(currentSession?.[0]?.session_time)?.month)
                        ?
                        ` - ${translate(parseDate(currentSession?.[0]?.session_time)?.month)} `
                        : ""

                    }
                    в {parseDate(currentSession?.[0]?.session_time)?.time}</p>
                  <div className={styles.boxEventPlace}>
                    <p>{currentSession?.[0]?.location_name}</p>
                    <h6>{translate("улица Бабура, 174/12")}</h6>
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
                      <p>{formatNumber(ticket.remaining)} {translate("билетов")}</p>
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
                        <h3>{formatNumber(ticket.price)} {translate("сум")}</h3>
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
                <p>{translate("total")}:</p>
                <div className={styles.overPrice}>
                  <div className={styles.price}>
                    {formatNumber(eventData?.total_amount)} {translate("uzs_som")}
                  </div>
                  {promocodeVerify ? <></> : <></>}
                </div>
              </div>
              <button
                onClick={() => setModal(modal + 1)}
                className={styles.boxButtonNextAdaptive}>
                {translate("next")} :
                {formatNumber(eventData?.total_amount)} {translate("uzs_som")}
              </button>
            </div>
          </div>
          <div className={styles.modalRightBox}>
            <div className={styles.boxModalRightTop}>
              <div className={styles.boxRowH1}>
                <h1>{translate("pay")}</h1>
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
                  <p>{translate("payWithin")}</p>
                </div>
                <div className={styles.boxPaymentsType}>
                  <p>{translate("paymentMethod")}</p>
                  <div className={styles.boxPayments}>
                    {/* CLICK */}

                    {eventData?.payment_methods?.includes("CLICK") ?
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
                            <p>{translate("CLICK")}</p>
                          </div>
                          <p>{translate("payWithClick")}</p>
                        </button>
                        : ""
                    }

                    {/* PAYME */}
                    {eventData?.payment_methods?.includes("PAYME") ?
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
                          <p>{translate("Payme")}</p>
                        </div>
                        <p>{translate("payWithPayme")}</p>
                      </button>
                      : ""
                    }

                    {/* CARD */}
                    {eventData?.payment_methods?.includes("ATMOSPAY") ?
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
                          <p>{translate("bankCard")}</p>
                        </div>
                        <p>{translate("newBankCard")}</p>
                      </button>
                      : ""}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px"
                    }}
                  > <input
                      style={{ width: "80%" }}
                      type="text"
                      disabled={!!eventData?.promo?.discount_amount}
                      onChange={(e) => setPromocodeVerify(e?.target?.value)}
                      placeholder={translate("Промокод или код сертификата")}
                    />
                    {/* PostPromocode */}
                    <button
                      disabled={!!eventData?.promo?.discount_amount}
                      onClick={() => PostPromocode()}
                      className={styles.boxButtonNext}
                    >
                      {translate("Применить")}
                    </button></div>

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
                    {translate("paymentAcceptance")} {" "}
                    <a href="">{translate("userAgreement")}</a>
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => HandelPayment()}
              className={styles.boxButtonNext} disabled={!privatyPolicy}>
              <p>{translate("Далее")}: {formatNumber(eventData?.total_amount)} {translate("uzs_som")}</p>
            </button>
          </div>
        </div>
      )}
      {modal === 2 && (
        <div className={styles.mainContainer1} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalRightBox1}>
            <div className={styles.boxModalRightTop}>
              <div className={styles.boxRowH1}>
                <h1>{translate("ОПЛАТА")}</h1>
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
                  <p>{translate("Оплатите в течении 15:00 минут")}</p>
                </div>
                <div className={styles.boxPaymentsType}>
                  <p>{translate("Способ оплаты")}</p>
                  <div className={styles.boxPayments}>
                  {eventData?.payment_methods?.includes("CLICK") ?
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
                            <p>{translate("CLICK")}</p>
                          </div>
                          <p>{translate("payWithClick")}</p>
                        </button>
                        : ""
                    }
                    {eventData?.payment_methods?.includes("ATMOSPAY") ?
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
                          <p>{translate("bankCard")}</p>
                        </div>
                        <p>{translate("newBankCard")}</p>
                      </button>
                      : ""}

                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px"
                    }}
                  > <input
                      style={{ width: "80%" }}
                      type="text"
                      disabled={!!eventData?.promo?.discount_amount}
                      onChange={(e) => setPromocodeVerify(e?.target?.value)}
                      placeholder={translate("Промокод или код сертификата")}
                    />
                    {/* PostPromocode */}
                    <button
                      disabled={!!eventData?.promo?.discount_amount}
                      onClick={() => PostPromocode()}
                      className={styles.boxButtonNext}
                    >
                      {translate("Применить")}
                    </button></div>
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
                    {translate("Совершая оплату, вы принимаете")}
                    <a href=""> {translate("пользовательское соглашение")}</a>
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => HandelPayment()}
              className={styles.boxButtonNext} disabled={!privatyPolicy}>
              <p>{translate("Далее")}: {formatNumber(eventData?.total_amount)} {translate("uzs_som")}</p>
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
            <h1>{translate("Реквизиты для оплаты")}</h1>
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
                  <input onChange={(e) => setCardData({
                    ...cardData,
                    "card_number": e.target.value
                  })} type="text" placeholder="XXXX XXXX XXXX XXXX" />
                </div>
                <div className={styles.boxInput1}>
                  <input
                    onChange={(e) => setCardData({
                      ...cardData,
                      "expiry": e.target.value
                    })}
                    type="text" placeholder={translate("ММ / ГГ")} />
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
              <h1>{translate("Итого")}:  {formatNumber(totalAmoutForModal3?.amount)} {translate("uzs_som")}</h1>
              <button
                className={styles.buttonPey}
                onClick={() => AtmosPyPreApply()}
              >
                {translate("Оплатить")}
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
            <h1>{translate("Введите код из СМС")}</h1>
            <h3>{translate("Мы отправили СМС на ваш номер")}</h3>
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
                onClick={() => AtmosPyeApply()}
              >
                {translate("Далее")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
