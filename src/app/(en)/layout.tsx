import type { Metadata } from "next";
import RootDocument from "@/components/RootDocument";

const SITE_URL = "https://abzalt1.dev";
const TITLE = "Custom CRM, ERP and B2B Ordering Systems | Abzal Tolembi";
const DESCRIPTION = "I build CRM, ERP and B2B ordering portals around how your business actually works: orders, inventory, production, invoices, and integrations with accounting software, WhatsApp and Telegram. Remote, from Kazakhstan.";
const SHORT_DESCRIPTION = "CRM, ERP and B2B ordering portals built around your business processes.";

export const metadata: Metadata = {
 metadataBase: new URL(SITE_URL),
 title: TITLE,
 description: DESCRIPTION,
 alternates: {
 canonical: "/en",
 languages: { ru: "/", en: "/en", "x-default": "/" },
 },
 icons: {
 icon: "/favicon.png",
 },
 openGraph: {
 title: TITLE,
 description: SHORT_DESCRIPTION,
 url: `${SITE_URL}/en`,
 siteName: "abzalt1.dev",
 locale: "en_US",
 type: "website",
 images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "abzalt1.dev — custom CRM, ERP and B2B systems" }],
 },
 twitter: {
 card: "summary_large_image",
 title: TITLE,
 description: SHORT_DESCRIPTION,
 creator: "@abzalt1",
 images: [`${SITE_URL}/og.png`],
 },
};

const jsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Person",
 "@id": `${SITE_URL}/#person`,
 name: "Abzal Tolembi",
 alternateName: "abzalt1",
 jobTitle: "Full-stack developer of business systems",
 url: `${SITE_URL}/en`,
 sameAs: ["https://instagram.com/abzalt1.dev", "https://t.me/abzalt1"],
 knowsAbout: ["CRM", "ERP", "B2B portals", "Business process automation", "1C integration", "WhatsApp Business API", "Next.js", "Supabase"],
 },
 {
 "@type": "ProfessionalService",
 "@id": `${SITE_URL}/en#service`,
 name: "abzalt1.dev",
 url: `${SITE_URL}/en`,
 description: DESCRIPTION,
 founder: { "@id": `${SITE_URL}/#person` },
 address: { "@type": "PostalAddress", addressLocality: "Almaty", addressCountry: "KZ" },
 areaServed: "Worldwide",
 hasOfferCatalog: {
 "@type": "OfferCatalog",
 name: "Services",
 itemListElement: [
 { "@type": "Offer", itemOffered: { "@type": "Service", name: "ERP development for manufacturing and inventory" } },
 { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom CRM development" } },
 { "@type": "Offer", itemOffered: { "@type": "Service", name: "B2B wholesale ordering portals" } },
 { "@type": "Offer", itemOffered: { "@type": "Service", name: "Integrations with accounting software, Telegram and WhatsApp" } },
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
 return <RootDocument locale="en" jsonLd={jsonLd}>{children}</RootDocument>;
}
