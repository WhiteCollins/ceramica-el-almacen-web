"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ProductSwatchCard } from "@/components/ProductSwatchCard";
import { ModalDialog } from "@/components/ModalDialog";
import {
  CATALOG_PRODUCTS,
  CATEGORY_FILTERS,
  FINISH_FILTERS,
  FORMAT_FILTERS,
  getCategoryCount,
  type ProductCategory,
} from "@/data/catalog";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

type SortOption = "featured" | "stock" | "alpha";

interface FilterState {
  category: "all" | ProductCategory;
  finish: string | null;
  format: string | null;
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

  const rawFormat = params.get("formato")?.split(",")[0]?.trim() ?? null;
  const format =
    rawFormat && VALID_FORMATS.has(rawFormat) ? rawFormat : null;

  const rawSort = params.get("orden");
  const sort: SortOption =
    rawSort && VALID_SORTS.has(rawSort) ? (rawSort as SortOption) : "featured";

  const q = params.get("q") ?? "";

  return { category, finish, format, q, sort };
}

function buildFilterSearchString(state: FilterState): string {
  const params = new URLSearchParams();
  if (state.category !== "all") {
    params.set("categoria", state.category);
  }
  if (state.finish) {
    params.set("acabado", state.finish);
  }
  if (state.format) {
    params.set("formato", state.format);
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
  const [activeFormat, setActiveFormat] = useState<string | null>(
    initial.format
  );
  const [searchQuery, setSearchQuery] = useState(initial.q);
  const [sortBy, setSortBy] = useState<SortOption>(initial.sort);

  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleSubmitted, setSampleSubmitted] = useState(false);
  const [sampleForm, setSampleForm] = useState({
    professional: "",
    city: "",
    samples: "",
  });

  const isTypingRef = useRef(false);

  const searchInputId = useId();
  const finishSelectId = useId();
  const formatSelectId = useId();
  const sortSelectId = useId();
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
    setActiveFormat(parsed.format);
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
        format: activeFormat,
        q: searchQuery,
        sort: sortBy,
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [
    searchQuery,
    activeCategory,
    activeFinish,
    activeFormat,
    sortBy,
    pushUrlForState,
  ]);

  const updateDiscreteFilters = (patch: Partial<FilterState>) => {
    const next: FilterState = {
      category: patch.category !== undefined ? patch.category : activeCategory,
      finish: patch.finish !== undefined ? patch.finish : activeFinish,
      format: patch.format !== undefined ? patch.format : activeFormat,
      q: patch.q !== undefined ? patch.q : searchQuery,
      sort: patch.sort !== undefined ? patch.sort : sortBy,
    };
    isTypingRef.current = false;
    setActiveCategory(next.category);
    setActiveFinish(next.finish);
    setActiveFormat(next.format);
    setSearchQuery(next.q);
    setSortBy(next.sort);
    pushUrlForState(next);
  };

  const resetFilters = () => {
    updateDiscreteFilters({
      category: "all",
      finish: null,
      format: null,
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
        !activeFormat || item.formatFilter === activeFormat;
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
  }, [activeCategory, activeFinish, activeFormat, searchQuery, sortBy]);

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeFinish !== null ||
    activeFormat !== null ||
    searchQuery.trim().length > 0 ||
    sortBy !== "featured";

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

  return (
    <div className="space-y-6">
      {/* Encabezado + Botón de Muestrario Físico alineado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl text-on-surface tracking-tight">
            Catálogo de Acabados &amp; Terminaciones
          </h1>
          <p className="text-sm sm:text-base text-secondary">
            Piezas con ficha técnica en línea y disponibilidad en almacén.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSampleSubmitted(false);
            setSampleModalOpen(true);
          }}
          className="w-fit inline-flex items-center gap-2 bg-white hover:bg-surface-container-low text-on-surface px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-semibold border border-outline shadow-sm transition-colors shrink-0"
        >
          <Icon name="layers" className="text-primary text-[18px]" />
          <span>Pedir muestrario físico</span>
        </button>
      </div>

      {/* Pestañas superiores de categoría macro (Pills) */}
      <nav aria-label="Categorías del catálogo" className="overflow-x-auto no-scrollbar -mx-1 px-1">
        <ul role="list" className="flex items-center gap-2 min-w-max pb-1">
          {CATEGORY_FILTERS.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => updateDiscreteFilters({ category: cat.id })}
                  aria-pressed={isSelected}
                  className={
                    isSelected
                      ? "min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-sm transition-colors"
                      : "min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-surface-container-low text-on-surface border border-outline text-sm font-medium transition-colors"
                  }
                >
                  <span>{cat.label}</span>
                  <span
                    className={
                      isSelected
                        ? "text-xs px-2 py-0.5 rounded-full bg-white/20 text-white"
                        : "text-xs px-2 py-0.5 rounded-full bg-surface-container text-secondary"
                    }
                  >
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Barra horizontal uniforme: Buscador + Dropdowns limpios (Formato, Acabado, Ordenar) */}
      <search className="bg-white rounded-xl p-3 sm:p-4 border border-outline/80 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Buscador */}
          <div className="relative sm:col-span-2 lg:col-span-5">
            <label htmlFor={searchInputId} className="sr-only">
              Buscar por nombre, medida, acabado o código SKU
            </label>
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[19px]"
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
              placeholder="Buscar por nombre, medida (60×120), SKU..."
              className="w-full h-11 bg-surface text-sm text-on-surface placeholder:text-secondary pl-10 pr-9 rounded-lg border border-outline focus:border-primary focus:bg-white focus:outline-none transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => updateDiscreteFilters({ q: "" })}
                aria-label="Limpiar búsqueda"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 inline-flex items-center justify-center text-secondary hover:text-on-surface rounded-md"
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            ) : null}
          </div>

          {/* Selector de Formato */}
          <div className="lg:col-span-3">
            <label htmlFor={formatSelectId} className="sr-only">
              Filtrar por formato
            </label>
            <select
              id={formatSelectId}
              value={activeFormat ?? ""}
              onChange={(e) =>
                updateDiscreteFilters({
                  format: e.target.value ? e.target.value : null,
                })
              }
              className="w-full h-11 bg-surface text-sm text-on-surface px-3 rounded-lg border border-outline focus:border-primary focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="">Formato: Todos</option>
              {FORMAT_FILTERS.map((fmt) => (
                <option key={fmt.value} value={fmt.value}>
                  {fmt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Acabado */}
          <div className="lg:col-span-2">
            <label htmlFor={finishSelectId} className="sr-only">
              Filtrar por acabado
            </label>
            <select
              id={finishSelectId}
              value={activeFinish ?? ""}
              onChange={(e) =>
                updateDiscreteFilters({
                  finish: e.target.value ? e.target.value : null,
                })
              }
              className="w-full h-11 bg-surface text-sm text-on-surface px-3 rounded-lg border border-outline focus:border-primary focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="">Acabado: Todos</option>
              {FINISH_FILTERS.map((finish) => (
                <option key={finish} value={finish}>
                  {finish}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Orden */}
          <div className="lg:col-span-2">
            <label htmlFor={sortSelectId} className="sr-only">
              Ordenar productos
            </label>
            <select
              id={sortSelectId}
              value={sortBy}
              onChange={(e) =>
                updateDiscreteFilters({ sort: e.target.value as SortOption })
              }
              className="w-full h-11 bg-surface text-sm text-on-surface px-3 rounded-lg border border-outline focus:border-primary focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="featured">Orden: Destacados</option>
              <option value="stock">Orden: En stock</option>
              <option value="alpha">Orden: Nombre (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Contador de resultados + botón limpiar cuando hay filtros activos */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-outline/50 text-xs text-secondary">
          <span>
            Mostrando{" "}
            <strong className="text-on-surface font-semibold">
              {filteredProducts.length}
            </strong>{" "}
            {filteredProducts.length === 1
              ? "pieza disponible"
              : "piezas disponibles"}
          </span>

          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              <Icon name="close" className="text-[14px]" />
              <span>Limpiar filtros</span>
            </button>
          ) : null}
        </div>
      </search>

      {/* Grilla 100% de ancho: 4 columnas holgadas en escritorio */}
      <section aria-label="Listado de piezas">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center bg-white rounded-2xl p-6 border border-outline/80">
            <Icon
              name="search_off"
              className="text-secondary text-[44px] mb-2"
            />
            <h2 className="font-serif text-2xl text-on-surface">
              No encontramos piezas con esos criterios
            </h2>
            <p className="text-sm text-secondary max-w-md mt-1">
              Prueba restableciendo los filtros seleccionados o escríbenos para
              consultar referencias adicionales en almacén.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 min-h-[44px] bg-primary hover:bg-primary-container text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <li key={product.id}>
                <ProductSwatchCard product={product} priority={index < 4} />
              </li>
            ))}
          </ul>
        )}
      </section>

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

          <div className="space-y-1 pr-10">
            <span className="font-label-caps text-label-caps text-primary uppercase block">
              Servicio para Arquitectos &amp; Diseñadores
            </span>
            <h2
              id={sampleTitleId}
              className="font-headline-lg text-headline-lg text-on-surface"
            >
              Solicitar Muestrario Físico
            </h2>
            <p className="font-body-sm text-body-sm text-secondary">
              Preparamos cajas de muestras físicas de porcelanatos y cartas de
              acabados PVD para presentar en su estudio o contrastar en obra.
            </p>
          </div>

          <form
            onSubmit={handleSampleSubmit}
            onBlur={(e) => syncAriaInvalid(e.target)}
            onInput={(e) => syncAriaInvalid(e.target)}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label
                htmlFor={sampleProfId}
                className="font-label-caps text-label-caps text-on-surface-variant uppercase block"
              >
                Profesional o Estudio de Arquitectura *
              </label>
              <input
                id={sampleProfId}
                type="text"
                required
                autoComplete="name"
                value={sampleForm.professional}
                onChange={(e) => {
                  setSampleForm({
                    ...sampleForm,
                    professional: e.target.value,
                  });
                  if (sampleSubmitted) setSampleSubmitted(false);
                }}
                placeholder="Ej. Arq. Laura Gómez / Estudio LG"
                className="atelier-input w-full min-h-[48px] bg-surface-container-low text-base text-on-surface px-3.5 py-2.5 rounded border border-outline-variant/50 focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
              />
              <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm">
                <Icon name="error" className="text-[15px]" />
                <span>Indique su nombre o firma profesional.</span>
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor={sampleCityId}
                className="font-label-caps text-label-caps text-on-surface-variant uppercase block"
              >
                Ciudad / Ubicación del Proyecto *
              </label>
              <input
                id={sampleCityId}
                type="text"
                required
                autoComplete="address-level2"
                value={sampleForm.city}
                onChange={(e) => {
                  setSampleForm({ ...sampleForm, city: e.target.value });
                  if (sampleSubmitted) setSampleSubmitted(false);
                }}
                placeholder="Ej. Santiago, La Romana, Juan Dolio, Punta Cana..."
                className="atelier-input w-full min-h-[48px] bg-surface-container-low text-base text-on-surface px-3.5 py-2.5 rounded border border-outline-variant/50 focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
              />
              <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm">
                <Icon name="error" className="text-[15px]" />
                <span>Indique la ciudad o zona del proyecto.</span>
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor={sampleItemsId}
                className="font-label-caps text-label-caps text-on-surface-variant uppercase block"
              >
                Colecciones o Acabados Requeridos *
              </label>
              <textarea
                id={sampleItemsId}
                rows={3}
                required
                value={sampleForm.samples}
                onChange={(e) => {
                  setSampleForm({ ...sampleForm, samples: e.target.value });
                  if (sampleSubmitted) setSampleSubmitted(false);
                }}
                placeholder="Ej. Muestra Statuario 60×120, Roble Escandinavo y carta de acabados oro cepillado..."
                className="atelier-input w-full bg-surface-container-low text-base text-on-surface p-3.5 rounded border border-outline-variant/50 focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
              />
              <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm">
                <Icon name="error" className="text-[15px]" />
                <span>Detalle qué muestras desea evaluar.</span>
              </p>
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSampleModalOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2.5 rounded bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors"
              >
                Preparar Solicitud
              </button>
            </div>

            <div aria-live="polite">
              {sampleSubmitted ? (
                <div className="p-4 rounded-lg bg-surface-container-low border border-primary/30 space-y-3">
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">
                    Solicitud lista. Elige por qué vía deseas enviarla a nuestro
                    equipo técnico:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={sampleWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded font-label-md text-label-md uppercase font-semibold transition-colors"
                    >
                      <Icon name="chat" className="text-[16px]" />
                      <span>Enviar por WhatsApp</span>
                    </a>
                    <a
                      href={sampleMailHref}
                      className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-surface-container-highest hover:bg-surface-variant text-on-surface px-4 py-2.5 rounded font-label-md text-label-md uppercase font-semibold transition-colors"
                    >
                      <Icon name="mail" className="text-[16px] text-primary" />
                      <span>Enviar por Correo</span>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </ModalDialog>
    </div>
  );
}
