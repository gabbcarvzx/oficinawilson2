import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { ContactPage } from "@/pages/public/ContactPage";
import { HomePage } from "@/pages/public/HomePage";
import { LocationsPage } from "@/pages/public/LocationsPage";
import { ServicesPage } from "@/pages/public/ServicesPage";
import { AboutPage } from "@/pages/public/AboutPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ClientsPage } from "@/pages/private/ClientsPage";
import { DashboardPage } from "@/pages/private/DashboardPage";
import { EditClientPage } from "@/pages/private/EditClientPage";
import { NewClientPage } from "@/pages/private/NewClientPage";
import { NewServiceOrderPage } from "@/pages/private/NewServiceOrderPage";
import { ServiceOrdersPage } from "@/pages/private/ServiceOrdersPage";
import { EditServiceOrderPage } from "@/pages/private/EditServiceOrderPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/unidades" element={<LocationsPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="clientes" element={<ClientsPage />} />
        <Route path="clientes/novo" element={<NewClientPage />} />
        <Route path="clientes/:id/editar" element={<EditClientPage />} />
        <Route path="ordens" element={<ServiceOrdersPage />} />
        <Route path="ordens/novo" element={<NewServiceOrderPage />} />
        <Route path="ordens/:id/editar" element={<EditServiceOrderPage />} />
        <Route path="ordens-servico" element={<Navigate to="/dashboard/ordens" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}