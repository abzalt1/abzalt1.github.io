'use client';

export default function Services() {
    const services = [
        {
            icon: 'ri-layout-masonry-fill',
            title: 'Tilda / Webflow',
            description: 'Быстрый запуск красивых сайтов на конструкторах. Идеально для лендингов, MVP и промо-страниц.'
        },
        {
            icon: 'ri-code-s-slash-line',
            title: 'Custom Frontend',
            description: 'Разработка на чистом HTML/CSS/JS без ограничений конструкторов. Максимальная скорость, SEO и ноль ежемесячных платежей.'
        },
        {
            icon: 'ri-cpu-line',
            title: 'Сложная логика',
            description: 'Калькуляторы, API интеграции, личные кабинеты, работа с базами данных. То, где стандартные решения не справляются.'
        }
    ];

    return (
        <section id="services" className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 scroll-mt-8 fade-in-section">
            {/* Section header */}
            <div className="flex items-center gap-8 mb-12 md:mb-16">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none">
                    Услуги
                </h2>
                <hr className="swiss-divider flex-1" />
            </div>

            {/* Three-column card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`p-8 md:p-10 ${index < services.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''} border-black/10 dark:border-white/10`}
                    >
                        <i className={`${service.icon} text-4xl mb-6 block`}></i>
                        <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{service.title}</h3>
                        <p className="text-sm leading-relaxed opacity-60">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
