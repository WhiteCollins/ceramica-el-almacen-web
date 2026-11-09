"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CATALOG_PRODUCTS } from "@/data/catalog";
import {
  VISIBLE_PROJECTS,
  buildWhatsAppUrl,
  type ShowroomProject,
} from "@/data/site";

type FilterOption =
  | "all"
  | "Residencial"
  | "Comercial"
  | "Punta Cana / Bávaro"
  | "La Romana"
  | "Santo Domingo";

const PROJECT_FILTERS: { id: FilterOption; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "Residencial", label: "Residencial" },
  { id: "Comercial", label: "Hotelería / Comercial" },
  { id: "Punta Cana / Bávaro", label: "Punta Cana / Bávaro" },
  { id: "La Romana", label: "La Romana" },
  { id: "Santo Domingo", label: "Santo Domingo" },
];

function productsFor(project: ShowroomProject) {
  return project.productIds
    .map((id) => CATALOG_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof CATALOG_PRODUCTS)[number] => Boolean(p));
}

function FeaturedProject({ project }: { project: ShowroomProject }) {
  const href = `/showroom/${project.id}`;

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 rounded-sm bg-white border border-outline/60 overflow-hidden transition-all duration-300 ease-out hover:border-[#6b1d22]/45 hover:shadow-[0_14px_34px_-10px_rgba(107,29,34,0.22)]">
      {/* Columna Imagen (50% en desktop) */}
      <Link
        href={href}
        className="group relative block lg:col-span-6 aspect-[4/3] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-surface-container-low"
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

        <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-on-surface shadow-sm">
          {project.spaceBadge}
        </span>

        <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 bg-inverse-surface/85 backdrop-blur-sm px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-sm">
          <Icon name="location_on" className="text-[14px] text-white/90" />
          <span>{project.fullLocation}</span>
        </span>
      </Link>

      {/* Columna de Datos Equilibrada (50% en desktop) */}
      <div className="lg:col-span-6 p-6 sm:p-9 lg:p-12 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
            <span className="text-[#6b1d22]">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
            <span aria-hidden="true">·</span>
            <span>Entrega {project.year}</span>
          </div>

          <h2 className="text-lg sm:text-xl uppercase tracking-[0.16em] font-semibold text-on-surface leading-snug">
            <Link
              href={href}
              className="hover:text-[#6b1d22] transition-colors"
            >
              {project.title}
            </Link>
          </h2>

          <p className="text-sm text-secondary leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* KPI Grande de Capacidad de Suministro con acento en color vino (#6b1d22) */}
        <div className="flex items-baseline gap-3.5 rounded-sm bg-surface-container-low px-5 py-4 border-l-2 border-[#6b1d22]">
          <span className="text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em] text-[#6b1d22]">
            {project.areaValue}
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-secondary">
            {project.areaUnit} · Lote único garantizado
          </span>
        </div>

        {/* Chips interactivos de producto con enlace directo al catálogo */}
        {project.materials.length > 0 ? (
          <div className="space-y-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary block">
              Materiales especificados
            </span>
            <div className="flex flex-wrap gap-2">
              {project.materials.map((material) => (
                <Link
                  key={material.href + material.label}
                  href={material.href}
                  className="inline-flex items-center gap-1.5 bg-surface hover:bg-[#6b1d22] text-on-surface hover:text-white border border-outline px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors"
                >
                  <span>{material.label}</span>
                  <Icon name="arrow_forward" className="text-[13px]" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {/* Acción principal */}
        <div className="pt-1 flex flex-wrap items-center gap-3">
          <Link
            href={href}
            className="min-h-[46px] inline-flex items-center gap-2.5 bg-on-surface hover:bg-[#6b1d22] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors"
          >
            <span>Ver proyecto completo</span>
            <Icon name="arrow_forward" className="text-[15px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: ShowroomProject }) {
  const products = productsFor(project);
  const href = `/showroom/${project.id}`;

  return (
    <article className="group flex flex-col rounded-sm bg-white border border-outline/60 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#6b1d22]/45 hover:shadow-[0_14px_34px_-10px_rgba(107,29,34,0.22)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
        <Link href={href} className="block w-full h-full">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        </Link>

        {/* Tipo de espacio */}
        <span className="pointer-events-none absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface shadow-sm">
          {project.spaceBadge}
        </span>

        {/* Tag de ciudad directamente sobre la foto */}
        <span className="pointer-events-none absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1 bg-inverse-surface/85 backdrop-blur-sm px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
          <Icon name="location_on" className="text-[12px]" />
          <span>{project.location}</span>
        </span>

        {/* Avatares circulares superpuestos en la esquina inferior de la foto */}
        {products.length > 0 ? (
          <ul
            role="list"
            aria-label="Materiales utilizados"
            className="absolute bottom-3 left-3.5 z-10 flex items-center -space-x-2"
          >
            {products.map((product) => (
              <li key={product.id} className="relative group/avatar">
                <Link
                  href={`/catalogo/${product.id}`}
                  aria-label={product.name}
                  className="relative block h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-surface shadow-md hover:z-20 hover:scale-110 transition-transform"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    sizes="40px"
                    className="object-cover"
                  />
                </Link>
                <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-sm bg-inverse-surface px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white opacity-0 translate-y-1 group-hover/avatar:opacity-100 group-hover/avatar:translate-y-0 transition-all shadow-md z-30">
                  {product.name}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-secondary">
            <span>
              {project.location} · {project.year}
            </span>
            <span className="font-semibold text-[#6b1d22]">{project.area}</span>
          </div>

          <h3 className="text-sm sm:text-base uppercase tracking-[0.16em] font-semibold text-on-surface group-hover:text-[#6b1d22] transition-colors">
            <Link href={href}>{project.title}</Link>
          </h3>

          <p className="text-xs sm:text-sm text-secondary line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Chips compactos de productos + enlace al proyecto */}
        <div className="pt-3.5 border-t border-outline/50 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.materials.slice(0, 2).map((mat) => (
              <Link
                key={mat.href + mat.label}
                href={mat.href}
                className="bg-surface-container-low hover:bg-surface-container px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface transition-colors"
              >
                {mat.label}
              </Link>
            ))}
          </div>

          <Link
            href={href}
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b1d22] group-hover:translate-x-0.5 transition-transform shrink-0"
          >
            <span>Ver obra</span>
            <Icon name="arrow_forward" className="text-[13px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function NextProjectCard() {
  const whatsappPlanesHref = buildWhatsAppUrl(
    "Hola, deseo enviar los planos de mi proyecto para cubicación y reserva de lote."
  );

  return (
    <article className="flex flex-col justify-between rounded-sm border border-[#6b1d22]/30 bg-gradient-to-br from-[#FAF6F2] via-surface-container-low to-[#F3ECE4] p-7 lg:p-8 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#6b1d22]/55 hover:shadow-[0_14px_34px_-10px_rgba(107,29,34,0.22)]">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-1.5 bg-[#6b1d22]/10 text-[#6b1d22] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
          <Icon name="architecture" className="text-[14px]" />
          <span>Departamento Técnico &amp; Obras</span>
        </span>

        <h3 className="text-base sm:text-lg uppercase tracking-[0.16em] font-semibold text-on-surface leading-snug">
          Tu obra puede ser la próxima
        </h3>

        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Cubicamos tus planos DWG o PDF sin costo, garantizamos reserva de un
          solo lote para evitar variaciones de tono y programamos despachos a
          pie de obra en todo el país.
        </p>

        <ul className="space-y-2 pt-1 text-xs text-on-surface font-medium">
          <li className="flex items-center gap-2">
            <Icon name="check_circle" className="text-[16px] text-[#6b1d22]" />
            <span>Cálculo exacto de m² y porcentaje de desperdicio</span>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="check_circle" className="text-[16px] text-[#6b1d22]" />
            <span>Muestras físicas para presentación a clientes</span>
          </li>
        </ul>
      </div>

      <div className="pt-6 flex flex-col gap-2.5">
        <Link
          href="/contacto"
          className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#6b1d22] hover:bg-primary-container text-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
        >
          <Icon name="assignment" className="text-[16px]" />
          <span>Enviar planos para cubicación</span>
        </Link>
        <a
          href={whatsappPlanesHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[42px] inline-flex items-center justify-center gap-1.5 bg-white hover:border-on-surface text-on-surface border border-outline px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
        >
          <Icon name="chat" className="text-[15px] text-[#6b1d22]" />
          <span>Hablar con especialista</span>
        </a>
      </div>
    </article>
  );
}

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const filteredProjects = VISIBLE_PROJECTS.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "Residencial" || activeFilter === "Comercial") {
      return project.category === activeFilter;
    }
    return project.regionFilter === activeFilter;
  });

  const [featured, ...rest] = filteredProjects;
  const gridProjects = activeFilter === "all" ? rest : filteredProjects;

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      {/* Encabezado Centrado Editorial + Barra de Filtros */}
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

        {/* Selector de filtros por tipología y ubicación */}
        <div
          role="tablist"
          aria-label="Filtrar proyectos por tipología o ubicación"
          className="flex flex-wrap items-center justify-center gap-2 pt-1"
        >
          {PROJECT_FILTERS.map((filter) => {
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
                    ? "inline-flex items-center gap-1.5 px-4 py-2.5 bg-on-surface text-white text-[11px] font-semibold uppercase tracking-[0.18em] transition-all"
                    : "inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:border-on-surface text-on-surface border border-outline/80 text-[11px] font-medium uppercase tracking-[0.18em] transition-all"
                }
              >
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta Principal Split Hero (cuando se visualizan "Todos") */}
      {activeFilter === "all" && featured ? (
        <FeaturedProject project={featured} />
      ) : null}

      {/* Grid de Proyectos + Tarjeta CTA de Captación */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {gridProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <NextProjectCard />
      </div>
    </div>
  );
}
