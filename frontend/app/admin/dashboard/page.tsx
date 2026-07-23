'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, testimonials: 0, gallery: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch('/api/v1/products/admin'),
      apiFetch('/api/v1/testimonials/admin'),
      apiFetch('/api/v1/gallery/admin'),
      apiFetch('/api/v1/contact'),
    ]).then(([p, t, g, c]) => {
      setStats({
        products: p.data?.length || 0,
        testimonials: t.data?.length || 0,
        gallery: g.data?.length || 0,
        contacts: c.data?.length || 0,
      });
    }).finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Produits', value: stats.products, icon: '🍬', color: 'bg-pink-pale', link: '/admin/dashboard/products' },
    { label: 'Avis clients', value: stats.testimonials, icon: '⭐', color: 'bg-yellow-50', link: '/admin/dashboard/testimonials' },
    { label: 'Photos galerie', value: stats.gallery, icon: '🖼️', color: 'bg-blue-50', link: '/admin/dashboard/gallery' },
    { label: 'Messages', value: stats.contacts, icon: '💬', color: 'bg-green-50', link: '/admin/dashboard/contacts' },
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-3xl mb-2">Dashboard</h1>
      <p className="text-gray mb-8">Gérez votre site Candy Days</p>

      {loading ? (
        <div className="grid grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 rounded-3xl bg-white animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.link}
              className={`${card.color} rounded-3xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all`}
            >
              <span className="text-3xl">{card.icon}</span>
              <div className="font-display font-bold text-3xl mt-3">{card.value}</div>
              <div className="text-sm text-gray mt-1">{card.label}</div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-10 bg-white rounded-3xl p-8 shadow-sm">
        <h2 className="font-display font-bold text-xl mb-4">Liens rapides</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/dashboard/products" className="px-5 py-2.5 rounded-full bg-pink text-white font-display font-medium text-sm hover:bg-pink-deep transition-colors">Ajouter un produit</a>
          <a href="/admin/dashboard/testimonials" className="px-5 py-2.5 rounded-full bg-pink text-white font-display font-medium text-sm hover:bg-pink-deep transition-colors">Ajouter un avis</a>
          <a href="/admin/dashboard/gallery" className="px-5 py-2.5 rounded-full bg-pink text-white font-display font-medium text-sm hover:bg-pink-deep transition-colors">Ajouter une photo</a>
          <a href="/admin/dashboard/settings" className="px-5 py-2.5 rounded-full border-2 border-pink-light text-pink font-display font-medium text-sm hover:bg-pink-pale transition-colors">Paramètres du site</a>
        </div>
      </div>
    </div>
  );
}
