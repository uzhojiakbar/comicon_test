"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Order from "@/components/order";
import { useLanguage } from "@/context/languageContext";
import { useTheme } from "next-themes";
import { ReadEvents } from "@/utils/server/home";
import { BannerSkeleton, BannerWrapper, EventSkeleton } from "@/app/style";
import NavAdaptive from "@/components/navAdaptive";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import ImageViewer from "@/components/ImagerViewer";
import { useUser } from "@/utils/userProvider";

export default function EventPage() {
  const [ticketType, setTicketType] = useState("ordinary");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { translate, language } = useLanguage();
  const { resolvedTheme, theme } = useTheme();
  const { user } = useUser();
  const [vegetation, setVegetation] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);


  const prevRefImg = useRef(null);
  const nextRefImg = useRef(null);

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [swiperInstanceImg, setSwiperInstanceImg] = useState(null);


  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  useEffect(() => {
    if (swiperInstanceImg && prevRefImg.current && nextRefImg.current) {
      swiperInstanceImg.params.navigation.prevEl = prevRefImg.current;
      swiperInstanceImg.params.navigation.nextEl = nextRefImg.current;
      swiperInstanceImg.navigation.destroy();
      swiperInstanceImg.navigation.init();
      swiperInstanceImg.navigation.update();
    }
  }, [swiperInstanceImg]);

  const { data: events, isLoading, isError } = ReadEvents(language || "ru");

  const event = events?.[0]; // взять первый ивент

  console.log("event", event);

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
      const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      qachonligi = weekDays[date.getDay()];
    }

    // Soat va minutni formatlash (00:00 shaklida)
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    return {
      day,
      month,
      qachonligi,
      time,
    };
  }

  async function getFullAddressYandex(cordinate) {
    if (!cordinate) return null;

    const [lat, lng] = cordinate.split(",").map((coord) => coord.trim());

    const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY;
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${lng},${lat}&apikey=${apiKey}&lang=ru_RU`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const components =
        data.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.Address.Components;

      const street = components.find((c) => c.kind === "street")?.name;
      const house = components.find((c) => c.kind === "house")?.name;
      const vegetation = components.find((c) => c.kind === "vegetation")?.name;
      const district = components.find((c) => c.kind === "district")?.name;
      const locality = components.find((c) => c.kind === "locality")?.name;

      if (street || house) {
        return [street, house].filter(Boolean).join(", ");
      }
      if (vegetation) {
        return vegetation;
      }
      if (district) {
        return district;
      }
      if (locality) {
        return locality;
      }

      return "Manzil topilmadi";
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  }

  useEffect(() => {
    if (!vegetation && event?.sessions[0]?.location?.location?.coordinates) {
      getFullAddressYandex(
        event.sessions[0].location.location.coordinates
      ).then((address) => {
        setVegetation(address);
      });
    }
  }, [event]);

  console.log("vegetation", vegetation);

  //   async function getRegionOpenStreetMap(lat, lng) {
  //     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  //     const response = await fetch(url, {
  //       headers: {
  //         "User-Agent": "comica-bot/1.0 (uzhojiakbar3@gmail.com)",
  //       },
  //     });
  //     const data = await response.json();

  //     // O'zbekistonda viloyat "state" maydonida bo'ladi
  //     return data.address?.state || null;
  //   }

  //   // Test
  //   getRegionOpenStreetMap(41.31115429300815, 69.2797100543976)
  //     .then((region) => console.log("Viloyat:", region))
  //     .catch((err) => console.error(err));

  const coordsString = event?.sessions[0]?.location?.location?.coordinates;

  const [lat, lng] =
    coordsString?.split(",").map((coord) => coord.trim()) || [];



  const OrderModalController = (sessionId) => {
    if (user) {
      setIsModalOpen(sessionId);
    } else {
      window.location.href = "/login";
    }
  }

  // for change



  // ---------------

  // for change
  return (
    <div style={{ padding: "0 10px" }}>
      <Nav />
      <section className={styles.mainContainer}>
        <div className={styles.mainContent}>
          <div className={styles.boxRowEventInfo}>
            {!isLoading ? (
              <div className={styles.boxEventInfoLeft}>
                {event &&
                  (resolvedTheme === "dark" ? (
                    <Image
                      src={event?.image_white_url}
                      alt="EventLogo"
                      width={300}
                      height={120}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={event?.image_black_url}
                      alt="EventLogo"
                      width={300}
                      loading="lazy"
                      height={120}
                    />
                  ))}
                <div className={styles.boxEventTitle}>
                  <h3>{translate("Фестиваль")}</h3>
                  <h2>{event?.title}</h2>
                  <div className={styles.boxEventPlace}>
                    <Image
                      src={theme === "dark" ? "/placeDark.svg" : "/place.svg"}
                      alt="place"
                      width={24}
                      height={24}
                    />
                    <p>{event.sessions[0].location_name}</p>
                  </div>
                  <h4>{new Date(event.sessions[0].date).toLocaleDateString("ru-RU")}</h4>
                </div>
                <div className={styles.boxEventBuyTicket}>
                  <a href="#tickets" className={styles.buyTicket}>
                    <p>{translate("buyTicket")}</p>
                  </a>
                </div>
              </div>
            ) : (
              <EventSkeleton theme={resolvedTheme} />
            )}
            {!isLoading ? (
              <BannerWrapper
                className={styles.boxEventInfoRight}
                banner={event?.banner}
              ></BannerWrapper>
            ) : (
              <BannerSkeleton
                className={styles.boxEventInfoRight}
                theme={resolvedTheme}
                banner={"/EventPicture.png"}
              ></BannerSkeleton>
            )}
          </div>
          <div className={styles.boxAboutEvent}>
            <h1>
              <span>
                {translate("О_фестивале")}
              </span>
              <div className={styles.actionButton} >
                <button
                  ref={prevRefImg}
                  style={{ transform: "rotate(180deg)" }}
                >
                  <Image
                    src={theme === "dark" ? "/ArrowRightLigh.svg" : "/ArrowRightBlack.svg"}
                    alt="arrow"
                    width={34}
                    height={34}
                    className={styles.actionButtonImg}
                  />
                </button>

                <button
                  ref={nextRefImg}
                >
                  <Image
                    src={theme === "dark" ? "/ArrowRightLigh.svg" : "/ArrowRightBlack.svg"}
                    alt="arrow"
                    width={34}
                    height={34}
                    className={styles.actionButtonImg}
                  />
                </button>
              </div>
            </h1>
            <div className={styles.boxAboutEventTop}>
              <p>
                <b>{event?.title}</b> — {event?.description}
              </p>
              <div className={styles.boxRowAboutEventTop}>
                {event?.age ? (
                  <div className={styles.boxOneInfo}>
                    <h5>{translate("Возраст")}</h5>
                    <h6>{event?.age}</h6>
                  </div>
                ) : null}
                {event?.genre ? (
                  <div className={styles.boxOneInfo}>
                    <h5>{translate("Жанр")}</h5>
                    <h6>{event?.genre}</h6>
                  </div>
                ) : null}
              </div>
            </div>

            <Swiper
              slidesPerView={1} // 👈 default holatda shunaqa ber
              spaceBetween={5}
              ref={swiperRef}
              grabCursor={true}
              modules={[Navigation, Pagination, Scrollbar]}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              className={styles.boxAboutEventBottom}
              freeMode={true} // ✅ bu orqali “snap” yo‘qoladi
              breakpoints={{
                800: { slidesPerView: 1 },
                900: { slidesPerView: 2.7 },
                1000: { slidesPerView: 3 },
                1200: { slidesPerView: 3.5 },
                1420: { slidesPerView: 4 },
              }}
              navigation={{
                prevEl: prevRefImg.current,
                nextEl: nextRefImg.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRefImg.current;
                swiper.params.navigation.nextEl = nextRefImg.current;
              }}
            >
              {event?.event_images?.map((v) => (
                <SwiperSlide className={styles.oneAboutImage} key={v?.id}>
                  <ImageViewer order={v?.order} src={v?.image} alt={v?.title} />
                </SwiperSlide>
              ))}
              {/*{event?.event_images?.map((v) => (*/}
              {/*    <SwiperSlide*/}
              {/*        className={styles.oneAboutImage}*/}
              {/*        key={v?.id}>*/}
              {/*        <ImageViewer src={v?.image} alt={v?.title}/>*/}
              {/*    </SwiperSlide>*/}
              {/*))}*/}
            </Swiper>
            {/*className={styles.oneAboutImage}*/}

            {/*<div*/}
            {/*    className={styles.oneAboutImage}*/}
            {/*    style={{backgroundImage: `url("/EventPicture1.png")`}}*/}
            {/*></div>*/}
            {/*<div*/}
            {/*    className={styles.oneAboutImage}*/}
            {/*    style={{backgroundImage: `url("/EventPicture1.png")`}}*/}
            {/*></div>*/}
            {/*<div*/}
            {/*    className={`${styles.oneAboutImage} ${styles.lastImage}`}*/}
            {/*    style={{backgroundImage: `url("/EventPicture1.png")`}}*/}
            {/*>*/}
            {/*    <span className={styles.overlayText}>+4</span>*/}
            {/*</div>*/}
          </div>
          {/* for change */}
          <div className={styles.boxOurGuests}>
            <h1>{translate("Наши_гости")}</h1>
            <div className={styles.carouselWrapper}>
              <button ref={prevRef} className={styles.arrow}>
                <Image
                  src="/altarrowleft.svg"
                  alt="arrow"
                  width={34}
                  height={34}
                />
              </button>
              <Swiper
                slidesPerView={3} // 👈 Aynan shu yer elementlar sonini belgilaydi
                spaceBetween={12}
                onSwiper={setSwiperInstance}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  1050: { slidesPerView: 2 },
                  1400: { slidesPerView: 3 },
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                modules={[Navigation]}
                className={styles.swiperCustom}
              >
                {event?.event_guests?.map((guest) => (
                  <SwiperSlide key={guest.id} className={styles.swiperSlide}>
                    <div
                      className={styles.oneSlide}
                      onMouseEnter={(e) => e.currentTarget.classList.add(styles.hovered)}
                      onMouseLeave={(e) => e.currentTarget.classList.remove(styles.hovered)}>
                      <Image
                        src={guest.image}
                        alt={guest.name}
                        width={250}
                        height={250}
                        className={styles.guestImg}
                      />
                      <div className={styles.boxoneSlideBackground}>
                        <p className={styles.guestHover}>
                          {guest.name} — {guest.description}
                        </p>
                      </div>
                      <p className={styles.guestName}>{guest.name}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button id="tickets" ref={nextRef} className={styles.arrow}>
                <Image
                  src="/altarrowright.svg"
                  alt="arrow"
                  width={34}
                  height={34}
                />
              </button>
            </div>
          </div>
          {/* for change */}

          <div className={styles.boxDateAndTime}>
            <h1>{translate("Дата_время")}</h1>

            {event?.sessions?.map((session) => {
              const dayInfo = parseDate(session?.date);

              return (
                <div key={session?.id} className={styles.boxOneDayTicket}>
                  <div className={`${styles.boxTicketDay} ${styles.boxTicketDayDesktop}`}>
                    <h1>{dayInfo?.day}</h1>
                    <div className={styles.boxcolMonth}>
                      <h2>{translate(dayInfo?.qachonligi)}</h2>
                      <h3>{translate(dayInfo?.month)}</h3>
                    </div>
                  </div>
                  <div className={styles.boxTicketDayMobile} >
                    <div className={styles.boxTicketDay}>
                      <h1>{dayInfo?.day}</h1>
                      <div className={styles.boxcolMonth}>
                        <h2>{translate(dayInfo?.qachonligi)}</h2>
                        <h3>{translate(dayInfo?.month)}</h3>
                      </div>
                    </div>

                    <div className={styles.boxBeforeIncreasePriceMobile}>
                      <h5>{dayInfo?.time}</h5>
                      {/*<p>до повышения цен 2 часов</p>*/}
                    </div>

                  </div>
                  <div className={styles.boxOneTicketInformation}>
                    <div className={styles.boxBeforeIncreasePrice}>
                      <h5>{dayInfo?.time}</h5>
                      {/*<p>до повышения цен 2 часов</p>*/}
                    </div>
                    <div className={styles.boxButtonsVip}>
                      <button
                        onClick={() => setTicketType("ordinary")}
                        className={
                          ticketType === "ordinary"
                            ? styles.oneButtonVipActive
                            : styles.oneButtonVip
                        }
                      >
                        Обычный
                      </button>
                      <button
                        onClick={() => setTicketType("vip")}
                        className={
                          ticketType === "vip"
                            ? styles.oneButtonVipActive
                            : styles.oneButtonVip
                        }
                      >
                        VIP
                      </button>
                    </div>
                    <div className={styles.boxPriceAndBuyTicket}>
                      <button
                        onClick={() => OrderModalController(session?.id)}
                        className={styles.buyTicket2}
                      >
                        <p>{translate("buyTicket")}</p>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className={styles.boxOneCinema}>
              <div className={styles.boxCinemaName}>
                <div className={styles.boxCinemaLogo}>
                  <Image
                    src={event?.sessions[0]?.location?.location?.image}
                    alt="Logo Comicon"
                    width={86}
                    height={46}
                  />
                </div>
                <div className={styles.boxCinemaNameAndLocation}>
                  <h1>{event?.sessions[0]?.location?.name}</h1>
                  <div className={styles.boxCinemaLocationText}>
                    <Image
                      src="/placepink.svg"
                      alt="place"
                      width={24}
                      height={24}/>
                    <p>{event?.sessions[0]?.location?.location_street}</p>
                  </div>
                </div>
              </div>
              <iframe
                className={styles.boxCinemaLocation}
                src={`https://yandex.uz/map-widget/v1/?ll=${lng}%2C${lat}&z=15&l=map&pt=${lng},${lat},pm2rdm`}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <Footer />
        <Order seans={event?.id || 1} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
      <NavAdaptive />
    </div>
  );
}
