'use client';

export default function Services() {
    const services = [
        {
            icon: 'ri-layout-masonry-fill',
            title: 'Tilda / Webflow',
            description: 'Быстрый запуск красивых сайтов на конструкторах. Идеально для лендингов, MVP и промо-страниц.'
        },
        {
            icon: 'ri-reactjs-line',
            title: 'Custom Web Apps',
            description: 'Разработка сложных интерактивных интерфейсов на React / Next.js. Максимальная производительность, идеальное SEO и полная свобода.'
        },
        {
            icon: 'ri-cpu-line',
            title: 'Автоматизация & API',
            description: 'Сложная бизнес-логика, калькуляторы, API-интеграции (DaData, CRM, мессенджеры). Автоматизируем то, с чем не справляются стандартные решения.'
        }
    ];

    return (
        <section id="services" className="grid grid-cols-1 md:grid-cols-3 gap-0 grid-border mb-8 text-center md:text-left scroll-mt-8 fade-in-section overflow-hidden">
            {services.map((service, index) => (
                <div
                    key={index}
                    className={`p-10 md:p-16 border-b-grid md:border-b-0 ${index < services.length - 1 ? 'md:border-r-grid' : ''} hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group cursor-default`}
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
