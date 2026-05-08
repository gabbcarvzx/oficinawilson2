import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { seoPages } from "@/content/seoContent";
import { serviceCards, serviceItems } from "@/content/workshopContent";
import { usePageSeo } from "@/lib/seo/usePageSeo";

export function ServicesPage() {
  usePageSeo(seoPages.services);

  return (
    <>
      <InternalPageHero
        eyebrow="Servicos"
        title="Solucoes tecnicas para cada etapa da manutencao automotiva"
        description="Atendimento profissional em São Lourenço da Mata, com diagnostico preciso e execucao com garantia para manter seu veiculo seguro e confiavel."
      />

      <Section
        title="Cards de servicos"
        description="Pacotes mais solicitados por clientes que precisam de previsibilidade, transparencia e qualidade tecnica."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((service) => (
            <article
              key={service.title}
              className="panel p-5 transition hover:border-amber-300/40"
            >
              <h3 className="text-xl font-extrabold uppercase tracking-tight text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                {service.turnaround}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-lg text-slate-200">Tambem realizamos:</p>
          <ul className="mt-4 grid gap-3 text-slate-300 md:grid-cols-2">
            {serviceItems.map((item) => (
              <li key={item} className="border-b border-white/10 pb-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <WhatsAppButton label="Agendar servico pelo WhatsApp" />
        </div>
      </Section>
    </>
  );
}