'use client';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-pale via-white to-pink-pale">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] bg-pink-light rounded-full opacity-50 blur-[80px] -top-[10%] -right-[5%]"
          style={{ animation: 'blobFloat 8s ease-in-out infinite' }}
        />
        <div
          className="absolute w-[350px] h-[350px] bg-candy-yellow rounded-full opacity-30 blur-[80px] bottom-[10%] -left-[5%]"
          style={{ animation: 'blobFloat 8s ease-in-out infinite -3s' }}
        />
        <div
          className="absolute w-[250px] h-[250px] bg-candy-purple rounded-full opacity-25 blur-[80px] top-[40%] left-[30%]"
          style={{ animation: 'blobFloat 8s ease-in-out infinite -5s' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        <p
          className="font-display font-semibold text-xs uppercase tracking-[3px] text-pink mb-5"
          style={{ animation: 'heroReveal 0.8s 0.2s both' }}
        >
          Draria, Alger
        </p>
        <h1 className="font-display font-bold leading-none mb-6">
          <span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ animation: 'heroReveal 0.8s 0.4s both' }}
          >
            Des Bonbons
          </span>
          <span
            className="block font-script font-normal text-pink text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ animation: 'heroReveal 0.8s 0.55s both' }}
          >
            et du Bonheur
          </span>
        </h1>
        <p
          className="text-gray text-lg max-w-md mx-auto mb-9"
          style={{ animation: 'heroReveal 0.8s 0.7s both' }}
        >
          Bouquets de bonbons, coffrets cadeaux et arrangements sucrés pour toutes vos occasions.
        </p>
        <div
          className="flex gap-4 justify-center flex-wrap"
          style={{ animation: 'heroReveal 0.8s 0.85s both' }}
        >
          <a href="#products" className="inline-flex items-center gap-2 font-display font-semibold px-8 py-3.5 rounded-full bg-pink text-white shadow-[0_4px_16px_rgba(233,30,140,0.3)] hover:bg-pink-deep hover:-translate-y-0.5 hover:scale-[1.03] transition-all">
            Découvrir
          </a>
          <a
            href="https://wa.me/213555877636"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 font-display font-semibold px-8 py-3.5 rounded-full bg-white text-dark border-2 border-pink-light hover:border-pink hover:text-pink hover:-translate-y-0.5 hover:scale-[1.03] transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: 'heroReveal 0.8s 1.2s both' }}>
        <span className="font-display text-[0.7rem] uppercase tracking-[2px] text-gray-light">Scroll</span>
        <div className="w-px h-10 bg-pink-light relative overflow-hidden">
          <div className="absolute top-[-100%] left-0 w-full h-full bg-pink" style={{ animation: 'scrollLine 2s ease-in-out infinite' }}/>
        </div>
      </div>
    </section>
  );
}
