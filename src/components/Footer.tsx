'use client';

export default function Footer() {
 const currentYear = new Date().getFullYear();

 return (
 <footer className="flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-wider opacity-60 relative z-10 px-6 md:px-20 py-16 gap-4 md:gap-0">
 <p>© <span>{currentYear}</span> <a href="#" className="hover-underline-animation">abzalt1.dev</a></p>
 <a href="/privacy" className="hover-underline-animation">Privacy Policy</a>
 <a href="#" className="hover-underline-animation">Architectural Web Design</a>
 </footer>
 );
}
