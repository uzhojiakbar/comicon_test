import useApi from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

export const PrepareOrder = () => {
    const api = useApi(); // useApi hook'ini to'g'ridan-to'g'ri chaqirish
    return useMutation({
        mutationFn: async (eventData) => {

            console.log(eventData, "EVENT DATA");


            try {
                const response = await api.post(`/orders/event/${eventData}/order/prepare/`);
                console.log("EVENT CREATED", response);
                return response?.data;
            } catch (error) {
                console.error("Error creating event", error);
                throw error; // xatolikni qaytarish
            }
        },
        onSuccess: (data) => {
            console.log("Event successfully created:", data);
        },
        onError: (error) => {
            console.error("Error occurred during event creation:", error);
        },
    });
};

// TIMER 5 min

export const OrderEdit = () => {
    const api = useApi(); // useApi hook'ini to'g'ridan-to'g'ri chaqirish
    return useMutation({
        mutationFn: async (orderData) => {

            try {
                const response = await api.post(`/orders/event/order/edit/`, orderData);
                console.log("Order Editied", response);
                return response?.data;
            } catch (error) {
                console.error("Error Order Editied", error);
                throw error; // xatolikni qaytarish
            }
        },
        onSuccess: (data) => {
            console.log("Order Editied successfully:", data);
        },
        onError: (error) => {
            console.error("Error occurred during Order Editied:", error);
        },
    });
};

// {
//     "status": "success",
//     "order_id": 114,
//     "total_amount": 0,
//     "created_at": "2025-04-30 00:01:29",
//     "expired_at": "2025-04-30 00:16:29",
//     "sessions": [
//         {
//             "session_id": 1,
//             "session_time": "2025-08-10 07:00",
//             "event_name": "ComicCon",
//             "location_name": "Humo Arena",
//             "tickets": [
//                 {
//                     "ticket_type_id": 1,
//                     "ticket_type_name": "Default Ticket",
//                     "ticket_type_category": "Default Ticket",
//                     "price": 195000,
//                     "remaining": 3979,
//                     "quantity": 0,
//                     "total": 0
//                 }
//             ]
//         }
//     ],
//     "payment_methods": [
//         "ATMOSPAY",
//         "CLICK"
//     ]
// }