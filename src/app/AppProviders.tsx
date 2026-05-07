import { ReactNode } from "react";
import { AuthProvider } from "@/features/auth/AuthContext";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}