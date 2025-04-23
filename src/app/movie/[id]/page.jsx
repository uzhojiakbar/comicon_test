"use client";
import styles from "./movie.module.css";
import NavBar from "@/components/nav";
import Footer from "@/components/footer";
import Order from '@/components/order';
import Image from "next/image";
import { useRef, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const Location = {
//   lat: 55.7558, // Широта (изменить на свои координаты)
//   lng: 37.6173, // Долгота (изменить на свои координаты)
// };

export default function movie() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [order, setOrder] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };


  // const HandleOrder = () => {
  //   setOrder((prev) => {
  //     const newState = !prev;
  //     document.body.style.overflow = newState ? "hidden" : "auto";
  //     return newState;
  //   });
  // };

  const HandleOrder = () => {
    setOrder(!order);
  }


  return (
    <>
    <section className={styles.mainContainer}>
      <NavBar />
      <section className={styles.containerContent}>
        {/* ------------------------------------ Movie Info ------------------------------------ */}
        <div className={styles.boxMovieInfoAndTrailer}>
          <div className={styles.boxMovieInfo}>
            <Image
              src="/MinecraftMovie.png"
              alt="MovieImage"
              width={194}
              height={296}
            />
            <p>Фильм</p>
            <h1>Minecraft в кино (2025)</h1>
            <h6>A Minecraft Movie, США, 2025</h6>
            <button onClick={HandleOrder}>
              <p>Расписание и билеты</p>
            </button>
          </div>
          <div className={styles.boxMovieTrailler}>
            <video ref={videoRef}>
              <source src="/Trailler.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <div className={styles.controls}>
              <button onClick={togglePlay}>
                <p>
                  <Image src="/play.svg" alt="play" width={24} height={24} />{" "}
                  Трейлер
                </p>
              </button>
              <button onClick={toggleMute}>
                {isMuted ? (
                  <Image src="/muted.svg" alt="mute" width={24} height={24} />
                ) : (
                  <Image src="/mute.svg" alt="mute" width={24} height={24} />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* ------------------------------------ Calendar ------------------------------------ */}
        <div className={styles.boxCalendar}>
          <div className={styles.boxCalendarTop}>
            <h1>Календарь записи</h1>
            <div className={styles.calendarTopRightBtns}>
              <button>
                <Image
                  src="/bottomarrow.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
                <p>Жанр</p>
              </button>
              <button>
                <Image
                  src="/searchday.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </button>
              <button>
                <Image src="/sort.svg" alt="arrow" width={20} height={20} />
              </button>
              <button>
                <Image
                  src="/altarrowleft.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </button>
              <button>
                <Image
                  src="/altarrowright.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <div className={styles.boxCalendarBottom}>
            <h2>МАРТ</h2>
            <div className={styles.boxrowdates}>
              <div className={styles.oneday}>
                <p>1</p>
                <p>вт</p>
              </div>
              <div className={styles.oneday}>
                <p>1</p>
                <p>вт</p>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------ Cinema ------------------------------------ */}

        <div className={styles.boxCinema}>
          <div className={styles.boxOneCinema}>
            <div className={styles.boxCinemaNameAndLocation}>
              <div className={styles.boxName}>
                <div className={styles.boxCinemaName}>
                  <div className={styles.cinemaLogo}>
                    <Image
                      src="/cinemaImage.png"
                      alt="cinemaLogo"
                      width={0}
                      height={0}
                      style={{
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className={styles.cinemaName}>
                    <h3>Salom</h3>
                    <p>
                      <Image
                        src="/cinemalocation.svg"
                        alt="cinema Location"
                        width={24}
                        height={24}
                      />
                      ул. Буюк Ипак Йули, 158А
                    </p>
                  </div>
                </div>
                <button className={styles.likeCinema}>
                  <Image
                    src="/cinemalike.svg"
                    alt="like"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              {/* <LoadScript googleMapsApiKey="YOUR_API_KEY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={12}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript> */}
            </div>

            <div className={styles.boxTicketType}>
              <div className={styles.boxoneTicketType}>
                <div className={styles.oneTicketPrice}>
                  <p>
                    <Image src="/point.svg" alt="point" width={8} height={8} />
                    2D
                  </p>
                  <p>98000 so’m</p>
                </div>
                <div className={styles.boxTicketTime}>
                  <div className={styles.oneTimeNotActive}>
                    <p>12:00</p>
                  </div>
                  <div className={styles.oneTime}>
                    <p>12:00</p>
                  </div>
                </div>
              </div>
              <div className={styles.boxoneTicketType}>
                <div className={styles.oneTicketPrice}>
                  <p>
                    <Image src="/point.svg" alt="point" width={8} height={8} />
                    2D
                  </p>
                  <p>98000 so’m</p>
                </div>
                <div className={styles.boxTicketTime}>
                  <div className={styles.oneTimeNotActive}>
                    <p>12:00</p>
                  </div>
                  <div className={styles.oneTime}>
                    <p>12:00</p>
                  </div>
                </div>
              </div>
              <div className={styles.boxoneTicketType}>
                <div className={styles.oneTicketPrice}>
                  <p>
                    <Image src="/point.svg" alt="point" width={8} height={8} />
                    2D
                  </p>
                  <p>98000 so’m</p>
                </div>
                <div className={styles.boxTicketTime}>
                  <div className={styles.oneTimeNotActive}>
                    <p>12:00</p>
                  </div>
                  <div className={styles.oneTime}>
                    <p>12:00</p>
                  </div>
                </div>
              </div>
              <div className={styles.boxoneTicketType}>
                <div className={styles.oneTicketPrice}>
                  <p>
                    <Image src="/point.svg" alt="point" width={8} height={8} />
                    2D
                  </p>
                  <p>98000 so’m</p>
                </div>
                <div className={styles.boxTicketTime}>
                  <div className={styles.oneTimeNotActive}>
                    <p>12:00</p>
                  </div>
                  <div className={styles.oneTime}>
                    <p>12:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.boxmorecinema}>
            <p>Показать еще 4 из 12</p>
          </button>
        </div>

        {/* ------------------------------------ About Movie ------------------------------------ */}

        <div className={styles.boxAboutMovie}>
          <div className={styles.boxAboutMovieTopRow}>
            <div className={styles.boxAboutTopLeft}>
              <h1>О фильме</h1>
              <p>
                Фильм "Minecraft 2025" переносит зрителей в захватывающий мир
                кубических приключений. Главный герой, юный строитель по имени
                Алекс, обнаруживает древний артефакт, который открывает портал в
                альтернативную реальность. Вместе с друзьями, он должен
                преодолеть множество испытаний, сразиться с опасными мобами и
                разгадать тайны, чтобы спасти свой мир от разрушения. Фильм
                обещает яркую анимацию, увлекательный сюжет и множество
                неожиданных поворотов, которые понравятся как фанатам игры, так
                и новым зрителям.
              </p>
              <h3>Рейтинг MPAA</h3>
              <div className={styles.boxRaitingMPAA}>
                PG
              </div>
            </div>
            <div className={styles.boxAboutTopRight}>
              <div className={styles.boxAboutTopRightTop}>
                <div className={styles.boxAboutOne}>
                  <h2>Премьера</h2>
                  <p>14 фераля 2025 года</p>
                </div>
                <div className={styles.boxAboutOne}>
                  <h2>Режиссер</h2>
                  <p>Джаред Хесс</p>
                </div>
                <div className={styles.boxAboutOne}>
                  <h2>Жанры</h2>
                  <p>фэнтези, боевик, комедия, приключения, семейный</p>
                </div>
                <div className={styles.boxAboutOne}>
                  <h2>Сценарист</h2>
                  <p>Крис Боуман, Хаббел Палмер</p>
                </div>
              </div>
              <div className={styles.boxinmainrole}>
                <h2>В главных ролях</h2>
                <p>
                  Джек Блэк, Дженнифер Кулидж, Джейсон Момоа, Эмма Майерс, Кейт
                  МакКиннон, Джемейн Клемент, Даниэль Брукс, Себастьян Юджин
                  Хансен
                </p>
              </div>
            </div>
          </div>
          <div className={styles.boxAboutImages}>
            <Image src='/minecrafttt.png' alt="one Image" width={324}height={220} />
            <Image src='/minecrafttt.png' alt="one Image" width={324}height={220} />
            <Image src='/minecrafttt.png' alt="one Image" width={324}height={220} />
            <Image src='/minecrafttt.png' alt="one Image" width={324}height={220} />
          </div>
        </div>
      </section>
      <Footer />
    </section>
    {order ? <Order /> : <></>}
    </>
  );
}
