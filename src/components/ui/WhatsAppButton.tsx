import { workshopInfo } from "@/content/workshopContent";
import { cn } from "@/utils/cn";

type WhatsAppButtonProps = {
  label?: string;
  className?: string;
  ariaLabel?: string;
};

export function WhatsAppButton({
  label = "Chamar no WhatsApp",
  className,
  ariaLabel = "Abrir conversa no WhatsApp",
}: WhatsAppButtonProps) {
  return (
    <a
      href={workshopInfo.whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "btn-primary",
        className
      )}
    >
      {label}
    </a>
  );
}