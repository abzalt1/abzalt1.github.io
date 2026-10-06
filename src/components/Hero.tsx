'use client';

import { useEffect, useState } from 'react';
import useContactLinks from './useContactLinks';

export default function Hero() {
 const contactLinks = useContactLinks();
 const [displayText, setDisplayText] = useState('');
 const phrases = [
 "для опта",
 "для производства",
 "для ритейла",
 "для сферы услуг"
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

 return (
 <div className="grid grid-cols-1 md:grid-cols-12 gap-0 grid-border mb-8 fade-in-section overflow-hidden">
 <section className="md:col-span-8 p-10 md:p-20 border-b-grid md:border-b-0 md:border-r-grid flex flex-col justify-between">
 <div>
 <h1 className="text-3xl md:text-6xl font-bold uppercase leading-none tracking-tighter">
 Автоматизирую бизнес:<br />от сайта до ERP
 </h1>
 <p className="mt-4 md:mt-6 mb-12 text-xl md:text-3xl font-bold uppercase tracking-tighter opacity-50 min-h-[1.2em]" aria-hidden="true">
 {displayText}<span className="cursor-blink"></span>
 </p>
 <div className="space-y-6 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
 <p>
 Я был топ-менеджером и развивал собственные бренды в ритейле, поэтому смотрю на задачу глазами владельца: где теряются деньги и время. Сначала разберусь, как устроена ваша работа, и только потом предложу решение. Если хватит простого сайта или бота, не стану продавать сложную систему.
 </p>
 </div>
 </div>
 </section>

  <section className="md:col-span-4 flex flex-col bg-white">
  <a href="#contact" className="relative flex-grow p-10 md:p-16 border-b-grid md:border-b-0 flex flex-col justify-center items-center text-black group min-h-[300px] md:min-h-[auto] overflow-hidden">
  <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(/discuss-bg.png)' }} />
  <div className="absolute inset-0 bg-white/30 group-hover:bg-white/10 transition-colors duration-700" />
  <div className="relative z-10 flex flex-col items-center translate-y-4 md:translate-y-8">
    <span className="text-3xl md:text-5xl font-bold uppercase text-center mb-6 tracking-tighter">Обсудить<br/>Проект</span>
    <div className="w-16 h-16 rounded-full bg-black text-white flex justify-center items-center group-hover:scale-110 transition-transform shadow-md">
      <i className="ri-arrow-down-line text-3xl"></i>
    </div>
  </div>
  </a>

  <div className="flex border-t-grid md:border-b-grid h-24">
  <a href={contactLinks.telegram} onClick={() => window.fbq?.('track', 'Contact')} target="_blank" className="flex-1 flex justify-center items-center border-r-grid hover:bg-[#229ED9] hover:text-white transition-colors" rel="noopener noreferrer" title="Telegram">
  <i className="ri-send-plane-line text-4xl"></i>
  </a>
  <a href={contactLinks.whatsapp} onClick={() => window.fbq?.('track', 'Contact')} target="_blank" className="flex-1 flex justify-center items-center border-r-grid hover:bg-[#25D366] hover:text-white transition-colors" rel="noopener noreferrer" title="WhatsApp">
  <i className="ri-whatsapp-line text-4xl"></i>
  </a>
  <a href="https://instagram.com/abzalt1" target="_blank" className="flex-1 flex justify-center items-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-purple-600 hover:text-white transition-colors" rel="noopener noreferrer" title="Instagram">
  <i className="ri-instagram-line text-4xl"></i>
  </a>
  </div>
  </section>
  </div>
 );
}
