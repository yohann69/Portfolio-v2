"use client";

import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="h-full bg-black overflow-y-auto p-4">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative group break-inside-avoid cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setSelectedImage(src)}
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
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full screen"
                            className="max-w-full max-h-full object-contain shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
