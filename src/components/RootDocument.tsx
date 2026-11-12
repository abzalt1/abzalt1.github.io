import { Inter } from "next/font/google";
import "@/app/globals.css";
import CookieConsent from "@/components/CookieConsent";
import LocaleProvider from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/dict";

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin", "cyrillic"],
});

// Shared <html> shell for both root layouts; each language is its own root layout so <html lang> is right.
export default function RootDocument({ locale, jsonLd, children }: { locale: Locale; jsonLd: object; children: React.ReactNode }) {
 return (
 <html lang={locale} className={inter.variable} suppressHydrationWarning>
 <head>
 <link
 href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
 rel="stylesheet"
 integrity="sha384-6FSSi597BTd6QcnsBNoLclRKxTOyyYqkaucRjFgCNr8wHVCp0COLClSPY4Vy/bjh"
 crossOrigin="anonymous"
 />
 </head>
 <body className="font-sans antialiased">
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <LocaleProvider locale={locale}>
 <CookieConsent />
 {children}
 </LocaleProvider>
 </body>
 </html>
 );
}
