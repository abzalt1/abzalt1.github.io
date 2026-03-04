'use client';

import { useEffect, useState, useRef } from 'react';

export default function Contact() {
    const [displayText, setDisplayText] = useState('');
    const [hasStarted, setHasStarted] = useState(false);
    const phrase = "Есть проект?";
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            });
        }, { threshold: 0.5 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let charIndex = 0;
        const interval = setInterval(() => {
            if (charIndex < phrase.length) {
                setDisplayText(phrase.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [hasStarted]);

    const handleTelegramClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const btn = e.currentTarget;
        const originalContent = btn.innerHTML;

        try {
            await navigator.clipboard.writeText('@abzalt1');
            btn.innerHTML = 'Никнейм скопирован <i class="ri-check-line"></i>';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                window.open('https://t.me/abzalt1', '_blank');
            }, 1200);
        } catch {
            window.open('https://t.me/abzalt1', '_blank');
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-32 fade-in-section"
        >
            <hr className="swiss-divider mb-16 md:mb-20" />

            <div className="text-center max-w-3xl mx-auto">
                {/* Quote-style heading */}
                <p className="text-2xl md:text-3xl font-light mb-3 opacity-40">"</p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-6">
                    <span>{displayText}</span>
                    <span className="cursor-blink"></span>
                </h2>
                <p className="text-base md:text-lg opacity-50 font-medium mb-10 max-w-xl mx-auto">
                    Самый быстрый способ обсудить детали — написать мне напрямую в Telegram.
                </p>
                <a
                    href="https://t.me/abzalt1"
                    onClick={handleTelegramClick}
                    className="inline-flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black px-8 py-4 md:px-12 md:py-5 text-sm md:text-base font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                    rel="noopener noreferrer"
                >
                    Написать в Telegram
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15l4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
