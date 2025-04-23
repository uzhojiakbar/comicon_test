"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Accountlayout({ children }) {
      const router = useRouter();
    
      // console.log("TOken: ", tokeeen);
    
      useEffect(() => {
        if (Cookies.get("access_token")) {
          router.replace("/account"); // login ga token bilan kiradigan bolsa "/account" sahifaga yo`naltirish
    
        //   KEYINCHALIK USER NI TOKEN BORLIGI BILAN EMAS, BACKEND GA REQUEST JONATGAN XOLDA USER BOR YOKI YOQLIGINI ANIQLAB OLISHIMIZ KERAK BO`LADI!
        } else {
            router.replace("/login");
        }
    
        // Подписываемся на изменения в куках (если токен появится после логина)
      }, []);
    return (
        <GoogleOAuthProvider clientId="419877366301-ua97bf8lg8qgugs33bjgna4os501tne7.apps.googleusercontent.com">
            {children}
        </GoogleOAuthProvider>
    );
}
