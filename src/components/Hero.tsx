'use client';

import { useEffect, useState } from 'react';

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
 <div className="space-y-6 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
 <p>
 Мой бэкграунд креативного директора и опыт развития собственных брендов в ритейле позволяет мне создавать не просто красивый код, а работающие бизнес-инструменты. Я говорю с вами на языке требуемых метрик и прибыли. Подберу оптимальное техническое решение (от запуска быстрого MVP до сложной кастомной Next.js архитектуры), которое решит вашу задачу без овер-инжиниринга.
 </p>
 </div>
 </div>
 </section>

  <section className="md:col-span-4 flex flex-col bg-white">
  <a href="#contact" className="flex-grow p-10 md:p-16 border-b-grid md:border-b-0 flex flex-col justify-center items-center bg-black text-white hover:bg-neutral-800 transition-colors group min-h-[300px] md:min-h-[auto]">
  <span className="text-3xl md:text-5xl font-bold uppercase text-center mb-6 tracking-tighter">Обсудить<br/>Проект</span>
  <div className="w-16 h-16 rounded-full bg-white text-black flex justify-center items-center group-hover:scale-110 transition-transform">
  <i className="ri-arrow-down-line text-3xl"></i>
  </div>
  </a>

  <div className="flex border-t-grid md:border-b-grid h-24">
  <a href="https://t.me/abzalt1?text=Здравствуйте!%20Хочу%20обсудить%20разработку%20проекта" onClick={() => window.fbq?.('track', 'Contact')} target="_blank" className="flex-1 flex justify-center items-center border-r-grid hover:bg-black hover:text-white transition-colors" rel="noopener noreferrer" title="Telegram">
  <i className="ri-telegram-fill text-4xl"></i>
  </a>
  <a href="https://wa.me/77081901222?text=Здравствуйте!%20Хочу%20обсудить%20разработку%20проекта" onClick={() => window.fbq?.('track', 'Contact')} target="_blank" className="flex-1 flex justify-center items-center border-r-grid hover:bg-[#25D366] hover:text-white transition-colors" rel="noopener noreferrer" title="WhatsApp">
  <i className="ri-whatsapp-line text-4xl"></i>
  </a>
  <a href="https://instagram.com/abzalt1" onClick={() => window.fbq?.('track', 'Contact')} target="_blank" className="flex-1 flex justify-center items-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-purple-600 hover:text-white transition-colors" rel="noopener noreferrer" title="Instagram">
  <i className="ri-instagram-line text-4xl"></i>
  </a>
  </div>
  </section>
  </div>
 );
}
