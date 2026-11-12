export type Locale = 'ru' | 'en';

const ru = {
  nav: { services: 'Услуги', projects: 'Проекты', process: 'Как работаю', write: 'Написать', openMenu: 'Открыть меню', closeMenu: 'Закрыть меню' },
  switcher: { label: 'EN', aria: 'English version' },
  hero: {
    titleLine1: 'Автоматизирую бизнес:',
    titleLine2: 'от сайта до ERP',
    phrases: ['для опта', 'для производства', 'для ритейла', 'для сферы услуг'],
    text: 'Через мой портал каждый день заказывают больше 70 точек, а производство выпечки в Астане ведёт в моей системе всё, от заявок кофеен до склада. Я сам развивал свои бренды в ритейле, поэтому сначала разбираюсь, как устроена ваша работа и где теряются деньги и время. Если хватит простого сайта или бота, не стану продавать сложную систему.',
    cta: 'Обсудить проект',
    discussLine1: 'Обсудить',
    discussLine2: 'Проект',
  },
  services: [
    { icon: 'ri-dashboard-line', title: 'CRM и ERP под ваш процесс', description: 'Заказы, склад, производство и деньги в одной системе. Владелец видит выручку, себестоимость и маржу в реальном времени.' },
    { icon: 'ri-shopping-cart-2-line', title: 'Приём оптовых заказов', description: 'Клиенты заказывают через личный кабинет, а не в WhatsApp. Дедлайны, история заказов и накладные — автоматически.' },
    { icon: 'ri-exchange-line', title: 'Интеграции с 1С и мессенджерами', description: 'Связываю систему с 1С, WhatsApp и Telegram, чтобы данные не вводили дважды.' },
  ],
  process: {
    title: 'Как я работаю',
    steps: [
      { title: 'Разбор', description: 'Созваниваемся, смотрю, как сейчас идут заказы, склад и деньги. Бесплатно.' },
      { title: 'Предложение', description: 'Описываю решение, сроки и цену. Если хватит бота или таблицы — так и скажу.' },
      { title: 'Разработка', description: 'Показываю результат каждую неделю, вы пробуете систему на своих данных.' },
      { title: 'Запуск и поддержка', description: 'Переношу данные, обучаю сотрудников и остаюсь на связи после запуска.' },
    ],
  },
  projects: {
    featured: 'Избранный проект',
    result: 'Результат',
    tasks: 'Задачи',
    details: 'Подробнее',
    siteLabel: 'Сайт',
    login: 'Логин:',
    pass: 'Пароль:',
    moreTasks: (n: number) => {
      const mod10 = n % 10, mod100 = n % 100;
      const word = mod10 === 1 && mod100 !== 11 ? 'задача' : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'задачи' : 'задач';
      return `Ещё ${n} ${word} и стек проекта`;
    },
  },
  project: { allProjects: 'Все проекты', caseLabel: 'Кейс', challenge: 'Задача клиента', otherProjects: 'Другие проекты', titleSuffix: 'кейс' },
  stack: 'Стек проекта',
  gallery: { hint: 'Листайте или нажимайте на края', screenshot: 'скриншот' },
  contact: {
    title: 'Есть проект?',
    text: 'Напишите мне в Telegram или WhatsApp, и я бесплатно оценю сроки и стоимость разработки вашего проекта (MVP).',
    nickCopied: 'Никнейм скопирован',
  },
  footer: { privacy: 'Политика конфиденциальности', location: 'Алматы, Казахстан' },
  cookie: {
    text: 'Мы используем файлы cookie и сервисы аналитики (Meta Pixel, Yandex Metrica) для улучшения работы сайта и рекламы. Подробнее в',
    privacyLink: 'Политике конфиденциальности',
    decline: 'Отклонить',
    accept: 'Понятно',
  },
  scrollTop: 'Наверх',
};

export type Dict = typeof ru;

const en: Dict = {
  nav: { services: 'Services', projects: 'Projects', process: 'Process', write: 'Message', openMenu: 'Open menu', closeMenu: 'Close menu' },
  switcher: { label: 'RU', aria: 'Русская версия' },
  hero: {
    titleLine1: 'I automate businesses:',
    titleLine2: 'from website to ERP',
    phrases: ['for wholesale', 'for manufacturing', 'for retail', 'for service businesses'],
    text: '70+ outlets order through my B2B portal every day, and a bakery production business runs everything in my ERP, from coffee-shop orders to the warehouse. I have built retail brands of my own, so I start by understanding how your business works and where it loses money and time. If a simple website or bot is enough, I won’t sell you a complex system.',
    cta: 'Discuss a project',
    discussLine1: 'Discuss',
    discussLine2: 'a project',
  },
  services: [
    { icon: 'ri-dashboard-line', title: 'CRM & ERP built around your process', description: 'Orders, inventory, production and finances in one system. The owner sees revenue, cost and margin in real time.' },
    { icon: 'ri-shopping-cart-2-line', title: 'B2B ordering portals', description: 'Wholesale clients order through their own account instead of WhatsApp or email. Cut-off times, order history and invoices are handled automatically.' },
    { icon: 'ri-exchange-line', title: 'Integrations', description: 'I connect the system to your accounting software, WhatsApp and Telegram, so nobody types the same data twice.' },
  ],
  process: {
    title: 'How I work',
    steps: [
      { title: 'Discovery', description: 'We get on a call and I look at how your orders, inventory and money flow today. Free of charge.' },
      { title: 'Proposal', description: 'I describe the solution, timeline and price. If a bot or a spreadsheet is enough, I’ll tell you so.' },
      { title: 'Development', description: 'You get a demo every week and test the system on your own data.' },
      { title: 'Launch & support', description: 'I migrate your data, train your team and stay available after launch.' },
    ],
  },
  projects: {
    featured: 'Featured project',
    result: 'Result',
    tasks: 'What I built',
    details: 'Read the case',
    siteLabel: 'Website',
    login: 'Login:',
    pass: 'Password:',
    moreTasks: (n: number) => `${n} more ${n === 1 ? 'feature' : 'features'} and the tech stack`,
  },
  project: { allProjects: 'All projects', caseLabel: 'Case study', challenge: 'The challenge', otherProjects: 'Other projects', titleSuffix: 'case study' },
  stack: 'Tech stack',
  gallery: { hint: 'Swipe or tap the edges', screenshot: 'screenshot' },
  contact: {
    title: 'Have a project?',
    text: 'Message me on Telegram or WhatsApp and I’ll estimate the timeline and cost of your MVP for free. I’m based in Kazakhstan (UTC+5), so my working day overlaps with European business hours.',
    nickCopied: 'Username copied',
  },
  footer: { privacy: 'Privacy policy', location: 'Almaty, Kazakhstan · UTC+5' },
  cookie: {
    text: 'With your consent, this site uses cookies and Meta Pixel to measure visits and ad performance. Nothing loads until you accept. Details in the',
    privacyLink: 'Privacy policy',
    decline: 'Decline',
    accept: 'Accept',
  },
  scrollTop: 'Back to top',
};

export const dicts: Record<Locale, Dict> = { ru, en };

// Prefix for internal links: Russian lives at the root, English under /en.
export const basePath = (locale: Locale) => (locale === 'en' ? '/en' : '');
