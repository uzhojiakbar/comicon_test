import { create } from "zustand";
import Cookies from "js-cookie";

// import axios from "axios";
// const BASE_URL = "https://api.tcats.uz/api/v1/";


export const useGlobal = create((set, get) => ({
    user: {
        accessToken: Cookies.get("access_token") || null,
        refreshToken: Cookies.get("refresh_token") || null,
    },

    auth: (tokens) => {
        // Сохраняем токены в куках и состоянии
        Cookies.set("access_token", tokens.accessToken, { secure: true, sameSite: "Strict" });
        Cookies.set("refresh_token", tokens.refreshToken, { secure: true, sameSite: "Strict" });
        set({ user: { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken } });
    },

    logout: async () => {
        Cookies.remove("access_token");
        Cookies.remove("access_token")
        console.log("LOGOUT");
    },

    language: Cookies.get("language") || "ru",

    setLanguage: (lang) => {
        if (lang !== get().language) {
            Cookies.set("language", lang, { secure: true, sameSite: "Strict" });
            set({ language: lang });
        }
    },
}));
