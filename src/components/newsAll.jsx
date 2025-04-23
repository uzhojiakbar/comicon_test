'use client';

import styles from "@/app/news/news.module.css";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import useApi from "@/utils/api";
import { useLanguage } from "@/context/languageContext";
import { useTheme } from "next-themes";
import { MainEventSkeleton } from "@/app/style";

export default function NewsAll() {
    const api = useApi();
    const { translate, language } = useLanguage();
    const { resolvedTheme } = useTheme();

    const fetchNewsAllData = async () => {
        const response = await api.get("news/");
        return response.data;
    };

    const {
        data: newsAll,
        isLoading
    } = useQuery({
        queryKey: ["newsData", language],
        queryFn: fetchNewsAllData,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        enabled: true,
    });

    if (isLoading) {
        return (
            <div className={styles.news}>
                <div className={styles.boxrow}>
                    <h2>{translate("other")}</h2>
                </div>
                <div className={styles.boxNews}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={styles.oneNews}>
                            <MainEventSkeleton theme={resolvedTheme} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const filteredNews = newsAll?.filter(({ categories }) => !categories.includes("important"));

    if (!filteredNews || filteredNews.length === 0) {
        return null;
    }

    return (
        <div className={styles.news}>
            <div className={styles.boxrow}>
                <h2>{translate("other")}</h2>
            </div>
            <div className={styles.boxNews}>
                {filteredNews.map(({ id, title, img, created_at, content }) => (
                    <Link key={id} href={`/news/${id}`} className={styles.oneNews}>
                        {img && (
                            <Image src={img} alt="news" width={324} height={200} loading="lazy" />
                        )}
                        <div className={styles.boxNewsInfo}>
                            <h1>
                                {title.slice(0, 30)}
                                {title.length > 30 ? "..." : ""}
                            </h1>
                            {!img && (
                                <p>
                                    {new DOMParser().parseFromString(content, "text/html").body.textContent}
                                </p>
                            )}
                            <h6>{new Date(created_at).toLocaleDateString("ru-RU")}</h6>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
