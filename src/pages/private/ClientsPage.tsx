import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSupabaseClient } from "@/lib/supabase";

type Cliente = {
  id: string;
  nome: string;
  telefone: string | null;
  email: string | null;
  created_at: string;
};

function formatDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("pt-BR");
}

export function ClientsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const state = location.state as { successMessage?: string } | null;

    if (state?.successMessage) {
      setSuccessMessage(state.successMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

  async function loadClientes() {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setErrorMessage("Supabase nao configurado.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { data, error } = await supabase
      .from("clientes")
      .select("id, nome, telefone, email, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage("Nao foi possivel carregar os clientes.");
      setIsLoading(false);
      return;
    }

    setClientes((data ?? []) as Cliente[]);
    setIsLoading(false);
  }

  useEffect(() => {
    void loadClientes();
  }, []);

  async function handleDeleteClient(cliente: Cliente) {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setErrorMessage("Supabase nao configurado.");
      return;
    }

    const shouldDelete = window.confirm(`Excluir cliente ${cliente.nome}?`);
    if (!shouldDelete) return;

    setIsSaving(true);

    const { error } = await supabase.from("clientes").delete().eq("id", cliente.id);

    if (error) {
      if (error.code === "23503") {
        setErrorMessage("Este cliente possui ordens de servico vinculadas e nao pode ser excluido.");
      } else {
        setErrorMessage("Nao foi possivel excluir o cliente.");
      }
      setIsSaving(false);
      return;
    }

    await loadClientes();
    setSuccessMessage("Cliente excluido com sucesso.");
    setIsSaving(false);
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Clientes</h2>
          <p className="mt-2 text-slate-300">Gerencie os clientes cadastrados na oficina.</p>
        </div>
        <Link to="/dashboard/clientes/novo" className="btn-primary px-4 py-2">
          Novo cliente
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
        <div className="panel min-w-[720px]">
          <table className="min-w-full divide-y divide-white/10 text-xs sm:text-sm">
          <thead className="bg-slate-900/60 text-left text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">Telefone</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Data de criacao</th>
              <th className="px-4 py-3 font-semibold">Acoes</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  Carregando clientes...
                </td>
              </tr>
            ) : clientes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  Nenhum cliente cadastrado. Clique em "Novo cliente" para iniciar.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.id} className="text-slate-200">
                  <td className="px-4 py-3 font-medium text-white">{cliente.nome}</td>
                  <td className="px-4 py-3">{cliente.telefone ?? "-"}</td>
                  <td className="px-4 py-3">{cliente.email ?? "-"}</td>
                  <td className="px-4 py-3">{formatDate(cliente.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-nowrap gap-2">
                      <Link
                        to={`/dashboard/clientes/${cliente.id}/editar`}
                        className={["btn-secondary px-3 py-1.5 text-xs", isSaving ? "pointer-events-none opacity-60" : ""].join(" ")}
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteClient(cliente)}
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