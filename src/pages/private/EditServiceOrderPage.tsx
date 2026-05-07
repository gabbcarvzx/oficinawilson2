import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSupabaseClient } from "@/lib/supabase";

type ClientOption = {
  id: string;
  nome: string;
};

type ServiceOrderForm = {
  clienteId: string;
  descricao: string;
  valor: string;
  status: "aberta" | "em_andamento" | "finalizada";
};

const initialForm: ServiceOrderForm = {
  clienteId: "",
  descricao: "",
  valor: "",
  status: "aberta",
};

export function EditServiceOrderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [form, setForm] = useState<ServiceOrderForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      if (!id) {
        setErrorMessage("Ordem de servico invalida.");
        setIsLoading(false);
        return;
      }

      const supabase = getSupabaseClient();

      if (!supabase) {
        setErrorMessage("Supabase nao configurado.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      const [clientsResult, orderResult] = await Promise.all([
        supabase.from("clientes").select("id, nome").order("nome", { ascending: true }),
        supabase.from("ordens_servico").select("id, cliente_id, descricao, valor, status").eq("id", id).single(),
      ]);

      if (clientsResult.error || orderResult.error || !orderResult.data) {
        setErrorMessage("Nao foi possivel carregar os dados da ordem.");
        setIsLoading(false);
        return;
      }

      setClients((clientsResult.data ?? []) as ClientOption[]);
      setForm({
        clienteId: orderResult.data.cliente_id,
        descricao: orderResult.data.descricao,
        valor: orderResult.data.valor === null ? "" : String(orderResult.data.valor),
        status: orderResult.data.status,
      });
      setIsLoading(false);
    }

    void loadInitialData();
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!id) {
      setErrorMessage("Ordem de servico invalida.");
      return;
    }

    if (!form.clienteId) {
      setErrorMessage("Selecione um cliente.");
      return;
    }

    if (!form.descricao.trim()) {
      setErrorMessage("Informe a descricao da ordem de servico.");
      return;
    }

    if (form.valor.trim() && Number.isNaN(Number(form.valor))) {
      setErrorMessage("Informe um valor valido.");
      return;
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      setErrorMessage("Supabase nao configurado.");
      return;
    }

    setIsSaving(true);

    const { error } = await supabase
      .from("ordens_servico")
      .update({
        cliente_id: form.clienteId,
        descricao: form.descricao.trim(),
        valor: form.valor.trim() ? Number(form.valor) : null,
        status: form.status,
      })
      .eq("id", id);

    if (error) {
      setErrorMessage("Nao foi possivel salvar as alteracoes da ordem.");
      setIsSaving(false);
      return;
    }

    navigate("/dashboard/ordens", {
      replace: true,
      state: { successMessage: "Ordem de servico atualizada com sucesso." },
    });
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Editar ordem de servico</h2>
          <p className="mt-2 text-slate-300">Atualize os dados da ordem e salve as alteracoes.</p>
        </div>
        <Link
          to="/dashboard/ordens"
          className="btn-secondary"
        >
          Voltar
        </Link>
      </div>

      {errorMessage ? (
        <p className="alert-error mt-4">
          {errorMessage}
        </p>
      ) : null}

      {isLoading ? (
        <p className="mt-6 text-slate-300">Carregando dados da ordem...</p>
      ) : (
        <form onSubmit={handleSubmit} className="panel mt-6 max-w-2xl p-6">
          <fieldset disabled={isSaving} className="space-y-4 disabled:opacity-70">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Cliente *</span>
            <select
              value={form.clienteId}
              onChange={(event) => setForm((prev) => ({ ...prev, clienteId: event.target.value }))}
              className="input-field"
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nome}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Descricao *</span>
            <textarea
              rows={4}
              value={form.descricao}
              onChange={(event) => setForm((prev) => ({ ...prev, descricao: event.target.value }))}
              className="input-field resize-y"
              placeholder="Descreva o servico solicitado"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Valor</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.valor}
              onChange={(event) => setForm((prev) => ({ ...prev, valor: event.target.value }))}
              className="input-field"
              placeholder="0.00"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Status *</span>
            <select
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  status: event.target.value as ServiceOrderForm["status"],
                }))
              }
              className="input-field"
            >
              <option value="aberta">Aberta</option>
              <option value="em_andamento">Em andamento</option>
              <option value="finalizada">Finalizada</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary"
          >
            {isSaving ? "Salvando..." : "Salvar alteracoes"}
          </button>
          </fieldset>
        </form>
      )}
    </section>
  );
}