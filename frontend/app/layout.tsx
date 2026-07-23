import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Candy Days Draria — Bonbons & Cadeaux',
  description: 'Candy Days Draria — Votre boutique de bonbons, bouquets et cadeaux sucrés à Draria, Alger. Livraison disponible.',
  icons: { icon: '/logo.jpg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
