"use client";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import styles from "./home.module.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Order from "@/components/order";
import {useLanguage} from "@/context/languageContext";
import {useTheme} from "next-themes";
import {ReadEvents} from "@/utils/server/home";
import {BannerSkeleton, BannerWrapper, EventSkeleton} from "@/app/style";
import NavAdaptive from "@/components/navAdaptive";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation, Pagination, Scrollbar} from "swiper/modules";
import ImageViewer from "@/components/ImagerViewer";

export default function EventPage() {
    const [ticketType, setTicketType] = useState("ordinary");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {translate, language} = useLanguage();
    const {resolvedTheme, theme} = useTheme();

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.destroy();
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);


    const {
        data: events,
        isLoading,
        isError,
    } = ReadEvents(language || "ru");

    const event = events?.[0]; // взять первый ивент

    console.log("event", event);

    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);


    return (
        <div style={{padding: "0 10px"}}>
            <Nav/>
            <section className={styles.mainContainer}>
                <div className={styles.mainContent}>
                    <div className={styles.boxRowEventInfo}>
                        {
                            !isLoading ?
                                <div className={styles.boxEventInfoLeft}>
                                    {event && (
                                        resolvedTheme === "dark" ? <Image
                                                src={event?.image_white_url}
                                                alt="EventLogo"
                                                width={300}
                                                height={120}
                                            />
                                            :
                                            <Image
                                                src={event?.image_black_url}
                                                alt="EventLogo"
                                                width={300}
                                                height={120}
                                            />
                                    )}
                                    <div className={styles.boxEventTitle}>
                                        <h3>Фестиваль</h3>
                                        <h2>{event?.title}</h2>
                                        <div className={styles.boxEventPlace}>
                                            <Image
                                                src={theme === "dark" ? "/placeDark.svg" : "/place.svg"}
                                                alt="place"
                                                width={24}
                                                height={24}
                                            />
                                            <p>Яшнабадский район, Компас</p>
                                        </div>
                                        <h4>12 апреля в 12:00</h4>
                                    </div>
                                    <div className={styles.boxEventBuyTicket}>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className={styles.buyTicket}
                                        >
                                            <p>{translate("buyTicket")}</p>
                                        </button>
                                    </div>
                                </div>
                                :
                                <EventSkeleton theme={resolvedTheme}/>
                        }
                        {
                            !isLoading ?
                                <BannerWrapper className={styles.boxEventInfoRight}
                                               banner={event?.banner}></BannerWrapper>
                                :
                                <BannerSkeleton className={styles.boxEventInfoRight} theme={resolvedTheme}
                                                banner={"/EventPicture.png"}></BannerSkeleton>
                        }
                    </div>
                    <div className={styles.boxAboutEvent}>
                        <div className={styles.boxAboutEventTop}>
                            <h1>{translate("О_фестивале")}</h1>
                            <p><b>{event?.title}</b> — {event?.description}</p>
                            <div className={styles.boxRowAboutEventTop}>
                                {
                                    event?.age ?
                                        <div className={styles.boxOneInfo}>
                                            <h5>{translate("Возраст")}</h5>
                                            <h6>{event?.age}</h6>
                                        </div>
                                        : null
                                }
                                {
                                    event?.genre ? <div className={styles.boxOneInfo}>
                                            <h5>{translate("Жанр")}</h5>
                                            <h6>{event?.genre}</h6>
                                        </div>
                                        : null
                                }

                            </div>
                        </div>
                        <Swiper
                            slidesPerView={1} // 👈 default holatda shunaqa ber
                            spaceBetween={5}
                            ref={swiperRef}
                            grabCursor={true}
                            modules={[Navigation, Pagination, Scrollbar]}
                            pagination={{clickable: true}}
                            scrollbar={{draggable: true}}
                            className={styles.boxAboutEventBottom}
                            freeMode={true} // ✅ bu orqali “snap” yo‘qoladi
                            breakpoints={{
                                350: {slidesPerView: 1},
                                400: {slidesPerView: 1},
                                500: {slidesPerView: 1},
                                550: {slidesPerView: 1},
                                650: {slidesPerView: 1},
                                700: {slidesPerView: 1},
                                800: {slidesPerView: 1},
                                900: {slidesPerView: 2.7},
                                1000: {slidesPerView: 3},
                                1200: {slidesPerView: 3.5},
                                1420: {slidesPerView: 4},
                            }}
                        >
                            {event?.event_images?.map((v) => (
                                <SwiperSlide
                                    className={styles.oneAboutImage}
                                    key={v?.id}>
                                    <ImageViewer order={v?.order} src={v?.image} alt={v?.title}/>
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
                    <div className={styles.boxOurGuests}>
                        <h1>{translate("Наши_гости")}</h1>
                        <div className={styles.carouselWrapper}>
                            <button ref={prevRef} className={styles.arrow}><Image
                                src="/altarrowleft.svg"
                                alt="arrow"
                                width={34}
                                height={34}
                            /></button>

                            <Swiper
                                slidesPerView={3} // 👈 Aynan shu yer elementlar sonini belgilaydi
                                spaceBetween={24}
                                onSwiper={setSwiperInstance}
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                breakpoints={{
                                    320: {slidesPerView: 1},
                                    640: {slidesPerView: 2},
                                    1024: {slidesPerView: 3},
                                }}
                                onBeforeInit={(swiper) => {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }}
                                modules={[Navigation]}
                                className={styles.swiperCustom}
                            >
                                {event?.event_guests?.map((guest) => (
                                    <SwiperSlide
                                        key={guest.id}
                                        className={styles.swiperSlide}
                                    >
                                        <div
                                            className={styles.guestCard}
                                            onMouseEnter={(e) => e.currentTarget.classList.add(styles.hovered)}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove(styles.hovered)}
                                        >
                                            <div className={styles.guestContent}>
                                                <Image src={guest.image} alt={guest.name} width={215} height={215}
                                                       className={styles.guestImg}/>
                                                <p className={styles.guestHover}>
                                                    {guest.name} — {guest.description}
                                                </p>
                                            </div>
                                            <p className={styles.guestName}>{guest.name}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <button ref={nextRef} className={styles.arrow}>
                                <Image
                                    src="/altarrowright.svg"
                                    alt="arrow"
                                    width={34}
                                    height={34}
                                />
                            </button>
                        </div>
                    </div>

                    <div className={styles.boxDateAndTime}>
                        <h1>{translate("Дата_время")}</h1>
                        <div className={styles.boxOneDayTicket}>
                            <div className={styles.boxTicketDay}>
                                <h1>10</h1>
                                <div className={styles.boxcolMonth}>
                                    <h2>Сегодня</h2>
                                    <h3>Августа</h3>
                                </div>
                            </div>
                            <div className={styles.boxOneTicketInformation}>
                                <div className={styles.boxBeforeIncreasePrice}>
                                    <h5>12:00</h5>
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
                                    <h1>От 150 000 сум до 1 350 000 сум</h1>
                                    <button onClick={() => setIsModalOpen(true)}className={styles.buyTicket2}>
                                        <p>Купить билет</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.boxOneDayTicket}>
                            <div className={styles.boxTicketDay}>
                                <h1>10</h1>
                                <div className={styles.boxcolMonth}>
                                    <h2>Сегодня</h2>
                                    <h3>Августа</h3>
                                </div>
                            </div>
                            <div className={styles.boxOneTicketInformation}>
                                <div className={styles.boxBeforeIncreasePrice}>
                                    <h5>12:00</h5>
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
                                    <h1>От 150 000 сум до 1 350 000 сум</h1>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className={styles.buyTicket2}
                                    >
                                        <p>Купить билет</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.boxOneCinema}>
                            <div className={styles.boxCinemaName}>
                                <div className={styles.boxCinemaLogo}>
                                    <Image
                                        src="/compass.svg"
                                        alt="Cinema logo"
                                        width={96}
                                        height={19}
                                    />
                                </div>
                                <div className={styles.boxCinemaNameAndLocation}>
                                    <h1>Compass</h1>
                                    <div className={styles.boxCinemaLocationText}>
                                        <Image
                                            src="/placepink.svg"
                                            alt="place"
                                            width={24}
                                            height={24}
                                        />
                                        <p>Куйлюк</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.boxCinemaLocation}>
                                <Image
                                    src="/Location.png"
                                    alt="Location"
                                    width={443}
                                    height={120}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
                <Order isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            </section>
            <NavAdaptive/>
        </div>

    );
}
