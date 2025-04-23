import Image from "next/image";
import styles from "./order.module.css";

export default function order() {
  return (
    <dialog className={styles.mainContainer}>
      <div className={styles.mainBoxOrder}>
        <div className={styles.boxMovieInfo}>
          <div className={styles.boxMovieInfoTop}>
            <div className={styles.boxMovieInformation}>
              <div className={styles.boxMovieName}>
                <h1>Капитан Америка: Новый мир</h1>
                <h6>18+</h6>
                <h5>2D</h5>
              </div>
              <div className={styles.boxMovieWhen}>
                <p>Сегодня в 14:00</p>
                <div className={styles.boxMovieWhenPlace}>
                  <p>Magic Cinema</p>
                  <h6>улица Бабура, 174/12</h6>
                </div>
              </div>
            </div>
            <div className={styles.boxMovieTicketInformation}>
              <h3>Билеты</h3>
              <hr />
              <div className={styles.boxTicketRows}>
                <div className={styles.oneRow}>
                  <div className={styles.ticketInfo}>
                    <p>VIP</p>
                    <Image src="/point.svg" alt="point" width={4} height={4} />
                    <p>1 ряд, 9 место</p>
                  </div>
                  <p>399 000 so’m</p>
                </div>
              </div>
              <hr />
              <div className={styles.totalRow}>
                  <p>Итого:</p>
                <p>1 596 000 so’m</p>
              </div>
            </div>
          </div>
          <div className={styles.boxCinemaAdvertising}>
            <div className={styles.boxAdvertising}>
                <p>Место для рекламы</p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
