import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { differentials, serviceItems, workshopInfo } from "@/content/workshopContent";
import { seoPages } from "@/content/seoContent";
import { usePageSeo } from "@/lib/seo/usePageSeo";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function HomePage() {
  usePageSeo(seoPages.home);

  return (
    <>
      <section className="relative min-h-[84vh] overflow-hidden border-b border-amber-300/20">
        <img
          src="/images/oficina-hero.jpg"
          alt="Equipe tecnica em oficina automotiva moderna"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.95),rgba(2,6,23,0.15))]" />

        <div className="relative mx-auto flex min-h-[84vh] w-full max-w-6xl flex-col justify-center px-6 py-16">
          <motion.p {...fadeInUp} className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300 sm:text-sm">
            {workshopInfo.brand}
          </motion.p>
          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" as const }}
            className="mt-4 max-w-3xl text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-6xl"
          >
            Mecanica de alta confianca para quem precisa do carro pronto todo dia.
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" as const }}
            className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg"
          >
            Revisao, diagnostico e reparos com processo transparente, prazo claro e suporte rapido pelo
            WhatsApp. Oficina mecanica em Sao Paulo para carros nacionais e importados, com duas unidades.
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" as const }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <WhatsAppButton label="Solicitar orcamento no WhatsApp" className="w-full sm:w-auto" />
            <Link
              to="/login"
              className="w-full rounded-md border border-white/40 px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:border-white sm:w-auto"
            >
              Area interna
            </Link>
          </motion.div>
        </div>
      </section>

      <Section
        id="servicos"
        title="Servicos para manter seu veiculo sempre pronto"
        description="Planos de manutencao e servicos tecnicos com padrao profissional para rotina urbana, estrada e uso intenso."
      >
        <div className="grid gap-4 text-slate-200 md:grid-cols-2">
          {serviceItems.map((service) => (
            <p key={service} className="border-b border-white/15 pb-3 text-base sm:text-lg">
              {service}
            </p>
          ))}
        </div>
      </Section>

      <section className="border-y border-white/10 bg-slate-900/60">
        <Section
          id="sobre"
          title="Sobre a oficina"
          description="Mais de 15 anos de experiencia em mecanica automotiva, com foco em seguranca, performance e atendimento direto."
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="max-w-3xl text-slate-300"
          >
            A {workshopInfo.brand} trabalha com diagnostico preciso e comunicacao objetiva. Antes de qualquer
            intervencao, voce recebe avaliacao tecnica e estimativa de prazo para aprovar com tranquilidade.
          </motion.p>
        </Section>
      </section>

      <Section
        id="diferenciais"
        title="Diferenciais que geram confianca"
        description="Processo padronizado e atendimento humano para entregar previsibilidade em cada etapa do servico."
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="grid gap-4 text-slate-200 md:grid-cols-2"
        >
          {differentials.map((item) => (
            <p key={item} className="border-l-2 border-amber-300 pl-4 text-base md:text-lg">
              {item}
            </p>
          ))}
        </motion.div>
      </Section>

      <section className="border-t border-amber-300/20 bg-amber-400/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Atendimento rapido</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Fale agora com a equipe da oficina
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Envie uma mensagem e receba orientacao inicial para revisao, barulho no motor ou luz de injecao.
            </p>
          </div>
          <WhatsAppButton label="Conversar no WhatsApp" className="w-full md:w-auto" />
        </div>
      </section>
    </>
  );
}