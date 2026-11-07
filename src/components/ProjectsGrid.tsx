"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SHOWROOM_PROJECTS } from "@/data/site";

type FilterOption = "Todos" | "Residencial" | "Comercial";

const FILTERS: FilterOption[] = ["Todos", "Residencial", "Comercial"];

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("Todos");

  const filtered =
    activeFilter === "Todos"
      ? SHOWROOM_PROJECTS
      : SHOWROOM_PROJECTS.filter((p) => p.filterType === activeFilter);

  const renderProjectItem = (
    project: (typeof SHOWROOM_PROJECTS)[number],
    featured: boolean
  ) => (
    <article
      key={project.id}
      className="scroll-reveal flex flex-col gap-3.5 group"
    >
      {/* Foto clicable con zoom suave */}
      <Link
        href={`/showroom/${project.id}`}
        className={`relative block w-full overflow-hidden rounded-lg bg-surface-container-low ${
          featured ? "aspect-[4/3]" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority={featured}
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 1024px) 100vw, 42vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Texto debajo de la imagen sin caja */}
      <div className="space-y-2">
        <Link href={`/showroom/${project.id}`} className="block space-y-0.5">
          <p className="text-xs text-secondary">
            {project.location} · {project.category}
          </p>
          <h2 className="font-serif text-lg text-on-surface group-hover:text-primary transition-colors">
            {project.title}
          </h2>
        </Link>

        {/* Chips de materiales que enlazan directo al catálogo */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-xs text-secondary mr-1">Materiales:</span>
          {project.materials.map((mat) => (
            <Link
              key={mat.label}
              href={mat.href}
              className="inline-flex items-center px-3 py-1 rounded-full border border-outline bg-white hover:border-primary hover:text-primary text-xs font-medium text-on-surface transition-colors"
            >
              {mat.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );

  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Encabezado + Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-2xl text-on-surface">Proyectos</h1>

        <div
          role="group"
          aria-label="Filtrar proyectos por tipo"
          className="flex flex-wrap items-center gap-2"
        >
          {FILTERS.map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveFilter(filter)}
                className={
                  isSelected
                    ? "min-h-[40px] px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium transition-colors"
                    : "min-h-[40px] px-4 py-1.5 rounded-full border border-outline bg-white hover:bg-surface-container-low text-on-surface text-sm font-medium transition-colors"
                }
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cuadrícula Bento (cuando están los 3) o 2 columnas al filtrar */}
      {activeFilter === "Todos" && filtered.length === 3 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Izquierda: Proyecto destacado (foto grande) */}
          <div className="lg:col-span-7">
            {renderProjectItem(filtered[0], true)}
          </div>

          {/* Derecha: Proyecto 2 y Proyecto 3 apilados */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-10">
            {renderProjectItem(filtered[1], false)}
            {renderProjectItem(filtered[2], false)}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          {filtered.map((proj, idx) => renderProjectItem(proj, idx === 0))}
        </div>
      )}
    </div>
  );
}
