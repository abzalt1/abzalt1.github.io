'use client';

import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
    number: string;
    title: React.ReactNode;
    category: string;
    image: string;
    tasks: string[];
    link: string;
    stack: { icon: string; name: string; info: string }[];
    onImageClick: (src: string) => void;
    status?: string;
}

const ProjectCard = ({ number, title, category, image, tasks, link, stack, onImageClick, status }: ProjectCardProps) => {
    return (
        <div className="fade-in-section">
            {/* Project image — full width */}
            {image ? (
                <div className="w-full aspect-video relative overflow-hidden bg-black/5 dark:bg-white/5 mb-8">
                    <Image
                        src={image}
                        alt="Project screenshot"
                        fill
                        className="object-cover object-top cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                        onClick={() => onImageClick(image)}
                    />
                </div>
            ) : (
                <div className="w-full aspect-video relative overflow-hidden bg-black/5 dark:bg-white/5 mb-8 flex flex-col justify-center items-center">
                    <i className="ri-image-edit-line text-5xl opacity-20 mb-3"></i>
                    <p className="text-sm font-bold uppercase opacity-30">{status || 'В разработке'}</p>
                </div>
            )}

            {/* Project info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                {/* Left: title + category */}
                <div className="md:col-span-4">
                    <span className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-40">{number} {status || 'Избранный проект'}</span>
                    <h3 className="text-3xl md:text-4xl font-bold uppercase leading-tight tracking-tighter">
                        {title}
                    </h3>
                    <p className="mt-3 text-sm font-medium opacity-60 uppercase tracking-wide">{category}</p>
                </div>

                {/* Middle: tasks */}
                {tasks.length > 1 && (
                    <div className="md:col-span-5">
                        <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-40">Задачи</p>
                        <ul className="space-y-2 text-sm leading-relaxed opacity-70">
                            {tasks.map((task, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="opacity-40">—</span>
                                    <span>{task}</span>
                                </li>
                            ))}
                        </ul>
                        {link && link !== '#' && (
                            <a href={link} target="_blank" className="inline-flex items-center gap-2 mt-6 text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity" rel="noopener noreferrer">
                                Сайт <i className="ri-arrow-right-up-line"></i>
                            </a>
                        )}
                    </div>
                )}

                {/* Right: stack */}
                {stack.length > 0 && (
                    <div className="md:col-span-3">
                        <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-40">Стек</p>
                        <ul className="space-y-2 text-sm font-medium">
                            {stack.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 opacity-70">
                                    <i className={`${item.icon} text-base`}></i>
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
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
                { icon: "ri-shield-check-fill", name: "Order Logic Engine", info: "Скрипт валидации гео-зон." },
                { icon: "ri-map-pin-2-fill", name: "DaData API", info: "Геокодинг адресов." },
                { icon: "ri-code-box-fill", name: "Google Apps Script", info: "Custom API для системы лояльности." },
                { icon: "ri-whatsapp-fill", name: "WhatsApp Integration", info: "Автоматическое формирование заказа." }
            ]
        },
        {
            number: "02.",
            title: <>MODEL<br />PORTFOLIO</>,
            category: "Разработка визуального портфолио для fashion-модели.",
            image: "",
            status: "Скоро релиз",
            tasks: ["Акцент на Webflow анимации и эстетику."],
            link: "#",
            stack: []
        },
        {
            number: "03.",
            title: <>B2B FASHION<br />WHOLESALE</>,
            category: "Оптовый магазин одежды.",
            image: "",
            status: "Скоро релиз",
            tasks: ["Лидогенерация и оптовые каталоги."],
            link: "#",
            stack: []
        }
    ];

    return (
        <section id="projects" className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 scroll-mt-8">
            {/* Section header */}
            <div className="flex items-center gap-8 mb-16 md:mb-20">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none">
                    Проекты
                </h2>
                <hr className="swiss-divider flex-1" />
            </div>

            {/* Project list */}
            <div className="space-y-20 md:space-y-28">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} onImageClick={onOpenLightbox} />
                ))}
            </div>
        </section>
    );
}
