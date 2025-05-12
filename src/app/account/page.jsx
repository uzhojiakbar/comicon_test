"use client";
import NextImage from "next/image";
import styles from "./account.module.css";
import NavBar from "@/components/nav";
import Footer from "@/components/footer";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/utils/userProvider";
import { useGoogleLogin } from "@react-oauth/google";
import { UseLinkUnlickAccount, useUpdateUserAvatar } from "@/utils/server";
import { ModalContainer, StyledModal } from "@/app/account/style";
import styles2 from "./../login/login.module.css";
import { formatPhoneNumber } from "@/utils/PhoneFormatter";
import { useToast } from "@/components/toastProvider";
import useApi from "@/utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "@/context/languageContext";
import NavAdaptive from "@/components/navAdaptive";
import Link from "next/link";

export default function account() {
  const { translate, language } = useLanguage();
  const [account, setAccount] = useState("tickets");
  const [login, setLogin] = useState(false);
  const [ticketdata, setTicketData] = useState({});
  const { resolvedTheme, theme } = useTheme();
  const api = useApi();
  const { user, isLoadingUser } = useUser();
  const [sessionId, setSessionId] = useState();
  const router = useRouter();

  const countryCode = "+998";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [code, setCode] = useState(new Array(6).fill(""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const inputs = useRef([]);
  const { addToast } = useToast();

  const mutationLinkUnlik = UseLinkUnlickAccount();
  const mutationLinkAvatarUpdate = useUpdateUserAvatar();
  // -------------------------- Link unlink google --------------------------
  const LinkGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const requestData = {
          provider: "google",
          detail: {
            data: tokenResponse?.access_token,
          },
        };
        console.log(tokenResponse);
        console.log(requestData);
        mutationLinkUnlik.mutate({
          data: requestData,
          onSuccess: async (data) => {
            console.log("DataLinkGoogle", data);
            console.log(data);
            addToast(data?.data?.detail, "success");
          },
          onError: async (err) => {
            addToast(
              err?.response?.data?.error || "Xatolik | Error",
              "warning"
            );
            console.log("ErrorLinkGoogle", err);
            console.log(err);
          },
        });
      } catch (e) {
        console.error("Error during API request:", e);
        addToast("Xatolik | Error", "error");
      }
    },
    onError: (error) => console.error("Google login failed:", error),
  });

  const UnLinkGoogle = () => {
    mutationLinkUnlik.mutate({
      data: {
        provider: "google",
      },
      onSuccess: async (data) => {
        addToast(data?.data?.detail, "success");
        console.log("DataUnLinkLinkGoogle", data);
      },
      onError: async (err) => {
        addToast(err?.response?.data?.error || "Xatolik | Error", "error");

        console.log("ErrorUnLinkLinkGoogle", err);
      },
    });
  };
  // ------------------------------------------------------------------------------

  // -------------------------- Link unlink telegram --------------------------
  const LinkOrUnlinkTelegram = async () => {
    mutationLinkUnlik.mutate({
      data: {
        provider: "telegram",
        detail: { token: null },
      },
      onSuccess: async (data) => {
        addToast(data?.data?.detail, "success");
        console.log("DataUnLinkLinkGoogle", data);

        const { token, telegram_link: bot_link } = data.data;
        const telegramWindow = window.open(bot_link, "_blank"); // Открываем Telegram

        let intervalId = setInterval(() => {
          mutationLinkUnlik.mutate({
            data: { provider: "telegram", detail: { token } },
            onSuccess: async (data) => {
              console.log("TG INNER", data);
              if (data?.data?.status === "success") {
                addToast(data?.data?.detail, "success");
                clearInterval(intervalId);

                // Закрываем Telegram-вкладку после успешной привязки
                if (telegramWindow) {
                  telegramWindow.close();
                }
              }
            },
            onError: async (err) => {
              if (err?.response?.data?.status === "error") {
                addToast(
                  err?.response?.data?.error || "Xatolik | Error",
                  "error"
                );
                clearInterval(intervalId);
              } else {
                addToast(
                  err?.response?.data?.error || "Xatolik | Error",
                  "error"
                );
              }
              console.log("INNER ERROR", err);
            },
          });
        }, 1000); // Проверяем каждые 1 секунду
      },
      onError: async (err) => {
        addToast(err?.response?.data?.error || "Xatolik | Error", "error");
        console.log("ErrorUnLinkLinkGoogle", err);
      },
    });
  };
  // ------------------------------------------------------------------------------

  // -------------------------- Link Phone number --------------------------
  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;

    // Разрешаем только цифры и первый символ '+'
    if (value[0] === "+") {
      value = "+" + value.slice(1).replace(/[^0-9]/g, ""); // Оставляем + и удаляем остальные нецифровые символы
    } else {
      value = value.replace(/[^0-9]/g, ""); // Оставляем только цифры
    }

    // Проверяем, если номер начинается с 0, добавляем префикс страны
    if (!value.startsWith(countryCode)) {
      value = countryCode + value.slice(countryCode.length); // Добавляем код страны
    }

    setPhoneNumber(value);

    // Убираем ошибку, если пользователь начал вводить заново
    if (errorMessage) setErrorMessage(null);

    // Проверка на валидность номера
    setIsPhoneNumberValid(value.length === 13); // Предполагаем, что валидный номер — 13 символов
  };

  const handlePhoneNumberFocus = (e) => {
    if (e.target.selectionStart < countryCode.length) {
      e.target.setSelectionRange(countryCode.length, countryCode.length);
    }
  };

  const LoginSubmit = async () => {
    try {
      mutationLinkUnlik.mutate({
        data: {
          provider: "phone_number",
          detail: {
            phone_number: phoneNumber,
          },
        },
        onSuccess: async (data) => {
          console.log(data);
          if (data?.data?.status == "success") {
            setSessionId(data?.data.session_id);
            setLogin(true);
            setPhoneNumber(countryCode);
            addToast(data?.data?.message, "success");
            setErrorMessage(null);
          } else {
          }
        },
        onError: async (err) => {
          console.log(err);
          if (err?.response?.data?.status == "error") {
            addToast(err?.response?.data?.error || "Xatolik | Error", "error");
          }
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (login === true) {
      setSecondsLeft(60); // Сброс таймера
      setIsButtonDisabled(true); // Блокировка кнопки

      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false); // Разблокировка кнопки
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Очистка таймера при выходе со страницы
    }
  }, [login]);
  // Verifcation code
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

  const LoginVerifySubmit = async () => {
    try {
      mutationLinkUnlik.mutate({
        data: {
          provider: "phone_number",
          detail: {
            session_id: sessionId,
            otp_code: code.join(""),
          },
        },
        onSuccess: async (data) => {
          console.log(data);
          setLogin(false);
        },
        onError: async (err) => {
          if (err?.response?.data?.status == "error") {
            addToast(err?.response?.data?.error || "Xatolik | Error", "error");
            if (err.response) {
              if (err.response.status === 400) {
                setErrorMessage(`${translate("error400")}`);
              } else if (err.response.status === 429) {
                setErrorMessage(`${translate("error429")}`);
              } else {
                setErrorMessage(`${translate("error")}`);
              }
            }
          }
        },
      });

      // Обновляем страницу, чтобы сработал редирект в /account/
      // await document.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // ------------------------------------------------------------------------------

  // -------------------------- Logout --------------------------
  const LogoutSubmit = async () => {
    try {
      await api.post("user/logout/", { withCredentials: true });
      Cookies.remove("access_token");
      console.log("Вы успешно вышли из аккаунта!");

      // Перенаправляем пользователя на страницу логина
      if (typeof window !== "undefined") {
        window.location.href = "/"; // Bu avtomatik refresh bilan birga ishlaydi
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  // ------------------------------------------------------------------------------

  // -------------------------- Change Avatar --------------------------
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar); // Avatar oldindan ko‘rish uchun
  const fileInputRef = useRef(null); // File input’ni boshqarish uchun ref

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = async (file) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      mutationLinkAvatarUpdate.mutate({
        avatar: file,
        onSuccess: async (data) => {
          console.log(data);
          addToast(data?.data?.detail, "success");
        },
        onError: async (err) => {
          addToast(err?.response?.data?.avatar[0], "error");
        },
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };
  // ------------------------------------------------------------------------------

  // -------------------------- Ticket List --------------------------

  const fetchTicketList = async () => {
    const response = await api.get("/ticket_list/tickets/");
    return response.data;
  };

  const {
    data: ticketList,
    isLoading: isLoadingTicketList,
    isError: isErrorTicketList,
  } = useQuery({
    queryKey: ["ticketList"],
    queryFn: fetchTicketList,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });
  console.log(ticketList, ticketList?.by_list_type?.active?.count);

  // ------------------------------------------------------------------------------

  const fetchPaymentsList = async () => {
    const response = await api.get("/payments/list/");
    return response.data;
  };

  const {
    data: paymentsList,
    isLoading: isLoadingPaymentsList,
    isError: isErrorPaymentsList,
  } = useQuery({
    queryKey: ["paymentsList"],
    queryFn: fetchPaymentsList,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });
  console.log(paymentsList, paymentsList?.by_list_type?.active?.count);

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    if (!svg || !(svg instanceof SVGSVGElement)) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get 2D context");
      return;
    }

    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = svg.clientWidth;
      canvas.height = svg.clientHeight;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = url;
  };

  return (
    <section className={styles.mainContainer}>
      <NavBar />
      <section className={styles.accountContent}>
        {/* -------------------------- Информация о пользователе -------------------------- */}
        {account === "tickets" ||
        account === "ticketHistory" ||
        account === "qrcode" ||
        account === "favourites" ||
        account === "missed" ||
        account === "archived" ||
        account === "paymentsHistory" ? (
          <>
            <div className={styles.boxUserInfo}>
              <div className={styles.boxUserAvatar}>
                <NextImage
                  src={user?.avatar}
                  alt="avatar"
                  width={80}
                  height={80}
                />
                <p>
                  {user?.first_name} {user?.last_name}
                </p>
              </div>

              <div className={styles.boxTicketsAndPayments}>
                <button
                  onClick={() => setAccount("tickets")}
                  className={
                    account === "tickets"
                      ? styles.boxTicketOrPaymentsHistoryButtonActive
                      : styles.boxTicketOrPaymentsHistoryButton
                  }
                >
                  {translate("tickets")}
                </button>
                <button
                  onClick={() => setAccount("paymentsHistory")}
                  className={account === "paymentsHistory" ? styles.boxTicketOrPaymentsHistoryButtonActive: styles.boxTicketOrPaymentsHistoryButton}>
                  {translate("readhistory")}
                </button>
              </div>

              <div className={styles.boxUserSettingsButton}>
                <button
                  onClick={() => setAccount("settings")}
                  className={styles.settingsButton}
                >
                  <NextImage
                    src="/settings.svg"
                    alt="settings"
                    width={20}
                    height={20}
                  />
                  <span>{translate("Настройки")}</span>
                </button>
                <button onClick={LogoutSubmit} className={styles.logoutButton}>
                  <NextImage
                    src="/logout.svg"
                    alt="settings"
                    width={20}
                    height={20}
                  />
                  <span>{translate("Выход")}</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {account === "tickets" ||
        account === "ticketHistory" ||
        account === "qrcode" ||
        account === "favourites" ||
        account === "missed" ||
        account === "archived" ||
        account === "paymentsHistory" ? (
          <div className={styles.boxTicketsTab}>
            {/* -------------------------- Вкладка билеты -------------------------- */}
            <div className={styles.boxRightBlock}>
              {account === "tickets" && (
                <>
                  {ticketList?.by_list_type?.active?.tickets?.length !== 0 ? (
                    <>
                      {ticketList?.by_list_type?.active?.tickets?.map(
                        (ticket, index) => (
                          <div key={ticket.id} className={styles.boxTIcketsMap}>
                            <div className={styles.boxOneTicket}>
                              <div className={styles.boxMpName}>
                                <div>
                                  <NextImage
                                    src={`https://api.comiccon.uz/media/${
                                      theme === "dark"
                                        ? ticket.event_image_white
                                        : ticket.event_image_black
                                    }`}
                                    alt="MpLogo"
                                    width={200}
                                    height={36}
                                  />
                                </div>
                                <button
                                  onClick={() => {
                                    setAccount("qrcode");
                                    setTicketData(ticket);
                                  }}
                                  className={styles.boxButtonQrDisplay}
                                >
                                  <NextImage
                                    src={
                                      theme === "dark"
                                        ? "/qrcodeDark.svg"
                                        : "/qrcode.svg"
                                    }
                                    alt="qrcode"
                                    width={25}
                                    height={25}
                                  />
                                </button>
                              </div>
                              <div className={styles.boxTicketAndMpInfo}>
                                <div className={styles.boxOneInfo}>
                                  {Number(
                                    ticket.price.replace(".00", "")
                                  ).toLocaleString("ru-RU")}
                                </div>
                                <div className={styles.boxOneInfo}>
                                  {translate("Билет")} №{ticket.id}
                                </div>
                                <div className={styles.boxOneInfo}>
                                  {ticket.seat_info || "Общий зал"}
                                </div>
                                <div className={styles.boxOneInfo}>
                                  {ticket.event_date.split(" ")[0]}
                                </div>
                                <div className={styles.boxOneInfo}>
                                  {ticket.event_date.split(" ")[1]}
                                </div>
                                <div className={styles.boxOneInfo}>
                                  {ticket.location_name}
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setAccount("qrcode");
                                  setTicketData(ticket);
                                }}
                                className={styles.boxButtonQr}
                              >
                                <NextImage
                                  src={
                                    theme === "dark"
                                      ? "/qrcodeDark.svg"
                                      : "/qrcode.svg"
                                  }
                                  alt="qrcode"
                                  width={25}
                                  height={25}
                                />
                              </button>
                            </div>
                            {index !== ticketList.all_tickets.length - 1 && (
                              <hr />
                            )}
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    <>{translate("У вас нет билетов")}</>
                  )}
                </>
              )}
              {/* -------------------------- Вкладка платежы -------------------------- */}
            {account === "paymentsHistory" && (
              <div className={styles.boxMapPayments}>
                <div className={styles.boxPaymentsH1}>
                  <NextImage
                    src={theme === "dark" ? "/payments.svg" : "/paymentsLight.svg"}
                    alt="notification"
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                  <h1>{translate("payments")}</h1>
                </div>
                <div className={styles.boxScrollX}>
                  {paymentsList.length > 0 ? (
                    paymentsList.map(
                      ({order_id, amount, status, method, created_at, action_url}, index) => (
                        <div key={index} className={styles.boxPaymentsMap}>
                          <div className={styles.onePayments}>
                            <div className={styles.boxRowGap105}>
                              <p>
                                {translate("Заказ")}: {order_id}
                              </p>
                              <p>
                                {new Date(created_at)
                                  .toLocaleString("ru-RU", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                  .replace(",", "")}
                              </p>
                              <h6>
                                {Math.floor(amount)} {translate("sum")}
                              </h6>
                              {status !== "DENIED" && status !== "RETURNED" && (
                                <div
                                  className={status === "ACCEPTED" ? styles.statusSucsess : styles.statusWarning}>
                                  <h5>
                                    {status === "ACCEPTED"
                                      ? translate("Оплачено")
                                      : status === "PENDING" || status === "CREATED" &&
                                        translate("В ожидании")}
                                  </h5>
                                </div>
                              )}
                            </div>
                            {status === "ACCEPTED" || status === "PENDING" || status === "CREATED" ? (
                              <Link
                              href={action_url || "404"}
                                target="_blank"
                                className={status === "ACCEPTED" ? styles.buttonSucsess : styles.buttonWarning}>
                                <NextImage
                                  src={theme === 'dark' ? "/chek.svg" : "/chekLight.svg"}
                                  alt="chek"
                                  width={18}
                                  height={18}
                                />
                                {status === "ACCEPTED"
                                  ? translate("Чек")
                                  : translate("Оплатить")}
                              </Link>
                            ) : (
                              <div className={styles.statusError}>
                                <h5>{translate("Отменено")}</h5>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className={styles.notHavePayments}>{translate("У вас нет платежей")}</div>
                  )}
                </div>
              </div>
            )}
              {/* -------------------------- Вкладка QR коды билетов -------------------------- */}
              {account === "qrcode" && (
                <>
                  <div className={styles.boxOneTicketHistory}>
                    <div className={styles.boxMpNameQr}>
                      <NextImage
                        src={`https://api.comiccon.uz/media/${
                          theme === "dark"
                            ? ticketdata?.event_image_white
                            : ticketdata?.event_image_black
                        }`}
                        alt="MpLogo"
                        width={225}
                        height={36}
                      />
                    </div>
                    <div className={styles.boxHistoryAndMpInfo}>
                      <div className={styles.boxOneInfoHistory}>
                        {translate("Билет")} №{ticketdata.id}
                      </div>
                      <div className={styles.boxOneInfoHistory}>
                        {ticketdata?.seat_info || "Общий зал"}
                      </div>
                      <div className={styles.boxOneInfoHistory}>
                        {ticketdata?.event_date?.split(" ")[0]}
                      </div>
                      <div className={styles.boxOneInfoHistory}>
                        {ticketdata?.event_date?.split(" ")[1]}
                      </div>
                      <div className={styles.boxOneInfoHistory}>
                        {ticketdata.location_name}
                      </div>
                    </div>
                    <div className={styles.boxHistoryTicketPrice}>
                      {Number(
                        ticketdata?.price?.replace(".00", "")
                      ).toLocaleString("ru-RU")}
                    </div>
                  </div>
                  <div className={styles.boxColQrCode}>
                    <div className={styles.boxQr}>
                      <QRCodeSVG
                        id="qr-code"
                        value={
                          ticketdata?.barcode
                            ? ticketdata?.barcode
                            : ticketdata?.qrcode
                        }
                        size={314}
                      />
                    </div>
                    <div className={styles.boxButtonsInQrSection}>
                      <button
                        onClick={downloadQRCode}
                        className={styles.boxBtnBack}
                      >
                        <p>{translate("Скачать чек")}</p>
                        <NextImage
                          src={
                            theme === "dark"
                              ? "/downloadCheckDark.svg"
                              : "/downloadCheck.svg"
                          }
                          alt="arrow"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        onClick={() => setAccount("tickets")}
                        className={styles.boxBtnBack}
                      >
                        <NextImage
                          src={
                            theme === "dark"
                              ? "/arrowBackDark.svg"
                              : "/arrowBack.svg"
                          }
                          alt="arrow"
                          width={24}
                          height={24}
                        />
                        <p>{translate("Назад")}</p>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* -------------------------- Вкладка настройки -------------------------- */}
        {account === "settings" ? (
          <div className={styles.boxSettingsTab}>
            <div className={styles.boxSettingsRightBlock}>
              <div className={styles.boxSettingsH1}>
                <h1>{translate("Настройки профиля")}</h1>
                <div className={styles.boxCancelSaveButtons}>
                  <button onClick={() => setAccount("tickets")}>
                    {translate("Сохранить")}
                  </button>
                  <button onClick={() => setAccount("tickets")}>
                    {translate("Отменить")}
                  </button>
                </div>
              </div>
              <div className={styles.boxSettingsRow}>
                <div className={styles.boxAvatar}>
                  <h1>{translate("Аватар")}</h1>
                  <div className={styles.boxAvatarRow}>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={handleClick}
                      className={styles.boxUserImageInSettings}
                      style={{
                        backgroundImage: `linear - gradient(0deg, rgba(42, 44, 58, 0.80) 0 %, rgba(42, 44, 58, 0.80) 100 %), url('${avatarPreview}')`,
                      }}
                    >
                      <NextImage
                        src="/uploadAvatar.svg"
                        alt="upload"
                        width={42}
                        height={42}
                        loading="lazy"
                      />
                      <p>{translate("Нажмите или перетащите изображение")}</p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInput}
                        accept="image/*" // Faqat rasm fayllarini qabul qilish
                        style={{ display: "none" }}
                      />
                    </div>
                    <h1>
                      {user.first_name} {user.last_name}
                    </h1>
                  </div>
                </div>
                <div className={styles.boxSettingsSecurity}>
                  <h1>{translate("Безопастность и вход")}</h1>
                  <div className={styles.boxSettingsSocial}>
                    <button
                      onClick={
                        !user.phone_number ? () => setLogin("step1") : () => {}
                      }
                      className={styles.boxOneSocial}
                    >
                      <NextImage
                        src="/phone.svg"
                        alt="phone"
                        width={32}
                        height={32}
                      />
                      {user.phone_number !== null ? (
                        <p>{formatPhoneNumber(user.phone_number)}</p>
                      ) : (
                        translate("Привязать номер")
                      )}
                    </button>
                    <button
                      onClick={!user.google ? LinkGoogle : () => {}}
                      className={styles.boxOneSocial}
                    >
                      <NextImage
                        src="/google.svg"
                        alt="phone"
                        width={28}
                        height={28}
                      />
                      {user.google !== null ? (
                        <>
                          <p>{user.google.replace("@gmail.com", "")}</p>
                          <NextImage
                            onClick={UnLinkGoogle}
                            src="/closeRed.svg"
                            alt="google"
                            width={28}
                            height={28}
                            loading="lazy"
                          />
                        </>
                      ) : (
                        translate("Привязать Google")
                      )}
                    </button>
                    <button
                      onClick={!user.telegram ? LinkOrUnlinkTelegram : () => {}}
                      className={styles.boxOneSocial}
                    >
                      <NextImage
                        src="/telegramAccount.svg"
                        alt="phone"
                        width={28}
                        height={28}
                      />
                      {user.telegram !== null ? (
                        <>
                          <p>{user?.telegram}</p>
                          <NextImage
                            onClick={LinkOrUnlinkTelegram}
                            src="/closeRed.svg"
                            alt="google"
                            width={28}
                            height={28}
                            loading="lazy"
                          />
                        </>
                      ) : (
                        translate("Привязать Telegram")
                      )}
                    </button>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </section>
      {login ? (
        <ModalContainer
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
        >
          <StyledModal
            open={login}
            onCancel={() => setLogin(false)} // Modalni yopish uchun (agar xochcha bosilsa)
            footer={null} // Footer’ni o‘chirish
            closable={false} // Xochchani yashirish (agar kerak bo‘lmasa)
          >
            {login === "step1" ? (
              <div className={styles2.container1}>
                <div className={styles2.boxPart1}>
                  <div
                    id="btn_text"
                    onClick={() => setLogin(false)}
                    className={styles2.btn_back}
                  >
                    <NextImage
                      src={
                        theme === "dark"
                          ? "/loginArrowLeftDark.svg"
                          : "/loginArrowLeft.svg"
                      }
                      width={24}
                      height={24}
                      alt="Back arrow"
                      loading="lazy"
                    />
                    {/* {translate("back")} */}
                    {translate("next")}
                  </div>
                  <NextImage
                    src={
                      theme === "dark" ? "/ComiconDark.svg" : "/ComiconLogo.svg"
                    }
                    alt="logo"
                    width={150}
                    height={57}
                    loading="lazy"
                  />
                </div>
                <div className={styles2.boxPart2}>
                  {/* <h1>{translate("connectphone")}</h1> */}
                  <h1>{translate("Изменения номера")}</h1>
                  <div className={styles2.boxInput}>
                    <div className={styles2.boxOneInput}>
                      <NextImage
                        src={
                          // theme === "dark" ? "/phone.svg" :
                          "/phoneLight.svg"
                        }
                        alt="phone"
                        width={28}
                        height={28}
                        loading="lazy"
                      />
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder={countryCode}
                        value={phoneNumber}
                        maxLength={13}
                        onChange={handlePhoneNumberChange}
                        onFocus={handlePhoneNumberFocus}
                      />
                    </div>
                    <button
                      disabled={phoneNumber.length != 13}
                      onClick={LoginSubmit}
                      className={styles2.btnNext}
                    >
                      {/* <p>{translate("next")}</p> */}
                      <p>{translate("next")}</p>
                    </button>
                  </div>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
              </div>
            ) : (
              ""
            )}

            {login === true ? (
              <div className={styles2.boxVerification}>
                <div className={styles2.boxPart1}>
                  <button
                    onClick={() => {
                      setLogin("step1");
                      setCode(new Array(6).fill(""));
                    }}
                    id="btn_text"
                    className={styles2.btn_back}
                  >
                    <NextImage
                      src={
                        theme === "dark"
                          ? "/loginArrowLeftDark.svg"
                          : "/loginArrowLeft.svg"
                      }
                      width={24}
                      height={24}
                      alt="Back arrow"
                      loading="lazy"
                    />
                    {/* {translate("back")} */}
                    {translate("Назад")}
                  </button>
                  <NextImage
                    src={
                      theme === "dark" ? "/ComiconDark.svg" : "/ComiconLogo.svg"
                    }
                    alt="logo"
                    width={150}
                    height={57}
                    loading="lazy"
                  />
                </div>
                <div className={styles2.verification}>
                  {/* <h1>{translate("entersms")}</h1> */}
                  <h1>{translate("Введите код из СМС")}</h1>
                  <div className={styles2.boxInputs}>
                    <div className={styles2.InputVerification}>
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
                          id={`input - ${index} `}
                        />
                      ))}
                    </div>
                    <div className={styles2.boxNextPrevousBtns}>
                      <button
                        onClick={() => {
                          setLogin("step1");
                          setCode(new Array(6).fill(""));
                        }}
                      >
                        {/* {translate("back")} */}
                        {translate("Назад")}
                      </button>
                      <button onClick={LoginVerifySubmit}>
                        {/* {translate("next")} */}
                        Далее
                      </button>
                    </div>
                    <button onClick={LoginSubmit} disabled={isButtonDisabled}>
                      <h6
                        style={
                          isButtonDisabled
                            ? {}
                            : { textDecoration: "underline" }
                        }
                      >
                        {isButtonDisabled ? `${secondsLeft} ` : "sendagain"}
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </StyledModal>
        </ModalContainer>
      ) : (
        ""
      )}
      <Footer />
      <NavAdaptive />
    </section>
  );
}
