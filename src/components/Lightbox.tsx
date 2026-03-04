'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LightboxProps {
    src: string | null;
    onClose: () => void;
}

export default function Lightbox({ src, onClose }: LightboxProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (src) {
            setIsOpen(true);
            document.body.style.overflow = 'hidden';
        } else {
            setIsOpen(false);
            document.body.style.overflow = '';
        }
    }, [src]);

    if (!src) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black/80 flex justify-center items-center transition-opacity duration-300 backdrop-blur-md ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div className="relative max-w-[90%] max-h-[90%] w-full h-full">
                <Image
                    id="lightbox-img"
                    src={src}
                    alt="Full screen project"
                    fill
                    className={`object-contain shadow-2xl transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:opacity-60 p-4 transition-opacity"
                aria-label="Close"
            >
                <i className="ri-close-line text-4xl"></i>
            </button>
        </div>
    );
}
