'use client';

export default function Services() {
 const services = [
 {
 icon: 'ri-braces-line',
 title: 'Full-Stack Web Apps',
 description: 'Разработка масштабируемых B2B/B2C порталов, CRM-систем и дашбордов. Современный стек на Next.js, надежные базы данных (Supabase) и полная свобода логики.'
 },
 {
 icon: 'ri-exchange-line',
 title: 'Автоматизация & API',
 description: 'Глубокие интеграции с 1С, складскими системами, платежными шлюзами и мессенджерами (Telegram, WhatsApp). Связываю ИТ-инфраструктуру бизнеса воедино.'
 },
 {
 icon: 'ri-layout-masonry-line',
 title: 'No/Low-Code MVP',
 description: 'Сборка эстетичных промо-страниц и быстрых MVP на Tilda или Webflow. Идеальный вариант для проверки бизнес-гипотез без овер-инжиниринга.'
 }
 ];

 return (
 <section id="services" className="grid grid-cols-1 md:grid-cols-3 gap-0 grid-border mb-8 text-center md:text-left scroll-mt-8 fade-in-section overflow-hidden">
 {services.map((service, index) => (
 <div
 key={index}
 className={`p-10 md:p-16 border-b-grid md:border-b-0 ${index < services.length - 1 ? 'md:border-r-grid' : ''} hover:bg-black hover:text-white :bg-white :text-black transition-colors group cursor-default`}
 >
 <i className={`${service.icon} text-4xl mb-6 block`}></i>
 <h3 className="text-xl font-bold uppercase mb-2">{service.title}</h3>
 <p className="text-sm opacity-80 leading-relaxed font-medium">
 {service.description}
 </p>
 </div>
 ))}
 </section>
 );
}
