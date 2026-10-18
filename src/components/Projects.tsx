'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects, type Project } from '@/data/projects';
import ProjectGallery from './ProjectGallery';
import CopyLinkButton from './CopyLinkButton';

interface ProjectCardProps {
    project: Project;
    isFirst: boolean;
    onImageClick: (images: string[], index: number) => void;
}

// The homepage card is a teaser: title, screenshots and the result. Tasks and stack live on the project page.
const ProjectCard = ({ project, isFirst, onImageClick }: ProjectCardProps) => {
    const { slug, number, titleLines, category, images, tasks, result, link, linkLabel = 'Сайт', demoCredentials, status } = project;
    const [isHovered, setIsHovered] = useState(false);
    const href = `/projects/${slug}`;

    return (
        <div
            className={`grid-border bg-white overflow-hidden ${status ? 'opacity-60 hover:opacity-100 duration-500' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-6 md:p-10 xl:p-12 border-b-grid flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                    <span className="block text-sm font-bold uppercase tracking-widest mb-4">{number} {status || 'Избранный проект'}</span>
                    <h3 className="text-4xl xl:text-5xl font-bold uppercase leading-tight tracking-tight">
                        <Link href={href} className="hover:opacity-60 transition-opacity">
                            {titleLines.join(' ')}
                        </Link>
                    </h3>
                    {status ? (
                        <span className="mt-4 inline-block px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest w-fit">{status}</span>
                    ) : (
                        <p className="mt-3 text-base font-medium opacity-80 uppercase tracking-tighter font-bold underline">{category}</p>
                    )}
                </div>

                {images.length > 0 && (
                    <div className="flex flex-col gap-3 lg:items-end">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <Link href={href} className="inline-flex items-center gap-2 font-bold uppercase bg-black text-white px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base hover:opacity-80 transition-opacity rounded-full whitespace-nowrap shrink-0">
                                Подробнее <i className="ri-arrow-right-line"></i>
                            </Link>
                            <a href={link} target="_blank" className="inline-flex items-center gap-2 font-bold uppercase border border-black px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base hover:bg-black/5 transition-colors rounded-full whitespace-nowrap shrink-0" rel="noopener noreferrer">
                                {linkLabel} <i className="ri-arrow-right-up-line"></i>
                            </a>
                            <CopyLinkButton path={href} />
                        </div>
                        {demoCredentials && (
                            <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-black/5 rounded-xl border border-black/10 w-fit">
                                <i className="ri-key-2-line text-sm opacity-50 hidden sm:block"></i>
                                <span className="text-xs font-bold uppercase opacity-50 tracking-wider">Логин:</span>
                                <span className="text-sm font-mono font-medium bg-white px-2 py-0.5 rounded shadow-sm border border-black/5 select-all mr-2">{demoCredentials.login}</span>

                                <span className="text-xs font-bold uppercase opacity-50 tracking-wider">Пароль:</span>
                                <span className="text-sm font-mono font-medium bg-white px-2 py-0.5 rounded shadow-sm border border-black/5 select-all">{demoCredentials.pass}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {images.length > 0 ? (
                <>
                    <ProjectGallery
                        images={images}
                        label={category.split(' / ')[0]}
                        isHovered={isHovered}
                        priority={isFirst}
                        onImageClick={onImageClick}
                    />

                    {result && (
                        <div className="p-6 md:p-10 xl:p-12">
                            <h4 className="text-xs font-bold uppercase mb-2 text-black/60 tracking-widest">Результат</h4>
                            <p className="text-base md:text-lg font-medium leading-relaxed text-black max-w-4xl">{result}</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col justify-center items-center p-12 bg-white min-h-[300px]">
                    <i className="ri-image-edit-line text-6xl text-gray-300 mb-4"></i>
                    <p className="text-lg font-bold uppercase text-gray-400 text-center max-w-xs">
                        {category}
                        <br /><span className="text-sm font-normal normal-case mt-2 block">{tasks[0]}</span>
                    </p>
                </div>
            )}
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
