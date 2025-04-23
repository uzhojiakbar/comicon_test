import {Bounce, Flip, Slide, toast, ToastContainer, Zoom} from "react-toastify";

const defaultConfig = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Flip,
    progress: undefined,
};

export const NotificationCon = () => {
    return (
        <ToastContainer
            position={defaultConfig.position}
            autoClose={defaultConfig.autoClose}
            hideProgressBar={defaultConfig.hideProgressBar}
            newestOnTop={false}
            closeOnClick={defaultConfig.closeOnClick}
            rtl={false}
            pauseOnFocusLoss
            draggable={defaultConfig.draggable}
            pauseOnHover={defaultConfig.pauseOnHover}
            theme={defaultConfig.theme}
            transition={defaultConfig.transition}
        />
    );
};

export const useNotification = () => {
    const getToastConfig = (type, customConfig = {}) => ({
        ...defaultConfig,
        ...(type === "success" && { icon: "✅" }),
        ...(type === "error" && { icon: "❌" }),
        ...(type === "info" && { icon: "ℹ️" }),
        ...(type === "warning" && { icon: "⚠️" }),
        ...customConfig,
    });

    const showToast = (text, type = "info", customConfig = {}) => {
        const config = getToastConfig(type, customConfig);
        switch (type) {
            case "success":
                return toast.success(text, config);
            case "error":
                return toast.error(text, config);
            case "warning":
                return toast.warn(text, config);
            case "info":
                return toast.info(text, config);
            default:
                return toast(text, config);
        }
    };

    return {
        toast: showToast, // Umumiy toast funksiyasi
        success: (text, config) => showToast(text, "success", config),
        error: (text, config) => showToast(text, "error", config),
        warning: (text, config) => showToast(text, "warning", config),
        info: (text, config) => showToast(text, "info", config),
        update: (toastId, text, type, config) => {
            const updatedConfig = getToastConfig(type, config);
            toast.update(toastId, { render: text, ...updatedConfig });
        },
        dismiss: (toastId) => toast.dismiss(toastId || undefined), // Muayyan toastni yoki hammasini o‘chirish
        promise: (promise, messages, config) => {
            // Promise holati uchun toast
            return toast.promise(
                promise,
                {
                    pending: messages.pending || "Processing...",
                    success: messages.success || "Success!",
                    error: messages.error || "Error occurred!",
                },
                getToastConfig("info", config)
            );
        },
    };
};

// const { success, error, promise } = useToast();
// success("Udar!");
// error("EROOOR", { autoClose: 2000 });
// promise(fetchData(), { pending: "Loadinng...", success: "Loaded!", error: "error!" });