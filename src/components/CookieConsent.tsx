'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';

const CONSENT_KEY = 'cookie_consent';

export default function CookieConsent() {
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  // Opt-out model: analytics load by default unless the visitor has declined.
  // The banner only informs and offers a way to decline.
  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === 'denied') {
      setConsent('denied');
    } else {
      setConsent('granted');
      if (stored !== 'granted') setShowBanner(true);
    }
  }, []);

  const choose = (value: 'granted' | 'denied') => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setShowBanner(false);
    if (value === 'denied') {
      // Scripts are already running on this page; stop the pixel now
      // and reload so Metrica is not initialised either.
      window.fbq?.('consent', 'revoke');
      window.location.reload();
    }
  };

  return (
    <>
      {consent === 'granted' && (
        <>
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
              <img src="https://mc.yandex.ru/watch/110617911" style={{ position: 'absolute', left: '-9999px' }} alt="" />
            </div>
          </noscript>
        </>
      )}

      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black text-white p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm md:text-base">
          <p className="opacity-90 leading-relaxed max-w-3xl">
            Мы используем файлы cookie и сервисы аналитики (Meta Pixel, Yandex Metrica) для улучшения работы сайта и рекламы. Подробнее в{' '}
            <Link href="/privacy" className="underline hover:opacity-70">Политике конфиденциальности</Link>.
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => choose('denied')}
              className="px-5 py-2.5 border border-white/40 uppercase font-bold text-xs tracking-widest hover:bg-white/10 transition-colors rounded"
            >
              Отклонить
            </button>
            <button
              onClick={() => choose('granted')}
              className="px-5 py-2.5 bg-white text-black uppercase font-bold text-xs tracking-widest hover:opacity-80 transition-opacity rounded"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
}
