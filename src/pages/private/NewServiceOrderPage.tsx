import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export function NewServiceOrderPage() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [form, setForm] = useState<ServiceOrderForm>(initialForm);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadClients() {
      const supabase = getSupabaseClient();

      if (!supabase) {
        setErrorMessage("Supabase nao configurado.");
        setIsLoadingClients(false);
        return;
      }

      const { data, error } = await supabase.from("clientes").select("id, nome").order("nome", { ascending: true });

      if (error) {
        setErrorMessage("Nao foi possivel carregar os clientes.");
        setIsLoadingClients(false);
        return;
      }

      setClients((data ?? []) as ClientOption[]);
      setIsLoadingClients(false);
    }

    void loadClients();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

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

    const { error } = await supabase.from("ordens_servico").insert({
      cliente_id: form.clienteId,
      descricao: form.descricao.trim(),
      valor: form.valor.trim() ? Number(form.valor) : null,
      status: form.status,
    });

    if (error) {
      setErrorMessage("Nao foi possivel salvar a ordem de servico.");
      setIsSaving(false);
      return;
    }

    navigate("/dashboard/ordens", {
      replace: true,
      state: { successMessage: "Ordem de servico criada com sucesso." },
    });
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Nova ordem de servico</h2>
          <p className="mt-2 text-slate-300">Cadastre uma nova ordem e acompanhe o andamento no painel.</p>
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

      <form onSubmit={handleSubmit} className="panel mt-6 max-w-2xl p-6">
        <fieldset disabled={isSaving || isLoadingClients} className="space-y-4 disabled:opacity-70">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-200">Cliente *</span>
          <select
            value={form.clienteId}
            onChange={(event) => setForm((prev) => ({ ...prev, clienteId: event.target.value }))}
            className="input-field"
            disabled={isLoadingClients}
          >
            <option value="">{isLoadingClients ? "Carregando clientes..." : "Selecione um cliente"}</option>
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
          disabled={isSaving || isLoadingClients}
          className="btn-primary"
        >
          {isSaving ? "Salvando..." : "Salvar ordem"}
        </button>
        </fieldset>
      </form>
    </section>
  );
}