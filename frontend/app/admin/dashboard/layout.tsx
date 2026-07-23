'use client';

import { useAuth } from '../auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const nav = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/admin/dashboard/products', label: 'Produits', icon: '🍬' },
  { href: '/admin/dashboard/testimonials', label: 'Avis', icon: '⭐' },
  { href: '/admin/dashboard/gallery', label: 'Galerie', icon: '🖼️' },
  { href: '/admin/dashboard/contacts', label: 'Messages', icon: '💬' },
  { href: '/admin/dashboard/settings', label: 'Paramètres', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.push('/admin');
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen bg-[#FFF8FA] flex items-center justify-center"><div className="animate-pulse text-pink font-display">Chargement...</div></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex">
      <aside className="w-64 bg-white border-r border-pink-light/20 flex flex-col fixed h-full">
        <div className="p-6 border-b border-pink-light/20">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full border-2 border-pink-light" />
            <div>
              <h2 className="font-display font-bold text-sm">Candy Days</h2>
              <p className="text-[11px] text-gray-light">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => {
            const active = item.href === '/admin/dashboard' ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-pink text-white shadow-md'
                    : 'text-dark-soft hover:bg-pink-pale'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-pink-light/20">
          <div className="text-xs text-gray-light mb-2 px-2">{user.email}</div>
          <button onClick={logout} className="w-full text-left px-4 py-2.5 rounded-2xl text-sm text-gray hover:bg-red-50 hover:text-red-500 transition-all">
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
