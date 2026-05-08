import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";

const dashboardLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/clientes", label: "Clientes" },
  { to: "/dashboard/ordens", label: "Ordens de servico" },
];

export function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentPageTitle =
    dashboardLinks.find((link) => (link.to === "/dashboard" ? location.pathname === link.to : location.pathname.startsWith(link.to)))
      ?.label ?? "Dashboard";

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:flex">
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-[82vw] max-w-72 border-r border-white/10 bg-slate-900/95 px-6 py-6 shadow-2xl shadow-black/40 transition-transform md:static md:w-72 md:max-w-none md:translate-x-0 md:shadow-none",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="mb-2 flex justify-end md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="btn-secondary px-2.5 py-1 text-[11px]"
          >
            Fechar
          </button>
        </div>
        <Link to="/dashboard" className="text-xl font-black uppercase tracking-tight text-white" onClick={() => setIsMenuOpen(false)}>
          Dutra AutoPeças Admin
        </Link>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-amber-300">Painel Administrativo</p>

        <nav className="mt-8 space-y-2">
          {dashboardLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/dashboard"}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                [
                  "block rounded-lg px-3 py-2 text-sm font-semibold transition",
                  isActive ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="btn-secondary mt-8 w-full"
        >
          Sair
        </button>
      </aside>

      {isMenuOpen ? <button type="button" onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-30 bg-black/50 md:hidden" aria-label="Fechar menu" /> : null}

      <div className="flex-1 md:ml-0">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl sm:px-6 md:px-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Painel</p>
              <h1 className="text-lg font-black uppercase tracking-tight text-white sm:text-2xl">{currentPageTitle}</h1>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen((state) => !state)}
              className="btn-secondary px-3 py-2 text-xs md:hidden"
            >
              Menu
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 md:px-10 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}