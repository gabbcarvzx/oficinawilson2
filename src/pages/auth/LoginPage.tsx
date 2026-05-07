import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { seoPages } from "@/content/seoContent";
import { useAuth } from "@/features/auth/AuthContext";
import { usePageSeo } from "@/lib/seo/usePageSeo";

function getFriendlyAuthError(errorMessage: string) {
  const message = errorMessage.toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "Email ou senha invalidos. Confira os dados e tente novamente.";
  }

  if (message.includes("email not confirmed")) {
    return "Confirme seu email antes de entrar.";
  }

  return "Nao foi possivel entrar agora. Tente novamente em instantes.";
}

export function LoginPage() {
  usePageSeo(seoPages.login);

  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const { error } = await login(email, password);

    if (error) {
      setErrorMessage(getFriendlyAuthError(error));
      setIsSubmitting(false);
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  return (
    <section className="mx-auto flex min-h-[78vh] w-full max-w-md items-center px-6 py-16">
      <div className="panel w-full p-8 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Area interna</p>
        <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-white">Entrar no dashboard</h1>
        <p className="mt-2 text-slate-300">Use seu email e senha para acessar a area administrativa.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
               className="input-field"
              placeholder="voce@empresa.com"
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-200">Senha</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
               className="input-field"
              placeholder="********"
              autoComplete="current-password"
            />
          </label>

          {errorMessage ? (
            <p className="alert-error">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </section>
  );
}