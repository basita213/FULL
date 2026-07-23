'use client';

export default function About() {
  return (
    <section id="about" className="py-24 px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-20 items-center">
        <div className="relative flex justify-center">
          <img
            src="/logo.jpg"
            alt="Candy Days Logo"
            className="w-full max-w-[380px] rounded-5xl relative z-10 shadow-[0_8px_32px_rgba(26,10,20,0.08)]"
          />
          <div
            className="absolute w-full h-full bg-pink-light top-5 left-5 z-0"
            style={{ animation: 'blobMorph 6s ease-in-out infinite' }}
          />
        </div>

        <div>
          <span className="inline-block font-display font-semibold text-xs uppercase tracking-[3px] text-pink bg-pink-pale px-5 py-1.5 rounded-full mb-4">
            Notre Histoire
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-6">
            Candy Days, <em className="font-script font-normal text-pink text-[1.15em] not-italic">c&apos;est quoi?</em>
          </h2>
          <p className="text-gray text-lg leading-[1.75] mb-4">
            Candy Days est une boutique de bonbons et cadeaux sucrés basée à Draria, Alger. Nous créons des arrangements uniques — bouquets de bonbons, coffrets cadeaux et compositions sur mesure — pour rendre chaque occasion plus douce et plus colorée.
          </p>
          <p className="text-gray text-lg leading-[1.75] mb-9">
            Que ce soit pour un anniversaire, une Saint-Valentin, ou simplement pour faire plaisir, notre équipe compose avec passion des créations qui font sourire.
          </p>
          <div className="flex gap-10">
            {[
              { num: '200+', label: 'Posts' },
              { num: '31k+', label: 'Followers' },
              { num: '100%', label: 'Passion' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display font-bold text-3xl text-pink">{stat.num}</span>
                <span className="text-sm text-gray-light uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
