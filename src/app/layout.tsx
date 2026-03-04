import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "abzalt1.dev | Business-Oriented Developer",
  description: "Разработка сайтов для бизнеса. Tilda, Webflow, Custom Frontend. Визуально чисто, технически грамотно.",
  openGraph: {
    title: "abzalt1.dev | Business-Oriented Developer",
    description: "Разработка сайтов, которые приносят прибыль.",
    url: "https://abzalt1.github.io/",
    siteName: "abzalt1.dev",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "https://abzalt1.github.io/me.jpg" }],
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
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${interTight.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
