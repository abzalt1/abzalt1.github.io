'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
 const [displayText, setDisplayText] = useState('');
 const phrases = [
 "Бизнес-<br>ориентированный<br>разработчик",
 "Full-Stack<br>Web Developer"
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
 // Check for <br> and skip it
 if (currentPhrase.substring(charIndex, charIndex + 4) === '<br>') {
 charIndex += 4;
 } else {
 charIndex++;
 }

 if (charIndex >= currentPhrase.length) {
 charIndex = currentPhrase.length; // Ensure we don't go out of bounds
 isWaiting = true;
 setTimeout(() => {
 isDeleting = true;
 isWaiting = false;
 }, waitTime);
 }
 } else {
 // Check for <br> when deleting and skip it
 if (charIndex > 4 && currentPhrase.substring(charIndex - 4, charIndex) === '<br>') {
 charIndex -= 4;
 } else {
 charIndex--;
 }

 if (charIndex <= 0) {
 charIndex = 0;
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
 <div className="space-y-6 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mb-10">
 <p>
 Мой бэкграунд креативного директора и опыт развития собственных брендов в ритейле позволяет мне создавать не просто красивый код, а работающие бизнес-инструменты. Я говорю с вами на языке требуемых метрик и прибыли. Подберу оптимальное техническое решение (от запуска быстрого MVP до сложной кастомной Next.js архитектуры), которое решит вашу задачу без овер-инжиниринга.
 </p>
 </div>
 
 <div className="flex flex-col sm:flex-row gap-4">
 <a
 href="https://t.me/abzalt1?text=Здравствуйте!%20Хочу%20обсудить%20разработку%20проекта"
 onClick={() => window.fbq?.('track', 'Contact')}
 target="_blank"
 className="inline-flex items-center justify-center w-full sm:w-auto gap-3 md:gap-3 bg-black text-white px-8 py-4 md:px-10 md:py-5 text-base md:text-xl font-bold uppercase hover:opacity-80 transition-all duration-300 tracking-widest rounded-[8px]"
 rel="noopener noreferrer"
 >
 Telegram
 <svg className="w-5 h-5 md:w-6 md:h-6 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001l-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15l4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
 </svg>
 </a>
 <a
 href="https://wa.me/77081901222?text=Здравствуйте!%20Хочу%20обсудить%20разработку%20проекта"
 onClick={() => window.fbq?.('track', 'Contact')}
 target="_blank"
 className="inline-flex items-center justify-center w-full sm:w-auto gap-3 md:gap-3 bg-[#25D366] text-white px-8 py-4 md:px-10 md:py-5 text-base md:text-xl font-bold uppercase hover:opacity-80 transition-all duration-300 tracking-widest rounded-[8px]"
 rel="noopener noreferrer"
 >
 WhatsApp
 <i className="ri-whatsapp-line text-2xl md:text-3xl shrink-0"></i>
 </a>
 </div>
 </div>
 </section>

 <section className="md:col-span-4 flex flex-col">
 <div className="p-10 md:p-16 border-b-grid flex justify-center items-center bg-white ">
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
 <a href="https://t.me/abzalt1?text=Здравствуйте!%20Хочу%20обсудить%20разработку%20проекта" onClick={() => window.fbq?.('track', 'Contact')} target="_blank" className="arrow-link flex-1 flex items-center justify-between p-6 text-xl font-bold uppercase border-b-grid hover:bg-black hover:text-white :bg-white :text-black transition-colors group" rel="noopener noreferrer">
 <span>Telegram</span>
 <i className="ri-arrow-right-up-line arrow-icon transition-transform"></i>
 </a>
 <a href="https://wa.me/77081901222?text=Здравствуйте!%20Хочу%20обсудить%20разработку%20проекта" onClick={() => window.fbq?.('track', 'Contact')} target="_blank" className="arrow-link flex-1 flex items-center justify-between p-6 text-xl font-bold uppercase border-b-grid hover:bg-black hover:text-white :bg-white :text-black transition-colors group" rel="noopener noreferrer">
 <span>WhatsApp</span>
 <i className="ri-arrow-right-up-line arrow-icon transition-transform"></i>
 </a>
 <a href="https://instagram.com/abzalt1" onClick={() => window.fbq?.('track', 'Contact')} target="_blank" className="arrow-link flex-1 flex items-center justify-between p-6 text-xl font-bold uppercase hover:bg-black hover:text-white :bg-white :text-black transition-colors group" rel="noopener noreferrer">
 <span>Instagram</span>
 <i className="ri-arrow-right-up-line arrow-icon transition-transform"></i>
 </a>
 </div>
 </section>
 </div>
 );
}
