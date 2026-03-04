'use client';

import { useEffect, useState, useRef } from 'react';

export default function Header() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
        setTheme(initialTheme);
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > lastScrollY.current && scrollY > 80) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            lastScrollY.current = scrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const navLinks = [
        { href: '#services', label: 'Услуги' },
        { href: '#projects', label: 'Проекты' },
        { href: '#expertise', label: 'Навыки' },
        { href: '#contact', label: 'Контакт' },
    ];

    return (
        <>
            <header
                id="main-header"
                className={`sticky top-0 z-40 bg-white dark:bg-black transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tighter lowercase leading-none cursor-default">
                        abzalt1.dev
                    </h1>
                    <div className="flex gap-6 md:gap-8 text-xs md:text-sm font-semibold uppercase tracking-widest items-center">
                        <nav className="hidden md:flex gap-8">
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} className="hover:opacity-50 transition-opacity">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <button
                            onClick={toggleTheme}
                            className="hover:opacity-50 transition-opacity p-1"
                            aria-label="Toggle theme"
                        >
                            <i className={theme === 'dark' ? 'ri-sun-line text-lg' : 'ri-moon-line text-lg'}></i>
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden hover:opacity-50 transition-opacity p-1"
                            aria-label="Open menu"
                        >
                            <i className="ri-menu-line text-lg"></i>
                        </button>
                    </div>
                </div>
                <hr className="swiss-divider" />
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white dark:bg-black z-[60] flex flex-col justify-center items-center gap-8 text-2xl font-bold uppercase transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 right-4 p-4 hover:opacity-50 transition-opacity"
                    aria-label="Close menu"
                >
                    <i className="ri-close-line text-4xl"></i>
                </button>
                {navLinks.map(link => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="hover:opacity-50 transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </>
    );
}
