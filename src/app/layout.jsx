"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/languageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { UserProvider } from "@/utils/userProvider";
import { ToastProvider } from "@/components/toastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "TCats",
//   description: "TCats",
// };

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ru">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <LanguageProvider>
            <ToastProvider>
              <UserProvider>{children}</UserProvider>
            </ToastProvider>
          </LanguageProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}

