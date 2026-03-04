'use client';

import { useEffect, useState, useRef } from 'react';

export default function Header() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFloating, setIsFloating] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);
    const [currentDate, setCurrentDate] = useState('Загрузка...');

    useEffect(() => {
        // Theme initialization
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
        setTheme(initialTheme);

        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Date initialization
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
        setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
    }, []);

    useEffect(() => {
        // Scroll handling
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Smart Header Hide/Show
            if (scrollY > lastScrollY.current && scrollY > 50) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            // Floating effect
            setIsFloating(scrollY > 50);
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
    ];

    return (
        <>
            <header
                id="main-header"
                className={`sticky top-0 z-40 bg-white dark:bg-black transition-all duration-300 w-full
          ${isFloating ? 'floating-header py-4' : 'pb-6 -mt-[6px] pt-[6px] md:-mt-[12px] md:pt-[12px] border-b border-black dark:border-white'} 
          ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
            >
                <div className="flex justify-between items-center px-6 md:px-10">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter lowercase leading-none cursor-default">
                        abzalt1.dev
                    </h1>
                    <div className="flex gap-4 md:gap-10 text-sm md:text-lg font-semibold uppercase tracking-widest items-center">
                        <nav className="hidden md:flex gap-8">
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} className="hover:opacity-60 transition-opacity">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <span className="hidden sm:inline">Almaty, KZ</span>
                        <span id="date-tag" className="hidden sm:inline text-black dark:text-white font-bold">{currentDate}</span>
                        <button
                            onClick={toggleTheme}
                            className="hover:opacity-60 transition-opacity p-2"
                            aria-label="Toggle theme"
                        >
                            <i className={theme === 'dark' ? 'ri-sun-line text-lg md:text-xl' : 'ri-moon-line text-lg md:text-xl'}></i>
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden hover:opacity-60 transition-opacity p-2"
                            aria-label="Open menu"
                        >
                            <i className="ri-menu-line text-lg"></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white dark:bg-black z-[60] flex flex-col justify-center items-center gap-8 text-2xl font-bold uppercase transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 right-4 p-4 hover:opacity-60 transition-opacity"
                    aria-label="Close menu"
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
