"use client";
import styles from "./login.module.css";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import useApi from "@/utils/api";
import { useGlobal } from "@/utils/global";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { useLanguage } from "@/context/languageContext";
import { useToast } from "@/components/toastProvider";

export default function LoginPage() {
  const api = useApi();
  const { translate } = useLanguage();
  const countryCode = "+998";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [next, setNext] = useState(false);
  const inputs = useRef([]);
  const [code, setCode] = useState(new Array(6).fill(""));
  const [login, setLogin] = useState();
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [sessionId, setSessionId] = useState();
  const { auth, logout } = useGlobal();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [firstNameError, setFirstNameError] = useState();
  const [LastNameError, setLastNameError] = useState();
  const lastNameRef = useRef(null);
  const { theme } = useTheme();
  // const { addToast } = useToast();

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  let timerRef = null; // Переменная для хранения таймера

  // -------------------------------------- Phone number --------------------------------------

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

    // Проверка на валидность номера
    setIsPhoneNumberValid(value.length === 13); // Предполагаем, что валидный номер — 13 символов
  };

  const handlePhoneNumberFocus = (e) => {
    if (e.target.selectionStart < countryCode.length) {
      e.target.setSelectionRange(countryCode.length, countryCode.length);
    }
  };

  // -------------------------------------- API --------------------------------------

  const LoginSubmit = async () => {
    try {
      const response = await api.post("user/login/", {
        phone_number: phoneNumber,
      });
      console.log("API Response:", response.data);
      setSessionId(response.data.session_id);
      setLogin(response.data.login);
      setSecondsLeft(response.data.wait_seconds);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        if (error.response.status === 400) {
          // addToast(error.response.data.phone_number?.[0], "error");
        } else if (error.response.status === 429) {
          // addToast(error.response.data.message, "error");
        } else {
          // addToast(error.response.data.message, "error");
        }
      } else {
        // addToast(`${translate("networkerror")}`, "error");
      }
    }
  };

  const LoginDetailSubmit = async () => {
    try {
      const response = await api.post("user/login-detail/", {
        session_id: sessionId,
        first_name: firstName,
        last_name: secondName,
      });
      console.log("API Response:", response.data);
      setSessionId(response.data.session_id);
      setLogin(response.data.login);
      setSecondsLeft(response.data.wait_seconds);
    } catch (error) {
      if (error.response && error.response.data) {
        const { first_name, last_name } = error.response.data;
        // Обработка ошибок для каждого поля
        if (first_name) {
          setFirstNameError(first_name); // Пример сообщения об ошибке для имени
        } else {
          setFirstNameError("");
        }

        if (last_name) {
          setLastNameError(last_name); // Пример сообщения об ошибке для фамилии
        } else {
          setLastNameError("");
        }
      } else {
        console.error("Неизвестная ошибка", error);
      }
    }
  };

  const LoginVerifySubmit = async () => {
    try {
      const response = await api.post("user/login-verify/", {
        session_id: sessionId,
        otp_code: code.join(""),
        cookie: true,
      });

      console.log("API Response:", response?.data);

      // Сохраняем access_token в куки
      // Cookies.set("access_token", response?.data?.access_token || null, {
      //   domain: ".tcats.uz",
      //   sameSite: "Lax",
      //   expires: 60,
      //   secure: true
      // });

      Cookies.set("access_token", response?.data?.access_token || null);

      // Обновляем страницу, чтобы сработал редирект в /account/
      await document.location.reload();
    } catch (error) {
      console.error("Error:", error);
      // addToast(`${translate("error")}`, "error");
    }
  };

  
  const LoginOTPSubmit = async () => {
    try {
      const response = await api.post("user/resend-otp/", {
        session_id: sessionId,
      });
      console.log("API Response:", response?.data);
  
      startTimer(response.data.wait_seconds); // Запуск таймера заново
      // addToast(translate("newsmssend"), "success");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        if (error.response.status === 429) {
          // addToast(error.response.data.error, "error");
        } else {
          // addToast(`${translate("error")}`, "error");
        }
      } else {
        // addToast(`${translate("networkerror")}`, "error");
      }
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token Response:", tokenResponse);
      try {
        console.log("tokenResponse: ", tokenResponse);

        const response = await api.post("user/login-google/", {
          data: tokenResponse.access_token,
          cookie: true,
        });

        // Cookies.set("access_token", response?.data?.access_token || null, {
        //   domain: ".tcats.uz",
        //   sameSite: "Lax",
        //   expires: 60,
        //   secure: true
        // });

        Cookies.set("access_token", response?.data?.access_token || null);


        // if (response?.data?.refresh_token) {
        //   Cookies.set("refresh_token", response?.data?.refresh_token || null);
        // }
        console.log(tokenResponse);
        console.log("respone: ", response);

        // Refresh token qoshildi.
        // await document.location.reload()
        // router.replace('/account');
        document.location.reload();
        console.log("API Response:", tokenResponse.data);
        // await auth({
        //   accessToken: response.data.access_token,
        //   refreshToken: response.data.refresh_token,
        // });ƒ
        // refetch();
      } catch (e) {
        console.error("Error during API request:", e);
      }
    },
    onError: (error) => console.error("Google login failed:", error),
  });


  const loginTelegram = async () => {
    try {
      const initialResponse = await api.post("/user/login-telegram/", {
        token: null,
        cookie: false,
      });
  
      const { token, telegram_link: bot_link } = initialResponse.data;
      console.log("Generated Token:", token, "Bot Link:", bot_link);
  
      // Открываем Telegram в новой вкладке
      const telegramWindow = window.open(bot_link, "_blank");
  
      // Сохраняем временный токен
      Cookies.set("access_telegram_token", token);
  
      let intervalId = setInterval(async () => {
        const isVerified = await verifyTelegramToken();
        console.log("IS VERIFIED:", isVerified);
  
        if (isVerified) {
          Cookies.remove("access_telegram_token");
          clearInterval(intervalId); // Останавливаем интервал
  
          // Закрываем Telegram вкладку
          if (telegramWindow) {
            telegramWindow.close();
          }
  
          // Перенаправляем пользователя на главную страницу
          window.location.href = "/";
        }
      }, 1000); // Проверяем каждые 1 секунду
  
      // addToast(translate("pleaseconfirmtelegram"), "success");
  
    } catch (error) {
      console.error("Telegram Login Error:", error);
      // addToast(error.response?.data?.error || translate("telegramloginerror"),"error");
    }
  };
  
  const verifyTelegramToken = async () => {
    const token = Cookies.get("access_telegram_token");
  
    if (!token) {
      // addToast(translate("notokenfound"), "error");
      return false;
    }
  
    try {
      const response = await api.post("/user/login-telegram/", { token, cookie: true });
      console.log("API Response:", response.data);
  
      if (response?.data?.status === "success") {
        Cookies.set("access_token", response?.data?.access_token || null, {
          domain: ".tcats.uz",
          sameSite: "Lax",
          expires: 60,
          secure: true
        });
  
        // if (response?.data?.refresh_token) {
        //   Cookies.set("refresh_token", response?.data?.refresh_token || null);
        // }
  
        Cookies.remove("access_telegram_token");
        console.log("LOGIN SUCCESSFUL", response);
  
        return true; // Токен верифицирован
      } else {
        return false;
      }
    } catch (error) {
      console.error("Verification Error:", error);
      // addToast(error.response?.data?.error || translate("verificationerror"),"error");
      return false;
    }
  };
  
  // useEffect(() => {
  //     let intervalId;
  //
  //     // Agar telegram_token mavjud bo‘lsa, har sekundda tekshirish boshlanadi
  //     if (Cookies.get("access_telegram_token")) {
  //         intervalId = setInterval(async () => {
  //             const isVerified = await verifyTelegramToken();
  //             console.log("ISVERIFIED:", isVerified);
  //             if (isVerified) {
  //                 clearInterval(intervalId); // Tasdiqlanganda interval to‘xtaydi
  //             }
  //         }, 1000); // Har 1 sekundda so‘rov
  //     }
  //
  //     // Komponent unmount bo‘lganda intervalni tozalash
  //     return () => {
  //         if (intervalId) clearInterval(intervalId);
  //     };
  // }, [Cookies.get("access_telegram_token")]);

  const handleFirstNameKeyDown = (e) => {
    if (e.key === "Enter") {
      lastNameRef.current.focus();
    }
  };

  const handleSecondNameKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      firstName.trim() !== "" &&
      secondName.trim() !== ""
    ) {
      nextButtonRef.current.focus();
    }
  };

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

  // -------------------------------------- Theme --------------------------------------

  // const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      className={styles.MainPage} style={{ backgroundImage: `url('/loginBackground.png')` }}>
      {login === undefined && (
        <section className={styles.container1}>
          <div className={styles.boxPart1}>
            <a id="btn_text" href="/" className={styles.btn_back}>
              <Image
                src={theme === "dark" ? "loginArrowLeftDark.svg" : "/loginArrowLeft.svg"}
                width={20}
                height={20}
                alt="Back arrow"
                loading="lazy"
              />
              {translate("Назад")}
            </a>
            <Link href="/">
              <Image
                src={
                  theme === "dark" ? "/TcatslogoDark.svg" : 
                  "/Tcatslogo.svg"}
                alt="logo"
                width={100}
                height={38}
                loading="lazy"
              />
            </Link>
          </div>
          <div className={styles.boxPart2}>
            <h1>{translate("Вход и регистрация")}</h1>
            <div className={styles.boxInput}>
              <div className={styles.boxOneInput}>
                <Image
                  src={
                    // theme === "dark" ? "/phone.svg" : 
                    "/phoneLight.svg"}
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
                className={styles.btnNext}
              >
                <p>{translate("next")}</p>
              </button>
            </div>
            <hr />
            <div className={styles.boxSocial}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  loginGoogle();
                }}
                className={styles.oneSocial}
              >
                <Image
                  src="/google.svg"
                  loading="lazy"
                  alt="google"
                  width={20}
                  height={20}
                />
                <p>{translate("Войти через Google")}</p>
              </button>
              <button
                className={styles.oneSocial}
                onClick={(e) => {loginTelegram()}}>
                <Image
                  src="/telegramLogin.svg"
                  alt="google"
                  width={20}
                  height={20}
                  loading="lazy"
                />
                <p>{translate("Войти через Телеграм")}</p>
              </button>
            </div>
          </div>
        </section>
      )}
      {login === false && (
        <section className={styles.container1}>
          <div className={styles.boxPart1}>
            <button
              onClick={() => setLogin(undefined)}
              id="btn_text"
              className={styles.btn_back}
            >
              <Image
                src={theme === "dark" ? "loginArrowLeftDark.svg" : "/loginArrowLeft.svg"}
                width={24}
                height={24}
                alt="Back arrow"
                loading="lazy"
              />
              {translate("Назад")}
            </button>
            <Link href="/">
              <Image
                src={
                  theme === "dark" ? "/TcatslogoDark.svg" :
                  "/Tcatslogo.svg"
                }
                alt="logo"
                width={100}
                height={38}
                loading="lazy"
              />
            </Link>
          </div>
          <main className={styles.boxPart2}>
            <h1>{translate("Введите имя и фамилию")}</h1>
            <div className={styles.text2}>
              <div className={styles.inputNumberred}>
                <input
                  type="text"
                  name="FirstName"
                  id="FirstName"
                  placeholder={translate("Имя")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyDown={handleFirstNameKeyDown}
                />
              </div>
              <div className={styles.inputNumberred}>
                <input
                  type="text"
                  name="SecondName"
                  id="SecondName"
                  placeholder={translate("Фамилия")}
                  value={secondName}
                  onChange={(e) => {
                    setSecondName(e.target.value);
                    if (LastNameError && e.target.value.trim() !== "") {
                      setLastNameError(null);
                    }
                  }}
                  ref={lastNameRef}
                  onKeyDown={handleSecondNameKeyDown}
                />
              </div>
              <button onClick={LoginDetailSubmit} className={styles.next_btn}>
                <div id="btn_text">
                  <p>{translate("next")}</p>
                </div>
              </button>
            </div>
          </main>
        </section>
      )}
      {login === true && (
        <div className={styles.boxVerification}>
          <div className={styles.boxPart1}>
            <button
              onClick={() => {
                setLogin(undefined);
                setCode(new Array(6).fill(""));
              }}
              id="btn_text"
              className={styles.btn_back}
            >
              <Image
                src={theme === "dark" ? "loginArrowLeftDark.svg" : "/loginArrowLeft.svg"}
                width={24}
                height={24}
                alt="Back arrow"
                loading="lazy"
              />
              {translate("Назад")}
            </button>
            <Link href="/">
              <Image
                src={
                  theme === "dark" ? "/TcatslogoDark.svg" :
                   "/Tcatslogo.svg"}
                alt="logo"
                width={100}
                height={38}
                loading="lazy"
              />
            </Link>
          </div>
          <div className={styles.verification}>
            <h1>{translate("Введите код из СМС")}</h1>
            <div className={styles.boxInputs}>
              <div className={styles.InputVerification}>
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
              <div className={styles.boxNextPrevousBtns}>
                <button
                  onClick={() => {
                    setLogin(undefined);
                    setCode(new Array(6).fill(""));
                  }}>
                  {translate("Назад")}
                </button>
                <button onClick={LoginVerifySubmit}>{translate("next")}</button>
              </div>
              <button onClick={LoginOTPSubmit} disabled={isButtonDisabled}>
                <h6
                  style={
                    isButtonDisabled ? {} : { textDecoration: "underline" }
                  }
                >
                  {isButtonDisabled ? `${translate("Отправить СМС через")} ${secondsLeft}  ${translate("секунд")}...` : translate("Отправь СМС еще раз")}
                </h6>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
