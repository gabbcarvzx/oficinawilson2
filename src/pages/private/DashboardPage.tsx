import { useEffect, useState } from "react";
import { seoPages } from "@/content/seoContent";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { usePageSeo } from "@/lib/seo/usePageSeo";

type DashboardSummary = {
  totalClientes: number;
  totalOrdens: number;
  ordensAbertas: number;
  ordensFinalizadas: number;
};

const initialSummary: DashboardSummary = {
  totalClientes: 0,
  totalOrdens: 0,
  ordensAbertas: 0,
  ordensFinalizadas: 0,
};

export function DashboardPage() {
  usePageSeo(seoPages.dashboard);

  const [summary, setSummary] = useState<DashboardSummary>(initialSummary);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setErrorMessage("Supabase nao configurado. Defina as variaveis de ambiente para exibir os dados.");
      setIsLoading(false);
      return;
    }

    const supabaseClient = supabase;

    async function loadSummary() {
      setIsLoading(true);
      setErrorMessage(null);

      const [clientesResult, ordensResult, abertasResult, finalizadasResult] = await Promise.all([
        supabaseClient.from("clientes").select("id", { count: "exact", head: true }),
        supabaseClient.from("ordens_servico").select("id", { count: "exact", head: true }),
        supabaseClient
          .from("ordens_servico")
          .select("id", { count: "exact", head: true })
          .eq("status", "aberta"),
        supabaseClient
          .from("ordens_servico")
          .select("id", { count: "exact", head: true })
          .eq("status", "finalizada"),
      ]);

      const queryError =
        clientesResult.error || ordensResult.error || abertasResult.error || finalizadasResult.error;

      if (queryError) {
        setErrorMessage("Nao foi possivel carregar os dados do painel. Verifique as tabelas no Supabase.");
        setIsLoading(false);
        return;
      }

      setSummary({
        totalClientes: clientesResult.count ?? 0,
        totalOrdens: ordensResult.count ?? 0,
        ordensAbertas: abertasResult.count ?? 0,
        ordensFinalizadas: finalizadasResult.count ?? 0,
      });
      setIsLoading(false);
    }

    void loadSummary();
  }, []);

  const summaryCards = [
    { label: "Total de clientes", value: summary.totalClientes },
    { label: "Total de ordens", value: summary.totalOrdens },
    { label: "Ordens abertas", value: summary.ordensAbertas },
    { label: "Ordens finalizadas", value: summary.ordensFinalizadas },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-white">Visao geral</h2>
      <p className="mt-2 max-w-2xl text-slate-300">Resumo operacional da oficina em tempo real via Supabase.</p>

      {errorMessage ? (
        <p className="alert-error mt-4">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article key={card.label} className="panel p-5">
            <p className="text-sm font-medium text-slate-400">{card.label}</p>
            <p className="mt-3 text-3xl font-black tracking-tight text-white">{isLoading ? "..." : card.value}</p>
          </article>
        ))}
      </div>

      <div className="panel mt-6 p-5">
        <p className="text-sm font-medium text-slate-400">Status da integracao</p>
        <p className="mt-2 text-lg font-semibold text-white">
          {isSupabaseConfigured ? "Supabase configurado" : "Supabase pendente"}
        </p>
        <p className="mt-1 text-sm text-slate-300">
          Status considerados nas ordens: aberta, em_andamento e finalizada.
        </p>
      </div>
    </section>
  );
}