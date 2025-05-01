import { useEffect, useState } from "react";
import styles from "./ImagerViewer.module.css";
import styles2 from "../app/home.module.css";
import Image from "next/image";
import ModalPortal from "@/components/ModalPortal";

const ImageViewer = ({ src, alt = "image", order = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);

    // ESC bilan yopish
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    return (
        <>
            <div
                className={styles2.oneAboutImage}
                style={{ backgroundImage: `url(${src})`, order: order || 0 }}
                onClick={() => setIsOpen(true)}
            ></div>

            {isOpen && (
                <ModalPortal>
                    <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
                        <div
                            className={styles.modalContent}
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsOpen(false)
                            }}
                        >
                            <Image
                                src={src}
                                alt={alt}
                                width={800}
                                height={600}
                                objectFit="contain"
                                className={styles.modalImage}
                                priority
                            />
                        </div>
                    </div>
                </ModalPortal>
            )}
        </>
    );
};

export default ImageViewer;
