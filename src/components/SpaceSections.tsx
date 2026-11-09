import React from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProductSwatchCard } from "@/components/ProductSwatchCard";
import { ProjectCard } from "@/components/ProjectsGrid";
import type { CatalogProduct } from "@/data/catalog";
import { VISIBLE_PROJECTS } from "@/data/site";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="text-[11px] uppercase tracking-[0.18em] text-secondary"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => (
          <li key={item.label} className="inline-flex items-center gap-2">
            {idx > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex items-center min-h-[44px] hover:text-on-surface transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="text-on-surface font-semibold"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Cuadrícula de muestrario: 2 columnas en móvil, 3 en tableta, 4 en escritorio. */
export function SwatchGrid({ products }: { products: CatalogProduct[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6"
    >
      {products.map((product, idx) => (
        <li key={product.id}>
          <ProductSwatchCard product={product} priority={idx < 4} />
        </li>
      ))}
    </ul>
  );
}

export function pieceCount(n: number) {
  return n === 1 ? "1 pieza" : `${n} piezas`;
}

/** Obras publicadas que usaron alguno de estos productos. */
export function RelatedProjects({
  products,
  title = "En obra",
}: {
  products: CatalogProduct[];
  title?: string;
}) {
  const ids = new Set(products.map((p) => p.id));
  const projects = VISIBLE_PROJECTS.filter((project) =>
    project.productIds.some((id) => ids.has(id))
  ).slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <section className="flex flex-col gap-8 pt-6 border-t border-outline/60">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
            Proyectos Reales
          </span>
          <h2 className="font-serif text-3xl text-on-surface">{title}</h2>
        </div>
        <Link
          href="/showroom"
          className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold uppercase tracking-[0.18em] text-[#6b1d22] hover:underline"
        >
          <span>Ver todos los proyectos</span>
          <Icon name="arrow_forward" className="text-[15px]" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
