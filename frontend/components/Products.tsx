'use client';

import { useEffect, useState } from 'react';
import { getProducts, type Product } from '@/lib/api';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="products" className="py-24 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block font-display font-semibold text-xs uppercase tracking-[3px] text-pink bg-pink-pale px-5 py-1.5 rounded-full mb-4">
          Nos Produits
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
          Tout est <em className="font-script font-normal text-pink text-[1.15em] not-italic">sucré</em>
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[260px]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`rounded-4xl bg-pink-pale/50 animate-pulse ${i === 1 ? 'md:col-span-2 md:row-span-2' : i <= 3 ? 'md:row-span-2' : ''}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[260px]">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`group relative rounded-4xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(233,30,140,0.18)] ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : i <= 2 ? 'md:row-span-2' : ''
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/10 to-transparent flex flex-col justify-end p-7 text-white">
                {product.tag && (
                  <span className="absolute top-5 left-5 bg-pink text-white font-display font-semibold text-[0.75rem] uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                    {product.tag}
                  </span>
                )}
                <h3 className={`font-display font-bold mb-1.5 ${i === 0 ? 'text-2xl' : 'text-xl'}`}>
                  {product.name}
                </h3>
                <p className="text-sm opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-85 group-hover:translate-y-0 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
