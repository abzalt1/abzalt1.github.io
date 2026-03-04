'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex justify-between items-center text-xs font-bold uppercase tracking-wider opacity-60 relative z-10">
            <p>© <span>{currentYear}</span> <a href="#" className="hover-underline-animation">abzalt1.dev</a></p>
            <a href="#" className="hover-underline-animation">Architectural Web Design</a>
        </footer>
    );
}
