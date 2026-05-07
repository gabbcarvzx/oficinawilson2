import { FormEvent } from "react";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { seoPages } from "@/content/seoContent";
import { workshopInfo } from "@/content/workshopContent";
import { usePageSeo } from "@/lib/seo/usePageSeo";

export function ContactPage() {
  usePageSeo(seoPages.contact);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <InternalPageHero
        eyebrow="Contato"
        title="Fale com nossa equipe para agendar seu atendimento"
        description="Envie seus dados no formulario ou chame no WhatsApp para receber orientacao inicial e previsao de horario."
      />

      <Section
        title="Formulario de contato"
        description="Preenchimento rapido para duvidas, revisoes e pedidos de orcamento."
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="panel space-y-4 p-6"
          >
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Nome</span>
              <input
                type="text"
                placeholder="Seu nome completo"
                className="input-field"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Telefone</span>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                className="input-field"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Servico de interesse</span>
              <select className="input-field">
                <option>Revisao completa</option>
                <option>Diagnostico eletronico</option>
                <option>Freios e suspensao</option>
                <option>Outro servico</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Mensagem</span>
              <textarea
                rows={4}
                placeholder="Descreva rapidamente o que voce precisa"
                className="input-field resize-y"
              />
            </label>

            <button
              type="submit"
              className="btn-primary"
            >
              Enviar mensagem
            </button>
          </form>

          <aside className="panel space-y-4 p-6 text-slate-200">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">Canais de atendimento</h3>
            <p>WhatsApp: {workshopInfo.whatsappLabel}</p>
            <p>Telefone: {workshopInfo.phone}</p>
            <p>Email: {workshopInfo.email}</p>
            <p>Endereco: {workshopInfo.address}</p>
            <p>Horario: {workshopInfo.hours}</p>
            <WhatsAppButton label="Falar com atendente no WhatsApp" className="mt-2 w-full" />
          </aside>
        </div>
      </Section>
    </>
  );
}