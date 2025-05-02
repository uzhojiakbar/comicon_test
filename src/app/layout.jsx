// app/layout.jsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientProviders from "@/app/ClientProviders"; // путь к твоему ClientProviders
import Head from "next/head";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Comic Con - Tashkent 2025", // Sahifa sarlavhasi
  description: "Один день. Тысячи фанатов. Любимые вселенные, которые оживают прямо перед тобой. Comic Con Tashkent — это место встречи тех, кто верит в чудеса, мечтает о великих приключениях и не боится быть собой. Приходи, чтобы почувствовать, как мечты становятся ближе.", // Sahifa tavsifi
  keywords: "ComiCon, фестиваль комиксов, косплей, аниме, поп-культура, комиксы, гик-культура, супергерои, мероприятия, Comic Con Uzbekistan, комикон ташкент", // Kalit so'zlar
  icons: {
    icon: "/ComiconDark.svg", // Favicon
    apple: "/ComiconDark.svg", // Apple uchun favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <Head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XPER51LLLJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XPER51LLLJ');
        `}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.webvisor.org/metrika/tag_ww.js", "ym");

          ym(101539320, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            trackHash:true
          });
        `}
        </Script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
