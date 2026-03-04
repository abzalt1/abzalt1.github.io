'use client';

import { useEffect, useState } from 'react';

export default function ScrollEffects() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Progress Bar
            if (docHeight > 0) {
                setScrollProgress((scrollY / docHeight) * 100);
            }

            // Back to Top Visibility
            setShowBackToTop(scrollY > 300);

            // Gradient Background Movement
            const gradientBg = document.getElementById('gradient-bg');
            if (gradientBg && docHeight > 0) {
                const pos = (scrollY / docHeight) * 100;
                gradientBg.style.backgroundPosition = `${pos}% ${pos}%`;
            }
        };

        // Fade-in Animation Logic
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter(entry => entry.isIntersecting);
            visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            visibleEntries.forEach((entry, index) => {
                observer.unobserve(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 200);
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-section').forEach(section => {
            observer.observe(section);
        });

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <div
                id="scroll-progress"
                className="fixed top-0 left-0 h-1 bg-black dark:bg-white z-50 transition-[width] duration-75 ease-out"
                style={{ width: `${scrollProgress}%` }}
            ></div>

            {/* Gradient Background */}
            <div
                id="gradient-bg"
                className="fixed inset-0 z-[-1] bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-white via-gray-100 to-white dark:hidden transition-[background-position] duration-100 ease-out"
                style={{ backgroundSize: '400% 400%' }}
            ></div>

            {/* Back to Top Button */}
            <button
                id="back-to-top"
                onClick={scrollToTop}
                className={`fixed bottom-10 right-10 md:bottom-16 md:right-16 bg-black text-white dark:bg-white dark:text-black p-4 shadow-2xl transition-all duration-300 z-50 hover:scale-110 active:scale-90 flex items-center justify-center ${showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                aria-label="Наверх"
            >
                <i className="ri-arrow-up-line text-2xl"></i>
            </button>
        </>
    );
}
