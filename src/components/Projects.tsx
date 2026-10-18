'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects, type Project } from '@/data/projects';
import ProjectGallery from './ProjectGallery';
import CopyLinkButton from './CopyLinkButton';

// The homepage card is a teaser; the full task list and stack live on the project page.
const CARD_TASKS = 3;

const pluralTasks = (n: number) => {
    const mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'задача';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'задачи';
    return 'задач';
};

interface ProjectCardProps {
    project: Project;
    isFirst: boolean;
    onImageClick: (images: string[], index: number) => void;
}

const ProjectCard = ({ project, isFirst, onImageClick }: ProjectCardProps) => {
    const { slug, number, titleLines, category, images, tasks, cardTasks, result, link, linkLabel = 'Сайт', demoCredentials, status } = project;
    const shownTasks = cardTasks ? cardTasks.map((i) => tasks[i]) : tasks.slice(0, CARD_TASKS);
    const hiddenCount = tasks.length - shownTasks.length;
    const [isHovered, setIsHovered] = useState(false);
    const href = `/projects/${slug}`;

    return (
        // Desktop: title, result and buttons on the left; screenshots and tasks on the right.
        // Phones: the column wrappers become `contents`, so `order` interleaves title → screenshots → result.
        <div
            className={`flex flex-col md:grid md:grid-cols-12 grid-border bg-white overflow-hidden ${status ? 'opacity-60 hover:opacity-100 duration-500' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="contents md:flex md:flex-col md:col-span-5 xl:col-span-4 md:p-10 xl:p-12 md:border-r-grid">
                <div className="order-1 md:order-none p-6 md:p-0 border-b-grid md:border-b-0">
                    <span className="block text-sm font-bold uppercase tracking-widest mb-4">{number} {status || 'Избранный проект'}</span>
                    <h3 className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase leading-tight tracking-tight">
                        <Link href={href} className="hover:opacity-60 transition-opacity">
                            {titleLines.map((line, i) => (
                                <span key={i}>{i > 0 && <br />}{line}</span>
                            ))}
                        </Link>
                    </h3>
                    {status ? (
                        <span className="mt-4 inline-block px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest w-fit">{status}</span>
                    ) : (
                        <p className="mt-4 text-base font-medium opacity-80 uppercase tracking-tighter font-bold underline">{category}</p>
                    )}
                </div>

                {images.length > 0 && (
                    <div className="order-3 md:order-none p-6 md:p-0 md:mt-8">
                        {result && (
                            <div className="p-5 md:p-6 bg-black/5 rounded-2xl">
                                <h4 className="text-xs font-bold uppercase mb-2 text-black/60 tracking-widest">Результат</h4>
                                <p className="text-base font-medium leading-relaxed text-black">{result}</p>
                            </div>
                        )}
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4 md:mt-6">
                            <Link href={href} className="inline-flex items-center gap-2 font-bold uppercase bg-black text-white px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base hover:opacity-80 transition-opacity rounded-full whitespace-nowrap shrink-0">
                                Подробнее <i className="ri-arrow-right-line"></i>
                            </Link>
                            <a href={link} target="_blank" className="inline-flex items-center gap-2 font-bold uppercase border border-black px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base hover:bg-black/5 transition-colors rounded-full whitespace-nowrap shrink-0" rel="noopener noreferrer">
                                {linkLabel} <i className="ri-arrow-right-up-line"></i>
                            </a>
                            <CopyLinkButton path={href} />
                            {demoCredentials && (
                                <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-black/5 rounded-xl border border-black/10 w-full">
                                    <i className="ri-key-2-line text-sm opacity-50 hidden sm:block"></i>
                                    <span className="text-xs font-bold uppercase opacity-50 tracking-wider">Логин:</span>
                                    <span className="text-sm font-mono font-medium bg-white px-2 py-0.5 rounded shadow-sm border border-black/5 select-all mr-2">{demoCredentials.login}</span>

                                    <span className="text-xs font-bold uppercase opacity-50 tracking-wider">Пароль:</span>
                                    <span className="text-sm font-mono font-medium bg-white px-2 py-0.5 rounded shadow-sm border border-black/5 select-all">{demoCredentials.pass}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="contents md:flex md:flex-col md:col-span-7 xl:col-span-8">
                {images.length > 0 ? (
                    <>
                        <div className="order-2 md:order-none">
                            <ProjectGallery
                                images={images}
                                label={category.split(' / ')[0]}
                                isHovered={isHovered}
                                priority={isFirst}
                                onImageClick={onImageClick}
                            />
                        </div>

                        {/* Phones get the short card; the task list lives on the project page */}
                        <div className="hidden md:block p-10 xl:p-12">
                            <div className="max-w-2xl">
                                <h4 className="text-lg font-bold uppercase mb-3">Задачи</h4>
                                <ul className="list-disc list-outside ml-4 text-base leading-relaxed font-medium mb-4 text-gray-600 space-y-2">
                                    {shownTasks.map((task, i) => (
                                        <li key={i}>{task}</li>
                                    ))}
                                </ul>
                                {hiddenCount > 0 && (
                                    <Link href={href} className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity">
                                        Ещё {hiddenCount} {pluralTasks(hiddenCount)} и стек проекта <i className="ri-arrow-right-line"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="order-2 md:order-none flex-grow flex flex-col justify-center items-center p-12 bg-white min-h-[300px]">
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
    return (
        <section id="projects" className="grid grid-cols-1 gap-8 mb-8 scroll-mt-8">
            {projects.map((project, i) => (
                <div key={project.slug} className="fade-in-section">
                    <ProjectCard project={project} isFirst={i === 0} onImageClick={onOpenLightbox} />
                </div>
            ))}
        </section>
    );
}
