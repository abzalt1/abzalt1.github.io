'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
    const [displayText, setDisplayText] = useState('');
    const phrases = [
        "Бизнес-\nориентированный\nразработчик",
        "Frontend Developer\n& Low-code Expert"
    ];

    useEffect(() => {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;
        const typeSpeed = 50;
        const deleteSpeed = 30;
        const waitTime = 5000;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            if (!isWaiting) {
                if (!isDeleting) {
                    charIndex++;
                    if (charIndex === currentPhrase.length + 1) {
                        isWaiting = true;
                        setTimeout(() => {
                            isDeleting = true;
                            isWaiting = false;
                        }, waitTime);
                    }
                } else {
                    charIndex--;
                    if (charIndex === 0) {
                        isDeleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                    }
                }
                setDisplayText(currentPhrase.substring(0, charIndex));
            }
        };

        const interval = setInterval(type, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearInterval(interval);
    }, []);

    const renderDisplayText = () => {
        return displayText.split('\n').map((line, i) => (
            <span key={i} className="block">
                {line}
            </span>
        ));
    };

    return (
        <section className="fade-in-section">
            {/* Full-width hero photo */}
            <div className="w-full aspect-[21/9] md:aspect-[3/1] relative overflow-hidden">
                <Image
                    src="/me.jpg"
                    alt="Abzal — Developer"
                    fill
                    className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                />
            </div>

            {/* Content area */}
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                {/* Massive heading */}
                <div className="pt-12 md:pt-20 pb-10 md:pb-16">
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.9] tracking-tighter min-h-[120px] md:min-h-[260px]">
                        {renderDisplayText()}
                    </h2>
                </div>

                <hr className="swiss-divider" />

                {/* Two-column text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-10 md:py-16">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-50">Обо мне</p>
                        <p className="text-base md:text-lg leading-relaxed">
                            Мне 32 года. До перехода в разработку я работал в рознице, развивал бренд одежды и работал в сети оптик креативным директором. Я буду разработчиком, который поймёт ваш язык бизнеса и не будет усложнять процесс разработки сайта, основная цель которого — приносить прибыль.
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-50">Визуальный подход</p>
                        <p className="text-base md:text-lg leading-relaxed">
                            Большая насмотренность в брендинге. Понимаю бренд-код, делаю визуально чисто, строго и правильно. Каждый проект — это решение бизнес-задачи, а не просто красивая картинка.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
