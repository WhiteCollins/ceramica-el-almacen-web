import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CatalogExplorer } from "@/components/CatalogExplorer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo & Colecciones",
  description:
    "Explora nuestro catálogo técnico de porcelanatos españoles e italianos 60×120 cm, revestimientos artesanales, griferías IMEX en PVD y tinas Sottovento en stock local.",
};

function CatalogFallback() {
  return (
    <div aria-busy="true" className="space-y-4 animate-pulse py-2">
      <div className="h-14 bg-surface-container rounded-sm w-full max-w-xl mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-gutter pt-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-96 bg-surface-container rounded-sm w-full"
          />
        ))}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop py-4 lg:py-8">
      {/* Ruta de Exploración con estética editorial */}
      <nav
        aria-label="Ruta de exploración"
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-secondary mb-2"
      >
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] py-1.5 hover:text-on-surface transition-colors"
        >
          Inicio
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-on-surface font-semibold">
          Catálogo &amp; Colecciones
        </span>
      </nav>

      {/* Galería de Piezas con Fichas Técnicas y Solicitud de Muestras */}
      <Suspense fallback={<CatalogFallback />}>
        <CatalogExplorer />
      </Suspense>
    </div>
  );
}
