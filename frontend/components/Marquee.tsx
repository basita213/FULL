export default function Marquee() {
  const items = ['Candy Days', 'Bonbons', 'Bouquets', 'Cadeaux', 'Draria'];

  return (
    <div className="bg-pink py-4 overflow-hidden">
      <div
        className="flex items-center gap-10 w-max"
        style={{ animation: 'marqueeScroll 20s linear infinite' }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display font-bold text-white text-lg uppercase tracking-[2px] whitespace-nowrap">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-white opacity-50 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
