import { ReactNode } from "react";

type SectionProps = {
  title: string;
  description: string;
  children?: ReactNode;
  id?: string;
};

export function Section({ title, description, children, id }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300/95">Oficina Automotiva</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}