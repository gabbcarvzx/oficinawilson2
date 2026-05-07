type NullableString = string | null;

function readEnvVar(key: string): string | undefined {
  const viteValue = (import.meta.env as Record<string, string | undefined>)[key];
  const processValue = globalThis.process?.env?.[key];

  return viteValue ?? processValue;
}

function normalizeEnv(value: string | undefined): NullableString {
  if (!value) return null;

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

const supabaseUrl =
  normalizeEnv(readEnvVar("NEXT_PUBLIC_SUPABASE_URL")) ?? normalizeEnv(readEnvVar("VITE_SUPABASE_URL"));

const supabaseAnonKey =
  normalizeEnv(readEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY")) ??
  normalizeEnv(readEnvVar("VITE_SUPABASE_ANON_KEY"));

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  isConfigured: Boolean(supabaseUrl && supabaseAnonKey),
};

export function getSupabaseConfigOrThrow() {
  if (!supabaseConfig.isConfigured || !supabaseConfig.url || !supabaseConfig.anonKey) {
    throw new Error(
      "Supabase nao configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (ou NEXT_PUBLIC_* em ambiente Next.js)."
    );
  }

  return {
    url: supabaseConfig.url,
    anonKey: supabaseConfig.anonKey,
  };
}