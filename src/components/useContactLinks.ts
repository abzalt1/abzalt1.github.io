'use client';

import { useEffect, useState } from 'react';

const AD_FLAG_KEY = 'from_ad';

const DEFAULT_TEXT = 'Здравствуйте! Хочу обсудить разработку проекта';
// Visitors from ads get a distinct message so their chats can be told apart from organic ones.
const AD_TEXT = 'Здравствуйте! Пишу по рекламе приложения, хочу узнать подробнее';

const buildLinks = (text: string) => {
  const encoded = encodeURIComponent(text);
  return {
    telegram: `https://t.me/abzalt1?text=${encoded}`,
    whatsapp: `https://wa.me/77081901222?text=${encoded}`,
  };
};

export default function useContactLinks() {
  const [links, setLinks] = useState(() => buildLinks(DEFAULT_TEXT));

  useEffect(() => {
    let fromAd = false;
    try {
      const params = new URLSearchParams(window.location.search);
      // Meta appends fbclid to ad clicks; utm_source covers manually tagged links.
      if (params.has('fbclid') || params.has('utm_source')) {
        window.sessionStorage.setItem(AD_FLAG_KEY, '1');
      }
      fromAd = window.sessionStorage.getItem(AD_FLAG_KEY) === '1';
    } catch {
      // Storage can be unavailable (private mode, in-app browsers); fall back to the URL only.
      fromAd = /[?&](fbclid|utm_source)=/.test(window.location.search);
    }
    if (fromAd) setLinks(buildLinks(AD_TEXT));
  }, []);

  return links;
}
