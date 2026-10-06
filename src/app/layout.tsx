import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const interTight = Inter_Tight({
 variable: "--font-inter-tight",
 subsets: ["latin", "cyrillic"],
 weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://abzalt1.dev";
const TITLE = "Разработка CRM, ERP и B2B-систем под ваш бизнес | Abzal Tolembi";
const DESCRIPTION = "Разрабатываю CRM, ERP и системы приёма оптовых заказов под процессы бизнеса: заказы, склад, производство, накладные, интеграции с 1С и WhatsApp. Алматы, Астана, весь Казахстан.";
const SHORT_DESCRIPTION = "CRM, ERP и системы приёма оптовых заказов под процессы вашего бизнеса.";

export const metadata: Metadata = {
 metadataBase: new URL(SITE_URL),
 title: TITLE,
 description: DESCRIPTION,
 alternates: {
 canonical: "/",
 },
 verification: {
 google: "pZFwH_HQkEECxqTlnEPQhU3vXO8o6GP4Jg592iRGfQc",
 other: { "msvalidate.01": "B3E821C2C02E665868E32FEBB87A9D47" },
 },
 icons: {
 icon: "/favicon.png",
 },
 openGraph: {
 title: TITLE,
 description: SHORT_DESCRIPTION,
 url: `${SITE_URL}/`,
 siteName: "abzalt1.dev",
 locale: "ru_RU",
 type: "website",
 images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "abzalt1.dev — разработка CRM, ERP и B2B-систем" }],
 },
 twitter: {
 card: "summary_large_image",
 title: TITLE,
 description: SHORT_DESCRIPTION,
 creator: "@abzalt1",
 images: [`${SITE_URL}/og.png`],
 },
};

// Structured data so search engines and AI assistants can tell who the site belongs to and what services it offers.
const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Person",
 "@id": `${SITE_URL}/#person`,
 name: "Abzal Tolembi",
 alternateName: "abzalt1",
 jobTitle: "Full-stack разработчик бизнес-систем",
 url: `${SITE_URL}/`,
 sameAs: ["https://instagram.com/abzalt1", "https://t.me/abzalt1"],
 knowsAbout: ["CRM", "ERP", "B2B-порталы", "Автоматизация бизнес-процессов", "Интеграция с 1С", "WhatsApp Business API", "Next.js", "Supabase"],
 },
 {
 "@type": "ProfessionalService",
 "@id": `${SITE_URL}/#service`,
 name: "abzalt1.dev",
 url: `${SITE_URL}/`,
 description: DESCRIPTION,
 founder: { "@id": `${SITE_URL}/#person` },
 address: { "@type": "PostalAddress", addressLocality: "Алматы", addressCountry: "KZ" },
 areaServed: { "@type": "Country", name: "Казахстан" },
 hasOfferCatalog: {
 "@type": "OfferCatalog",
 name: "Услуги",
 itemListElement: [
 { "@type": "Offer", itemOffered: { "@type": "Service", name: "Разработка ERP-систем для производства и склада" } },
 { "@type": "Offer", itemOffered: { "@type": "Service", name: "Разработка CRM-систем под процессы бизнеса" } },
 { "@type": "Offer", itemOffered: { "@type": "Service", name: "Системы приёма оптовых заказов (B2B-порталы)" } },
 { "@type": "Offer", itemOffered: { "@type": "Service", name: "Интеграции с 1С, Telegram и WhatsApp" } },
 ],
 },
 },
 ],
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
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <CookieConsent />
 {children}
 </body>
 </html>
 );
}
