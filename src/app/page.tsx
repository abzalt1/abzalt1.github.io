'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Expertise from '@/components/Expertise';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';
import Lightbox from '@/components/Lightbox';

export default function Home() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div className="bg-transparent text-black dark:text-white font-sans min-h-screen transition-colors duration-300 relative">
      <Preloader />
      <ScrollEffects />
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />

      <Header />

      <main className="relative z-10">
        <Hero />
        <Services />
        <Projects onOpenLightbox={setLightboxSrc} />
        <Expertise />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
