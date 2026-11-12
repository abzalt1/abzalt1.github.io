'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useContactLinks from './useContactLinks';
import { useLocale } from '@/i18n/LocaleProvider';
import { getProject } from '@/data/projects';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [isFloating, setIsFloating] = useState(false);
 const [isHidden, setIsHidden] = useState(false);
 const lastScrollY = useRef(0);
 const contactLinks = useContactLinks();
 const { locale, t, base } = useLocale();
 const pathname = usePathname() || '/';

 useEffect(() => {
 // Scroll handling
 const handleScroll = () => {
 const scrollY = window.scrollY;
 const delta = scrollY - lastScrollY.current;

 // Smart Header Hide/Show: ignore tiny jitters (trackpad inertia, iOS bounce)
 if (scrollY <= 50) {
 setIsHidden(false);
 lastScrollY.current = scrollY;
 } else if (Math.abs(delta) > 8) {
 setIsHidden(delta > 0);
 lastScrollY.current = scrollY;
 }

 // Floating effect
 setIsFloating(scrollY > 50);
 };

 window.addEventListener('scroll', handleScroll, { passive: true });
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 // `${base}#…` rather than `${base}/#…`: on GitHub Pages /en is en.html, while /en/ would 404.
 const home = base || '/';
 const navLinks = [
 { href: `${home}#services`, label: t.nav.services },
 { href: `${home}#projects`, label: t.nav.projects },
 { href: `${home}#process`, label: t.nav.process },
 ];

 // Same page in the other language; a case hidden there falls back to that language's homepage.
 const otherLocale = locale === 'en' ? 'ru' : 'en';
 const ruPath = locale === 'en' ? (pathname.replace(/^\/en(?=\/|$)/, '') || '/') : pathname;
 const slug = ruPath.match(/^\/projects\/([^/]+)/)?.[1];
 const targetRuPath = slug && !getProject(slug, otherLocale) ? '/' : ruPath;
 const switchHref = otherLocale === 'en' ? (targetRuPath === '/' ? '/en' : `/en${targetRuPath}`) : targetRuPath;

 return (
 <>
 {/* Reserves the unshrunk header height so shrinking the fixed header doesn't shift the page */}
 <div aria-hidden="true" className="py-6 md:py-8 border-b border-transparent">
 <div className="h-11 md:h-12"></div>
 </div>
 <header
 id="main-header"
 className={`fixed top-0 inset-x-0 z-40 bg-white transition-[padding,transform,background-color] duration-300
 ${isFloating ? 'floating-header py-4' : 'py-6 md:py-8 border-b-grid '} 
 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
 >
 <div className="flex justify-between items-center gap-6 px-6 md:px-10">
 <Link href={home} className="text-4xl md:text-5xl font-bold tracking-tighter lowercase leading-none">
 abzalt1.dev
 </Link>
 <div className="flex gap-4 md:gap-10 text-sm md:text-lg font-semibold uppercase tracking-widest items-center">
 <nav className="hidden lg:flex gap-8">
 {navLinks.map(link => (
 <a key={link.href} href={link.href} className="hover:opacity-60 transition-opacity">
 {link.label}
 </a>
 ))}
 </nav>
 <a href={switchHref} hrefLang={otherLocale} aria-label={t.switcher.aria} className="hover:opacity-60 transition-opacity">
 {t.switcher.label}
 </a>
 <a
 href={contactLinks.telegram}
 onClick={() => window.fbq?.('track', 'Contact')}
 target="_blank"
 rel="noopener noreferrer"
 className="hidden sm:inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest whitespace-nowrap hover:opacity-80 transition-opacity"
 >
 {t.nav.write} <i className="ri-send-plane-line"></i>
 </a>

 <button
 onClick={() => setIsMenuOpen(true)}
 className="lg:hidden hover:opacity-60 transition-opacity p-2"
 aria-label={t.nav.openMenu}
 >
 <i className="ri-menu-line text-lg"></i>
 </button>
 </div>
 </div>
 </header>

 {/* Mobile Menu Overlay */}
 <div
 className={`fixed inset-0 bg-white z-[60] flex flex-col justify-center items-center gap-8 text-2xl font-bold uppercase transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
 >
 <button
 onClick={() => setIsMenuOpen(false)}
 className="absolute top-4 right-4 p-4 hover:opacity-60 transition-opacity"
 aria-label={t.nav.closeMenu}
 >
 <i className="ri-close-line text-4xl"></i>
 </button>
 {navLinks.map(link => (
 <a
 key={link.href}
 href={link.href}
 className="mobile-link hover:opacity-60 transition-opacity"
 onClick={() => setIsMenuOpen(false)}
 >
 {link.label}
 </a>
 ))}
 </div>
 </>
 );
}
