"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginLayout({ children }) {
  const router = useRouter();

  // console.log("TOken: ", tokeeen);

  useEffect(() => {
    if (Cookies.get("access_token")) {
      router.replace("/"); // login ga token bilan kiradigan bolsa "/account" sahifaga yo`naltirish

    //   KEYINCHALIK USER NI TOKEN BORLIGI BILAN EMAS, BACKEND GA REQUEST JONATGAN XOLDA USER BOR YOKI YOQLIGINI ANIQLAB OLISHIMIZ KERAK BO`LADI!
    }

    // Подписываемся на изменения в куках (если токен появится после логина)
  }, []);

  return (
    <GoogleOAuthProvider clientId="419877366301-pd3n5mkofc700h3ejs867cipgj6lj4co.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}
