"use client";

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ModalDialog } from "@/components/ModalDialog";
import {
  CATALOG_PRODUCTS,
  CATEGORY_FILTERS,
  FINISH_FILTERS,
  FORMAT_FILTERS,
  type CatalogProduct,
  type ProductCategory,
} from "@/data/catalog";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

type SortOption = "featured" | "stock" | "alpha";

interface FilterState {
  category: "all" | ProductCategory;
  finish: string | null;
  formats: string[];
  q: string;
  sort: SortOption;
}

const VALID_CATEGORIES = new Set<string>([
  "porcelanato",
  "revestimiento",
  "griferia",
  "sanitarios",
  "lavamanos",
]);

const VALID_FINISHES = new Set<string>(FINISH_FILTERS);
const VALID_FORMATS = new Set<string>(FORMAT_FILTERS.map((f) => f.value));
const VALID_SORTS = new Set<string>(["featured", "stock", "alpha"]);

function parseFiltersFromParams(
  params: Pick<URLSearchParams, "get">
): FilterState {
  const rawCat = params.get("categoria");
  const category: "all" | ProductCategory =
    rawCat && VALID_CATEGORIES.has(rawCat)
      ? (rawCat as ProductCategory)
      : "all";

  const rawFinish = params.get("acabado");
  const finish = rawFinish && VALID_FINISHES.has(rawFinish) ? rawFinish : null;

  const rawFormats = params.get("formato");
  const formats = rawFormats
    ? rawFormats
        .split(",")
        .map((v) => v.trim())
        .filter((v) => VALID_FORMATS.has(v))
    : [];

  const rawSort = params.get("orden");
  const sort: SortOption =
    rawSort && VALID_SORTS.has(rawSort) ? (rawSort as SortOption) : "featured";

  const q = params.get("q") ?? "";

  return { category, finish, formats, q, sort };
}

function buildFilterSearchString(state: FilterState): string {
  const params = new URLSearchParams();
  if (state.category !== "all") {
    params.set("categoria", state.category);
  }
  if (state.finish) {
    params.set("acabado", state.finish);
  }
  if (state.formats.length > 0) {
    params.set("formato", state.formats.join(","));
  }
  if (state.sort !== "featured") {
    params.set("orden", state.sort);
  }
  const trimmedQ = state.q.trim();
  if (trimmedQ) {
    params.set("q", trimmedQ);
  }
  return params.toString();
}

function syncAriaInvalid(el: EventTarget | null) {
  if (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  ) {
    try {
      el.setAttribute(
        "aria-invalid",
        el.matches(":user-invalid") ? "true" : "false"
      );
    } catch {
      el.setAttribute("aria-invalid", el.checkValidity() ? "false" : "true");
    }
  }
}

export function CatalogExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(
    () => parseFiltersFromParams(searchParams),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [activeCategory, setActiveCategory] = useState<"all" | ProductCategory>(
    initial.category
  );
  const [activeFinish, setActiveFinish] = useState<string | null>(
    initial.finish
  );
  const [activeFormats, setActiveFormats] = useState<string[]>(initial.formats);
  const [searchQuery, setSearchQuery] = useState(initial.q);
  const [sortBy, setSortBy] = useState<SortOption>(initial.sort);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(
    null
  );
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleSubmitted, setSampleSubmitted] = useState(false);
  const [sampleForm, setSampleForm] = useState({
    professional: "",
    city: "",
    samples: "",
  });

  const isTypingRef = useRef(false);

  const searchInputId = useId();
  const sortSelectId = useId();
  const drawerSortSelectId = useId();
  const filterDrawerTitleId = useId();
  const specTitleId = useId();
  const sampleTitleId = useId();
  const sampleProfId = useId();
  const sampleCityId = useId();
  const sampleItemsId = useId();

  const pushUrlForState = useCallback(
    (nextState: FilterState) => {
      const nextQuery = buildFilterSearchString(nextState);
      const currentQuery = buildFilterSearchString(
        parseFiltersFromParams(searchParams)
      );
      if (nextQuery === currentQuery) return;
      const nextHref = nextQuery ? `${pathname}?${nextQuery}` : pathname;
      router.replace(nextHref, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    const parsed = parseFiltersFromParams(searchParams);
    setActiveCategory(parsed.category);
    setActiveFinish(parsed.finish);
    setActiveFormats(parsed.formats);
    setSortBy(parsed.sort);
    if (!isTypingRef.current) {
      setSearchQuery(parsed.q);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isTypingRef.current) return;
    const timer = window.setTimeout(() => {
      isTypingRef.current = false;
      pushUrlForState({
        category: activeCategory,
        finish: activeFinish,
        formats: activeFormats,
        q: searchQuery,
        sort: sortBy,
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [
    searchQuery,
    activeCategory,
    activeFinish,
    activeFormats,
    sortBy,
    pushUrlForState,
  ]);

  const updateDiscreteFilters = (patch: Partial<FilterState>) => {
    const next: FilterState = {
      category: patch.category !== undefined ? patch.category : activeCategory,
      finish: patch.finish !== undefined ? patch.finish : activeFinish,
      formats: patch.formats !== undefined ? patch.formats : activeFormats,
      q: patch.q !== undefined ? patch.q : searchQuery,
      sort: patch.sort !== undefined ? patch.sort : sortBy,
    };
    isTypingRef.current = false;
    setActiveCategory(next.category);
    setActiveFinish(next.finish);
    setActiveFormats(next.formats);
    setSearchQuery(next.q);
    setSortBy(next.sort);
    pushUrlForState(next);
  };

  const toggleFormat = (formatVal: string) => {
    const nextFormats = activeFormats.includes(formatVal)
      ? activeFormats.filter((v) => v !== formatVal)
      : [...activeFormats, formatVal];
    updateDiscreteFilters({ formats: nextFormats });
  };

  const resetFilters = () => {
    updateDiscreteFilters({
      category: "all",
      finish: null,
      formats: [],
      q: "",
      sort: "featured",
    });
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matches = CATALOG_PRODUCTS.filter((item) => {
      const matchesCat =
        activeCategory === "all" || item.category === activeCategory;
      const matchesFinish = !activeFinish || item.finish === activeFinish;
      const matchesFormat =
        activeFormats.length === 0 ||
        activeFormats.includes(item.formatFilter);
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.finish.toLowerCase().includes(q) ||
        item.dimensionsLabel.toLowerCase().includes(q) ||
        item.detailedDimensions.toLowerCase().includes(q) ||
        item.originBadge.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);

      return matchesCat && matchesFinish && matchesFormat && matchesSearch;
    });

    if (sortBy === "alpha") {
      return matches.toSorted((a, b) => a.name.localeCompare(b.name, "es"));
    }
    if (sortBy === "stock") {
      return matches.toSorted(
        (a, b) => Number(b.immediateStock) - Number(a.immediateStock)
      );
    }
    return matches.toSorted((a, b) => a.featuredOrder - b.featuredOrder);
  }, [activeCategory, activeFinish, activeFormats, searchQuery, sortBy]);

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeFinish !== null ||
    activeFormats.length > 0 ||
    searchQuery.trim().length > 0;

  const secondaryFilterCount =
    (activeFinish ? 1 : 0) +
    activeFormats.length +
    (sortBy !== "featured" ? 1 : 0);

  const activeCategoryLabel = useMemo(() => {
    if (activeCategory === "all") return null;
    return (
      CATEGORY_FILTERS.find((c) => c.id === activeCategory)?.label ??
      activeCategory
    );
  }, [activeCategory]);

  const sampleWhatsAppHref = buildWhatsAppUrl(
    `Hola Cerámica El Almacén, solicito muestrario físico para proyecto:\n• Profesional/Firma: ${sampleForm.professional}\n• Ciudad/Obra: ${sampleForm.city}\n• Muestras requeridas: ${sampleForm.samples}`
  );

  const sampleMailHref = `mailto:${SITE_INFO.email}?subject=${encodeURIComponent(
    `Solicitud de Muestras Físicas - ${sampleForm.professional}`
  )}&body=${encodeURIComponent(
    `Profesional o Firma: ${sampleForm.professional}\nCiudad / Entrega: ${sampleForm.city}\nMuestras de interés: ${sampleForm.samples}`
  )}`;

  const handleSampleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleSubmitted(true);
  };

  const badgeToneClass = (tone?: CatalogProduct["topBadgeTone"]) => {
    switch (tone) {
      case "dark":
        return "bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface";
      case "neutral":
        return "bg-surface-container-high text-on-surface-variant";
      case "gold":
        return "bg-tertiary text-on-tertiary";
      default:
        return "bg-primary text-on-primary";
    }
  };

  const formatFinishLabel = (finish: string) => {
    if (finish === "Madera") return "Madera Roble";
    if (finish === "Esmaltado Artesanal") return "Esmalte Artesanal";
    return finish;
  };

  return (
    <>
      {/* Encabezado Compacto */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4 lg:mb-5">
        <div className="max-w-3xl space-y-1">
          <h1 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface tracking-tight">
            Catálogo de Acabados &amp; Terminaciones
          </h1>
          <p className="font-body-sm sm:text-body-md text-secondary">
            Selección curada de piezas representativas con ficha técnica en
            línea. Solicita por WhatsApp o en nuestro showroom el muestrario
            completo de referencias en almacén.
          </p>
        </div>
      </div>

      {/* Barra de Búsqueda (<search>) y Acciones */}
      <search className="bg-surface-container-low rounded-xl p-3 sm:p-4 mb-5 lg:mb-7 shadow-sm border border-surface-container-high flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 lg:max-w-xl">
            <label htmlFor={searchInputId} className="sr-only">
              Buscar por nombre, medida, acabado o código SKU
            </label>
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]"
            />
            <input
              id={searchInputId}
              type="search"
              value={searchQuery}
              onChange={(e) => {
                isTypingRef.current = true;
                setSearchQuery(e.target.value);
              }}
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Buscar por textura, medida (ej. 60×120), acabado o serie..."
              className="w-full min-h-[48px] bg-surface-container-lowest text-base text-on-surface placeholder:text-secondary pl-11 pr-10 py-2.5 rounded-lg shadow-sm border border-surface-container-highest focus:border-primary focus:outline-none transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => updateDiscreteFilters({ q: "" })}
                aria-label="Limpiar búsqueda"
                className="absolute right-1 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-secondary hover:text-on-surface rounded"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
            aria-expanded={filterDrawerOpen}
            className="lg:hidden shrink-0 min-h-[48px] inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-surface-container-highest shadow-sm font-label-md text-label-md font-semibold transition-colors"
          >
            <Icon name="tune" className="text-primary text-[19px]" />
            <span>Filtros</span>
            {secondaryFilterCount > 0 ? (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-on-primary text-label-caps inline-flex items-center justify-center">
                {secondaryFilterCount}
              </span>
            ) : null}
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3.5 py-2 rounded-lg shadow-sm border border-surface-container-highest min-h-[48px]">
            <Icon name="tune" className="text-primary text-[18px]" />
            <label
              htmlFor={sortSelectId}
              className="font-label-md text-label-md text-secondary"
            >
              Ordenar:
            </label>
            <select
              id={sortSelectId}
              value={sortBy}
              onChange={(e) =>
                updateDiscreteFilters({ sort: e.target.value as SortOption })
              }
              className="bg-transparent font-label-md text-label-md text-on-surface font-semibold outline-none cursor-pointer"
            >
              <option value="featured">Colección Destacada</option>
              <option value="stock">Disponibilidad Inmediata</option>
              <option value="alpha">Nombre (A–Z)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSampleSubmitted(false);
              setSampleModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 bg-surface-container-high hover:bg-surface-variant text-on-surface px-4 py-2.5 min-h-[48px] rounded-lg font-label-md text-label-md transition-colors shadow-sm"
          >
            <Icon name="layers" className="text-primary text-[18px]" />
            <span>Pedir Muestrario Físico</span>
          </button>
        </div>
      </search>

      {/* Grilla Principal: Filtros a la Izquierda + Mosaico de Productos a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter-lg items-start">
        {/* Barra Lateral de Filtros a la Izquierda */}
        <aside
          aria-label="Filtros de catálogo"
          className="hidden lg:flex lg:col-span-3 lg:sticky lg:top-24 flex-col gap-6 bg-surface-container-low p-5 rounded-xl shadow-sm border border-surface-container-high"
        >
          <div className="flex items-center justify-between border-b border-surface-container-highest pb-2">
            <span className="font-headline-sm text-base text-on-surface font-semibold flex items-center gap-1.5">
              <Icon name="tune" className="text-primary text-[18px]" />
              <span>Filtros</span>
            </span>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center min-h-[44px] px-2 font-label-caps text-label-caps text-primary hover:underline uppercase"
              >
                Limpiar
              </button>
            ) : null}
          </div>

          {activeCategoryLabel ? (
            <div className="flex items-center justify-between gap-2 bg-surface-container-lowest px-3 py-2 rounded-lg border border-surface-container-highest">
              <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                {activeCategoryLabel}
              </span>
              <button
                type="button"
                onClick={() => updateDiscreteFilters({ category: "all" })}
                aria-label="Quitar filtro de categoría"
                className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center text-secondary hover:text-primary"
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            </div>
          ) : null}

          {/* Acabado de Superficie */}
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-label-caps uppercase text-secondary">
              Acabado de Superficie
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FINISH_FILTERS.map((finish) => {
                const isSelected = activeFinish === finish;
                return (
                  <button
                    key={finish}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      updateDiscreteFilters({
                        finish: isSelected ? null : finish,
                      })
                    }
                    className={
                      isSelected
                        ? "inline-flex items-center min-h-[44px] font-label-caps text-label-caps px-3 py-2 rounded bg-primary text-on-primary shadow-sm transition-all"
                        : "inline-flex items-center min-h-[44px] font-label-caps text-label-caps px-3 py-2 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high shadow-sm border border-surface-container-highest transition-all"
                    }
                  >
                    {formatFinishLabel(finish)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formatos & Dimensiones */}
          <fieldset className="flex flex-col gap-1">
            <legend className="font-label-caps text-label-caps uppercase text-secondary mb-1.5">
              Formatos &amp; Dimensiones
            </legend>
            <div className="flex flex-col text-body-sm font-body-sm text-on-surface-variant">
              {FORMAT_FILTERS.map((fmt) => (
                <label
                  key={fmt.value}
                  className="flex items-center gap-2.5 cursor-pointer hover:text-on-surface min-h-[44px] py-1.5"
                >
                  <input
                    type="checkbox"
                    checked={activeFormats.includes(fmt.value)}
                    onChange={() => toggleFormat(fmt.value)}
                    className="accent-primary h-5 w-5 rounded shrink-0"
                  />
                  <span>{fmt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Disponibilidad Almacén */}
          <div className="flex flex-col gap-1.5 bg-surface-container-high p-3.5 rounded-lg">
            <div className="flex items-center gap-1.5 text-primary font-label-md text-label-md font-semibold">
              <Icon name="warehouse" className="text-[18px]" />
              <span>Disponibilidad Almacén</span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary leading-snug">
              Stock listo para despacho en San Pedro de Macorís con entrega
              express 24–48h en la región Este y Santo Domingo.
            </p>
          </div>
        </aside>

        {/* Grilla de Productos */}
        <section aria-label="Listado de piezas" className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-surface-container-low rounded-xl p-6 border border-surface-container-high">
              <Icon
                name="search_off"
                className="text-secondary text-[44px] mb-2"
              />
              <h2 className="font-headline-md text-headline-md text-on-surface">
                No encontramos piezas con esos criterios
              </h2>
              <p className="font-body-md text-body-md text-secondary max-w-md mt-1">
                Prueba restableciendo los filtros seleccionados o escríbenos
                para consultar referencias adicionales en almacén.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 min-h-[44px] bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-5 py-2.5 rounded transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-gutter">
              {filteredProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-atelier border border-surface-container-highest transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      priority={index < 2}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span
                        className={`${badgeToneClass(
                          product.topBadgeTone
                        )} px-2.5 py-1 rounded font-label-caps text-label-caps uppercase tracking-wider shadow-sm w-fit`}
                      >
                        {product.topBadge}
                      </span>
                      {product.topSubBadge ? (
                        <span className="bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface px-2 py-0.5 rounded font-label-caps text-label-caps uppercase w-fit">
                          {product.topSubBadge}
                        </span>
                      ) : null}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-surface-container-lowest/95 backdrop-blur-sm px-2.5 py-1 rounded text-primary font-label-md text-label-md font-semibold shadow-sm">
                      {product.stockBadge}
                    </div>
                  </div>

                  <div className="p-4 sm:p-space-md flex flex-col flex-1 justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 font-label-caps text-label-caps uppercase">
                        <span className="text-secondary">
                          {product.originBadge}
                        </span>
                        <span className="text-on-surface font-semibold">
                          {product.dimensionsLabel}
                        </span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                        {product.name}
                      </h2>
                      <p className="font-body-sm text-body-sm text-secondary line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-3 border-t border-surface-container">
                      <div className="flex items-center gap-1.5 text-body-sm text-on-surface">
                        <Icon
                          name={product.highlightIcon}
                          className="text-primary text-[18px] shrink-0"
                        />
                        <span>{product.highlightText}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="min-h-[44px] bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md py-2.5 px-2 rounded text-center transition-colors"
                        >
                          Ficha Técnica
                        </button>
                        <a
                          href={buildWhatsAppUrl(product.whatsappText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 px-2 rounded flex items-center justify-center gap-1 transition-colors"
                        >
                          <Icon name="chat" className="text-[16px]" />
                          <span>Cotizar</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Panel Deslizante de Filtros para Móvil y Tablet (<dialog> drawer) */}
      <ModalDialog
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        labelledBy={filterDrawerTitleId}
        variant="drawer"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="px-5 py-3.5 border-b border-surface-container-high flex items-center justify-between gap-2 bg-surface-container-lowest">
            <h2
              id={filterDrawerTitleId}
              className="font-headline-md text-headline-md text-on-surface font-semibold"
            >
              Filtros y Orden
            </h2>
            <button
              type="button"
              onClick={() => setFilterDrawerOpen(false)}
              aria-label="Cerrar panel de filtros"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded bg-surface-container text-on-surface"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div className="space-y-1.5">
              <label
                htmlFor={drawerSortSelectId}
                className="font-label-caps text-label-caps uppercase text-secondary block"
              >
                Ordenar Resultados
              </label>
              <select
                id={drawerSortSelectId}
                value={sortBy}
                onChange={(e) =>
                  updateDiscreteFilters({ sort: e.target.value as SortOption })
                }
                className="w-full min-h-[48px] bg-surface-container-low text-base text-on-surface px-3.5 py-2.5 rounded-lg border border-surface-container-highest focus:border-primary focus:outline-none"
              >
                <option value="featured">Colección Destacada</option>
                <option value="stock">Disponibilidad Inmediata</option>
                <option value="alpha">Nombre (A–Z)</option>
              </select>
            </div>

            <div className="space-y-2">
              <span className="font-label-caps text-label-caps uppercase text-secondary block">
                Acabado de Superficie
              </span>
              <div className="flex flex-wrap gap-2">
                {FINISH_FILTERS.map((finish) => {
                  const isSelected = activeFinish === finish;
                  return (
                    <button
                      key={finish}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        updateDiscreteFilters({
                          finish: isSelected ? null : finish,
                        })
                      }
                      className={
                        isSelected
                          ? "inline-flex items-center min-h-[44px] font-label-caps text-label-caps px-3 py-2 rounded bg-primary text-on-primary shadow-sm transition-colors"
                          : "inline-flex items-center min-h-[44px] font-label-caps text-label-caps px-3 py-2 rounded bg-surface-container-low text-on-surface border border-surface-container-highest transition-colors"
                      }
                    >
                      {formatFinishLabel(finish)}
                    </button>
                  );
                })}
              </div>
            </div>

            <fieldset className="space-y-1">
              <legend className="font-label-caps text-label-caps uppercase text-secondary mb-1.5">
                Formatos &amp; Dimensiones
              </legend>
              <div className="flex flex-col text-body-md font-body-md text-on-surface">
                {FORMAT_FILTERS.map((fmt) => (
                  <label
                    key={fmt.value}
                    className="flex items-center gap-3 cursor-pointer min-h-[44px] py-1.5"
                  >
                    <input
                      type="checkbox"
                      checked={activeFormats.includes(fmt.value)}
                      onChange={() => toggleFormat(fmt.value)}
                      className="accent-primary h-5 w-5 rounded shrink-0"
                    />
                    <span>{fmt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="pt-2 border-t border-surface-container">
              <button
                type="button"
                onClick={() => {
                  setFilterDrawerOpen(false);
                  setSampleSubmitted(false);
                  setSampleModalOpen(true);
                }}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-variant text-on-surface px-4 py-2.5 rounded-lg font-label-md text-label-md transition-colors"
              >
                <Icon name="layers" className="text-primary text-[18px]" />
                <span>Pedir Muestrario Físico</span>
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-surface-container-high bg-surface-container-lowest flex items-center gap-2.5">
            <button
              type="button"
              onClick={resetFilters}
              className="min-h-[48px] px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={() => setFilterDrawerOpen(false)}
              className="flex-1 min-h-[48px] px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors"
            >
              Ver {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "pieza" : "piezas"}
            </button>
          </div>
        </div>
      </ModalDialog>

      {/* Modal de Ficha Técnica Oficial Específica por Tipo de Producto */}
      <ModalDialog
        open={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        labelledBy={specTitleId}
        className="max-w-xl"
      >
        {selectedProduct ? (
          <div className="p-5 sm:p-space-xl flex flex-col gap-4 relative">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar ficha técnica"
              className="absolute top-3 right-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-secondary hover:text-on-surface rounded bg-surface-container transition-colors"
            >
              <Icon name="close" className="text-[20px]" />
            </button>

            <div className="flex items-center gap-1.5 text-primary font-label-caps text-label-caps uppercase">
              <Icon name="description" className="text-[16px]" />
              <span>Ficha Técnica de Especificación</span>
            </div>

            <h2
              id={specTitleId}
              className="font-headline-lg text-headline-lg text-on-surface font-medium pr-10"
            >
              {selectedProduct.name}
            </h2>

            <dl className="bg-surface-container-low rounded-lg p-4 flex flex-col gap-1 text-body-sm sm:text-body-md font-body-md text-on-surface-variant border border-surface-container-high">
              <div className="flex justify-between gap-4 py-1.5 border-b border-surface-variant/50">
                <dt className="text-secondary">Código SKU:</dt>
                <dd className="font-semibold text-on-surface text-right">
                  {selectedProduct.sku}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-1.5 border-b border-surface-variant/50">
                <dt className="text-secondary">Dimensiones:</dt>
                <dd className="font-semibold text-on-surface text-right">
                  {selectedProduct.detailedDimensions}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-1.5 border-b border-surface-variant/50">
                <dt className="text-secondary">Material Base:</dt>
                <dd className="font-semibold text-on-surface text-right">
                  {selectedProduct.materialBase}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-1.5 border-b border-surface-variant/50">
                <dt className="text-secondary">Acabado / País:</dt>
                <dd className="font-semibold text-on-surface text-right">
                  {selectedProduct.finish} • {selectedProduct.originCountry}
                </dd>
              </div>
              {selectedProduct.techSpecs.map((spec, idx) => (
                <div
                  key={spec.label}
                  className={
                    idx === selectedProduct.techSpecs.length - 1
                      ? "flex justify-between gap-4 py-1.5"
                      : "flex justify-between gap-4 py-1.5 border-b border-surface-variant/50"
                  }
                >
                  <dt className="text-secondary">{spec.label}:</dt>
                  <dd className="font-semibold text-on-surface text-right">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul
              role="list"
              className="flex flex-col gap-1.5 text-body-sm text-secondary"
            >
              {selectedProduct.technicalNotes.map((note, idx) => (
                <li key={idx}>• {note}</li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="min-h-[44px] px-4 py-2.5 text-on-surface font-label-md text-label-md bg-surface-container hover:bg-surface-container-high rounded transition-colors"
              >
                Cerrar
              </button>
              <a
                href={buildWhatsAppUrl(selectedProduct.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-4 py-2.5 text-on-primary font-label-md text-label-md bg-primary hover:bg-primary-container rounded transition-colors inline-flex items-center gap-1.5"
              >
                <Icon name="chat" className="text-[16px]" />
                <span>Pedir Cotización de Este Producto</span>
              </a>
            </div>
          </div>
        ) : null}
      </ModalDialog>

      {/* Modal de Solicitud de Muestrario Físico (<dialog> nativo) */}
      <ModalDialog
        open={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
        labelledBy={sampleTitleId}
        className="max-w-lg"
      >
        <div className="p-space-lg sm:p-space-xl flex flex-col gap-space-md relative">
          <button
            type="button"
            onClick={() => setSampleModalOpen(false)}
            aria-label="Cerrar solicitud de muestras"
            className="absolute top-3 right-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-secondary hover:text-on-surface rounded bg-surface-container transition-colors"
          >
            <Icon name="close" className="text-[20px]" />
          </button>

          <div className="flex items-center gap-space-xs text-primary font-label-caps text-label-caps uppercase">
            <Icon name="layers" className="text-[16px]" />
            <span>Atelier para Profesionales</span>
          </div>

          <h2
            id={sampleTitleId}
            className="font-headline-lg text-headline-lg text-on-surface font-medium pr-8"
          >
            Solicitud de Muestras Físicas
          </h2>

          <p className="font-body-md text-body-md text-secondary">
            Enviamos muestras táctiles de porcelanatos y paletas cerámicas a
            estudios de arquitectura y constructoras en Santo Domingo, San Pedro
            de Macorís, Casa de Campo y Punta Cana.
          </p>

          {sampleSubmitted ? (
            <div className="bg-surface-container-low rounded-lg p-space-md border border-surface-container-highest space-y-space-md">
              <div className="flex items-center gap-space-xs text-emerald-800 font-semibold">
                <Icon name="check_circle" className="text-emerald-600" />
                <span>¡Solicitud lista para despacho!</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Elige por cuál vía prefieres remitir los datos de tu estudio a
                nuestro equipo en San Pedro de Macorís:
              </p>
              <div className="flex flex-col sm:flex-row gap-space-sm">
                <a
                  href={sampleWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-[#128C7E] hover:bg-[#0d6f63] text-white py-2.5 px-space-md rounded font-label-md text-label-md uppercase tracking-wider"
                >
                  <Icon name="chat" className="text-[16px]" />
                  <span>Enviar por WhatsApp</span>
                </a>
                <a
                  href={sampleMailHref}
                  className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-surface-container-highest hover:bg-surface-variant text-on-surface py-2.5 px-space-md rounded font-label-md text-label-md uppercase tracking-wider"
                >
                  <Icon name="mail" className="text-[16px] text-primary" />
                  <span>Enviar por Correo</span>
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSampleSubmit}
              onBlur={(e) => syncAriaInvalid(e.target)}
              onInput={(e) => syncAriaInvalid(e.target)}
              className="flex flex-col gap-space-sm mt-space-xs"
            >
              <div>
                <label
                  htmlFor={sampleProfId}
                  className="font-label-caps text-label-caps text-secondary uppercase block mb-1"
                >
                  Nombre del Profesional o Firma *
                </label>
                <input
                  id={sampleProfId}
                  name="professional"
                  type="text"
                  required
                  autoComplete="name"
                  value={sampleForm.professional}
                  onChange={(e) =>
                    setSampleForm((prev) => ({
                      ...prev,
                      professional: e.target.value,
                    }))
                  }
                  placeholder="Ej. Arq. Carlos Peña — Studio Diseño"
                  className="atelier-input w-full min-h-[48px] bg-surface-container p-3 rounded text-base text-on-surface border border-surface-container-highest focus:border-primary focus:bg-surface-container-lowest outline-none transition-colors"
                />
                <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm mt-1">
                  <Icon name="error" className="text-[15px]" />
                  <span>Indica tu nombre o estudio de arquitectura.</span>
                </p>
              </div>

              <div>
                <label
                  htmlFor={sampleCityId}
                  className="font-label-caps text-label-caps text-secondary uppercase block mb-1"
                >
                  Ciudad / Destino de Entrega *
                </label>
                <input
                  id={sampleCityId}
                  name="city"
                  type="text"
                  required
                  autoComplete="address-level2"
                  value={sampleForm.city}
                  onChange={(e) =>
                    setSampleForm((prev) => ({ ...prev, city: e.target.value }))
                  }
                  placeholder="Ej. Piantini, Santo Domingo / Casa de Campo"
                  className="atelier-input w-full min-h-[48px] bg-surface-container p-3 rounded text-base text-on-surface border border-surface-container-highest focus:border-primary focus:bg-surface-container-lowest outline-none transition-colors"
                />
                <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm mt-1">
                  <Icon name="error" className="text-[15px]" />
                  <span>Indica la ciudad o dirección de obra.</span>
                </p>
              </div>

              <div>
                <label
                  htmlFor={sampleItemsId}
                  className="font-label-caps text-label-caps text-secondary uppercase block mb-1"
                >
                  Muestras de Interés *
                </label>
                <input
                  id={sampleItemsId}
                  name="samples"
                  type="text"
                  required
                  value={sampleForm.samples}
                  onChange={(e) =>
                    setSampleForm((prev) => ({
                      ...prev,
                      samples: e.target.value,
                    }))
                  }
                  placeholder="Ej. Statuario Imperial 60×120 y Roble Escandinavo"
                  className="atelier-input w-full min-h-[48px] bg-surface-container p-3 rounded text-base text-on-surface border border-surface-container-highest focus:border-primary focus:bg-surface-container-lowest outline-none transition-colors"
                />
                <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm mt-1">
                  <Icon name="error" className="text-[15px]" />
                  <span>Especifica al menos una referencia o colección.</span>
                </p>
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-sm">
                <button
                  type="button"
                  onClick={() => setSampleModalOpen(false)}
                  className="min-h-[44px] px-space-md py-2.5 text-on-surface font-label-md text-label-md bg-surface-container hover:bg-surface-container-high rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-space-lg py-2.5 text-on-primary font-label-md text-label-md bg-primary hover:bg-primary-container rounded transition-colors uppercase tracking-wider"
                >
                  Preparar Solicitud
                </button>
              </div>
            </form>
          )}
        </div>
      </ModalDialog>
    </>
  );
}
