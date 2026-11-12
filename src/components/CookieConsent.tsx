'use client';

import { useState, useSyncExternalStore } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';

const CONSENT_KEY = 'cookie_consent';

// localStorage is read only in the browser; during the static build the stored choice is unknown (undefined).
const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
};
const getStoredConsent = () => window.localStorage.getItem(CONSENT_KEY);
const getServerConsent = () => undefined;

export default function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getStoredConsent, getServerConsent);
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null);
  const { locale, t, base } = useLocale();
  // Russian pages: opt-out, analytics load unless the visitor declined; the banner informs and offers a way out.
  // English pages target EU visitors, so it's opt-in (GDPR): nothing loads until the visitor accepts,
  // and Yandex Metrica isn't used there at all.
  const optIn = locale === 'en';
  const decided = choice ?? (stored === 'granted' || stored === 'denied' ? stored : null);
  const consent = stored === undefined ? null : decided ?? (optIn ? null : 'granted');
  const showBanner = stored !== undefined && decided === null;

  const choose = (value: 'granted' | 'denied') => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
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
              fbq('init', '2194105985318804');
              fbq('track', 'PageView');
            `}
          </Script>
          {!optIn && (<>
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
          </>)}
        </>
      )}

      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black text-white p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm md:text-base">
          <p className="opacity-90 leading-relaxed max-w-3xl">
            {t.cookie.text}{' '}
            <Link href={`${base}/privacy`} className="underline hover:opacity-70">{t.cookie.privacyLink}</Link>.
          </p>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => choose('denied')}
              className="px-5 py-2.5 border border-white/40 uppercase font-bold text-xs tracking-widest hover:bg-white/10 transition-colors rounded-full"
            >
              {t.cookie.decline}
            </button>
            <button
              onClick={() => choose('granted')}
              className="px-5 py-2.5 bg-white text-black uppercase font-bold text-xs tracking-widest hover:opacity-80 transition-opacity rounded-full"
            >
              {t.cookie.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
