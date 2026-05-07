import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSupabaseClient } from "@/lib/supabase";

type OrdemRow = {
  id: string;
  descricao: string;
  valor: number | null;
  status: "aberta" | "em_andamento" | "finalizada" | string;
  created_at: string;
  clientes: { nome: string } | { nome: string }[] | null;
};

function formatDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("pt-BR");
}

function formatCurrency(value: number | null) {
  if (value === null) return "-";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getClientName(clientData: OrdemRow["clientes"]) {
  if (!clientData) return "Cliente nao encontrado";
  return Array.isArray(clientData) ? (clientData[0]?.nome ?? "Cliente nao encontrado") : clientData.nome;
}

function getStatusLabel(status: string) {
  if (status === "aberta") return "Aberta";
  if (status === "em_andamento") return "Em andamento";
  if (status === "finalizada") return "Finalizada";
  return status;
}

function getStatusClass(status: string) {
  if (status === "aberta") return "border-amber-300/40 text-amber-300";
  if (status === "em_andamento") return "border-blue-300/40 text-blue-300";
  if (status === "finalizada") return "border-emerald-300/40 text-emerald-300";
  return "border-white/20 text-slate-200";
}

export function ServiceOrdersPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ordens, setOrdens] = useState<OrdemRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as { successMessage?: string } | null;

    if (state?.successMessage) {
      setSuccessMessage(state.successMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

  async function loadOrdens() {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setErrorMessage("Supabase nao configurado.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { data, error } = await supabase
      .from("ordens_servico")
      .select("id, descricao, valor, status, created_at, clientes!ordens_servico_cliente_id_fkey(nome)")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage("Nao foi possivel carregar as ordens de servico.");
      setIsLoading(false);
      return;
    }

    setOrdens((data ?? []) as OrdemRow[]);
    setIsLoading(false);
  }

  useEffect(() => {
    void loadOrdens();
  }, []);

  async function handleDeleteOrder(ordemId: string) {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setErrorMessage("Supabase nao configurado.");
      return;
    }

    const shouldDelete = window.confirm("Deseja excluir esta ordem de servico?");
    if (!shouldDelete) return;

    setIsSaving(true);

    const { error } = await supabase.from("ordens_servico").delete().eq("id", ordemId);

    if (error) {
      setErrorMessage("Nao foi possivel excluir a ordem de servico.");
      setIsSaving(false);
      return;
    }

    await loadOrdens();
    setSuccessMessage("Ordem de servico excluida com sucesso.");
    setIsSaving(false);
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Ordens de servico</h2>
          <p className="mt-2 text-slate-300">Acompanhe o andamento das ordens com dados de cliente e valores.</p>
        </div>
        <Link to="/dashboard/ordens/novo" className="btn-primary px-4 py-2">
          Nova ordem
        </Link>
      </div>

      {successMessage ? (
        <p className="alert-success mt-4">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="alert-error mt-4">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="panel min-w-[860px]">
          <table className="min-w-full divide-y divide-white/10 text-xs sm:text-sm">
          <thead className="bg-slate-900/60 text-left text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Cliente</th>
              <th className="px-4 py-3 font-semibold">Descricao</th>
              <th className="px-4 py-3 font-semibold">Valor</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Data de criacao</th>
              <th className="px-4 py-3 font-semibold">Acoes</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  Carregando ordens...
                </td>
              </tr>
            ) : ordens.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  Nenhuma ordem cadastrada. Clique em "Nova ordem" para iniciar.
                </td>
              </tr>
            ) : (
              ordens.map((ordem) => (
                <tr key={ordem.id} className="text-slate-200">
                  <td className="px-4 py-3 font-medium text-white">{getClientName(ordem.clientes)}</td>
                  <td className="px-4 py-3">{ordem.descricao}</td>
                  <td className="px-4 py-3">{formatCurrency(ordem.valor)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                        getStatusClass(ordem.status),
                      ].join(" ")}
                    >
                      {getStatusLabel(ordem.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(ordem.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-nowrap gap-2">
                      <Link
                        to={`/dashboard/ordens/${ordem.id}/editar`}
                        className={["btn-secondary px-3 py-1.5 text-xs", isSaving ? "pointer-events-none opacity-60" : ""].join(" ")}
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteOrder(ordem.id)}
                        disabled={isSaving}
                        className="btn-danger"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}