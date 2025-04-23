// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import styles from "./events.module.css";
// import Nav from "@/components/nav";
// import Footer from "@/components/footer";

// export default function EventPage() {
//     const [ticketType, setTicketType] = useState("ordinary");


//   return (
//     <section className={styles.mainContainer}>
//       <Nav />
//       <div className={styles.mainContent}>
//         <div className={styles.boxRowEventInfo}>
//           <div className={styles.boxEventInfoLeft}>
//             <Image
//               src="/ComicConLogo.svg"
//               alt="EventLogo"
//               width={300}
//               height={120}
//             />
//             <div className={styles.boxEventTitle}>
//               <h3>Фестиваль</h3>
//               <h2>GEEK CON</h2>
//               <div className={styles.boxEventPlace}>
//                 <Image src="/place.svg" alt="place" width={24} height={24} />
//                 <p>Яшнабадский район, Компас</p>
//               </div>
//               <h4>12 апреля в 12:00</h4>
//             </div>
//             <div className={styles.boxEventBuyTicket}>
//               <button className={styles.buyTicket}>
//                 <p>Купить билет</p>
//               </button>
//               <div className={styles.boxTimeLeft}>
//                 <Image
//                   src="/timeLeft.svg"
//                   alt="timeLeft"
//                   width={24}
//                   height={24}
//                 />
//                 <p>9 дней и 5 часов</p>
//               </div>
//             </div>
//           </div>
//           <div className={styles.boxEventInfoRight}>
//             <Image
//               src="/EventPicture.png"
//               alt="event"
//               width={960}
//               height={532}
//             />
//           </div>
//         </div>
//         <div className={styles.boxAboutEvent}>
//           <div className={styles.boxAboutEventTop}>
//             <h1>О фестивале</h1>
//             <p>
//               <b>Geek Con</b> — крупнейший фестиваль поп-культуры в Узбекистане
//               для поклонников комиксов, кино, аниме и видеоигр. 22 декабря
//               фестиваль вновь пройдет в ледовом дворце «Алпомиш» в Ташкенте.
//             </p>
//             <div className={styles.boxRowAboutEventTop}>
//               <div className={styles.boxOneInfo}>
//                 <h5>Возраст</h5>
//                 <h6>18+</h6>
//               </div>
//               <div className={styles.boxOneInfo}>
//                 <h5>Жанр</h5>
//                 <h6>Хип-Хоп</h6>
//               </div>
//             </div>
//           </div>
//           <div className={styles.boxAboutEventBottom}>
//             <div
//               className={styles.oneAboutImage}
//               style={{ backgroundImage: `url("/EventPicture1.png")` }}
//             ></div>
//             <div
//               className={styles.oneAboutImage}
//               style={{ backgroundImage: `url("/EventPicture1.png")` }}
//             ></div>
//             <div
//               className={styles.oneAboutImage}
//               style={{ backgroundImage: `url("/EventPicture1.png")` }}></div>
//             <div
//               className={`${styles.oneAboutImage} ${styles.lastImage}`}
//               style={{ backgroundImage: `url("/EventPicture1.png")` }}>
//               <span className={styles.overlayText}>+4</span>
//             </div>
//           </div>
//         </div>
//         <div className={styles.boxOurGuests}>
//           <h1>Наши гости</h1>
//           <div className={styles.boxOurGuestsRow}>
//             <button className={styles.boxButtonLeftOrRight}>
//               <Image src="/altarrowleft.svg" alt="arrow" width={34} height={34}/>
//             </button>
//             <button className={styles.boxButtonLeftOrRight}>
//               <Image src="/altarrowright.svg" alt="arrow" width={34} height={34}/>
//             </button>
//           </div>
//         </div>

//         <div className={styles.boxDateAndTime}>
//           <h1>Дата и время</h1>
//           <div className={styles.boxOneDayTicket}>
//             <div className={styles.boxTicketDay}>
//               <h1>10</h1>
//               <div className={styles.boxcolMonth}>
//                 <h2>Сегодня</h2>
//                 <h3>Августа</h3>
//               </div>
//             </div>
//             <div className={styles.boxOneTicketInformation}>
//               <div className={styles.boxBeforeIncreasePrice}>
//                 <h5>12:00</h5>
//                 <p>до повышения цен 2 часов</p>
//               </div>
//               <div className={styles.boxButtonsVip}>
//                 <button onClick={() => setTicketType("ordinary")} className={ticketType === "ordinary" ? styles.oneButtonVipActive : styles.oneButtonVip}>Обычный</button>
//                 <button onClick={() => setTicketType("vip")} className={ticketType === "vip" ? styles.oneButtonVipActive : styles.oneButtonVip}>VIP</button>
//               </div>
//               <div className={styles.boxPriceAndBuyTicket}>
//                 <h1>150 000 сум</h1>
//                 <button className={styles.buyTicket}>
//                 <p>Купить билет</p>
//               </button>
//               </div>
//             </div>
//           </div>
//           <div className={styles.boxOneCinema}>
//             <div className={styles.boxCinemaName}>
//                 <div className={styles.boxCinemaLogo}>
//                     <Image src="/compass.svg" alt="Cinema logo" width={96} height={19}/>
//                 </div>
//                 <div className={styles.boxCinemaNameAndLocation}>
//                     <h1>Compass</h1>
//                     <div className={styles.boxCinemaLocationText}>
//                         <Image src="/placepink.svg" alt="place" width={24} height={24}/>
//                         <p>Куйлюк</p>
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.boxCinemaLocation}>
//                 <Image src="/Location.png" alt="Location" width={443} height={120}/>
//             </div>
//         </div>
//         </div>
//       </div>
//       <Footer />
//     </section>
//   );
// }
