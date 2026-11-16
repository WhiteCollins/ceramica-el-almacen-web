"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DraftBadge } from "@/components/DraftBadge";
import { Icon } from "@/components/Icon";
import { VISIBLE_PROJECTS, type ShowroomProject } from "@/data/site";

type FilterOption =
  | "all"
  | "Residencial"
  | "Comercial"
  | "Punta Cana / Bávaro"
  | "La Romana"
  | "Santo Domingo";

const ALL_PROJECT_FILTERS: { id: FilterOption; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "Residencial", label: "Residencial" },
  { id: "Comercial", label: "Hotelería / Comercial" },
  { id: "Punta Cana / Bávaro", label: "Punta Cana / Bávaro" },
  { id: "La Romana", label: "La Romana" },
  { id: "Santo Domingo", label: "Santo Domingo" },
];

function matchesProjectFilter(
  project: ShowroomProject,
  filter: FilterOption
): boolean {
  if (filter === "all") return true;
  if (filter === "Residencial" || filter === "Comercial") {
    return project.category === filter;
  }
  return project.regionFilter === filter;
}

/**
 * Proyecto destacado en formato editorial abierto estilo Manolo Blahnik GB:
 * - Fotografía arquitectónica 100% limpia sin badges ni overlays que la tapen
 * - Esquinas rectas de galería (rounded-none)
 * - Columna editorial con aire, KPI sobre línea lateral fina y enlaces con micro-guion "–"
 */
function FeaturedProject({ project }: { project: ShowroomProject }) {
  const href = `/showroom/${project.id}`;

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pb-12 lg:pb-16 border-b border-outline/60">
      {/* Columna Fotografía limpia sin stickers (58% en desktop) */}
      <Link
        href={href}
        className="group relative block lg:col-span-7 aspect-[4/3] w-full overflow-hidden rounded-none bg-surface-container-low shadow-[0_22px_44px_-14px_rgba(26,28,26,0.18)] hover:shadow-[0_28px_52px_-12px_rgba(107,29,34,0.26)] transition-all duration-500"
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          quality={95}
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {project.draft ? (
          <DraftBadge className="absolute top-4 left-4 z-10" />
        ) : null}
      </Link>

      {/* Columna Editorial abierta (42% en desktop) */}
      <div className="lg:col-span-5 flex flex-col justify-center gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b1d22]">
            <span>{project.spaceBadge}</span>
            <span aria-hidden="true">·</span>
            <span className="text-secondary">{project.location}</span>
            <span aria-hidden="true">·</span>
            <span className="text-secondary">{project.year}</span>
          </div>

          <h2 className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface leading-snug">
            <Link
              href={href}
              className="hover:text-[#6b1d22] transition-colors"
            >
              {project.title}
            </Link>
          </h2>

          <p className="text-xs sm:text-sm tracking-wide text-secondary leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* KPI limpio sobre línea lateral vino (#6b1d22), sin caja pesada */}
        <div className="flex items-baseline gap-3.5 border-l-2 border-[#6b1d22] pl-4 py-1">
          <span className="text-2xl sm:text-3xl font-semibold uppercase tracking-[0.06em] text-[#6b1d22]">
            {project.areaValue}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-secondary">
            {project.areaUnit} · Lote único
          </span>
        </div>

        {/* Enlaces de materiales especificados con micro-interacción "–" */}
        {project.materials.length > 0 ? (
          <div className="space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-secondary block">
              Materiales especificados
            </span>
            <ul role="list" className="space-y-1">
              {project.materials.map((material) => (
                <li key={material.href + material.label}>
                  <Link
                    href={material.href}
                    className="group/item inline-flex items-center text-xs uppercase tracking-[0.14em] text-on-surface hover:text-[#6b1d22] py-0.5 transition-colors"
                  >
                    <span className="inline-block w-0 overflow-hidden opacity-0 group-hover/item:w-3.5 group-hover/item:opacity-100 text-[#6b1d22] transition-all duration-200">
                      –
                    </span>
                    <span>{material.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Acción principal rectangular 1px */}
        <div className="pt-1">
          <Link
            href={href}
            className="min-h-[46px] inline-flex items-center justify-center gap-2.5 rounded-none border border-on-surface bg-on-surface hover:bg-[#6b1d22] hover:border-[#6b1d22] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors"
          >
            <span>Ver proyecto completo</span>
            <Icon name="arrow_forward" className="text-[15px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Ficha editorial de proyecto estilo "Read the Stories" de Manolo Blahnik GB:
 * - Fotografía limpia (aspect-[4/3], rounded-none) sin bordes ni stickers encima
 * - Metadatos tipográficos limpios debajo de la foto
 * - Enlaces discretos a materiales y acción subrayada "Ver obra"
 */
export function ProjectCard({ project }: { project: ShowroomProject }) {
  const href = `/showroom/${project.id}`;

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-none bg-surface-container-low shadow-[0_16px_34px_-14px_rgba(26,28,26,0.16)] group-hover:shadow-[0_24px_44px_-12px_rgba(107,29,34,0.24)] transition-all duration-500 ease-out group-hover:-translate-y-1"
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {project.draft ? (
          <DraftBadge className="absolute top-3.5 left-3.5 z-10" />
        ) : null}
      </Link>

      <div className="pt-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b1d22]">
            <span>{project.spaceBadge}</span>
            <span aria-hidden="true" className="text-secondary">
              ·
            </span>
            <span className="text-secondary">{project.location}</span>
            <span aria-hidden="true" className="text-secondary">
              ·
            </span>
            <span className="text-on-surface">{project.areaValue}</span>
          </div>

          <h3 className="text-sm sm:text-base uppercase tracking-[0.16em] font-semibold text-on-surface group-hover:text-[#6b1d22] transition-colors">
            <Link href={href}>{project.title}</Link>
          </h3>

          <p className="text-xs sm:text-sm tracking-wide text-secondary line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-outline/40 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-secondary truncate">
            {project.materials.slice(0, 2).map((mat, idx) => (
              <React.Fragment key={mat.href + mat.label}>
                {idx > 0 ? <span aria-hidden="true">·</span> : null}
                <Link
                  href={mat.href}
                  className="hover:text-on-surface transition-colors truncate"
                >
                  {mat.label}
                </Link>
              </React.Fragment>
            ))}
          </div>

          <Link
            href={href}
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface underline underline-offset-4 hover:text-[#6b1d22] transition-colors shrink-0"
          >
            <span>Ver obra</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const availableFilters = useMemo(
    () =>
      ALL_PROJECT_FILTERS.filter(
        (f) =>
          f.id === "all" ||
          VISIBLE_PROJECTS.some((project) =>
            matchesProjectFilter(project, f.id)
          )
      ),
    []
  );

  const filteredProjects = useMemo(
    () =>
      VISIBLE_PROJECTS.filter((project) =>
        matchesProjectFilter(project, activeFilter)
      ),
    [activeFilter]
  );

  const [featured, ...rest] = filteredProjects;
  const gridProjects = activeFilter === "all" ? rest : filteredProjects;

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {/* Encabezado Centrado Editorial + Selector de Filtros */}
      <div className="flex flex-col items-center text-center gap-6 border-b border-outline/60 pb-8">
        <header className="max-w-2xl space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b1d22] block">
            Portafolio de Suministro &amp; Especificación
          </span>
          <h1 className="text-2xl sm:text-3xl uppercase tracking-[0.18em] font-semibold text-on-surface">
            Proyectos y obras equipadas
          </h1>
          <p className="text-xs sm:text-sm tracking-wide text-secondary leading-relaxed">
            Residencias privadas, desarrollos turísticos y espacios comerciales
            suministrados con reserva de lote en toda la República Dominicana.
          </p>
        </header>

        {/* Pestañas editoriales limpias */}
        <div
          role="tablist"
          aria-label="Filtrar proyectos por tipología o ubicación"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1"
        >
          {availableFilters.map((filter) => {
            const isSelected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(filter.id)}
                className={
                  isSelected
                    ? "px-4 py-2 border-b-2 border-[#6b1d22] text-on-surface text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
                    : "px-4 py-2 border-b-2 border-transparent text-secondary hover:text-on-surface text-[11px] font-medium uppercase tracking-[0.18em] transition-colors"
                }
              >
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Proyecto Principal Spotlight (cuando se visualizan "Todos") */}
      {activeFilter === "all" && featured ? (
        <FeaturedProject project={featured} />
      ) : null}

      {/* Grid editorial uniforme estilo "Read the Stories" */}
      {gridProjects.length > 0 ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            gridProjects.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          } gap-8 lg:gap-10`}
        >
          {gridProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : activeFilter !== "all" ? (
        <div className="py-16 text-center space-y-4 bg-white border border-outline/50">
          <p className="text-sm text-secondary">
            No hay obras publicadas con ese filtro en este momento.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="min-h-[42px] px-6 py-2.5 border border-on-surface text-xs uppercase tracking-[0.2em] font-semibold text-on-surface hover:bg-on-surface hover:text-white transition-colors"
          >
            Ver todas las obras
          </button>
        </div>
      ) : null}
    </div>
  );
}
