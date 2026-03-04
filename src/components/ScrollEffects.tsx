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
        };

        // Fade-in Animation Logic
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter(entry => entry.isIntersecting);
            visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            visibleEntries.forEach((entry, index) => {
                observer.unobserve(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 150);
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
                className="fixed top-0 left-0 h-[2px] bg-black dark:bg-white z-50 transition-[width] duration-75 ease-out"
                style={{ width: `${scrollProgress}%` }}
            ></div>

            {/* Back to Top Button */}
            <button
                id="back-to-top"
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-black text-white dark:bg-white dark:text-black p-3 transition-all duration-300 z-50 ${showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                aria-label="Наверх"
            >
                <i className="ri-arrow-up-line text-xl"></i>
            </button>
        </>
    );
}
