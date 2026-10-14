'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, getProject } from '@/data/projects';
import Header from './Header';
import Footer from './Footer';
import Contact from './Contact';
import Lightbox from './Lightbox';
import ScrollEffects from './ScrollEffects';
import ProjectGallery from './ProjectGallery';
import StackList from './StackList';
import CopyLinkButton from './CopyLinkButton';

export default function ProjectView({ slug }: { slug: string }) {
    const project = getProject(slug)!;
    const { number, titleLines, category, images, tasks, result, link, linkLabel = 'Сайт', stack } = project;
    const [lightboxData, setLightboxData] = useState<{ images: string[]; index: number } | null>(null);
    const [isGalleryHovered, setIsGalleryHovered] = useState(false);
    const others = projects.filter((p) => p.slug !== slug);

    return (
        <div className="bg-transparent text-black font-sans min-h-screen transition-colors duration-300 relative">
            <ScrollEffects />
            <Lightbox data={lightboxData} onClose={() => setLightboxData(null)} />

            <Header />

            <main className="mb-20 relative z-10">
                <div className="px-6 md:px-10 py-6">
                    <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:opacity-60 transition-opacity">
                        <i className="ri-arrow-left-line"></i> Все проекты
                    </Link>
                </div>

                <article className="grid-border bg-white overflow-hidden mb-8">
                    <header className="p-8 md:p-16 border-b-grid flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <span className="block text-sm font-bold uppercase tracking-widest mb-4">{number} Кейс</span>
                            <h1 className="text-5xl md:text-7xl font-bold uppercase leading-[0.95] tracking-tighter">
                                {titleLines.map((line, i) => (
                                    <span key={i}>{i > 0 && <br />}{line}</span>
                                ))}
                            </h1>
                            <p className="mt-6 text-base font-bold uppercase tracking-tighter underline opacity-80">{category}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <a href={link} target="_blank" className="inline-flex items-center gap-2 text-base font-bold uppercase bg-black text-white px-6 py-3 hover:opacity-80 transition-opacity rounded-[8px] whitespace-nowrap" rel="noopener noreferrer">
                                {linkLabel} <i className="ri-arrow-right-up-line"></i>
                            </a>
                            <CopyLinkButton path={`/projects/${slug}`} />
                        </div>
                    </header>

                    <div onMouseEnter={() => setIsGalleryHovered(true)} onMouseLeave={() => setIsGalleryHovered(false)}>
                        <ProjectGallery
                            images={images}
                            label={category.split(' / ')[0]}
                            isHovered={isGalleryHovered}
                            onImageClick={(imgs, index) => setLightboxData({ images: imgs, index })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="md:col-span-8 p-8 md:p-16 border-b-grid md:border-b-0 md:border-r-grid">
                            <div className="mb-10 p-6 md:p-8 bg-black/5 border-l-4 border-black">
                                <h2 className="text-xs font-bold uppercase mb-2 text-black/60 tracking-widest">Результат</h2>
                                <p className="text-lg font-medium leading-relaxed text-black">{result}</p>
                            </div>
                            <h2 className="text-2xl font-bold uppercase mb-4">Задачи</h2>
                            <ul className="list-disc list-outside ml-5 text-base md:text-lg leading-relaxed font-medium text-gray-600 space-y-3">
                                {tasks.map((task, i) => (
                                    <li key={i}>{task}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-4 p-8 md:p-16">
                            <StackList stack={stack} />
                        </div>
                    </div>
                </article>

                <Contact />

                <section className="grid-border bg-white overflow-hidden">
                    <h2 className="p-8 md:px-16 md:py-10 border-b-grid text-xl font-bold uppercase tracking-widest">Другие проекты</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {others.map((p, i) => (
                            <Link
                                key={p.slug}
                                href={`/projects/${p.slug}`}
                                className={`group p-8 md:p-10 flex flex-col gap-6 hover:bg-black/5 transition-colors ${i < others.length - 1 ? 'border-b-grid md:border-b-0 md:border-r-grid' : ''}`}
                            >
                                <div className="relative aspect-video rounded-lg overflow-hidden border border-black/10 bg-zinc-100">
                                    <Image src={p.images[0]} alt={p.titleLines.join(' ')} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div>
                                    <span className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2">{p.number} {p.category.split(' / ')[0]}</span>
                                    <span className="flex items-center justify-between gap-4 text-2xl font-bold uppercase tracking-tight">
                                        {p.titleLines.join(' ')}
                                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
