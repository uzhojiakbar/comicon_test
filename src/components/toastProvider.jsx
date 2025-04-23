import { createContext, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Компонент уведомления
const Toast = ({ id, message, type, button, buttonMessage, onClose }) => {
  const getImage = () => {
    switch (type) {
      case "success":
        return "/success.svg";
      case "error":
        return "/error.svg";
      case "warning":
        return "/warning.svg";
      default:
        return "/info.svg";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // ✅ Анимация появления
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} // ✅ Анимация исчезновения
      transition={{ duration: 0.3 }}
      className={`toast ${type}`}
      onAnimationComplete={(animation) => {
        if (animation === "exit") {
          onClose(id); // Удаляем после анимации
        }
      }}
    >
      <div className="toastIconText">
        <Image
          src={getImage()}
          alt={type}
          width={24}
          height={24}
          className="toast-icon"
        />
        <span>{message}</span>
      </div>
      {button && buttonMessage && (
        <Link href={button} className="button">
          <button className="toast-button">{buttonMessage}</button>
        </Link>
      )}
    </motion.div>
  );
};

// Контекст уведомлений
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Добавление уведомления
  const addToast = (
    message,
    type = "success",
    button = null,
    buttonMessage = null
  ) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, type, button, buttonMessage },
    ]);

    // Убираем уведомление через 3 секунд
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              button={toast.button}
              buttonMessage={toast.buttonMessage}
              onClose={(id) =>
                setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
              }
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Хук для использования уведомлений
export const useToast = () => useContext(ToastContext);
