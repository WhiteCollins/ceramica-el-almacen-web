import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { Icon } from "@/components/Icon";

// Render por petición: así CatalogExplorer (que lee los filtros de la URL con
// useSearchParams) se pinta completo en el servidor y el HTML ya incluye el H1
// y las fichas. En modo estático Next solo enviaría el esqueleto de carga.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo & Colecciones",
  description:
    "Explora nuestro catálogo técnico de porcelanatos españoles e italianos 60×120 cm, revestimientos artesanales, griferías IMEX en PVD y tinas Sottovento en stock local.",
};

function CatalogFallback() {
  return (
    <div aria-busy="true" className="space-y-4 animate-pulse py-2">
      <div className="h-14 bg-surface-container rounded-lg w-full max-w-xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-gutter pt-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-96 bg-surface-container rounded-xl w-full"
          />
        ))}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop py-3 lg:py-8">
      {/* Ruta de Exploración (Breadcrumb compacto con área táctil >= 44px) */}
      <nav
        aria-label="Ruta de exploración"
        className="flex items-center gap-1 font-label-md text-label-md text-secondary mb-1"
      >
        <Link
          href="/"
          className="inline-flex items-center min-h-[44px] py-1.5 hover:text-primary transition-colors"
        >
          Inicio
        </Link>
        <Icon name="chevron_right" className="text-[14px]" />
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
