'use client';

export default function Footer() {
 const currentYear = new Date().getFullYear();

 return (
 <footer className="flex flex-wrap justify-center md:justify-between items-center text-xs font-bold uppercase tracking-wider opacity-60 relative z-10 px-4 md:px-12 pt-2 pb-6 gap-x-6 gap-y-1">
 <p>© <span>{currentYear}</span> <a href="#" className="hover-underline-animation">abzalt1.dev</a></p>
 <a href="/privacy" className="hover-underline-animation">Политика конфиденциальности</a>
 <p>Алматы, Казахстан</p>
 </footer>
 );
}
