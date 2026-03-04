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
        <section id="services" className="grid grid-cols-1 md:grid-cols-3 gap-0 grid-border mb-8 text-center md:text-left scroll-mt-8 fade-in-section rounded-3xl overflow-hidden">
            {services.map((service, index) => (
                <div
                    key={index}
                    className={`p-8 md:p-12 border-b-grid md:border-b-0 ${index < services.length - 1 ? 'md:border-r-grid' : ''} hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group cursor-default`}
                >
                    <i className={`${service.icon} text-4xl mb-4 block`}></i>
                    <h3 className="text-xl font-bold uppercase mb-2">{service.title}</h3>
                    <p className="text-sm opacity-80 leading-relaxed font-medium">
                        {service.description}
                    </p>
                </div>
            ))}
        </section>
    );
}
