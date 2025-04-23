import Image from "next/image";
import Link from "next/link";
import styles from "./news.module.css";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import useApi from "@/utils/api";
import { useLanguage } from "@/context/languageContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { MainEventSkeleton } from "@/app/style";

export default function News() {
  const api = useApi();
  const { theme, resolvedTheme } = useTheme();
  const { translate, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;

      const updateButtons = () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      };

      swiper.on("slideChange", updateButtons);
      updateButtons();

      return () => {
        swiper.off("slideChange", updateButtons);
      };
    }
  }, []);

  const isUserLoggedIn = true;

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchNewsData = async () => {
    const response = await api.get("news/?category=important");
    return response.data;
  };

  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newsDataImportant", language],
    queryFn: fetchNewsData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });

  if (!isUserLoggedIn) {
    return <div>Вы не авторизованы</div>;
  }

  return (
    <>
      {news?.length == 0 && !isLoading ? (
        <></>
      ) : (
        <div className={styles.news}>
          <div className={styles.boxrow}>
            <h1>Важные новости</h1>
            <div className={styles.boxbtns}>
              <button
                className={`${styles.oneBtn} custom-prev2 ${isBeginning ? styles.disabled : ""
                  }`}
              >
                <Image
                  src={
                    theme === "dark" ? "/arrowleft.svg" : "/arrowleftLight.svg"
                  }
                  alt="arrow"
                  width={28}
                  height={18}
                  loading="lazy"
                />
              </button>
              <button
                className={`${styles.oneBtn} custom-next2 ${isEnd ? styles.disabled : ""
                  }`}
              >
                <Image
                  src={
                    theme === "dark"
                      ? "/arrowright.svg"
                      : "/arrowrightLight.svg"
                  }
                  alt="arrow"
                  width={28}
                  height={18}
                  loading="lazy"
                />
              </button>
            </div>
          </div>

          <Swiper
            ref={swiperRef}
            spaceBetween={24}
            breakpoints={{
              350: { slidesPerView: 1.1 },
              400: { slidesPerView: 1.3 },
              500: { slidesPerView: 1.5 },
              550: { slidesPerView: 1.7 },
              650: { slidesPerView: 2 },
              700: { slidesPerView: 2.2 },
              800: { slidesPerView: 2.5 },
              900: { slidesPerView: 2.7 },
              1000: { slidesPerView: 3 },
              1200: { slidesPerView: 3.5 },
              1420: { slidesPerView: 4 },
            }}
            scrollbar={{ draggable: true }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".custom-next2",
              prevEl: ".custom-prev2",
            }}
            watchOverflow={false}
            modules={[Navigation]}
            className={styles.boxNews}
          >
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => (
                <SwiperSlide key={idx} className={styles.oneNews}>
                  <MainEventSkeleton theme={theme} />
                </SwiperSlide>
              ))
              : news.map(({ id, title, img, created_at, content }) => (
                <SwiperSlide key={id} className={styles.oneNews}>
                  {img !== null && (
                    <Link href={`/news/${id}`}>
                      <Image
                        src={img}
                        alt="news"
                        width={324}
                        height={200}
                        loading="lazy"
                      />
                    </Link>
                  )}
                  <div className={styles.boxNewsInfo}>
                    <Link href={`/news/${id}`}>
                      <h1>{title}</h1>
                    </Link>
                    {img === null && (
                      <p>
                        {
                          new DOMParser().parseFromString(content, "text/html")
                            .body.textContent
                        }
                      </p>
                    )}
                    <h6>{new Date(created_at).toLocaleDateString("ru-RU")}</h6>
                  </div>
                </SwiperSlide>
              ))}

          </Swiper>
        </div>
      )}
    </>
  );
}
