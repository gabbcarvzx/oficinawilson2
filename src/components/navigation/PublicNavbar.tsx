import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { workshopInfo } from "@/content/workshopContent";

const publicLinks = [
  { to: "/", label: "Inicio" },
  { to: "/servicos", label: "Servicos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/unidades", label: "Unidades" },
  { to: "/contato", label: "Contato" },
];

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-amber-300/20 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link to="/" className="max-w-[70%] text-lg font-black uppercase tracking-tight text-white sm:text-xl md:max-w-none md:text-2xl">
          {workshopInfo.brand}
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((state) => !state)}
          className="btn-secondary px-3 py-2 text-xs md:hidden"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {publicLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition",
                  isActive ? "text-amber-300" : "text-slate-300 hover:text-white",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
          <WhatsAppButton label="WhatsApp" className="px-4 py-2 text-xs" />
          <Link to="/login" className="text-sm font-semibold text-slate-300 transition hover:text-white">
            Area interna
          </Link>
        </nav>
      </div>

      {isOpen ? (
        <nav className="space-y-1 border-t border-white/10 px-4 pb-4 pt-2 sm:px-6 md:hidden">
          {publicLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                [
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  isActive ? "bg-white/10 text-amber-300" : "text-slate-300",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2">
            <WhatsAppButton label="Chamar no WhatsApp" className="w-full" />
          </div>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-slate-300">
            Area interna
          </Link>
        </nav>
      ) : null}
    </header>
  );
}