import Image from "next/image";
import Link from "next/link";
import styles from "./nav.module.css";
import { useUser } from "@/utils/userProvider";

export default function NavAdaptive() {
    const { user } = useUser();

    return (
        <nav className={styles.NavAdaptive}>
            <Link href="/">
                <Image src="/NavAdaptiveHome.svg" alt="home" width={34} height={34} loading="lazy" />
            </Link>


            {/* <button>
        <Image
          src="/NavAdaptiveSearch.svg"
          alt="search"
          width={34}
          height={34}
        />
      </button> */}
            {user ? (
                <Link href="/account" className={styles.authavatarAdaptive}>
                    <Image src={user.avatar} alt="avatar" width={34} height={34} loading="lazy" />
                </Link>
            ) : (
                <Link href="/login">
                    <Image
                        src="/NavAdaptiveLogin.svg"
                        alt="login"
                        width={34}
                        height={34}
                        loading="lazy"
                    />
                </Link>
            )}
        </nav>
    );
}