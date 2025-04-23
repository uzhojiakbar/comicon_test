// "use client";
// import Image from "next/image";
// import NavBar from "@/components/nav";
// import Footer from "@/components/footer";
// import styles from "./home.module.css";
// import { useState } from "react";
// import { motion } from "motion/react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function Home() {
//   return (
//     <section className={styles.mainContainer}>
//       <NavBar />
//       <section className={styles.containerContent}>
//         <div className={styles.boxswiper}>
//           <div className={styles.oneswiper}>
//             <div className={styles.oneswipernotactive}>
//               <div
//                 className={styles.movieinfobox}
//                 style={{backgroundImage: `linear-gradient(286deg, rgba(84, 91, 123, 0.00) 45.1%, rgba(84, 91, 123, 0.80) 99.05%),url('/minecrafttt.png')`}}>
//                 <div className={styles.boxmovieinfotext}>
//                   <div className={styles.onlytext}>
//                     <p>Фэнтези, боевик, комедия</p>
//                     <h1>Minecraft в кино (2025)</h1>
//                     <h6>
//                       Четверо аутсайдеров попадают через таинственный портал
//                       в странную кубическую страну чудес. Чтобы вернуться домой,
//                       им придется пройти волшебный квест вместе с мастером
//                       по имени Стив.
//                     </h6>
//                   </div>
//                   <div className={styles.buyticket}>
//                     <p>Купить билет</p>
//                   </div>
//                 </div>
//                 <div className={styles.boxmovieinfolikes}>
//                   <div className={styles.mutebtn}>
//                     <Image src="/mute.svg" alt="mute" width={28} height={28} />
//                   </div>
//                   <div className={styles.likesbtn}>
//                     <Image src="/liked.svg" alt="mute" width={28} height={28} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.oneswiper}>
//             <div className={styles.oneswipernotactive}>
//               <div
//                 className={styles.movieinfobox}
//                 style={{
//                   backgroundImage: `linear-gradient(286deg, rgba(84, 91, 123, 0.00) 45.1%, rgba(84, 91, 123, 0.80) 99.05%),
//                  url('/minecrafttt.png')`}}>
//                 <div className={styles.boxmovieinfotext}>
//                   <div className={styles.onlytext}>
//                     <p>Фэнтези, боевик, комедия</p>
//                     <h1>Minecraft в кино (2025)</h1>
//                     <h6>
//                       Четверо аутсайдеров попадают через таинственный портал
//                       в странную кубическую страну чудес. Чтобы вернуться домой,
//                       им придется пройти волшебный квест вместе с мастером
//                       по имени Стив.
//                     </h6>
//                   </div>
//                   <div className={styles.buyticket}>
//                     <p>Купить билет</p>
//                   </div>
//                 </div>
//                 <div className={styles.boxmovieinfolikes}>
//                   <div className={styles.mutebtn}>
//                     <Image src="/mute.svg" alt="mute" width={28} height={28} />
//                   </div>
//                   <div className={styles.likesbtn}>
//                     <Image src="/liked.svg" alt="mute" width={28} height={28} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.oneswiper}>
//             <div className={styles.oneswipernotactive}>
//               <div
//                 className={styles.movieinfobox}
//                 style={{
//                   backgroundImage: `linear-gradient(286deg, rgba(84, 91, 123, 0.00) 45.1%, rgba(84, 91, 123, 0.80) 99.05%),
//                  url('/minecrafttt.png')`,
//                 }}
//               >
//                 <div className={styles.boxmovieinfotext}>
//                   <div className={styles.onlytext}>
//                     <p>Фэнтези, боевик, комедия</p>
//                     <h1>Minecraft в кино (2025)</h1>
//                     <h6>
//                       Четверо аутсайдеров попадают через таинственный портал
//                       в странную кубическую страну чудес. Чтобы вернуться домой,
//                       им придется пройти волшебный квест вместе с мастером
//                       по имени Стив.
//                     </h6>
//                   </div>
//                   <div className={styles.buyticket}>
//                     <p>Купить билет</p>
//                   </div>
//                 </div>
//                 <div className={styles.boxmovieinfolikes}>
//                   <div className={styles.mutebtn}>
//                     <Image src="/mute.svg" alt="mute" width={28} height={28} />
//                   </div>
//                   <div className={styles.likesbtn}>
//                     <Image src="/liked.svg" alt="mute" width={28} height={28} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.oneswiper}>
//             <div className={styles.oneswipernotactive}>
//               <div className={styles.movieinfobox}
//                 style={{ backgroundImage: `linear-gradient(286deg, rgba(84, 91, 123, 0.00) 45.1%, rgba(84, 91, 123, 0.80) 99.05%),url('/minecrafttt.png')`, }}>
//                 <div className={styles.boxmovieinfotext}>
//                   <div className={styles.onlytext}>
//                     <p>Фэнтези, боевик, комедия</p>
//                     <h1>Minecraft в кино (2025)</h1>
//                     <h6>
//                       Четверо аутсайдеров попадают через таинственный портал
//                       в странную кубическую страну чудес. Чтобы вернуться домой,
//                       им придется пройти волшебный квест вместе с мастером
//                       по имени Стив.
//                     </h6>
//                   </div>
//                   <div className={styles.buyticket}>
//                     <p>Купить билет</p>
//                   </div>
//                 </div>
//                 <div className={styles.boxmovieinfolikes}>
//                   <div className={styles.mutebtn}>
//                     <Image src="/mute.svg" alt="mute" width={28} height={28} />
//                   </div>
//                   <div className={styles.likesbtn}>
//                     <Image src="/liked.svg" alt="mute" width={28} height={28} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.boxCalendar}>
//           <div className={styles.boxCalendarTop}>
//             <h1>Календарь записи</h1>
//             <div className={styles.calendarTopRightBtns}>
//               <button>
//                 <Image
//                   src="/bottomarrow.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//                 <p>Жанр</p>
//               </button>
//               <button>
//                 <Image src="/sort.svg" alt="arrow" width={20} height={20} />
//               </button>
//               <button>
//                 <Image
//                   src="/altarrowleft.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//               <button>
//                 <Image
//                   src="/altarrowright.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//             </div>
//           </div>
//           <div className={styles.boxCalendarBottom}>
//             <h2>МАРТ</h2>
//             <div className={styles.boxrowdates}>
//               <div className={styles.oneday}>
//                 <p>1</p>
//                 <p>вт</p>
//               </div>
//               <div className={styles.oneday}>
//                 <p>2</p>
//                 <p>ср</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.boxListFilms}>
//           <div className={styles.headerTitle}>
//             <h2>Рекомендации для Тебя</h2>
//             <div className={styles.boxmenu}>
//               <button className={styles.alllist}>
//                 <p>Bce</p>
//                 <Image
//                   src="/rightarrow.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//               <button>
//                 <Image
//                   src="/altarrowleft.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//               <button>
//                 <Image
//                   src="/altarrowright.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//             </div>
//           </div>
//           <div className={styles.boxFilms}>
//             <div className={styles.boxMovieCard}>
//               <div
//                 className={styles.boxMovieCardImage}
//                 style={{ backgroundImage: `url('/minecrafttt.png')` }}>
//                 <div className={styles.boxraiting}><p>8.9</p></div>
//                 <div className={styles.boxticketandlikes}>
//                   <div className={styles.boxticket}><Image src='/Ticket.svg' alt="ticket" width={16} height={16} /><p>Билеты</p></div>
//                   <div className={styles.boxlike}><Image src='/liked.svg' alt="liked" width={16} height={16} /></div>
//                 </div>
//               </div>
//               <div className={styles.boxMovieCardText}>
//                 <h1>Minecraft в кино (2025)</h1>
//                 <h6>Фэнтези, боевик, комедия</h6>
//               </div>
//             </div>
//             <div className={styles.boxMovieCard}>
//               <div className={styles.boxMovieCardImage}
//                 style={{ backgroundImage: `url('/bgcard.png')` }}>
//                 <div className={`${styles.boxraiting} ${styles.grayText}`}><p>5.4</p></div>
//                 <div className={styles.boxticketandlikes} style={{ justifyContent: 'space-between' }}>
//                   <div className={styles.boxticket}><Image src='/money.svg' alt="money" width={16} height={16} /><p>От 20 000 сум</p></div>
//                   <div className={styles.boxlike}><Image src='/liked.svg' alt="liked" width={16} height={16} /></div>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h1>Title</h1>
//                 <h6>Фэнтези, боевик, комедия</h6>
//                 <div className={styles.location}>
//                   <Image
//                     src="/location.svg"
//                     alt="location"
//                     width={16}
//                     height={16}
//                   />
//                   <p>Яшнабадский район, Компас</p>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons}>
//                   <button>
//                     <Image
//                       src="/Ticket.svg"
//                       alt="ticket"
//                       width={16}
//                       height={16}
//                     />
//                     <p>Билеты</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Фэнтези, боевик, комедия</p>
//               </div>
//             </div>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons}>
//                   <button>
//                     <Image
//                       src="/Ticket.svg"
//                       alt="ticket"
//                       width={16}
//                       height={16}
//                     />
//                     <p>Билеты</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Фэнтези, боевик, комедия</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.mainbox}>
//           <div className={styles.boxListFilms}>
//             <div className={styles.headerTitle}>
//               <h2>Скоро в кино</h2>
//               <div className={styles.boxmenu}>
//                 <button className={styles.alllist}>
//                   <p>Bce</p>
//                   <Image
//                     src="/rightarrow.svg"
//                     alt="arrow"
//                     width={20}
//                     height={20}
//                   />
//                 </button>
//                 <button>
//                   <Image
//                     src="/altarrowleft.svg"
//                     alt="arrow"
//                     width={20}
//                     height={20}
//                   />
//                 </button>
//                 <button>
//                   <Image
//                     src="/altarrowright.svg"
//                     alt="arrow"
//                     width={20}
//                     height={20}
//                   />
//                 </button>
//               </div>
//             </div>
//             <div className={styles.boxFilms}>
//               <div className={styles.movieInfoCard}>
//                 <div className={styles.wrappercardImage}>
//                   <Image
//                     className={styles.movieCardImage}
//                     src="./bgcard.png"
//                     alt="movieCard"
//                     width={324}
//                     height={220}
//                   />
//                   <div className={styles.cardImageButtons}>
//                     <button>
//                       <Image
//                         src="/calendar.svg"
//                         alt="calendar"
//                         width={16}
//                         height={16}
//                       />
//                       <p>Напомнить</p>
//                     </button>
//                   </div>
//                 </div>
//                 <div className={styles.movieDetails}>
//                   <h3>Title</h3>
//                   <p>Фэнтези, боевик, комедия</p>
//                   <div className={styles.location}>
//                     <Image
//                       src="/calendar.svg"
//                       alt="calendar"
//                       width={16}
//                       height={16}
//                     />
//                     <p>21.05.2025</p>
//                   </div>
//                 </div>
//               </div>
//               <div className={styles.movieInfoCard}>
//                 <div className={styles.wrappercardImage}>
//                   <Image
//                     className={styles.movieCardImage}
//                     src="./bgcard.png"
//                     alt="movieCard"
//                     width={324}
//                     height={220}
//                   />
//                   <div className={styles.cardImageButtons}>
//                     <button>
//                       <Image
//                         src="/calendar.svg"
//                         alt="calendar"
//                         width={16}
//                         height={16}
//                       />
//                       <p>Напомнить</p>
//                     </button>
//                   </div>
//                 </div>
//                 <div className={styles.movieDetails}>
//                   <h3>Title</h3>
//                   <p>Фэнтези, боевик, комедия</p>
//                   <div className={styles.location}>
//                     <Image
//                       src="/calendar.svg"
//                       alt="calendar"
//                       width={16}
//                       height={16}
//                     />
//                     <p>21.05.2025</p>
//                   </div>
//                 </div>
//               </div>
//               <div className={styles.movieInfoCard}>
//                 <div className={styles.wrappercardImage}>
//                   <Image
//                     className={styles.movieCardImage}
//                     src="./bgcard.png"
//                     alt="movieCard"
//                     width={324}
//                     height={220}
//                   />
//                   <div className={styles.cardImageButtons}>
//                     <button>
//                       <Image
//                         src="/calendar.svg"
//                         alt="calendar"
//                         width={16}
//                         height={16}
//                       />
//                       <p>Напомнить</p>
//                     </button>
//                   </div>
//                 </div>
//                 <div className={styles.movieDetails}>
//                   <h3>Title</h3>
//                   <p>Фэнтези, боевик, комедия</p>
//                   <div className={styles.location}>
//                     <Image
//                       src="/calendar.svg"
//                       alt="calendar"
//                       width={16}
//                       height={16}
//                     />
//                     <p>21.05.2025</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.boxAd}>
//             <div className={styles.contentAd}>
//               <p>Месточко для рекламы</p>
//             </div>
//           </div>
//         </div>
//         <div className={styles.boxListFilms}>
//           <div className={styles.headerTitle}>
//             <h2>Кино</h2>
//             <div className={styles.boxmenu}>
//               <button className={styles.alllist}>
//                 <p>Bce</p>
//                 <Image
//                   src="/rightarrow.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//               <button>
//                 <Image
//                   src="/altarrowleft.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//               <button>
//                 <Image
//                   src="/altarrowright.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//             </div>
//           </div>
//           <div className={styles.boxFilms}>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./minecrafttt.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons}>
//                   <button>
//                     <Image
//                       src="/Ticket.svg"
//                       alt="ticket"
//                       width={16}
//                       height={16}
//                     />
//                     <p>Билеты</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Minecraft в кино (2025)</h3>
//                 <p>Фэнтези, боевик, комедия</p>
//               </div>
//             </div>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons}>
//                   <button>
//                     <Image
//                       src="/Ticket.svg"
//                       alt="ticket"
//                       width={16}
//                       height={16}
//                     />
//                     <p>Билеты</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Фэнтези, боевик, комедия</p>
//               </div>
//             </div>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons}>
//                   <button>
//                     <Image
//                       src="/Ticket.svg"
//                       alt="ticket"
//                       width={16}
//                       height={16}
//                     />
//                     <p>Билеты</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Фэнтези, боевик, комедия</p>
//               </div>
//             </div>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons}>
//                   <button>
//                     <Image
//                       src="/Ticket.svg"
//                       alt="ticket"
//                       width={16}
//                       height={16}
//                     />
//                     <p>Билеты</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Фэнтези, боевик, комедия</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.boxListFilms}>
//           <div className={styles.headerTitle}>
//             <h2>Мероприятия</h2>
//             <div className={styles.boxmenu}>
//               <button className={styles.alllist}>
//                 <p>Bce</p>
//                 <Image
//                   src="/rightarrow.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//               <button>
//                 <Image
//                   src="/altarrowleft.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//               <button>
//                 <Image
//                   src="/altarrowright.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//             </div>
//           </div>
//           <div className={styles.boxFilms}>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons2}>
//                   <button>
//                     <Image
//                       src="/money.svg"
//                       alt="money"
//                       width={16}
//                       height={16}
//                     />
//                     <p>От 20 000 сум</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Поп, Комедия</p>
//                 <div className={styles.location}>
//                   <Image
//                     src="/location.svg"
//                     alt="location"
//                     width={16}
//                     height={16}
//                   />
//                   <p>Яшнабадский район, Компас</p>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons2}>
//                   <button>
//                     <Image
//                       src="/money.svg"
//                       alt="money"
//                       width={16}
//                       height={16}
//                     />
//                     <p>От 20 000 сум</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Поп, Комедия</p>
//                 <div className={styles.location}>
//                   <Image
//                     src="/location.svg"
//                     alt="location"
//                     width={16}
//                     height={16}
//                   />
//                   <p>Яшнабадский район, Компас</p>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons2}>
//                   <button>
//                     <Image
//                       src="/money.svg"
//                       alt="money"
//                       width={16}
//                       height={16}
//                     />
//                     <p>От 20 000 сум</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Поп, Комедия</p>
//                 <div className={styles.location}>
//                   <Image
//                     src="/location.svg"
//                     alt="location"
//                     width={16}
//                     height={16}
//                   />
//                   <p>Яшнабадский район, Компас</p>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.movieInfoCard}>
//               <div className={styles.wrappercardImage}>
//                 <Image
//                   className={styles.movieCardImage}
//                   src="./bgcard.png"
//                   alt="movieCard"
//                   width={324}
//                   height={220}
//                 />
//                 <div className={styles.cardImageButtons2}>
//                   <button>
//                     <Image
//                       src="/money.svg"
//                       alt="money"
//                       width={16}
//                       height={16}
//                     />
//                     <p>От 20 000 сум</p>
//                   </button>
//                   <button>
//                     <Image
//                       src="/liked.svg"
//                       alt="liked"
//                       width={16}
//                       height={16}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.movieDetails}>
//                 <h3>Title</h3>
//                 <p>Поп, Комедия</p>
//                 <div className={styles.location}>
//                   <Image
//                     src="/location.svg"
//                     alt="location"
//                     width={16}
//                     height={16}
//                   />
//                   <p>Яшнабадский район, Компас</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.boxAd2}>
//           <div className={styles.contentAd2}>
//             <p>Месточко для рекламы</p>
//           </div>
//         </div>
//         <div className={styles.AnimeSecContainer}>
//           <div className={styles.headerTitle}>
//             <h2>Подборка</h2>
//             <div className={styles.boxmenu}>
//               <button className={styles.alllist}>
//                 <p>Bce</p>
//                 <Image
//                   src="/rightarrow.svg"
//                   alt="arrow"
//                   width={20}
//                   height={20}
//                 />
//               </button>
//             </div>
//           </div>
//           <div className={styles.rowcontent}>
//             <div className={styles.AnimeCard}>
//               <h2>4</h2>
//               <div className={styles.nameAndLike}>
//                 <h3>Аниме фесты</h3>
//                 <div className={styles.likeBtn}><Image src='/liked.svg' alt="liked" width={32} height={32} /></div>
//               </div>
//             </div>
//             <div className={styles.AnimeCard}>
//               <h2>4</h2>
//               <div className={styles.nameAndLike}>
//                 <h3>Аниме фесты</h3>
//                 <div className={styles.likeBtn}><Image src='/liked.svg' alt="liked" width={32} height={32} /></div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.rowBigcontent}>
//             <div className={styles.rowcontent2}>
//               <div className={styles.AnimeSmallCard}>
//                 <div className={styles.likeBtn}><Image src='/liked.svg' alt="liked" width={32} height={32} /></div>
//                 <div className={styles.nameAndLike}>
//                   <h3>Аниме фесты</h3>
//                 </div>
//               </div>
//               <div className={styles.AnimeSmallCard}>
//                 <div className={styles.likeBtn}><Image src='/liked.svg' alt="liked" width={32} height={32} /></div>
//                 <div className={styles.nameAndLike}>
//                   <h3>Аниме фесты</h3>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.rowcontent2}>
//               <div className={styles.AnimeSmallCard}>
//                 <div className={styles.likeBtn}><Image src='/liked.svg' alt="liked" width={32} height={32} /></div>
//                 <div className={styles.nameAndLike}>
//                   <h3>Аниме фесты</h3>
//                 </div>
//               </div>
//               <div className={styles.AnimeSmallCard}>
//                 <div className={styles.likeBtn}><Image src='/liked.svg' alt="liked" width={32} height={32} /></div>
//                 <div className={styles.nameAndLike}>
//                   <h3>Аниме фесты</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </section>
//   );
// }
