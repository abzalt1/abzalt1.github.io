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
 <section id="services" className="grid grid-cols-1 md:grid-cols-3 gap-0 grid-border mb-8 text-center md:text-left scroll-mt-8 fade-in-section overflow-hidden">
 {services.map((service, index) => (
 <div
 key={index}
 className={`p-10 md:p-8 lg:p-16 border-b-grid md:border-b-0 ${index < services.length - 1 ? 'md:border-r-grid' : ''} hover:bg-black hover:text-white :bg-white :text-black transition-colors group cursor-default`}
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
