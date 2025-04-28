import axios from "axios";
import { useGlobal } from "./global";
import { useLanguage } from "@/context/languageContext";
import Cookies from "js-cookie";
// import { logoutSubmit } from "./logout";


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const useApi = () => {
  const { logout } = useGlobal();
  const { language } = useLanguage();
  const BASE_URL = "https://api.comiccon.uz/api/v1/";
  let token = Cookies.get("access_token") || null;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Accept-Language": language,
      "Authorization": token ? `Bearer ${token}` : null,
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;


      if (error.response?.status === 401 && error.response?.data?.code === "user_not_found") {
        // logoutSubmit();
        logout();
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && error.response?.data?.code === "token_not_valid") {

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const response = await axios.post(`${BASE_URL}user/refresh/`, {}, { withCredentials: true });
            const newAccessToken = response.data.access_token;

            // Cookies.set("access_token", newAccessToken);
            Cookies.set("access_token", newAccessToken, {
              domain: ".tcats.uz",
              sameSite: "Lax",
              secure: true,
              expires: 60,
            });
            axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            processQueue(null, newAccessToken);
            isRefreshing = false;

            return axiosInstance(originalRequest);
          } catch (e) {
            console.error("Ошибка запроса:", e.response);
            processQueue(e, null);
            isRefreshing = false;
            // logoutSubmit();
            logout();
            return Promise.reject(e);
          }
        }
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      if (error.response?.status === 404 && error.response?.data?.code === "user_not_found") {
        // logoutSubmit();
        logout();
      }

      if (error.response?.status === 401 && error.response?.data?.status === "error") {
        // logoutSubmit();
        logout();
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useApi;