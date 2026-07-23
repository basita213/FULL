'use client';

import { useEffect, useState } from 'react';
import { getGallery, type GalleryItem } from '@/lib/api';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const gridClasses = [
    'md:col-span-2 md:row-span-2',
    '',
    'md:row-span-2',
    '',
    '',
    '',
    'md:col-span-2',
    '',
  ];

  return (
    <section id="gallery" className="py-24 bg-white rounded-5xl max-w-[1320px] mx-auto px-10">
      <div className="text-center mb-16">
        <span className="inline-block font-display font-semibold text-xs uppercase tracking-[3px] text-pink bg-pink-pale px-5 py-1.5 rounded-full mb-4">
          Notre univers
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
          Un monde de <em className="font-script font-normal text-pink text-[1.15em] not-italic">couleurs</em>
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-2xl bg-pink-pale/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${gridClasses[i] || ''}`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
