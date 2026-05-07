import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { seoPages } from "@/content/seoContent";
import { workshopInfo } from "@/content/workshopContent";
import { usePageSeo } from "@/lib/seo/usePageSeo";

export function AboutPage() {
  usePageSeo(seoPages.about);

  return (
    <>
      <InternalPageHero
        eyebrow="Sobre"
        title="Confianca tecnica e atendimento transparente para o seu veiculo"
        description="Conheca como nossa equipe combina experiencia pratica, tecnologia de diagnostico e processos claros para entregar resultados consistentes."
      />

      <Section
        title="Nossa empresa"
        description={`${workshopInfo.brand} atende motoristas e frotas leves com foco em seguranca, qualidade e previsibilidade de prazo.`}
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-slate-300">
            <p>
              Fundada em 2010, a oficina foi estruturada para oferecer um padrao profissional de atendimento,
              da triagem inicial ate a entrega final do veiculo.
            </p>
            <p>
              Cada servico passa por etapas definidas: diagnostico tecnico, aprovacao de orcamento, execucao com
              pecas homologadas e revisao final antes da liberacao.
            </p>
          </div>

          <div className="space-y-4 border-l-2 border-amber-300/70 pl-5 text-slate-200">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Compromissos</p>
            <p>Comunicacao clara durante todo o atendimento.</p>
            <p>Relatorio tecnico com orientacoes para manutencao preventiva.</p>
            <p>Garantia de servico e acompanhamento pos-entrega.</p>
          </div>
        </div>

        <div className="mt-8">
          <WhatsAppButton label="Falar com a oficina no WhatsApp" />
        </div>
      </Section>
    </>
  );
}