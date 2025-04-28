import useApi from "@/utils/api";
import {useQuery} from "@tanstack/react-query";

export const ReadEvents = (language) => {
    const api = useApi()
    return useQuery({
        queryKey: ["eventData", language],
        queryFn: async () => {
            try {
                const data = await api.get(`events/events/`);
                console.log("EVENT DATA", data);
                return data?.data;
            } catch (error) {
                console.error("Error fetching data", error);
                throw error; // xatolikni qaytarish
            }
        },
        staleTime: 1000 * 60 * 10,
    });
}
