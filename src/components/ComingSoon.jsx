import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#101217] pointer-events-none overflow-hidden">
            {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="loader w-45 h-45 rounded-full animate-spin"
                        style={{
                            background: "radial-gradient(64.97% 100% at 50.24% 0%, #954CFF 0%, #BA8AFF 100%)",
                        }}
                    ></div>
                </div>
            )}
            <motion.div
                className="flex flex-wrap gap-[20px] items-center justify-center text-white text-lg md:text-2xl mt-2"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
            >
                <Image
                    src={"/ComiconDark.svg"}
                    alt=""
                    width="300"
                    height="120"
                    loading="lazy"
                    onLoad={() => setIsImageLoaded(true)}
                />
                <p>-</p>
                <p>Coming Soon..</p>
            </motion.div>
        </div>
    );
};

export default ComingSoon;
