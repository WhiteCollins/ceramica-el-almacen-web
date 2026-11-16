"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import {
  CATALOG_PRODUCTS,
  CATEGORY_FILTERS,
  type ProductCategory,
} from "@/data/catalog";
import { buildWhatsAppUrl } from "@/data/site";

/**
 * Carrusel curado de catálogo para la página de inicio, inspirado en la sección
 * "Get Inspired" de manoloblahnik.com/gb/:
 * - Selector de categorías limpio arriba
 * - Pieza central protagonista con detalle, disponibilidad y CTAs nítidos
 * - Piezas adyacentes visibles a izquierda/derecha como invitación a deslizar
 */
export function HomeCatalogCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ProductCategory
  >("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => {
    if (selectedCategory === "all") {
      return CATALOG_PRODUCTS.slice(0, 8);
    }
    return CATALOG_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const count = items.length;
  const safeIndex = count > 0 ? activeIndex % count : 0;
  const activeProduct = items[safeIndex] ?? CATALOG_PRODUCTS[0];

  const prevProduct =
    count > 1 ? items[(safeIndex - 1 + count) % count] : null;
  const nextProduct = count > 2 ? items[(safeIndex + 1) % count] : null;

  const handleSelectCategory = (catId: "all" | ProductCategory) => {
    setSelectedCategory(catId);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev + 1) % count);
  };

  const catalogHref =
    selectedCategory === "all"
      ? "/catalogo"
      : `/catalogo?categoria=${selectedCategory}`;

  return (
    <section
      aria-labelledby="carrusel-catalogo-titulo"
      className="w-full bg-white py-16 lg:py-24 border-t border-outline/40"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-10 lg:gap-12">
        {/* Cabecera centrada */}
        <div className="scroll-reveal flex flex-col items-center text-center space-y-2.5">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#6b1d22] font-semibold">
            Catálogo en Exhibición
          </span>
          <h2
            id="carrusel-catalogo-titulo"
            className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface"
          >
            Inspírate en cada línea
          </h2>
          <p className="text-xs sm:text-sm tracking-wide text-secondary max-w-xl">
            Recorre nuestras categorías principales y consulta dimensiones,
            acabados y stock inmediato directamente desde portada.
          </p>
        </div>

        {/* Pestañas editoriales por categoría */}
        <nav
          aria-label="Filtrar carrusel de catálogo"
          className="overflow-x-auto no-scrollbar border-y border-outline/50 py-2.5"
        >
          <ul
            role="list"
            className="flex items-center justify-start lg:justify-center gap-2 sm:gap-5 min-w-max px-1"
          >
            {CATEGORY_FILTERS.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    aria-pressed={isSelected}
                    className={`min-h-[38px] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border-b-2 transition-colors ${
                      isSelected
                        ? "border-[#6b1d22] text-on-surface font-semibold"
                        : "border-transparent text-secondary hover:text-on-surface"
                    }`}
                  >
                    {cat.shortLabel}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Pista Spotlight de 3 posiciones con foco central */}
        <div className="relative flex items-center justify-center gap-4 lg:gap-8">
          {/* Botón Anterior */}
          {count > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Pieza anterior"
              className="z-10 shrink-0 h-11 w-11 inline-flex items-center justify-center rounded-none border border-outline bg-white text-on-surface hover:border-on-surface hover:bg-on-surface hover:text-white transition-colors"
            >
              <Icon name="chevron_left" className="text-[22px]" />
            </button>
          ) : null}

          {/* Grilla visual: pieza izquierda (preview) + pieza central (activa) + pieza derecha (preview) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 items-center gap-6 lg:gap-8">
            {/* Pieza anterior (solo escritorio/tablet) */}
            <div className="hidden md:flex md:col-span-3 justify-center">
              {prevProduct ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={`Ver ${prevProduct.name}`}
                  className="group w-full max-w-[230px] text-center opacity-55 hover:opacity-90 scale-95 hover:scale-100 transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-surface-container-low">
                    <Image
                      src={prevProduct.image}
                      alt={prevProduct.imageAlt}
                      fill
                      sizes="20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="pt-3 text-[11px] uppercase tracking-[0.16em] font-medium text-secondary truncate">
                    {prevProduct.name}
                  </p>
                </button>
              ) : null}
            </div>

            {/* Pieza central protagonista */}
            <div className="md:col-span-6 flex flex-col items-center text-center">
              <article className="w-full max-w-[400px] flex flex-col items-center">
                <Link
                  href={`/catalogo/${activeProduct.id}`}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-none bg-surface-container-low shadow-[0_22px_44px_-14px_rgba(26,28,26,0.2)] hover:shadow-[0_26px_50px_-12px_rgba(107,29,34,0.28)] transition-all duration-500"
                >
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.imageAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, 35vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b1d22]">
                    {activeProduct.stockBadge}
                  </span>
                </Link>

                <div className="pt-6 space-y-2 max-w-sm">
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-[#6b1d22] font-semibold">
                    {activeProduct.originBadge} · {activeProduct.sku}
                  </span>
                  <h3 className="text-sm sm:text-base uppercase tracking-[0.18em] font-semibold text-on-surface">
                    <Link
                      href={`/catalogo/${activeProduct.id}`}
                      className="hover:text-[#6b1d22] transition-colors"
                    >
                      {activeProduct.name}
                    </Link>
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-secondary">
                    {activeProduct.dimensionsLabel} · {activeProduct.finish}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={`/catalogo/${activeProduct.id}`}
                      className="min-h-[42px] inline-flex items-center justify-center rounded-none border border-on-surface bg-on-surface hover:bg-[#6b1d22] hover:border-[#6b1d22] text-white px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors"
                    >
                      Ver ficha
                    </Link>
                    <a
                      href={buildWhatsAppUrl(activeProduct.whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] inline-flex items-center justify-center gap-1.5 rounded-none border border-on-surface bg-white hover:bg-on-surface text-on-surface hover:text-white px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors"
                    >
                      <Icon name="chat" className="text-[14px]" />
                      <span>Cotizar</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>

            {/* Pieza siguiente (solo escritorio/tablet) */}
            <div className="hidden md:flex md:col-span-3 justify-center">
              {nextProduct ? (
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={`Ver ${nextProduct.name}`}
                  className="group w-full max-w-[230px] text-center opacity-55 hover:opacity-90 scale-95 hover:scale-100 transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-surface-container-low">
                    <Image
                      src={nextProduct.image}
                      alt={nextProduct.imageAlt}
                      fill
                      sizes="20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="pt-3 text-[11px] uppercase tracking-[0.16em] font-medium text-secondary truncate">
                    {nextProduct.name}
                  </p>
                </button>
              ) : null}
            </div>
          </div>

          {/* Botón Siguiente */}
          {count > 1 ? (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente pieza"
              className="z-10 shrink-0 h-11 w-11 inline-flex items-center justify-center rounded-none border border-outline bg-white text-on-surface hover:border-on-surface hover:bg-on-surface hover:text-white transition-colors"
            >
              <Icon name="chevron_right" className="text-[22px]" />
            </button>
          ) : null}
        </div>

        {/* Indicadores lineales inferiores + Enlace a la categoría completa */}
        <div className="flex flex-col items-center gap-5 pt-2">
          {count > 1 ? (
            <div
              role="tablist"
              aria-label="Seleccionar pieza del carrusel"
              className="flex items-center gap-2 max-w-xs w-full justify-center"
            >
              {items.map((item, idx) => {
                const isCurrent = idx === safeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={item.name}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-[2px] transition-all duration-300 ${
                      isCurrent
                        ? "w-8 bg-[#6b1d22]"
                        : "w-4 bg-outline hover:bg-secondary"
                    }`}
                  />
                );
              })}
            </div>
          ) : null}

          <Link
            href={catalogHref}
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-on-surface underline underline-offset-4 hover:text-[#6b1d22] transition-colors"
          >
            Ver colección completa ({count}{" "}
            {count === 1 ? "pieza" : "piezas"} mostradas)
          </Link>
        </div>
      </div>
    </section>
  );
}
