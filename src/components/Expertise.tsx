'use client';

import { useLocale } from '@/i18n/LocaleProvider';

export default function Expertise() {
 const { t } = useLocale();
 const steps = t.process.steps;

 // Grid lines: a column on phones, 2×2 on tablets, one row of four on desktops
 const cellBorders = [
 'border-b-grid lg:border-b-0 md:border-r-grid',
 'border-b-grid lg:border-b-0 lg:border-r-grid',
 'border-b-grid md:border-b-0 md:border-r-grid',
 '',
 ];

 return (
 <section id="process" className="grid-border bg-white mb-8 scroll-mt-8 fade-in-section overflow-hidden">
 <h2 className="p-6 md:p-10 lg:p-12 text-3xl md:text-5xl font-bold uppercase tracking-tighter border-b-grid">{t.process.title}</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
 {steps.map((step, index) => (
 <div
 key={index}
 className={`p-6 md:p-10 ${cellBorders[index]}`}
 >
 <span className="block text-sm font-bold tracking-widest opacity-50 mb-3 md:mb-6">{String(index + 1).padStart(2, '0')}</span>
 <h3 className="text-xl font-bold uppercase mb-3">{step.title}</h3>
 <p className="text-base opacity-80 leading-relaxed font-medium">{step.description}</p>
 </div>
 ))}
 </div>
 </section>
 );
}
