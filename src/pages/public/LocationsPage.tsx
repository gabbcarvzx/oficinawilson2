import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { Section } from "@/components/ui/Section";
import { seoPages } from "@/content/seoContent";
import { units } from "@/content/workshopContent";
import { usePageSeo } from "@/lib/seo/usePageSeo";

export function LocationsPage() {
  usePageSeo(seoPages.locations);

  return (
    <>
      <InternalPageHero
        eyebrow="Unidades"
        title="Duas unidades preparadas para atendimento tecnico com agendamento rapido"
        description="Escolha a unidade mais proxima em Sao Paulo e fale diretamente com nossa equipe para revisao, diagnostico e servicos preventivos."
      />

      <Section
        title="Nossas unidades"
        description="Dados ficticios e faceis de substituir. Cada unidade possui endereco, telefone e mapa incorporado."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {units.map((unit) => (
            <article key={unit.name} className="panel overflow-hidden">
              <div className="border-b border-white/10 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Oficina Automotiva</p>
                <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">{unit.name}</h3>
                <p className="mt-3 text-sm text-slate-300">{unit.address}</p>
                <p className="mt-1 text-sm text-slate-300">Telefone: {unit.phone}</p>
              </div>

              <iframe
                title={`Mapa ${unit.name}`}
                src={unit.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />

              <div className="flex flex-wrap gap-3 p-5">
                <a
                  href={`https://wa.me/${unit.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary px-4 py-2"
                >
                  WhatsApp da unidade
                </a>
                <a
                  href={`tel:${unit.phone.replace(/\s/g, "")}`}
                  className="btn-secondary"
                >
                  Ligar agora
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}