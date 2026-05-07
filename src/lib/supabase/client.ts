import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfigOrThrow, supabaseConfig } from "@/lib/supabase/config";

let supabaseBrowserClient: SupabaseClient | null = null;

export const isSupabaseConfigured = supabaseConfig.isConfigured;

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (supabaseBrowserClient) {
    return supabaseBrowserClient;
  }

  const { url, anonKey } = getSupabaseConfigOrThrow();

  supabaseBrowserClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return supabaseBrowserClient;
}

export const supabase = getSupabaseClient();