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

export const OrderApply = () => {
    const api = useApi(); // useApi hook'ini to'g'ridan-to'g'ri chaqirish
    return useMutation({
        mutationFn: async (orderData) => {
            try {
                console.log("Order data", orderData); // Yuborilayotgan ma'lumotni tekshirish

                const response = await api.post(`/orders/event/order/apply/`, orderData);
                console.log("Click order applied", response);
                return response?.data;
            } catch (error) {
                console.error("Error click apply", error);
                throw error; // xatolikni qaytarish
            }
        },
        onSuccess: (data) => {
            console.log("Order click apply successfully:", data);
        },
        onError: (error) => {
            console.error("Error occurred during Order apply click:", error);
        },
    });
};

export const AtmosPayCreate = () => {
    const api = useApi(); // Directly calling the useApi hook
    return useMutation({
        mutationFn: async (orderData) => {
            try {
                console.log("Order data being sent:", orderData); // Log the data being sent

                const response = await api.post(`/payments/atmospay/create/`, orderData);
                console.log("AtmosPay order created successfully:", response);
                return response?.data;
            } catch (error) {
                console.error("Error occurred while creating AtmosPay order:", error);
                throw error; // Propagate the error
            }
        },
        onSuccess: (data) => {
            console.log("AtmosPay order creation succeeded:", data);
        },
        onError: (error) => {
            console.error("Error occurred during AtmosPay order creation:", error);
        },
    });
};


export const AtmosPayPreApply = () => {
    const api = useApi(); // Directly calling the useApi hook
    return useMutation({
        mutationFn: async (orderData) => {
            try {
                console.log("🚀 Sending order data for AtmosPay Pre-Apply:", orderData); // Log the data being sent

                const response = await api.post(`/payments/atmospay/pre-apply/`, orderData);
                console.log("✅ AtmosPay Pre-Apply request was successful. Response:", response);
                return response?.data;
            } catch (error) {
                console.error("❌ Error occurred during AtmosPay Pre-Apply. Details:", error);
                throw error; // Propagate the error
            }
        },
        onSuccess: (data) => {
            console.log("🎉 AtmosPay Pre-Apply completed successfully. Response data:", data);
        },
        onError: (error) => {
            console.error("⚠️ Failed to complete AtmosPay Pre-Apply. Error details:", error);
        },
    });
};


export const AtmosPayApplyWithOTP = () => {
    const api = useApi(); // Directly calling the useApi hook
    return useMutation({
        mutationFn: async (orderData) => {
            try {
                console.log("Sending order data for AtmosPay OTP application:", orderData); // Log the data being sent

                const response = await api.post(`/payments/atmospay/apply/`, orderData);
                console.log("AtmosPay OTP application request was successful. Response:", response);
                return response?.data;
            } catch (error) {
                console.error("An error occurred while applying AtmosPay OTP. Details:", error);
                throw error; // Propagate the error
            }
        },
        onSuccess: (data) => {
            console.log("AtmosPay OTP application completed successfully. Response data:", data);
        },
        onError: (error) => {
            console.error("Failed to complete AtmosPay OTP application. Error details:", error);
        },
    });
};

export const OrderPostPromocode = () => {
    const api = useApi(); // Directly calling the useApi hook
    return useMutation({
        mutationFn: async (orderData) => {
            try {
                console.log("Sending order data for Promocode application:", orderData); // Log the data being sent

                const response = await api.post(`/orders/event/order/promocode/`, orderData);
                console.log("Promocode application request was successful. Response:", response);
                return response?.data;
            } catch (error) {
                console.error("An error occurred while applying Promocode. Details:", error);
                throw error; // Propagate the error
            }
        },
        onSuccess: (data) => {
            console.log("Promocode application completed successfully. Response data:", data);
        },
        onError: (error) => {
            console.error("Failed to complete Promocode application. Error details:", error);
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
//            "location_street": "Tashkent, Uzbekistan",
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

// barcode bolsa barcode aks xolda qrcode

// --- ATMOST PY CREATE
// {
//     "status": "success",
//     "id": 114,
//     "total_amount": 2350000,
//     "payment_method": "ATMOSPAY"
// }

// --- ATMOST PY CREATE
// {
//     "status": "success",
//     "data": {
//         "transaction_id": 105814,
//         "store_id": 8124,
//         "order_id": 114,
//         "amount": 2350000,
//         "confirmed": false
//     }
// }


//

// {
//     "status": "success",
//     "transaction_id": "105817"
//   }