'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProjectGalleryProps {
    images: string[];
    label: string;
    // Autoplay runs only while the parent reports hover; leaving resets it.
    isHovered: boolean;
    // Only the gallery visible on load should fetch eagerly; the rest load on scroll.
    priority?: boolean;
    onImageClick: (images: string[], index: number) => void;
}

export default function ProjectGallery({ images, label, isHovered, priority = false, onImageClick }: ProjectGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    const [prevHovered, setPrevHovered] = useState(isHovered);
    if (prevHovered !== isHovered) {
        setPrevHovered(isHovered);
        if (!isHovered) setIsAutoPlaying(true);
    }

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
                        {label}
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
                                priority={priority && idx === 0}
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
    );
}
