"use client";
import styles from "./onenews.module.css";
import NavBar from "@/components/nav";
import Footer from "@/components/footer";
import NavAdaptive from "@/components/navAdaptive";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useApi from "@/utils/api";
import { useCreateComment, useGetCommentsWithWPostId, useRatingOnComment } from "@/utils/server";
import { useEffect, useState } from "react";
import { copyToClipboard } from "@/utils/CopyText";
import { sitedata } from "@/utils/sitedata";
import { useLanguage } from "@/context/languageContext";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { NotificationCon, useNotification } from "@/utils/newToast";
import { useToast } from "@/components/toastProvider";

export default function News() {
    const api = useApi();
    const { theme } = useTheme();
    const params = useParams();
    const { id } = params;
    const { addToast } = useToast();

    const { language, translate } = useLanguage();
    const { info } = useNotification();

    if (!id || !/^\d+$/.test(id)) {
        notFound();
        return null;
    }

    const fetchNewsData = async () => {
        const { data } = await api.get(`news/${id}`);
        console.log("API response:", data);
        return data;
    };

    const {
        data: news,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["news", id, language],
        queryFn: fetchNewsData,
        enabled: Boolean(id),
    });

    const user = Cookies.get("access_token");

    console.log("user", user);

    // Murodillayev Hojiakbar, 03:26, 11.03.2026. t.me/anonim_opisis
    const mutation = useCreateComment(); // comment qoshish uchun mutation ni chaqirib olamiz (server,js)
    const CommentRataingmutation = useRatingOnComment(); // comment qoshish uchun mutation ni chaqirib olamiz (server,js)
    const { data: comments, isLoading: isLoadingComments } =
        useGetCommentsWithWPostId({ postID: news?.id || null });
    console.log("COMMENTS: ", comments);

    useEffect(() => {
        console.log(document.location.hash);
        setTimeout(() => {
            if (document.location.hash) {
                const commentId = document.location.hash.split("#")[1]; // "comment-123" kabi
                const element = document.getElementById(commentId);

                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        }, 200);
    }, [document.location, comments]);

    const [commentText, setCommentText] = useState("");

    const CreateComment = () => {
        const trimmedComment = commentText.trim();
        const requestDataBody = {
            newsId: news?.id,
            content: trimmedComment,
        };

        if (trimmedComment) {
            mutation.mutate({
                requestData: {
                    ...requestDataBody,
                },
                onSuccess: () => {
                    console.log("Comment posted successfully!");
                    setTimeout(() => {
                        setCommentText("");
                    }, 500);
                    addToast(translate("sucsessPublished"), "success");
                },
                onError: (err) => {
                    console.log("error", err);
                    console.log("Error, comment is not posted!: " + err);
                },
            });
        } else {
            console.log("COMMENT BOSH BOLISHI MUMKIN EMAS!!!");
            addToast(translate("cantEmpty"), "error");
        }
    };

    const LikeVOte = (commentID, vote) => {
        const requestDataBody = {
            newsId: news?.id,
            commentID,
            vote,
        };

        if (vote && commentID && user) {
            CommentRataingmutation.mutate({
                requestData: {
                    ...requestDataBody,
                },
                onSuccess: (data) => {
                    console.log("comemtn LIKED!", data);
                    setTimeout(() => {
                        // bu yerga boshqa qandaydur function yozish mumkin, masalan loader ni toxtatish
                    }, 500);
                },
                onError: (err) => {
                    console.log("error", err);
                    console.log("Error, comment vote is not posted!: " + err);
                },
            });
        } else if (!user) {
            console.log("Чтобы поставить реакцию пожалуйста войдите.");
            addToast(translate("loginplease"), "warning", "/login", "Войти");
        } else[console.log("NIMADUR NETOOO")];
    };

    // COMMENT INFO
    function timeAgo(timestamp, language = "uz") {
        const now = new Date();
        const past = new Date(timestamp);
        let diffInSeconds = Math.floor((now - past) / 1000);

        const translations = {
            uz: {
                yil: "yil",
                oy: "oy",
                hafta: "h.",
                kun: "kun",
                soat: "soat",
                daqiqa: "daq.",
                soniya: "son.",
                ago: "oldin",
                now: "hozir",
            },
            ru: {
                yil: "г.",
                oy: "мес.",
                hafta: "нед.",
                kun: "д.",
                soat: "ч.",
                daqiqa: "мин.",
                soniya: "сек.",
                ago: "назад",
                now: "только что",
            },
        };

        const intervals = [
            { key: "yil", seconds: 31536000 },
            { key: "oy", seconds: 2592000 },
            { key: "hafta", seconds: 604800 },
            { key: "kun", seconds: 86400 },
            { key: "soat", seconds: 3600 },
            { key: "daqiqa", seconds: 60 },
            { key: "soniya", seconds: 1 },
        ];

        let result = [];
        const t = translations[language] || translations.uz;

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                result.push(`${count} ${t[interval.key]}`);
                diffInSeconds -= count * interval.seconds;
            }
            if (result.length === 2) break; // 2 birlik
        }

        return result.length ? `${result.join(" ")} ${t.ago}` : t.now;
    }

    // Foydalanish
    console.log(timeAgo("2025-03-11T04:13:37.345219+05:00"));
    return (
        <>
            <section className={styles.mainContainer}>
                <NavBar />
                <NotificationCon />
                <section className={styles.NewsContent}>
                    <div className={styles.newsBannerText}>
                        {news?.banner ?
                            <Image
                                src={`${news?.banner}`}
                                width={1368}
                                height={444}
                                alt="Banner"
                                loading="lazy"
                            />
                            : <div className={styles.newBannerImgBox}>
                            </div>}
                        <div className={styles.boxText}>
                            <h2>{news?.title}</h2>
                            <div>
                                {new Date(news?.created_at).toLocaleDateString("ru-RU")}
                            </div>
                        </div>
                    </div>
                    <section className={styles.mainContent}>
                        <div
                            dangerouslySetInnerHTML={{ __html: news?.content || "" }}
                            className={styles.newsContent}
                        ></div>
                        <div className={styles.boxLinks}></div>
                    </section>

                    {news?.is_chat === true ? (
                        <div
                            className={styles.mainContentComments}
                            style={{ width: "100% !important" }}>
                            <div className={styles.boxCommentsH1}>
                                <h1>Комментарии</h1>
                                <p>Всего: {comments?.comments?.length || 0}</p>
                            </div>
                            {user ? (
                                <div className={styles.boxInputs}>
                                    <textarea
                                        placeholder="Написать комментарий.."
                                        onChange={(e) => setCommentText(e.target.value || "")}
                                        value={commentText}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault(); // Чтобы не было перевода строки
                                                CreateComment();
                                            }
                                        }}
                                    />
                                    <button className={styles.buttonSend} onClick={CreateComment}>
                                        <Image
                                            src="/sendComment.svg"
                                            alt="send"
                                            loading="lazy"
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                </div>
                            ) : (
                                <div className={`${styles.center} ${styles.boxInputs}`}>
                                    <Image
                                        src="/Info.svg"
                                        alt="send"
                                        loading="lazy"
                                        width={24}
                                        height={24}
                                    />
                                    <div className={styles.LinkContainer}>
                                        Чтобы оставить комментарий, пожалуйста
                                        <span
                                            onClick={() => (window.location.href = "/login")}
                                            style={{
                                                cursor: "pointer",
                                                textDecoration: "underline 1px solid var(--text)",
                                                fontWeight: "500",
                                                color: "var(--text)",
                                                transition: "0.3s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.textDecoration = "none";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.textDecoration =
                                                    "underline 1px solid var(--text)";
                                            }}
                                        >
                                            {" "}Войдите.
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className={styles.boxComments}>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    comments?.comments?.map((comment, index) => (
                                        <div
                                            id={`comment-${comment?.id}`}
                                            className={styles.oneComment}
                                            style={{
                                                border: `1px solid ${document.location.hash.split("#")[1]?.slice(8) == comment?.id ? "white" : "transparent"}`
                                            }}
                                            key={comment?.id}>
                                            <div className={styles.commentUserAndTime}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "20px",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Image
                                                        src={comment?.user?.avatar}
                                                        style={{ borderRadius: "50px" }}
                                                        alt="user_profile"
                                                        width={40}
                                                        height={40}
                                                    />
                                                    <p>
                                                        {comment?.user?.first_name}{" "}
                                                        {comment?.user?.last_name}{" "}
                                                    </p>
                                                </div>
                                                <p className={styles.commentTime}>
                                                    {timeAgo(comment?.created_at, language)}
                                                </p>
                                            </div>
                                            <div
                                                className={styles.commentAndRaiting}
                                                key={comment?.id}
                                            >
                                                <div className={styles.commentText}>
                                                    {comment?.content}
                                                </div>
                                                <div className={styles.commentRaiting}>
                                                    <div className={styles.boxCommentRaiting}>
                                                        <button onClick={() => LikeVOte(comment?.id, 1)}>
                                                            <Image
                                                                src={
                                                                    comment?.user_vote === 1
                                                                        ? "/addRaitingCommentActive.svg"
                                                                        : theme === "dark"
                                                                            ? "/addRaitingComment.svg"
                                                                            : "/addRaitingCommentLight.svg"
                                                                }
                                                                loading="lazy"
                                                                alt="add"
                                                                width={24}
                                                                height={24}
                                                            />
                                                        </button>
                                                        <div>
                                                            <div
                                                                className={
                                                                    comment?.rating !== 0
                                                                        ? comment?.rating >= 1
                                                                            ? styles.raiting
                                                                            : styles.raitingred
                                                                        : styles.raitingzero
                                                                }>
                                                                {comment?.rating}
                                                            </div>
                                                        </div>
                                                        <button onClick={() => LikeVOte(comment?.id, -1)}>
                                                            <Image
                                                                src={
                                                                    comment?.user_vote === -1
                                                                        ? "/removeRaitingCommentActive.svg"
                                                                        : theme === "dark"
                                                                            ? "/removeRaitingComment.svg"
                                                                            : "/removeRaitingCommentLight.svg"
                                                                }
                                                                loading="lazy"
                                                                alt="remove"
                                                                width={24}
                                                                height={24}
                                                            />
                                                        </button>
                                                    </div>
                                                    <button
                                                        className={styles.share}
                                                        onClick={() => {
                                                            copyToClipboard(`${sitedata?.link}news/${news?.id}#comment-${comment?.id}`), addToast(translate("sucsessCopyed"), "success")
                                                        }}>
                                                        <Image
                                                            src={
                                                                theme === "dark"
                                                                    ? "/share.svg"
                                                                    : "/shareLight.svg"
                                                            }
                                                            alt="share"
                                                            loading="lazy"
                                                            width={24}
                                                            height={24}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </section>
                <Footer />
                <NavAdaptive />
            </section>
        </>
    );
}