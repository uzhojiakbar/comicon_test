import Image from "next/image";
import styles from "./thrillers.module.css";
import NavBar from "@/components/nav";
import Footer from "@/components/footer";

export default function thrillers() {
  return (
    <section className={styles.mainContainer}>
      <NavBar />
      <section className={styles.containerContent}>
        <div className={styles.boxCalendar}>
          <div className={styles.boxCalendarTop}>
            <h1>
              Триллеры: расписание фильмов на ближайшее время в кинотеатрах
              Ташкента
            </h1>
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
                <p>2</p>
                <p>ср</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.boxMovieCard}>
          <div
            className={styles.boxMovieCardImage}
            style={{ backgroundImage: `url('/minecrafttt.png')` }}>
            <div className={styles.boxraiting}><p>8.9</p></div>
            <div className={styles.boxticketandlikes}>
                <div className={styles.boxticket}><Image src='/Ticket.svg' alt="ticket" width={16} height={16}/><p>Билеты</p></div>
                <div className={styles.boxlike}><Image src='/liked.svg' alt="liked" width={16} height={16}/></div>
            </div>
          </div>
          <div className={styles.boxMovieCardText}>
            <h1>Minecraft в кино (2025)</h1>
            <h6>Фэнтези, боевик, комедия</h6>
          </div>
        </div>
        <div className={styles.showmore}>
            <p>Показать еще</p>
            <Image src='/showmore.svg' alt="see more" width={24} height={24} />
        </div>
      </section>
      <Footer />
    </section>
  );
}
