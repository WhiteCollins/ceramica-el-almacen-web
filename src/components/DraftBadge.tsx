/**
 * Etiqueta para proyectos de ejemplo (`draft: true`). Solo aparece cuando los
 * borradores son visibles: en `npm run dev` o con NEXT_PUBLIC_SHOW_DRAFTS=1.
 */
export function DraftBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none inline-flex w-fit items-center bg-[#6b1d22] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm ${className}`}
    >
      Ejemplo
    </span>
  );
}
