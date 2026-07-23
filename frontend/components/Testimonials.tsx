'use client';

import { useEffect, useState } from 'react';
import { getTestimonials, type Testimonial } from '@/lib/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-[#FFF8FA] to-pink-pale">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="inline-block font-display font-semibold text-xs uppercase tracking-[3px] text-pink bg-white px-5 py-1.5 rounded-full mb-4">
            Avis clients
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
            Ils nous <em className="font-script font-normal text-pink text-[1.15em] not-italic">adorent</em>
          </h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-4xl bg-white p-9 shadow-[0_8px_32px_rgba(26,10,20,0.08)] animate-pulse">
                <div className="h-4 w-24 bg-pink-pale rounded mb-4"/>
                <div className="h-20 bg-pink-pale rounded mb-5"/>
                <div className="h-4 w-20 bg-pink-pale rounded"/>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="relative bg-white rounded-4xl p-9 shadow-[0_8px_32px_rgba(26,10,20,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(233,30,140,0.18)] transition-all overflow-hidden"
              >
                <span className="absolute top-4 right-6 text-7xl font-script text-pink-light leading-none opacity-50">
                  &ldquo;
                </span>
                <div className="text-candy-yellow text-lg mb-4 tracking-wider">
                  {'★'.repeat(t.rating || 5)}
                </div>
                <p className="text-dark-soft text-base leading-[1.7] mb-5 relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <span className="font-display font-semibold text-sm text-pink">
                  — {t.author}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
