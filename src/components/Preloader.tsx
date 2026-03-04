'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
    const [text, setText] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const fullText = "abzalt1.dev";

    useEffect(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < fullText.length) {
                setText(fullText.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typeInterval);

                // Wait for page load if needed, but for Next.js 
                // we can just fade out after animation
                setTimeout(() => {
                    setIsVisible(false);
                }, 800);
            }
        }, 100);

        return () => clearInterval(typeInterval);
    }, []);

    if (!isVisible && text === fullText) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-white dark:bg-black flex justify-center items-center transition-opacity duration-500 ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-black dark:text-white">
                <span>{text}</span><span className="cursor-blink"></span>
            </div>
        </div>
    );
}
