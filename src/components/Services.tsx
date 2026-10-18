'use client';

export default function Services() {
 const services = [
 {
 icon: 'ri-dashboard-line',
 title: 'CRM и ERP под ваш процесс',
 description: 'Заказы, склад, производство и деньги в одной системе. Владелец видит выручку, себестоимость и маржу в реальном времени.'
 },
 {
 icon: 'ri-shopping-cart-2-line',
 title: 'Приём оптовых заказов',
 description: 'Клиенты заказывают через личный кабинет, а не в WhatsApp. Дедлайны, история заказов и накладные — автоматически.'
 },
 {
 icon: 'ri-exchange-line',
 title: 'Интеграции с 1С и мессенджерами',
 description: 'Связываю систему с 1С, WhatsApp и Telegram, чтобы данные не вводили дважды.'
 }
 ];

 return (
 <section id="services" className="grid grid-cols-1 md:grid-cols-3 gap-0 grid-border mb-8 scroll-mt-8 fade-in-section overflow-hidden">
 {services.map((service, index) => (
 <div
 key={index}
 className={`flex gap-4 md:block p-6 md:p-8 lg:p-12 border-b-grid md:border-b-0 ${index < services.length - 1 ? 'md:border-r-grid' : ''} hover:bg-black hover:text-white :bg-white :text-black transition-colors group cursor-default`}
 >
 <i className={`${service.icon} text-3xl md:text-4xl md:mb-6 block shrink-0 leading-none`}></i>
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
