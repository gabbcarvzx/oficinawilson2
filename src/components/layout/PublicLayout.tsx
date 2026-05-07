import { Outlet } from "react-router-dom";
import { PublicNavbar } from "@/components/navigation/PublicNavbar";
import { FloatingWhatsAppButton } from "@/components/ui/FloatingWhatsAppButton";
import { workshopInfo } from "@/content/workshopContent";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PublicNavbar />
      <main className="pb-24">
        <Outlet />
      </main>
      <FloatingWhatsAppButton />
      <footer className="border-t border-amber-300/20 bg-slate-950 px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <p className="text-xl font-black uppercase tracking-tight text-white">{workshopInfo.brand}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">{workshopInfo.slogan}</p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-amber-300">Contato</p>
            <p className="mt-3 text-sm text-slate-300">WhatsApp: {workshopInfo.whatsappLabel}</p>
            <p className="mt-1 text-sm text-slate-300">Telefone: {workshopInfo.phone}</p>
            <p className="mt-1 text-sm text-slate-300">Email: {workshopInfo.email}</p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-amber-300">Endereco</p>
            <p className="mt-3 text-sm text-slate-300">{workshopInfo.address}</p>
            <p className="mt-1 text-sm text-slate-300">{workshopInfo.hours}</p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-5 text-xs text-slate-500">
          {new Date().getFullYear()} {workshopInfo.brand}. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}