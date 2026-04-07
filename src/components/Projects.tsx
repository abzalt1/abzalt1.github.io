'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface ProjectCardProps {
    number: string;
    title: React.ReactNode;
    category: string;
    image?: string | string[];
    tasks: string[];
    link: string;
    stack: { icon: string; name: string; info: string }[];
    onImageClick: (src: string) => void;
    status?: string;
}

const ProjectCard = ({ number, title, category, image, tasks, link, stack, onImageClick, status }: ProjectCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAutoPlaying(false);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const goToImage = (e: React.MouseEvent, idx: number) => {
        e.stopPropagation();
        setIsAutoPlaying(false);
        setCurrentImageIndex(idx);
    };

    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-0 grid-border bg-white dark:bg-black overflow-hidden ${status ? 'opacity-60 hover:opacity-100 duration-500' : ''}`}
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
                    <span className="mt-8 inline-block px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-widest w-fit">{status}</span>
                ) : (
                    <p className="mt-8 text-base font-medium opacity-80 uppercase tracking-tighter font-bold underline">{category}</p>
                )}
            </div>
            <div className="md:col-span-8 p-0 flex flex-col">
                {images.length > 0 ? (
                    <>
                        <div className="p-4 md:p-8 flex flex-col gap-4 border-b-grid bg-gray-50/50 dark:bg-zinc-900/40">
                            {/* macOS Window Frame */}
                            <div className="relative group w-full max-w-4xl mx-auto flex flex-col rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] transition-all duration-500 ease-in-out bg-white dark:bg-black">
                                {/* Chrome Bar */}
                                <div className="h-10 bg-gray-100/90 dark:bg-zinc-800/90 backdrop-blur-md flex items-center px-4 gap-2 border-b border-black/5 dark:border-white/10 relative z-20">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/5"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/5"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm border border-black/5"></div>
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-bold text-black/60 dark:text-white/60 uppercase tracking-[0.2em] pointer-events-none hidden sm:block whitespace-nowrap">
                                        {category.split(' / ')[0]} — Browsing
                                    </div>
                                </div>

                                {/* Content Area with dynamic transition */}
                                <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center transition-all duration-700">
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
                                                onClick={() => onImageClick(img)}
                                                priority={idx === 0}
                                            />
                                        </div>
                                    ))}

                                    {/* Navigation Arrows */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={handlePrev}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                                                aria-label="Previous image"
                                            >
                                                <i className="ri-arrow-left-s-line text-xl"></i>
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                                                aria-label="Next image"
                                            >
                                                <i className="ri-arrow-right-s-line text-xl"></i>
                                            </button>
                                        </>
                                    )}
                                </div>
                                
                                {/* Status bar / Pagination */}
                                <div className="h-1 bg-black/5 dark:bg-white/5 w-full relative overflow-hidden">
                                    <div 
                                        className="absolute top-0 left-0 h-full bg-black dark:bg-white transition-all duration-500 ease-out"
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
                                                ? 'bg-black dark:bg-white w-6' 
                                                : 'bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                                            }`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 md:p-16 flex flex-col md:flex-row gap-10 justify-between items-start">
                            <div className="max-w-md">
                                <h4 className="text-lg font-bold uppercase mb-3">Задачи</h4>
                                <ul className="list-disc list-outside ml-4 text-base leading-relaxed font-medium mb-6 text-gray-600 dark:text-gray-300 space-y-2">
                                    {tasks.map((task, i) => (
                                        <li key={i}>{task}</li>
                                    ))}
                                </ul>
                                <a href={link} target="_blank" className="inline-flex items-center gap-2 text-base font-bold uppercase bg-black text-white dark:bg-white dark:text-black px-6 py-3 hover:opacity-80 transition-opacity rounded-[8px]" rel="noopener noreferrer">
                                    Сайт <i className="ri-arrow-right-up-line"></i>
                                </a>
                            </div>
                            <div className="w-full md:w-auto">
                                <h4 className="text-xs font-semibold uppercase mb-3 tracking-widest opacity-50">Стек проекта</h4>
                                <ul className="space-y-3 text-sm font-bold uppercase pb-2">
                                    {stack.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 group relative cursor-help w-fit">
                                            <i className={`${item.icon} text-lg`}></i> {item.name}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black text-white dark:bg-white dark:text-black text-xs font-medium normal-case shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 text-center pointer-events-none">
                                                {item.info}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black dark:border-t-white"></div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col justify-center items-center p-12 bg-white dark:bg-black min-h-[300px]">
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

export default function Projects({ onOpenLightbox }: { onOpenLightbox: (src: string) => void }) {
    const projects = [
        {
            number: "01.",
            title: <>MY-COOK<br />DELIVERY</>,
            category: "E-commerce / Food Tech",
            image: ["/mycook1.webp", "/mycook2.webp", "/mycook3.webp", "/mycook4.webp"],
            tasks: [
                "Запуск интернет-магазина доставки без покупки дорогих CRM.",
                "Определение стоимости доставки по координатам через API.",
                "Сбор содержимого корзины в WhatsApp сообщение без подключения WhatsApp Business API.",
                "Автоматический расчет скидок по базе данных.",
                "Динамический расчет времени на доставку в зависимости от сложности блюда."
            ],
            link: "https://my-cook.kz",
            stack: [
                { icon: "ri-layout-masonry-fill", name: "Tilda Zero Block", info: "Гибкая верстка уникальных блоков." },
                { icon: "ri-shield-check-fill", name: "Order Logic Engine", info: "Скрипт валидации гео-зон, строгого контроля времени и логики корзины." },
                { icon: "ri-map-pin-2-fill", name: "DaData API", info: "Геокодинг адресов и определение зон." },
                { icon: "ri-code-box-fill", name: "Google Apps Script", info: "Custom API для системы лояльности и динамических скидок." },
                { icon: "ri-whatsapp-fill", name: "WhatsApp Integration", info: "Автоматическое формирование структуры заказа и отправка в мессенджер." }
            ]
        },
        {
            number: "02.",
            title: <>MODEL<br />PORTFOLIO</>,
            category: "Индивидуальное визуальное портфолио для fashion-модели.",
            image: ["/dilya1.webp", "/dilya2.webp", "/dilya3.webp"],
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
        },
        {
            number: "03.",
            title: <>B2B FASHION<br />WHOLESALE</>,
            category: "Оптовый магазин одежды.",
            image: "", // In progress
            status: "Скоро релиз",
            tasks: ["Лидогенерация и оптовые каталоги."],
            link: "#",
            stack: []
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
