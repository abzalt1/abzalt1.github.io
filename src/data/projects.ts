import type { Locale } from '@/i18n/dict';
import { projectsEn } from './projects.en';

export interface StackItem {
    icon: string;
    name: string;
    info: string;
}

export interface Project {
    slug: string;
    number: string;
    // Rendered one per line in the big uppercase heading.
    titleLines: string[];
    category: string;
    // Short summary for <meta description> and link previews in messengers.
    description: string;
    images: string[];
    result: string;
    tasks: string[];
    // Indexes into `tasks` shown on the homepage card; defaults to the first three.
    cardTasks?: number[];
    // Case-study blocks rendered only on the project page, each only when filled in.
    challenge?: string;
    testimonial?: { quote: string; author: string };
    // External site or demo; omit when there is nothing public to link to.
    link?: string;
    linkLabel?: string;
    demoCredentials?: { login: string; pass: string };
    stack: StackItem[];
    status?: string;
    // Locales where the case is not listed at all.
    hiddenIn?: Locale[];
}

export const projects: Project[] = [
    {
        slug: "fabrika-erp",
        number: "01.",
        titleLines: ["FABRIKA", "ERP"],
        category: "ERP-система / Пищевое производство",
        description: "ERP-система для производства выпечки и готовой еды в Астане: заказы кофеен, производственный план, склад, техкарты, накладные, курьеры и маржа в реальном времени.",
        images: ["/fabrika1.webp", "/fabrika2.webp", "/fabrika3.webp", "/fabrika4.webp", "/fabrika5.webp", "/fabrika6.webp", "/fabrika7.webp"],
        result: "Собственная ERP для цеха выпечки и готовой еды в Астане заменила Paloma и приём заказов в WhatsApp. Весь цикл — от заявки кофейни до списания муки со склада — теперь идёт в одной системе: заказы сами превращаются в план производства, ингредиенты списываются по техкартам, а владелец видит выручку, себестоимость и маржу в реальном времени.",
        tasks: [
            "Ролевая PWA-платформа: отдельные интерфейсы для управляющих кофейнями, цеха, курьеров, бухгалтера и администратора с гибкой настройкой прав доступа.",
            "Приём заказов с контролем дедлайнов: основной заказ на завтра до 22:00 и срочный дозаказ на сегодня — с серверной проверкой времени по Астане.",
            "Производственный план: автоматическая сводка позиций по всем заявкам на день для цеха и ведение заказа по статусам от «Готовится» до «Доставлен».",
            "Складской учёт: остатки по нескольким складам, приходные накладные, перемещения, инвентаризации и списания с печатью и выгрузкой в Excel для ревизии.",
            "Технологические карты: состав каждого продукта и полуфабриката для автоматического списания сырья со склада по фактическим заказам.",
            "Финансовая отчётность: акты сверок с покупателями и поставщиками, движение товаров и отчёт о себестоимости против выручки с расчётом маржи.",
            "Документооборот: массовая печать накладных на чековой ленте (58/80 мм) и сводок на A4 через серверную генерацию PDF.",
            "Курьерский модуль: маршрут доставок на день и фотоотчёт при передаче заказа с автоматическим сжатием снимков.",
            "Продакшн-инфраструктура: собственный VPS в Казахстане, blue/green деплой без простоя, watchdog, автобэкапы и внешний мониторинг аптайма."
        ],
        cardTasks: [1, 3, 5],
        challenge: "Цех снабжает выпечкой и готовой едой 50+ точек. Учёт вели в Paloma, заказы от них принимали в WhatsApp, а по доставке не было никакой отчётности. Paloma — коробочная система, сделанная сразу для всех, и подстраивать под неё работу цеха было неудобно. Владельцу нужен был инструмент, который точно подходит под процессы именно его бизнеса.",
        stack: [
            { icon: "ri-nextjs-fill", name: "Next.js", info: "App Router, Server Actions и standalone-сборка для собственного сервера." },
            { icon: "ri-database-2-fill", name: "Supabase", info: "PostgreSQL + Auth + Row Level Security для разграничения доступа по ролям." },
            { icon: "ri-css3-fill", name: "Tailwind CSS", info: "Адаптивный интерфейс админки и мобильных кабинетов." },
            { icon: "ri-smartphone-line", name: "PWA / Web Push", info: "Установка на телефон, офлайн-режим и push-уведомления о заказах." },
            { icon: "ri-cloud-line", name: "Cloudflare R2", info: "Хранилище фото товаров и фотоотчётов курьеров." },
            { icon: "ri-printer-line", name: "Puppeteer PDF", info: "Серверная генерация накладных и отчётов для печати." },
            { icon: "ri-server-line", name: "VPS / Nginx", info: "Хостинг в Астане, blue/green деплой через systemd и rate-limit на nginx." }
        ]
    },
    {
        slug: "pastry-studio",
        number: "02.",
        titleLines: ["PASTRY", "STUDIO"],
        category: "B2B-портал / Пищевое производство",
        description: "B2B-портал оптовых заказов для 70+ партнёрских точек: приём заявок до дедлайна со смартфона, двусторонняя интеграция с 1С, уведомления в Telegram и аналитика.",
        images: ["/pastry1.webp", "/pastry2.webp", "/pastry3.webp"],
        result: "Точки сами оформляют заказ со смартфона до 21:00, заявка сразу уходит в 1С, а сводная накладная для цеха собирается автоматически. Через портал каждый день заказывают 70+ точек, и вручную заказы больше никто не переносит.",
        tasks: [
            "PWA для заказов со смартфона: приём заявок закрывается в 21:00, после этого система заказ не примет.",
            "Двусторонняя интеграция с 1С: заказ сам уходит в базу, а статус из 1С возвращается на портал.",
            "Роли и доступы: бариста видит свою кофейню, управляющий — свою сеть точек, отдельные кабинеты у офиса и администраторов.",
            "Корректировки заказов: администратор может изменить заказ только с указанием причины, она сохраняется в истории, и клиент видит, что и почему поменяли.",
            "Уведомления в Telegram: менеджеры сразу узнают о новых заказах и важных изменениях.",
            "Аналитика: продажи с фильтром по периодам и точкам, выгрузка отчётов в CSV для бухгалтерии.",
            "Демо-режим: отдельная среда, чтобы показывать портал клиентам, не трогая рабочую базу."
        ],
        challenge: "Партнёрские кофейни присылали заказы в WhatsApp, и собирать их из переписки было неудобно. Дальше всё делали вручную: заявки переносили в 1С, а сводную для цеха составлял сотрудник. Нужен был портал, где точки сами оформляют заказ до дедлайна, заявка сразу уходит в 1С, а сводная для цеха формируется автоматически.",
        stack: [
            { icon: "ri-reactjs-fill", name: "React / Next.js", info: "App Router, SSR и API-роуты для серверной логики." },
            { icon: "ri-database-2-fill", name: "Supabase", info: "PostgreSQL + Auth + Row Level Security для мультитенантной архитектуры." },
            { icon: "ri-css3-fill", name: "Tailwind CSS", info: "Утилитарная стилизация с mobile-first подходом." },
            { icon: "ri-exchange-fill", name: "1C Integration", info: "REST API для передачи заказов и приёма статусов из 1С." },
            { icon: "ri-telegram-fill", name: "Telegram Bot API", info: "Автоматизированные уведомления о статусах заказов (отправка в 1С, ошибки)." },
            { icon: "ri-triangle-fill", name: "Vercel", info: "Хостинг с Edge Functions и автодеплоем из GitHub." }
        ]
    },
    {
        slug: "mycook",
        number: "03.",
        titleLines: ["my Cook"],
        category: "Интернет-магазин / Доставка еды",
        description: "PWA интернет-магазин доставки еды с конструктором блюд, проверкой адреса, скидками по номеру телефона, Web Push и собственной CRM вместо платных сервисов.",
        images: ["/mycook_new1.webp", "/mycook_new2.webp", "/mycook_new3.webp", "/mycook_new4.webp", "/mycook_new5.webp", "/mycook_new6.webp", "/mycook_new7.webp", "/mycook_new8.webp"],
        result: "Свой интернет-магазин с админкой вместо абонентки за сторонние сервисы. Клиент ставит его на телефон как приложение, собирает блюдо в конструкторе и оформляет доставку на сайте. Заказ сохраняется в CRM и одновременно открывается в WhatsApp готовым сообщением: клиенту остаётся нажать «Отправить», а менеджеру не нужно ничего уточнять.",
        tasks: [
            "PWA: магазин ставится на главный экран телефона, есть pull-to-refresh и плавающая корзина, как в обычном приложении.",
            "Конструктор блюд: модификаторы, и цена пересчитывается сразу при выборе.",
            "Адрес доставки: подсказки и проверка адреса через DaData.",
            "Скидки по номеру телефона: персональная скидка считается, как только клиент вводит номер.",
            "Заказ в WhatsApp без Business API: на сайте формируется готовое сообщение с составом, адресом и временем, клиент отправляет его одной кнопкой. Ни абонентки, ни модерации шаблонов. Если пропала связь, заказ сохраняется на устройстве и уходит в CRM, когда интернет появится.",
            "Web Push: покупатель подписывается в корзине, а администратор отправляет акции и новости прямо на экран телефона, без рассылок в мессенджерах.",
            "Своя CRM: закрытая админка для заказов, каталога и статусов, изменения через Supabase сразу видны всем."
        ],
        challenge: "Заказы принимали только в переписке WhatsApp: клиент перечислял блюда, менеджер уточнял состав, адрес и время. Владелец хотел, чтобы клиент сам собирал заказ на сайте, а менеджер получал его уже готовым, не меняя привычный канал.",
        link: "https://mycook.kz",
        stack: [
            { icon: "ri-nextjs-fill", name: "Next.js", info: "App Router, SSR и API-роуты для быстрой работы приложения." },
            { icon: "ri-database-2-fill", name: "Supabase", info: "PostgreSQL база данных для хранения каталога и заказов." },
            { icon: "ri-smartphone-line", name: "PWA / Web Push", info: "Нативный опыт использования и push-уведомления." },
            { icon: "ri-triangle-fill", name: "Vercel", info: "Надежный хостинг с автоматическим деплоем из GitHub." }
        ]
    },
    {
        slug: "urban-origin",
        number: "04.",
        titleLines: ["URBAN", "ORIGIN"],
        category: "Лендинг / Пошив мерча",
        description: "Лендинг для производства мерча и корпоративной формы в Казахстане: оптовые заявки от 50 единиц, заявки сразу в Битрикс24, Meta Pixel и Google Ads для рекламы.",
        images: ["/urban1.webp", "/urban2.webp", "/urban3.webp", "/urban4.webp", "/urban5.webp", "/urban6.webp"],
        result: "Лендинг для швейного цеха, который шьёт мерч и форму оптом от 50 единиц. Заявка с сайта сразу попадает в Битрикс24, а Meta Pixel и Google Ads видят, какая реклама приводит клиентов.",
        tasks: [
            "Структура под B2B-клиента: сроки, образец до запуска партии, договор с НДС и закрывающие документы — всё, о чём спрашивают закупщики.",
            "Сравнение «как бывает обычно» и «с Urban Origin»: страхи клиента и ответ на каждый из них.",
            "Каталог изделий и отдельные блоки для IT-компаний, сетей, школ и вузов, мероприятий.",
            "Формы заявки и всплывающее окно расчёта: лид сразу уходит в Битрикс24, есть защита от спама.",
            "Meta Pixel и Google Ads для оптимизации рекламы по заявкам.",
            "Кейсы, этапы производства, FAQ и кнопка WhatsApp с персональным менеджером."
        ],
        cardTasks: [0, 3, 4],
        link: "https://urbanoriginb2b.kz/",
        stack: [
            { icon: "ri-html5-fill", name: "HTML / CSS / JS", info: "Лёгкая статическая вёрстка без фреймворка — страница открывается быстро даже с мобильного интернета." },
            { icon: "ri-contacts-book-line", name: "Битрикс24", info: "Заявки из форм через серверный /api/lead сразу попадают в CRM." },
            { icon: "ri-meta-fill", name: "Meta Pixel", info: "Отслеживание заявок для рекламы в Instagram и Facebook." },
            { icon: "ri-google-fill", name: "Google Ads", info: "Конверсии для поисковой рекламы." },
            { icon: "ri-server-line", name: "VPS / Caddy", info: "Собственный сервер с автоматическим HTTPS." }
        ]
    },
    {
        slug: "model-portfolio",
        // A personal site for a model doesn't fit the B2B pitch for European clients.
        hiddenIn: ["en"],
        number: "05.",
        titleLines: ["MODEL", "PORTFOLIO"],
        category: "Сайт-портфолио / Реклама",
        description: "Сайт-портфолио для рекламной модели на Next.js с собственной CMS, плавными анимациями и быстрой загрузкой фото и видео через Cloudflare R2.",
        images: ["/dilya1.webp", "/dilya2.webp", "/dilya3.webp"],
        result: "Сайт-портфолио со своей админкой: модель сама загружает новые съёмки с телефона и не платит каждый месяц за конструктор сайтов. Тяжёлые фото и видео отдаются из Cloudflare R2 без платы за трафик.",
        tasks: [
            "Минималистичный интерфейс: на первом плане фото и видео, текста и кнопок минимум.",
            "Плавные анимации и нестандартный скролл, которые не тормозят страницу.",
            "Медиа в Cloudflare R2: тяжёлые файлы хранятся отдельно, исходящий трафик бесплатный.",
            "Своя CMS: модель сама обновляет портфолио и загружает новые съёмки со смартфона.",
            "Адаптация под телефоны и картинки под Retina-экраны."
        ],
        challenge: "Модели нужен был сайт, который выглядит как её съёмки: минимум интерфейса, крупные фото и видео, быстрая загрузка. Обновлять портфолио она хотела сама, прямо со смартфона, и без ежемесячной подписки на конструктор сайтов.",
        cardTasks: [0, 2, 3],
        link: "https://dilyara-portfoliov2.vercel.app/",
        stack: [
            { icon: "ri-reactjs-fill", name: "React", info: "Компонентный подход и быстрый рендеринг." },
            { icon: "ri-nextjs-fill", name: "Next.js", info: "Оптимизация производительности (SSG/SSR) и кастомные API-роуты для админ-панели." },
            { icon: "ri-css3-fill", name: "Tailwind CSS", info: "Детализированная кастомная стилизация." },
            { icon: "ri-cloud-line", name: "Cloudflare R2", info: "S3-совместимое объектное хранилище для медиафайлов с нулевой стоимостью исходящего трафика." },
            { icon: "ri-triangle-fill", name: "Vercel", info: "Хостинг и автоматизированный деплой с глобальной сетью доставки контента (Edge Network)." }
        ]
    }
];

function translate(project: Project, locale: Locale): Project {
    const tr = locale === 'en' ? projectsEn[project.slug] : undefined;
    if (!tr) return project;
    const { stackInfo, ...fields } = tr;
    return {
        ...project,
        ...fields,
        stack: project.stack.map((item, i) => ({ ...item, info: stackInfo?.[i] ?? item.info })),
    };
}

export function getProjects(locale: Locale = 'ru'): Project[] {
    return projects.filter((p) => !p.hiddenIn?.includes(locale)).map((p) => translate(p, locale));
}

export function getProject(slug: string, locale: Locale = 'ru') {
    return getProjects(locale).find((p) => p.slug === slug);
}
