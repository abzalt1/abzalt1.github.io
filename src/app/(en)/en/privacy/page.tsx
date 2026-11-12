import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy | abzalt1.dev',
  alternates: { canonical: '/en/privacy', languages: { ru: '/privacy', en: '/en/privacy' } },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-transparent text-black font-sans min-h-screen transition-colors duration-300 relative">
      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-16 md:pt-16">
        <div className="mb-12">
          <Link href="/en" className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:opacity-70 transition-opacity">
            <i className="ri-arrow-left-line"></i> Back to home
          </Link>
        </div>

        <h1 className="text-xl min-[360px]:text-2xl min-[440px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-12 tracking-tighter break-words">Privacy policy</h1>
        
        <div className="space-y-8 text-lg font-medium opacity-80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">1. General</h2>
            <p>
              This privacy policy explains how personal data is processed and protected on abzalt1.dev (the “Operator”).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">2. What data is collected</h2>
            <p>
              If you give consent, the following data may be collected through Meta Pixel on the English pages (the Russian pages also use Yandex Metrica):
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Your IP address;</li>
              <li>Browser type and operating system;</li>
              <li>Actions on the site (clicks on messenger buttons, page views);</li>
              <li>Cookies.</li>
            </ul>
            <p className="mt-4">
              Your name, phone number or other identifying data are not collected directly unless you share them yourself when contacting me via a messenger.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">3. Why the data is processed</h2>
            <p>
              The collected anonymised data is used only to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Improve the site and its content;</li>
              <li>Analyse traffic;</li>
              <li>Optimise targeted advertising (retargeting).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">4. Cookies and pixels</h2>
            <p>
              On the English pages, cookies and Meta Pixel load only after you click “Accept” in the banner shown on your first visit. If you decline or ignore the banner, no analytics or advertising scripts are loaded. You can change your choice at any time by clearing this site’s data (localStorage) in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">5. Contact</h2>
            <p>
              For any questions about how your personal data is processed, contact the Operator on Telegram: <strong>@abzalt1</strong> or WhatsApp.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
