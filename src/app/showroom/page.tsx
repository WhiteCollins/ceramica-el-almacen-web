import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: "Proyectos & Showroom",
  description:
    "Obras residenciales y comerciales equipadas con porcelanatos, griferías y sanitarios de Cerámica El Almacén.",
};

export default function ShowroomPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* SECCIÓN 1: PROYECTOS (DESTACADO + FILA UNIFORME) */}
      <section className="w-full pt-12 pb-16 lg:pt-20 lg:pb-24 px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          <ProjectsGrid />
        </div>
      </section>

      {/* SECCIÓN 2: LLAMADA A LA ACCIÓN JUSTO DESPUÉS DE LAS OBRAS */}
      <section className="w-full px-margin-mobile lg:px-margin-desktop pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6 rounded-sm border border-outline/60 bg-surface-container-low px-6 py-8 lg:px-10 lg:py-10">
          <div className="max-w-xl space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
              Especificación &amp; Showroom
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-on-surface">
              ¿Trabajas en una obra o remodelación?
            </h2>
            <p className="text-sm sm:text-base text-secondary">
              Trae tus planos al showroom o solicítanos muestras físicas y
              reserva de lote sin costo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/contacto"
              className="min-h-[46px] inline-flex items-center justify-center bg-on-surface hover:bg-[#6b1d22] text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              Solicitar presupuesto
            </Link>
            <a
              href={SITE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] inline-flex items-center justify-center gap-2 border border-outline bg-white hover:border-on-surface text-on-surface px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              <Icon name="location_on" className="text-[16px] text-[#6b1d22]" />
              <span>Cómo llegar</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
