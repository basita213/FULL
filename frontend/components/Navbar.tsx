'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#hero', label: 'Accueil' },
    { href: '#products', label: 'Produits' },
    { href: '#gallery', label: 'Galerie' },
    { href: '#about', label: 'À Propos' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_2px_20px_rgba(233,30,140,0.08)] py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <a href="#hero">
          <img
            src="/logo.jpg"
            alt="Candy Days Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-pink-light hover:scale-110 hover:-rotate-5 transition-transform"
          />
        </a>

        <ul className="hidden md:flex gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display font-medium text-sm px-4 py-2 rounded-full hover:bg-pink hover:text-white transition-all"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/candy_days_draria/"
            target="_blank"
            rel="noopener"
            className="w-10 h-10 rounded-full bg-pink-pale text-pink flex items-center justify-center hover:bg-pink hover:text-white hover:scale-110 transition-all"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`w-6 h-0.5 bg-dark rounded transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}/>
            <span className={`w-6 h-0.5 bg-dark rounded transition-all ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`w-6 h-0.5 bg-dark rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}/>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-24 px-8">
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block font-display text-xl py-3 px-5 rounded-2xl hover:bg-pink-pale transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
