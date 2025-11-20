"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "https://i.imgur.com/T5TkJpy.jpeg",
    "https://i.imgur.com/D8hNFOO.jpeg",
    "https://i.imgur.com/otXQSG6.jpeg",
    "https://i.imgur.com/8ZRK2ll.jpeg",
    "https://i.imgur.com/GMjjoK9.jpeg",
    "https://i.imgur.com/eyNajEN.jpeg",
    "https://i.imgur.com/m4IATPa.jpeg",
    "https://i.imgur.com/SAk0orU.jpeg",
    "https://i.imgur.com/5u53X9s.jpeg",
    "https://i.imgur.com/rVthYYW.jpeg",
    "https://i.imgur.com/Krfkf9T.jpeg",
    "https://i.imgur.com/hHYpcO5.jpeg",
    "https://i.imgur.com/kPCFRJ0.jpeg",
    "https://i.imgur.com/AVXdpGw.jpeg",
    "https://i.imgur.com/mTfl3cV.jpeg",
    "https://i.imgur.com/EdfkqnB.jpeg",
    "https://i.imgur.com/OngAJdU.jpeg",
    "https://i.imgur.com/0Qd6raQ.jpeg",
    "https://i.imgur.com/FAcBTwc.jpeg",
    "https://i.imgur.com/J9WvbY8.jpeg",
    "https://i.imgur.com/RqKk4bR.jpeg",
    "https://i.imgur.com/lDqbowt.jpeg",
];

export default function Gallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex(prev => prev === null ? null : (prev + 1) % images.length);
    }, []);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex(prev => prev === null ? null : (prev - 1 + images.length) % images.length);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;

            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedIndex(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    return (
        <div className="h-full bg-black overflow-y-auto p-4">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative group break-inside-avoid cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="text-white w-8 h-8 drop-shadow-lg" />
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 z-50 transition-colors"
                            onClick={handlePrev}
                        >
                            <ChevronLeft className="w-12 h-12" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 z-50 transition-colors"
                            onClick={handleNext}
                        >
                            <ChevronRight className="w-12 h-12" />
                        </button>

                        <motion.img
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            src={images[selectedIndex]}
                            alt="Full screen"
                            className="max-w-full max-h-full object-contain shadow-2xl p-4 select-none"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
