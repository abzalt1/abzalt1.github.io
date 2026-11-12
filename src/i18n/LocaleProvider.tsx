'use client';

import { createContext, useContext } from 'react';
import { dicts, basePath, type Locale } from './dict';

const LocaleContext = createContext<Locale>('ru');

export default function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const locale = useContext(LocaleContext);
  return { locale, t: dicts[locale], base: basePath(locale) };
}
