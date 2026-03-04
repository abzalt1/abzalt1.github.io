'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
    const [displayText, setDisplayText] = useState('');
    const phrases = [
        "Бизнес-<br>ориентированный<br>разработчик",
        "Frontend Developer<br>& Low-code Expert"
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
        return displayText.split('<br>').map((line, i) => (
            <span key={i} className="block">
                {line}
            </span>
        ));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 grid-border mb-8 fade-in-section overflow-hidden">
            <section className="md:col-span-8 p-10 md:p-20 border-b-grid md:border-b-0 md:border-r-grid flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl md:text-6xl font-bold uppercase mb-12 leading-none tracking-tighter min-h-[110px] md:min-h-[220px] flex flex-col justify-start">
                        {renderDisplayText()}
                    </h2>
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
                        <p>
                            Мне 32 года. До перехода в разработку я работал в рознице, развивал бренд одежды и работал в сети оптик креативным директором. Я буду разработчиком, который поймёт ваш язык бизнеса и не будет усложнять процесс разработки сайта, основная цель которого - приносить прибыль.
                        </p>
                    </div>
                </div>
                <div className="mt-12 pt-6 border-t-grid">
                    <p className="text-base font-bold uppercase tracking-wider mb-2">Визуальный подход</p>
                    <p className="text-lg leading-snug">
                        Большая насмотренность в брендинге. Понимаю бренд-код, делаю визуально чисто, строго и правильно.
                    </p>
                </div>
            </section>

            <section className="md:col-span-4 flex flex-col">
                <div className="p-10 md:p-16 border-b-grid flex justify-center items-center bg-white dark:bg-black">
                    <div className="w-56 h-56 md:w-80 md:h-80 overflow-hidden relative shadow-xl">
                        <Image
                            src="/me.jpg"
                            alt="Abzal Photo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="flex-grow flex flex-col">
                    <a href="https://t.me/abzalt1" target="_blank" className="arrow-link flex-1 flex items-center justify-between p-6 text-xl font-bold uppercase border-b-grid hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group" rel="noopener noreferrer">
                        <span>Telegram</span>
                        <i className="ri-arrow-right-up-line arrow-icon transition-transform"></i>
                    </a>
                    <a href="https://wa.me/77081901222" target="_blank" className="arrow-link flex-1 flex items-center justify-between p-6 text-xl font-bold uppercase border-b-grid hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group" rel="noopener noreferrer">
                        <span>WhatsApp</span>
                        <i className="ri-arrow-right-up-line arrow-icon transition-transform"></i>
                    </a>
                    <a href="https://instagram.com/abzalt1" target="_blank" className="arrow-link flex-1 flex items-center justify-between p-6 text-xl font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group" rel="noopener noreferrer">
                        <span>Instagram</span>
                        <i className="ri-arrow-right-up-line arrow-icon transition-transform"></i>
                    </a>
                </div>
            </section>
        </div>
    );
}
