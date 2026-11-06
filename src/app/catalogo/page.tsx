import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { Icon } from "@/components/Icon";
import { ADVISORS, buildWhatsAppUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Catálogo & Colecciones",
  description:
    "Explora nuestro catálogo técnico de porcelanatos españoles e italianos 60×120 cm, revestimientos artesanales, griferías IMEX en PVD y tinas Sottovento en stock local.",
};

function CatalogFallback() {
  return (
    <div
      aria-busy="true"
      className="space-y-3 animate-pulse py-2"
    >
      <div className="h-12 bg-surface-container rounded-lg w-full max-w-xl" />
      <div className="h-12 bg-surface-container-low rounded-lg w-full" />
      <div className="h-11 bg-surface-container rounded-full w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-gutter pt-2">
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

      {/* Explorador Interactivo con Filtros, Fichas Técnicas y Kit de Muestras */}
      <Suspense fallback={<CatalogFallback />}>
        <CatalogExplorer />
      </Suspense>

      {/* Banner de Cubicación Arquitectónica y Despiece */}
      <section className="mt-12 lg:mt-16 bg-surface-container-highest rounded-xl p-6 sm:p-8 lg:p-10 overflow-hidden relative shadow-sm">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter-lg items-center">
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center gap-space-xs text-primary font-label-caps text-label-caps uppercase">
              <Icon name="calculate" className="text-[16px]" />
              <span>Servicio Técnico Gratuito para Proyectos</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface">
              ¿Necesitas calcular cuántos metros cuadrados requieres para tu
              remodelación?
            </h2>
            <p className="font-body-md sm:text-body-lg text-on-surface-variant">
              Nuestro equipo de cubicación calcula el despiece exacto con factor
              de desperdicio por cortes (10%–15%), pegamentos poliméricos y
              juntas recomendadas.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-body-md font-medium text-on-surface">
                <Icon
                  name="architecture"
                  className="text-primary text-[20px]"
                />
                <span>Revisión de planos DWG / PDF</span>
              </div>
              <Link
                href="/showroom#calculadora"
                className="inline-flex items-center gap-1 min-h-[44px] py-2 font-label-md text-label-md text-primary hover:underline uppercase tracking-wider"
              >
                <span>Abrir Calculadora de Metraje</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
            {ADVISORS.map((advisor, idx) => (
              <div
                key={advisor.id}
                className="flex items-center justify-between p-3.5 bg-surface-container-lowest rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={
                      idx === 0
                        ? "w-11 h-11 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-headline-sm shrink-0"
                        : "w-11 h-11 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-bold text-headline-sm shrink-0"
                    }
                  >
                    {advisor.initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                      {advisor.name}
                    </span>
                    <span className="font-label-caps text-label-caps text-secondary uppercase truncate">
                      {advisor.roleCatalog}
                    </span>
                  </div>
                </div>
                <a
                  href={buildWhatsAppUrl(
                    `Hola ${advisor.name}, necesito ayuda para calcular los metros cuadrados de mi proyecto.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contactar a ${advisor.name} por WhatsApp`}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center bg-surface-container hover:bg-primary hover:text-on-primary text-primary rounded transition-colors shrink-0"
                >
                  <Icon name="chat" className="text-[20px]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
