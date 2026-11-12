'use client';

import { useLocale } from '@/i18n/LocaleProvider';

export default function Services() {
 const services = useLocale().t.services;

 return (
 <section id="services" className="grid grid-cols-1 lg:grid-cols-3 gap-0 grid-border mb-8 scroll-mt-8 fade-in-section overflow-hidden">
 {services.map((service, index) => (
 <div
 key={index}
 className={`flex gap-4 lg:block p-6 md:p-8 lg:p-12 border-b-grid lg:border-b-0 ${index < services.length - 1 ? 'lg:border-r-grid' : ''} hover:bg-black hover:text-white :bg-white :text-black transition-colors group cursor-default`}
 >
 <i className={`${service.icon} text-3xl md:text-4xl lg:mb-6 block shrink-0 leading-none`}></i>
 <div>
 <h3 className="text-lg md:text-xl font-bold uppercase mb-2">{service.title}</h3>
 <p className="text-sm opacity-80 leading-relaxed font-medium">
 {service.description}
 </p>
 </div>
 </div>
 ))}
 </section>
 );
}
