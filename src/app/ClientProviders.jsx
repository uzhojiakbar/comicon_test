"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/context/languageContext";
import { UserProvider } from "@/utils/userProvider";
import { ToastProvider } from "@/components/toastProvider";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export default function ClientProviders({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ToastProvider>
            <UserProvider>{children}</UserProvider>
          </ToastProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}