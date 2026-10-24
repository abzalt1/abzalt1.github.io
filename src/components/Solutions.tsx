'use client';

// Ready-made products sold "as in the demo"; each card links to its live demo.
const solutions = [
 {
 title: 'Портал заказов',
 image: '/demo-portal.webp',
 imageAlt: 'Форма заказа кофейни в демо портала',
 points: [
 'Кофейни сами заказывают до дедлайна',
 'Цех получает готовую сводку к началу смены',
 'Накладные по каждой точке',
 ],
 price: 'от 400 000 ₸',
 demo: 'https://portal.abzalt1.dev',
 },
 {
 title: 'Система учёта',
 image: '/demo-erp.webp',
 imageAlt: 'Дашборд владельца в демо системы учёта',
 points: [
 'Всё, что есть в портале',
 'Склад и техкарты с автосписанием сырья',
 'Себестоимость, доставка с фото и отчёты',
 ],
 price: 'от 650 000 ₸',
 demo: 'https://erp.abzalt1.dev',
 },
];

export default function Solutions() {
 return (
 <section id="solutions" className="grid-border bg-white mb-8 scroll-mt-8 fade-in-section overflow-hidden">
 <div className="p-6 md:p-8 lg:p-12 border-b-grid">
 <span className="block text-sm font-bold uppercase tracking-widest mb-3">Готовые решения</span>
 <h2 className="text-2xl md:text-3xl font-bold uppercase leading-tight tracking-tight">Посмотрите сами, без созвона</h2>
 <p className="mt-3 text-sm md:text-base opacity-80 font-medium max-w-2xl">
 Демо с вымышленными данными: можно войти как кофейня или как владелец и всё нажимать. Запуск под ваш бренд за 2–3 недели.
 </p>
 </div>
 <div className="grid grid-cols-1 lg:grid-cols-2">
 {solutions.map((s, i) => (
 <div key={s.title} className={`flex flex-col ${i === 0 ? 'border-b-grid lg:border-b-0 lg:border-r-grid' : ''}`}>
 <a
 href={s.demo}
 target="_blank"
 rel="noopener noreferrer"
 className="block aspect-[16/10] bg-zinc-100 border-b-grid overflow-hidden"
 aria-label={`Открыть демо: ${s.title}`}
 >
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 src={s.image}
 alt={s.imageAlt}
 loading="lazy"
 className={`w-full h-full ${i === 0 ? 'object-contain object-top pt-6' : 'object-cover object-left-top'} hover:scale-[1.02] transition-transform duration-500`}
 />
 </a>
 <div className="flex flex-col flex-1 p-6 md:p-8 lg:p-12">
 <h3 className="text-xl md:text-2xl font-bold uppercase mb-4">{s.title}</h3>
 <ul className="space-y-2 mb-6">
 {s.points.map((p) => (
 <li key={p} className="flex gap-2 text-sm md:text-base font-medium opacity-80">
 <i className="ri-check-line shrink-0 leading-6"></i>
 <span>{p}</span>
 </li>
 ))}
 </ul>
 <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
 <span className="text-lg md:text-xl font-bold">{s.price}</span>
 <a
 href={s.demo}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 font-bold uppercase bg-black text-white px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base hover:opacity-80 transition-opacity rounded-full whitespace-nowrap"
 >
 Открыть демо <i className="ri-arrow-right-up-line"></i>
 </a>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>
 );
}
