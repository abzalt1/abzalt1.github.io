'use client';

import { useState } from 'react';
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
 const [lightboxData, setLightboxData] = useState<{images: string[], index: number} | null>(null);

 return (
 <div className="bg-transparent text-black font-sans min-h-screen transition-colors duration-300 relative">
 <ScrollEffects />
 <Lightbox data={lightboxData} onClose={() => setLightboxData(null)} />

 <Header />

 <main className="mb-20 relative z-10 px-4 md:px-6 pt-4 md:pt-6">
 <Hero />
 <Services />
 <Projects onOpenLightbox={(images, index) => setLightboxData({images, index})} />
 <Expertise />
 <Contact />
 </main>

 <Footer />
 </div>
 );
}
