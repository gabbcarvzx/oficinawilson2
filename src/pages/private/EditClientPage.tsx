import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSupabaseClient } from "@/lib/supabase";

type FormState = {
  nome: string;
  telefone: string;
  email: string;
};

const initialForm: FormState = {
  nome: "",
  telefone: "",
  email: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function EditClientPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadClient() {
      if (!id) {
        setErrorMessage("Cliente invalido.");
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

      const { data, error } = await supabase
        .from("clientes")
        .select("id, nome, telefone, email")
        .eq("id", id)
        .single();

      if (error || !data) {
        setErrorMessage("Nao foi possivel carregar os dados do cliente.");
        setIsLoading(false);
        return;
      }

      setForm({
        nome: data.nome,
        telefone: data.telefone ?? "",
        email: data.email ?? "",
      });
      setIsLoading(false);
    }

    void loadClient();
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!id) {
      setErrorMessage("Cliente invalido.");
      return;
    }

    if (!form.nome.trim()) {
      setErrorMessage("Informe o nome do cliente.");
      return;
    }

    if (form.email.trim() && !isValidEmail(form.email.trim())) {
      setErrorMessage("Informe um email valido.");
      return;
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      setErrorMessage("Supabase nao configurado.");
      return;
    }

    setIsSaving(true);

    const { error } = await supabase
      .from("clientes")
      .update({
        nome: form.nome.trim(),
        telefone: form.telefone.trim() || null,
        email: form.email.trim() || null,
      })
      .eq("id", id);

    if (error) {
      setErrorMessage("Nao foi possivel salvar as alteracoes.");
      setIsSaving(false);
      return;
    }

    navigate("/dashboard/clientes", {
      replace: true,
      state: { successMessage: "Cliente atualizado com sucesso." },
    });
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Editar cliente</h2>
          <p className="mt-2 text-slate-300">Atualize os dados do cliente e salve as alteracoes.</p>
        </div>
        <Link
          to="/dashboard/clientes"
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
        <p className="mt-6 text-slate-300">Carregando dados do cliente...</p>
      ) : (
        <form onSubmit={handleSubmit} className="panel mt-6 max-w-2xl p-6">
          <fieldset disabled={isSaving} className="space-y-4 disabled:opacity-70">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Nome *</span>
            <input
              type="text"
              value={form.nome}
              onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
              className="input-field"
              placeholder="Nome do cliente"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Telefone</span>
            <input
              type="tel"
              value={form.telefone}
              onChange={(event) => setForm((prev) => ({ ...prev, telefone: event.target.value }))}
              className="input-field"
              placeholder="(11) 99999-9999"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="input-field"
              placeholder="cliente@email.com"
            />
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