import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type AuthContextValue = {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    const initializeSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(Boolean(data.session));
      setIsLoading(false);
    };

    void initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      isAuthenticated,
      login: async (email, password) => {
        const supabase = getSupabaseClient();

        if (!supabase) {
          return { error: "Supabase nao configurado. Verifique as variaveis de ambiente." };
        }

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error: error.message };
        }

        return { error: null };
      },
      logout: async () => {
        const supabase = getSupabaseClient();

        if (supabase) {
          await supabase.auth.signOut();
        }

        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}