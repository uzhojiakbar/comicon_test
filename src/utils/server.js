import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "@/utils/api";
import Cookies from "js-cookie";

export const useCreateComment = () => {
    const api = useApi()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (commentData) => {
            queryClient.invalidateQueries(["Comments"]);

            const response = await api.post(
                `/comments/news/${commentData?.requestData?.newsId}/comments/create/`,
                { content: commentData?.requestData?.content }
            );
            queryClient.invalidateQueries(["Comments", commentData?.requestData?.newsId]);
            return response;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};

export const useGetCommentsWithWPostId = ({ postID = null }) => {
    const api = useApi()

    return useQuery({
        queryKey: ["Comments", postID],
        queryFn: async () => {
            try {
                if (postID) {
                    const data = await api.get(`comments/news/${postID}/comments/`);
                    console.log("COMMENTS", data)
                    return data?.data;
                } else {
                    return {}
                }
            } catch (error) {
                console.error("Error fetching data", error);
                return {}
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
};

export const ReadComics = (id = null) => {
    const api = useApi()
    return useQuery({
        queryKey: ["ComicRead", id],
        queryFn: async () => {
            try {
                if (id) {
                    const data = await api.get(`comica/book/${id}/read/`);
                    console.log("COMIC DATA", data);
                    return data?.data;
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
}

export const ComicsData = (id = null) => {
    const api = useApi()
    return useQuery({
        queryKey: ["comicData", id],
        queryFn: async () => {
            try {
                if (id) {
                    const data = await api.get(`comica/book/${id}`);
                    console.log("COMIC DATA", data);
                    return data?.data;
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
}

export const ChaptersRead = (id = null) => {
    const api = useApi()
    return useQuery({
        queryKey: ["Chapters", id],
        queryFn: async () => {
            try {
                if (id) {
                    const data = await api.get(`comica/book/${id}/chapters/`);
                    console.log("CHAPTERS DATA", data);
                    return data?.data;
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
}

export const ChapterRead = (id = null, chapterId = null) => {
    const api = useApi()
    const queryClient = useQueryClient();


    return useQuery({
        queryKey: ["chapter", id, chapterId],
        queryFn: async () => {
            if (!id || !chapterId) return null; // Undefined o‘rniga null qaytarish

            try {
                if (id && chapterId) {
                    const data = await api.get(`comica/book/${id}/chapters/${chapterId}/read/`);
                    console.log("CHAPTER DATA1", data);
                    return data?.data;
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
}

export const useChapterRead = () => {
    const api = useApi();

    return useMutation({
        mutationFn: async ({ id, chapterID }) => {
            if (!id || !chapterID) {
                throw new Error("ID yoki ChapterID yetishmayapti");
            }
            const { data } = await api.get(`comica/book/${id}/chapters/${chapterID}/read/`);
            console.log("CHAPTER READ DATA 111", data);
            return data;
        },
    });
};

export const useGetUserBooks = () => {
    const api = useApi()
    return useQuery({
        queryKey: ["UserBooks"],
        queryFn: async () => {
            try {
                const data = await api.get(`comica/user-books/`);
                console.log("RESSS", data?.data)
                return data?.data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
}

export const useGetUserBooksStatus = (id) => {
    const api = useApi()
    return useQuery({
        queryKey: ["UserBooksStatus", id],
        queryFn: async () => {
            try {
                const data = await api.get(`comica/user-books/`);
                console.log(data?.data)
                if (id) {
                    for (const key in data?.data?.by_list_type) {
                        const status = data?.data?.by_list_type[key];
                        if (status?.books?.some(book => book?.id === id)) {
                            return { key, display_name: status?.display_name };
                        }
                    }
                } else {
                    return { key: "none", display_name: "No books available" };
                }
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
}

export const useUpdateBookStatus = () => {
    const api = useApi()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            queryClient.invalidateQueries(["UserBooksStatus", data?.requestData?.id]);
            // {
            //     "book_id": 1,
            //     "new_status": "reading"
            // }
            const response = await api.post(
                `/comica/update-status/`,
                data?.requestData
            );
            queryClient.invalidateQueries(["UserBooksStatus", data?.requestData?.id]);
            return response;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};

//
// return useMutation({
//     mutationFn: async (commentData) => {
//         const response = await api.post(
//             `/comica/cart/`,
//             {
//                 "book_id": commentData?.requestData?.bookId,
//             }
//         );
//         return response;
//     },
//     onSuccess: (data, variables) => {
//         variables.onSuccess(data);
//     },
//     onError: (error, variables) => {
//         variables.onError(error);
//     },
// });

export const useRatingOnComment = () => {
    const api = useApi()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (commentData) => {
            queryClient.invalidateQueries(["Comments"]);

            const response = await api.post(
                `/comments/comments/${commentData?.requestData?.commentID}/rating/`,
                { vote: commentData?.requestData?.vote }
            );
            queryClient.invalidateQueries(["Comments", commentData?.requestData?.newsId]);
            return response;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};

export const useClearCart = () => {
    const api = useApi()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await api.delete(
                `/comica/cart/`
            );
            return response;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["cartData"]);
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};

export const UseLinkUnlickAccount = () => {
    const api = useApi()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (commentData) => {
            const response = await api.post(
                `user/link-unlink-account/`,
                { ...commentData?.data }
            );
            queryClient.invalidateQueries(["userData"]);
            return response;
        },
        onSuccess: (data, variables) => {
            variables.onSuccess(data);
        },
        onError: (error, variables) => {
            variables.onError(error);
        },
    });
};

export const useUpdateUserAvatar = () => {
    const api = useApi();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (avatarData) => {
            console.log("SERVR", avatarData)
            const response = await api.patch(
                `/user/avatar/update/`,
                { avatar: avatarData?.avatar },
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            queryClient.invalidateQueries(["userData"]); // User ma’lumotlarini yangilash uchun
            return response;
        },
        onSuccess: (data, variables) => {
            if (variables.onSuccess) {
                variables.onSuccess(data); // Muvaffaqiyatli yakunlanganda callback
            }
        },
        onError: (error, variables) => {
            if (variables.onError) {
                variables.onError(error); // Xatolik yuz berganda callback
            }
        },
    });
};
