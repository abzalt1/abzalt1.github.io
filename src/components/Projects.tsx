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
    const cardRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = Array.isArray(image) ? image : (image ? [image] : []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 2000);
        } else {
            setCurrentImageIndex(0);
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-0 grid-border bg-white dark:bg-black overflow-hidden ${status ? 'opacity-60 hover:opacity-100 duration-500' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                        <div className="aspect-video border-b-grid overflow-hidden relative">
                            {images.map((img, idx) => (
                                <Image
                                    key={idx}
                                    src={img}
                                    alt="Website screenshot"
                                    fill
                                    className={`object-cover object-top cursor-zoom-in transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    onClick={() => onImageClick(img)}
                                />
                            ))}
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
            image: "/mycook.jpg",
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
            image: ["/dilya1.png", "/dilya2.png", "/dilya3.png"],
            tasks: [
                "Проектирование минималистичного и эстетичного UI/UX.",
                "Разработка плавных анимаций и нестандартного скролла.",
                "Оптимизация медиафайлов для быстрой загрузки.",
                "Полная адаптация под мобильные устройства."
            ],
            link: "https://dilyara-portfoliov2.vercel.app/",
            stack: [
                { icon: "ri-reactjs-fill", name: "React", info: "Компонентный подход и быстрый рендеринг." },
                { icon: "ri-javascript-fill", name: "Next.js", info: "Оптимизация производительности и SEO." },
                { icon: "ri-css3-fill", name: "Tailwind CSS", info: "Детализированная кастомная стилизация." }
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
