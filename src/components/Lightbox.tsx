'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LightboxProps {
 data: { images: string[]; index: number } | null;
 onClose: () => void;
}

export default function Lightbox({ data, onClose }: LightboxProps) {
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
 if (data) {
 setCurrentIndex(data.index);
 document.body.style.overflow = 'hidden';
 } else {
 document.body.style.overflow = '';
 }
 }, [data]);

 if (!data) return null;

 const handlePrev = (e: React.MouseEvent) => {
 e.stopPropagation();
 setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
 };

 const handleNext = (e: React.MouseEvent) => {
 e.stopPropagation();
 setCurrentIndex((prev) => (prev + 1) % data.images.length);
 };

 return (
 <div
 className={`fixed inset-0 z-[100] bg-black/90 flex justify-center items-center transition-opacity duration-300 backdrop-blur-md ${data ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
 onClick={onClose}
 >
 <div className="relative max-w-[90%] max-h-[90%] w-full h-full flex items-center justify-center">
 <Image
 id="lightbox-img"
 src={data.images[currentIndex]}
 alt="Full screen project"
 fill
 className={`object-contain shadow-2xl transition-transform duration-300 ${data ? 'scale-100' : 'scale-95'}`}
 onClick={(e) => e.stopPropagation()}
 />
 
 {data.images.length > 1 && (
 <>
 <button
 onClick={handlePrev}
 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 transition-colors z-50 bg-black/20 hover:bg-black/40 rounded-full hidden md:block"
 aria-label="Previous"
 >
 <i className="ri-arrow-left-s-line text-4xl"></i>
 </button>
 <button
 onClick={handleNext}
 className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 transition-colors z-50 bg-black/20 hover:bg-black/40 rounded-full hidden md:block"
 aria-label="Next"
 >
 <i className="ri-arrow-right-s-line text-4xl"></i>
 </button>
 
 {/* Invisible Tap Areas for Mobile Navigation */}
 <button
 onClick={handlePrev}
 className="absolute left-0 top-0 bottom-0 z-40 w-1/4 md:hidden"
 aria-label="Previous"
 />
 <button
 onClick={handleNext}
 className="absolute right-0 top-0 bottom-0 z-40 w-1/4 md:hidden"
 aria-label="Next"
 />
 </>
 )}
 </div>
 <button
 onClick={onClose}
 className="absolute top-6 right-6 md:top-12 md:right-12 text-white/70 hover:text-white p-4 transition-colors z-50 bg-black/20 hover:bg-black/40 rounded-full"
 aria-label="Close"
 >
 <i className="ri-close-line text-2xl md:text-4xl"></i>
 </button>
 </div>
 );
}
