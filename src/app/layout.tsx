import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const interTight = Inter_Tight({
 variable: "--font-inter-tight",
 subsets: ["latin", "cyrillic"],
 weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
 title: "abzalt1.dev | Business-Oriented Developer",
 description: "Разработка сайтов для бизнеса. Tilda, Webflow, Custom Frontend. Визуально чисто, технически грамотно.",
 icons: {
 icon: "/favicon.png",
 },
 openGraph: {
 title: "abzalt1.dev | Business-Oriented Developer",
 description: "Разработка сайтов, которые приносят прибыль.",
 url: "https://abzalt1.github.io/",
 siteName: "abzalt1.dev",
 locale: "ru_RU",
 type: "website",
 images: [{ url: "https://abzalt1.github.io/me.jpg", width: 1429, height: 1453 }],
 },
 twitter: {
 card: "summary_large_image",
 title: "abzalt1.dev | Business-Oriented Developer",
 description: "Разработка сайтов, которые приносят прибыль.",
 creator: "@abzalt1",
 images: ["https://abzalt1.github.io/me.jpg"],
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="ru" suppressHydrationWarning>
 <head>
 <link
 href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
 rel="stylesheet"
 integrity="sha384-6FSSi597BTd6QcnsBNoLclRKxTOyyYqkaucRjFgCNr8wHVCp0COLClSPY4Vy/bjh"
 crossOrigin="anonymous"
 />
 </head>
 <body
 className={`${interTight.variable} font-sans antialiased`}
 >
 <CookieConsent />
 {children}
 </body>
 </html>
 );
}
