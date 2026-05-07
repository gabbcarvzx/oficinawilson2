import { workshopInfo } from "@/content/workshopContent";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={workshopInfo.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir conversa no WhatsApp da oficina"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-slate-900/95 px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-black/50 transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:bottom-6 sm:right-6"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-amber-300" fill="currentColor">
        <path d="M19.05 4.94A9.86 9.86 0 0 0 12 2a10 10 0 0 0-8.69 14.95L2 22l5.2-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.06ZM12 20.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.08.8.82-3-.2-.3a8.2 8.2 0 1 1 6.94 3.83Zm4.5-6.12c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.12-.55.12-.17.25-.64.8-.79.96-.14.17-.28.18-.53.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.24-.01-.37.1-.49.1-.1.25-.28.38-.42.12-.15.17-.25.25-.42.09-.16.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.49-.4-.42-.55-.42h-.47c-.16 0-.43.06-.66.3-.22.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.13.17 1.74 2.65 4.22 3.72.59.25 1.04.4 1.4.51.59.2 1.13.17 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.11-.22-.17-.47-.3Z" />
      </svg>
      <span className="hidden text-xs uppercase tracking-[0.16em] sm:inline">WhatsApp</span>
      <span className="sr-only">{workshopInfo.whatsappLabel}</span>
    </a>
  );
}