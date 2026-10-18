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
    const { number, titleLines, category, images, tasks, result, link, linkLabel = 'Сайт', stack, challenge, testimonial } = project;
    const [lightboxData, setLightboxData] = useState<{ images: string[]; index: number } | null>(null);
    const [isGalleryHovered, setIsGalleryHovered] = useState(false);
    const others = projects.filter((p) => p.slug !== slug);

    return (
        <div className="bg-transparent text-black font-sans min-h-screen transition-colors duration-300 relative">
            <ScrollEffects />
            <Lightbox data={lightboxData} onClose={() => setLightboxData(null)} />

            <Header />

            <main className="relative z-10 px-4 md:px-6 pt-4 md:pt-6">
                <div className="px-2 md:px-4 pb-4 md:pb-6">
                    <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:opacity-60 transition-opacity">
                        <i className="ri-arrow-left-line"></i> Все проекты
                    </Link>
                </div>

                {/* Desktop: story on the left, screenshots, tasks and stack on the right.
                    Phones: the column wrappers become `contents`, so `order` sets a single reading flow. */}
                <article className="flex flex-col md:grid md:grid-cols-12 grid-border bg-white overflow-hidden mb-8">
                    <div className="contents md:flex md:flex-col md:col-span-5 xl:col-span-4 md:p-10 xl:p-12 md:border-r-grid">
                        <header className="order-1 md:order-none p-6 md:p-0 border-b-grid md:border-b-0">
                            <span className="block text-sm font-bold uppercase tracking-widest mb-4">{number} Кейс</span>
                            <h1 className="text-5xl md:text-6xl font-bold uppercase leading-[0.95] tracking-tighter">
                                {titleLines.map((line, i) => (
                                    <span key={i}>{i > 0 && <br />}{line}</span>
                                ))}
                            </h1>
                            <p className="mt-4 text-base font-bold uppercase tracking-tighter underline opacity-80">{category}</p>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-6">
                                <a href={link} target="_blank" className="inline-flex items-center gap-2 font-bold uppercase bg-black text-white px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base hover:opacity-80 transition-opacity rounded-full whitespace-nowrap" rel="noopener noreferrer">
                                    {linkLabel} <i className="ri-arrow-right-up-line"></i>
                                </a>
                                <CopyLinkButton path={`/projects/${slug}`} />
                            </div>
                        </header>

                        <div className="order-3 md:order-none p-6 md:p-0 md:mt-10 border-b-grid md:border-b-0">
                            {challenge && (
                                <section className="mb-6 md:mb-8">
                                    <h2 className="text-lg md:text-xl font-bold uppercase mb-3">Задача клиента</h2>
                                    <p className="text-base md:text-lg leading-relaxed font-medium">{challenge}</p>
                                </section>
                            )}
                            <div className="p-5 md:p-6 bg-black/5 rounded-2xl">
                                <h2 className="text-xs font-bold uppercase mb-2 text-black/60 tracking-widest">Результат</h2>
                                <p className="text-base md:text-lg font-medium leading-relaxed text-black">{result}</p>
                            </div>
                        </div>
                    </div>

                    <div className="contents md:flex md:flex-col md:col-span-7 xl:col-span-8">
                        <div className="order-2 md:order-none" onMouseEnter={() => setIsGalleryHovered(true)} onMouseLeave={() => setIsGalleryHovered(false)}>
                            <ProjectGallery
                                images={images}
                                priority
                                label={category.split(' / ')[0]}
                                isHovered={isGalleryHovered}
                                onImageClick={(imgs, index) => setLightboxData({ images: imgs, index })}
                            />
                        </div>

                        <section className="order-4 md:order-none p-6 md:p-10 xl:p-12 border-b-grid">
                            <h2 className="text-lg md:text-xl font-bold uppercase mb-4">Задачи</h2>
                            <ul className="list-disc list-outside ml-5 text-base leading-relaxed font-medium text-gray-600 space-y-3 max-w-3xl">
                                {tasks.map((task, i) => (
                                    <li key={i}>{task}</li>
                                ))}
                            </ul>
                        </section>

                        <div className="order-5 md:order-none p-6 md:p-10 xl:p-12">
                            <StackList stack={stack} />
                        </div>
                    </div>

                    {testimonial && (
                        <figure className="order-6 md:order-none md:col-span-12 p-6 md:p-12 border-t-grid bg-black text-white">
                            <blockquote className="text-xl md:text-3xl font-medium leading-snug tracking-tight max-w-4xl">«{testimonial.quote}»</blockquote>
                            <figcaption className="mt-6 text-sm font-bold uppercase tracking-widest opacity-60">{testimonial.author}</figcaption>
                        </figure>
                    )}
                </article>

                <Contact />

                <section className="grid-border bg-white overflow-hidden mb-8">
                    <h2 className="p-6 md:px-12 md:py-8 border-b-grid text-xl font-bold uppercase tracking-widest">Другие проекты</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {others.map((p, i) => (
                            <Link
                                key={p.slug}
                                href={`/projects/${p.slug}`}
                                className={`group p-4 md:p-10 flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-6 hover:bg-black/5 transition-colors ${i < others.length - 1 ? 'border-b-grid md:border-b-0 md:border-r-grid' : ''}`}
                            >
                                <div className="relative w-28 shrink-0 md:w-auto aspect-video rounded-lg overflow-hidden border border-black/10 bg-zinc-100">
                                    <Image src={p.images[0]} alt={p.titleLines.join(' ')} fill sizes="(min-width: 768px) 33vw, 112px" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-1 md:mb-2">{p.number} {p.category.split(' / ')[0]}</span>
                                    <span className="flex items-center justify-between gap-4 text-lg md:text-2xl font-bold uppercase tracking-tight">
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
