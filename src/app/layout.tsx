import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
 <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
 </head>
 <body
 className={`${interTight.variable} font-sans antialiased`}
 >
 <Script id="meta-pixel" strategy="afterInteractive">
 {`
 !function(f,b,e,v,n,t,s)
 {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
 n.callMethod.apply(n,arguments):n.queue.push(arguments)};
 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
 n.queue=[];t=b.createElement(e);t.async=!0;
 t.src=v;s=b.getElementsByTagName(e)[0];
 s.parentNode.insertBefore(t,s)}(window, document,'script',
 'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '2281883288885583');
 fbq('track', 'PageView');
 `}
 </Script>
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110617911', 'ym');

            ym(110617911, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
 <noscript>
   <div>
     <img src="https://mc.yandex.ru/watch/110617911" style={{ position: "absolute", left: "-9999px" }} alt="" />
   </div>
 </noscript>
 {children}
 </body>
 </html>
 );
}
