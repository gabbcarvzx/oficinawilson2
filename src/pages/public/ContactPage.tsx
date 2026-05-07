import { FormEvent, useState } from "react";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { seoPages } from "@/content/seoContent";
import { workshopInfo } from "@/content/workshopContent";
import { usePageSeo } from "@/lib/seo/usePageSeo";

export function ContactPage() {
  usePageSeo(seoPages.contact);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState("Revisao completa");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  // mascara simples de telefone
  function formatarTelefone(valor: string) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 6)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 10)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome || !telefone || !servico) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setEnviando(true);

    const numeroWhatsapp = "5511994001122"; // +55 11 99400-1122

    const texto = `Olá, meu nome é ${nome}.
Telefone: ${telefone}
Serviço de interesse: ${servico}
Mensagem: ${mensagem || "Não informada."}`;

    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");

    setEnviando(false);
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
          <form onSubmit={handleSubmit} className="panel space-y-4 p-6">
            
            {/* Nome */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">
                Nome *
              </span>
              <input
                type="text"
                placeholder="Seu nome completo"
                className="input-field"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </label>

            {/* Telefone */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">
                Telefone *
              </span>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                className="input-field"
                value={telefone}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                required
              />
            </label>

            {/* Serviço */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">
                Servico de interesse *
              </span>
              <select
                className="input-field"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                required
              >
                <option>Revisao completa</option>
                <option>Diagnostico eletronico</option>
                <option>Freios e suspensao</option>
                <option>Outro servico</option>
              </select>
            </label>

            {/* Mensagem */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">
                Mensagem
              </span>
              <textarea
                rows={4}
                placeholder="Descreva rapidamente o que voce precisa"
                className="input-field resize-y"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
            </label>

            {/* Botão */}
            <button
              type="submit"
              disabled={enviando}
              className="btn-primary w-full disabled:opacity-60"
            >
              {enviando ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>

          {/* Aside */}
          <aside className="panel space-y-4 p-6 text-slate-200">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              Canais de atendimento
            </h3>
            <p>WhatsApp: +55 11 99400-1122</p>
            <p>Telefone: {workshopInfo.phone}</p>
            <p>Email: {workshopInfo.email}</p>
            <p>Endereco: {workshopInfo.address}</p>
            <p>Horario: {workshopInfo.hours}</p>

            <WhatsAppButton
              label="Falar com atendente no WhatsApp"
              className="mt-2 w-full"
            />
          </aside>
        </div>
      </Section>
    </>
  );
}