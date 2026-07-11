'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
    number: string;
    title: React.ReactNode;
    category: string;
    image?: string | string[];
    tasks: string[];
    result?: string;
    link: string;
    demoCredentials?: { login: string; pass: string };
    stack: { icon: string; name: string; info: string }[];
    onImageClick: (images: string[], index: number) => void;
    status?: string;
}

const ProjectCard = ({ number, title, category, image, tasks, result, link, demoCredentials, stack, onImageClick, status }: ProjectCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    const images = Array.isArray(image) ? image : (image ? [image] : []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered && isAutoPlaying && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isHovered, isAutoPlaying, images.length]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAutoPlaying(false);
        setHasInteracted(true);
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAutoPlaying(false);
        setHasInteracted(true);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const goToImage = (e: React.MouseEvent, idx: number) => {
        e.stopPropagation();
        setIsAutoPlaying(false);
        setHasInteracted(true);
        setCurrentImageIndex(idx);
    };

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe || isRightSwipe) {
            setIsAutoPlaying(false);
            setHasInteracted(true);

            if (isLeftSwipe) {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            } else {
                setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
            }
        }
    };

    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-0 grid-border bg-white overflow-hidden ${status ? 'opacity-60 hover:opacity-100 duration-500' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsAutoPlaying(true);
            }}
        >
            <div className="md:col-span-4 p-8 md:p-16 border-b-grid md:border-b-0 md:border-r-grid flex flex-col justify-between">
                <div>
                    <span className="block text-sm font-bold uppercase tracking-widest mb-4">{number} {status || 'Избранный проект'}</span>
                    <h3 className="text-4xl md:text-5xl font-bold uppercase leading-tight tracking-tight">
                        {title}
                    </h3>
                </div>
                {status ? (
                    <span className="mt-8 inline-block px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest w-fit">{status}</span>
                ) : (
                    <p className="mt-8 text-base font-medium opacity-80 uppercase tracking-tighter font-bold underline">{category}</p>
                )}
            </div>
            <div className="md:col-span-8 p-0 flex flex-col">
                {images.length > 0 ? (
                    <>
                        <div className="p-4 md:p-8 flex flex-col gap-4 border-b-grid bg-gray-50/50 ">
                            {/* macOS Window Frame */}
                            <div className="relative group w-full max-w-4xl mx-auto flex flex-col rounded-xl overflow-hidden border border-black/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] [0_0_30px_-5px_rgba(255,255,255,0.1)] transition-all duration-500 ease-in-out bg-white ">
                                {/* Chrome Bar */}
                                <div className="h-10 bg-gray-100/90 backdrop-blur-md flex items-center px-4 gap-2 border-b border-black/5 relative z-20">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/5"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/5"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm border border-black/5"></div>
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-bold text-black/60 uppercase tracking-[0.2em] pointer-events-none hidden sm:block whitespace-nowrap">
                                        {category.split(' / ')[0]} — Browsing
                                    </div>
                                </div>

                                {/* Content Area with dynamic transition */}
                                <div
                                    className="relative aspect-video overflow-hidden bg-zinc-100 flex items-center justify-center transition-all duration-700"
                                    onTouchStart={onTouchStart}
                                    onTouchMove={onTouchMove}
                                    onTouchEnd={onTouchEnd}
                                >
                                    {images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === currentImageIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                                                }`}
                                        >
                                            <Image
                                                src={img}
                                                alt="Website screenshot"
                                                fill
                                                className="object-contain p-2 cursor-zoom-in"
                                                onClick={(e) => { e.stopPropagation(); onImageClick(images, idx); }}
                                                priority={idx === 0}
                                            />
                                        </div>
                                    ))}

                                    {/* Navigation Areas */}
                                    {images.length > 1 && (
                                        <>
                                            {/* Visible Arrows (Desktop Only) */}
                                            <button
                                                onClick={handlePrev}
                                                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/10 hover:bg-black/20 :bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 items-center justify-center"
                                                aria-label="Previous image"
                                            >
                                                <i className="ri-arrow-left-s-line text-xl"></i>
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/10 hover:bg-black/20 :bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 items-center justify-center hidden md:flex"
                                                aria-label="Next image"
                                            >
                                                <i className="ri-arrow-right-s-line text-xl"></i>
                                            </button>

                                            {/* Invisible Tap Areas (Mobile & Desktop) */}
                                            <button
                                                onClick={handlePrev}
                                                className="absolute left-0 top-0 bottom-0 z-30 w-1/4 cursor-w-resize"
                                                aria-label="Previous image"
                                            />
                                            <button
                                                onClick={handleNext}
                                                className="absolute right-0 top-0 bottom-0 z-30 w-1/4 cursor-e-resize"
                                                aria-label="Next image"
                                            />

                                            {/* Subtle Interaction Hint */}
                                            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-500 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 ${hasInteracted ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                                                <i className="ri-expand-left-right-line text-xs text-white"></i>
                                                <span className="text-[10px] font-extrabold text-white uppercase tracking-widest whitespace-nowrap">Листайте или нажимайте на края</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Status bar / Pagination */}
                                <div className="h-1 bg-black/5 w-full relative overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out"
                                        style={{ width: `${((currentImageIndex + 1) / images.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Dot Pagination Below Container */}
                            {images.length > 1 && (
                                <div className="flex justify-center gap-2 mt-2">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => goToImage(e, idx)}
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                                ? 'bg-black w-6'
                                                : 'bg-black/20 hover:bg-black/40 :bg-white/40'
                                                }`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 md:p-16 flex flex-col xl:flex-row gap-10 justify-between items-start">
                            <div className="max-w-2xl w-full">
                                {result && (
                                    <div className="mb-8 p-6 bg-black/5 border-l-4 border-black">
                                        <h4 className="text-xs font-bold uppercase mb-2 text-black/60 tracking-widest">Результат</h4>
                                        <p className="text-base font-medium leading-relaxed text-black">{result}</p>
                                    </div>
                                )}
                                <h4 className="text-lg font-bold uppercase mb-3">Задачи</h4>
                                <ul className="list-disc list-outside ml-4 text-base leading-relaxed font-medium mb-6 text-gray-600 space-y-2">
                                    {tasks.map((task, i) => (
                                        <li key={i}>{task}</li>
                                    ))}
                                </ul>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                                    <a href={link} target="_blank" className="inline-flex items-center gap-2 text-base font-bold uppercase bg-black text-white px-6 py-3 hover:opacity-80 transition-opacity rounded-[8px] whitespace-nowrap shrink-0" rel="noopener noreferrer">
                                        Сайт <i className="ri-arrow-right-up-line"></i>
                                    </a>
                                    {demoCredentials && (
                                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 px-4 py-3 bg-black/5 rounded-[8px] border border-black/10 w-full sm:w-auto">
                                            <i className="ri-key-2-line text-sm opacity-50 hidden sm:block"></i>
                                            <span className="text-xs font-bold uppercase opacity-50 tracking-wider">Логин:</span>
                                            <span className="text-sm font-mono font-medium bg-white px-2 py-0.5 rounded shadow-sm border border-black/5 select-all mr-2">{demoCredentials.login}</span>
                                            
                                            <span className="text-xs font-bold uppercase opacity-50 tracking-wider">Пароль:</span>
                                            <span className="text-sm font-mono font-medium bg-white px-2 py-0.5 rounded shadow-sm border border-black/5 select-all">{demoCredentials.pass}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="w-full md:w-auto">
                                <h4 className="text-xs font-semibold uppercase mb-3 tracking-widest opacity-50">Стек проекта</h4>
                                <ul className="space-y-3 text-sm font-bold uppercase pb-2">
                                    {stack.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 group relative cursor-help w-fit">
                                            <i className={`${item.icon} text-lg`}></i> {item.name}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black text-white text-xs font-medium normal-case shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 text-center pointer-events-none">
                                                {item.info}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black "></div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col justify-center items-center p-12 bg-white min-h-[300px]">
                        <i className="ri-image-edit-line text-6xl text-gray-300 mb-4"></i>
                        <p className="text-lg font-bold uppercase text-gray-400 text-center max-w-xs">
                            {category}
                            <br /><span className="text-sm font-normal normal-case mt-2 block">{tasks[0]}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Projects({ onOpenLightbox }: { onOpenLightbox: (images: string[], index: number) => void }) {
    const projects = [
        {
            number: "01.",
            title: <>PASTRY<br />STUDIO</>,
            category: "B2B Portal / Food Tech",
            image: ["/pastry1.png", "/pastry2.png", "/pastry3.png", "/pastry4.png", "/pastry5.png", "/pastry6.png"],
            result: "Полностью автоматизирован цикл оптовых B2B-продаж. Исключен человеческий фактор при вводе данных в 1С, а время на обработку заказов сокращено до нуля. Автоматизировано формирование ежедневных сводных накладных для цеха, что обеспечило бесперебойное снабжение 60+ партнерских точек.",
            tasks: [
                "Mobile-first PWA-приложение: Удобный портал для оформления заказов со смартфона с жестким системным контролем дедлайнов (прием заявок строго до 21:00).",
                "Глубокая интеграция с 1С: Двусторонний обмен данными — автоматическая маршрутизация заказов в базу и синхронизация актуальных статусов в реальном времени.",
                "Продвинутая ролевая модель: Гибкое разграничение доступов для бариста (одна кофейня), управляющих (сеть точек), офиса и системных администраторов.",
                "Умная система корректировок: Возможность изменения заказов администратором с обязательным отслеживанием и логированием причин для прозрачности перед клиентом.",
                "Уведомления через Telegram Bot API: Система мгновенных оповещений для менеджмента о новых заказах и критических изменениях.",
                "Аналитическая панель: Встроенный дашборд с фильтрацией продаж по периодам/точкам и выгрузкой отчетов в CSV для бухгалтерии.",
                "Безопасный демо-режим: Архитектурно заложенная изолированная среда для презентации продукта без риска изменения боевой базы данных."
            ],
            demoCredentials: { login: 'demo', pass: 'demo1234' },
            link: "https://pastrystudio.vercel.app/",
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
            number: "02.",
            title: <>MY-COOK<br />DELIVERY</>,
            category: "E-commerce / Food Tech",
            image: ["/mycook_new1.webp", "/mycook_new2.webp", "/mycook_new3.webp", "/mycook_new4.webp", "/mycook_new5.webp", "/mycook_new6.webp", "/mycook_new7.webp", "/mycook_new8.webp"],
            result: "Разработан полноценный PWA интернет-магазин с интегрированной кастомной админ-панелью. Клиент получил полностью независимую платформу, избавившись от абонентских плат за сторонние сервисы, а пользователи — премиальный опыт оформления заказов, сопоставимый с нативными мобильными приложениями.",
            tasks: [
                "Разработка PWA-архитектуры: поддержка установки приложения на главный экран смартфона и внедрение нативных механик (Pull-to-Refresh, плавающая корзина).",
                "Сложная логика каталога: реализация конструктора блюд с модификаторами и динамическим пересчетом итоговой стоимости на лету.",
                "Интеграция умного чекаута: автоматические подсказки и валидация адреса доставки через внешнее API (DaData).",
                "Автоматизация лояльности: мгновенная проверка и расчет персональных скидок по номеру телефона клиента.",
                "Система Web Push уведомлений: моментальное оповещение администратора о новых заказах прямо на экране устройства без использования сторонних мессенджеров.",
                "Кастомная CRM-система: защищенная панель администратора для управления заказами, каталогом и статусами с реалтайм-синхронизацией через Supabase."
            ],
            link: "https://mycook.kz",
            stack: [
                { icon: "ri-nextjs-fill", name: "Next.js", info: "App Router, SSR и API-роуты для быстрой работы приложения." },
                { icon: "ri-database-2-fill", name: "Supabase", info: "PostgreSQL база данных для хранения каталога и заказов." },
                { icon: "ri-smartphone-line", name: "PWA / Web Push", info: "Нативный опыт использования и push-уведомления." },
                { icon: "ri-triangle-fill", name: "Vercel", info: "Надежный хостинг с автоматическим деплоем из GitHub." }
            ]
        },
        {
            number: "03.",
            title: <>MODEL<br />PORTFOLIO</>,
            category: "Индивидуальное визуальное портфолио для fashion-модели.",
            image: ["/dilya1.webp", "/dilya2.webp", "/dilya3.webp"],
            result: "Запущен полностью независимый сайт-портфолио с кастомной админ-панелью. Клиент экономит на подписках конструкторов, а оптимизированная архитектура (Next.js + Cloudflare R2) позволяет мгновенно загружать тяжелые фотографии кастинг-директорам в любой точке мира.",
            tasks: [
                "Проектирование минималистичного и эстетичного UI/UX.",
                "Разработка плавных анимаций и нестандартного скролла.",
                "Оптимизация медиафайлов для быстрой загрузки.",
                "Полная адаптация под мобильные устройства.",
                "Создание админ-панели для загрузки фотографий и видео."
            ],
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

    return (
        <section id="projects" className="grid grid-cols-1 gap-12 md:gap-16 mb-8 scroll-mt-8">
            {projects.map((project, index) => (
                <div key={index} className="fade-in-section">
                    <ProjectCard {...project} onImageClick={onOpenLightbox} />
                </div>
            ))}
        </section>
    );
}
