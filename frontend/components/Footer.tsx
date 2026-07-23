export default function Footer() {
  const links = [
    { href: '#hero', label: 'Accueil' },
    { href: '#products', label: 'Produits' },
    { href: '#gallery', label: 'Galerie' },
    { href: '#about', label: 'À Propos' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-dark text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <img src="/logo.jpg" alt="Candy Days" className="w-16 h-16 rounded-full object-cover border-2 border-white/15" />
          <p className="text-gray-light text-sm max-w-xs">
            Des bonbons et du bonheur, livrés à Draria et alentours.
          </p>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-10 pb-8 border-b border-white/10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display font-medium text-sm px-5 py-2 rounded-full hover:bg-pink/20 hover:text-pink-light transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex justify-between items-center flex-wrap gap-3">
          <span className="text-gray text-sm">&copy; 2026 Candy Days Draria. Tous droits réservés.</span>
          <a
            href="https://www.instagram.com/candy_days_draria/"
            target="_blank"
            rel="noopener"
            className="font-display font-medium text-sm text-pink-light hover:text-pink transition-colors"
          >
            @candy_days_draria
          </a>
        </div>
      </div>
    </footer>
  );
}
