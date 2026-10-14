'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects, type Project } from '@/data/projects';
import ProjectGallery from './ProjectGallery';
import StackList from './StackList';
import CopyLinkButton from './CopyLinkButton';

interface ProjectCardProps {
    project: Project;
    onImageClick: (images: string[], index: number) => void;
}

const ProjectCard = ({ project, onImageClick }: ProjectCardProps) => {
    const { slug, number, titleLines, category, images, tasks, result, link, linkLabel = 'Сайт', demoCredentials, stack, status } = project;
    const [isHovered, setIsHovered] = useState(false);
    const href = `/projects/${slug}`;

    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-0 grid-border bg-white overflow-hidden ${status ? 'opacity-60 hover:opacity-100 duration-500' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="md:col-span-4 p-8 md:p-16 border-b-grid md:border-b-0 md:border-r-grid flex flex-col justify-between">
                <div>
                    <span className="block text-sm font-bold uppercase tracking-widest mb-4">{number} {status || 'Избранный проект'}</span>
                    <h3 className="text-4xl md:text-5xl font-bold uppercase leading-tight tracking-tight">
                        <Link href={href} className="hover:opacity-60 transition-opacity">
                            {titleLines.map((line, i) => (
                                <span key={i}>{i > 0 && <br />}{line}</span>
                            ))}
                        </Link>
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
                        <ProjectGallery
                            images={images}
                            label={category.split(' / ')[0]}
                            isHovered={isHovered}
                            onImageClick={onImageClick}
                        />

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
                                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 mt-6">
                                    <Link href={href} className="inline-flex items-center gap-2 text-base font-bold uppercase bg-black text-white px-6 py-3 hover:opacity-80 transition-opacity rounded-[8px] whitespace-nowrap shrink-0">
                                        Подробнее <i className="ri-arrow-right-line"></i>
                                    </Link>
                                    <a href={link} target="_blank" className="inline-flex items-center gap-2 text-base font-bold uppercase border border-black px-6 py-3 hover:bg-black/5 transition-colors rounded-[8px] whitespace-nowrap shrink-0" rel="noopener noreferrer">
                                        {linkLabel} <i className="ri-arrow-right-up-line"></i>
                                    </a>
                                    <CopyLinkButton path={href} />
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
                            <StackList stack={stack} />
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
    return (
        <section id="projects" className="grid grid-cols-1 gap-12 md:gap-16 mb-8 scroll-mt-8">
            {projects.map((project) => (
                <div key={project.slug} className="fade-in-section">
                    <ProjectCard project={project} onImageClick={onOpenLightbox} />
                </div>
            ))}
        </section>
    );
}
