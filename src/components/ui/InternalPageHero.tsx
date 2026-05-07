type InternalPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function InternalPageHero({ eyebrow, title, description }: InternalPageHeroProps) {
  return (
    <section className="border-b border-amber-300/20 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-amber-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}