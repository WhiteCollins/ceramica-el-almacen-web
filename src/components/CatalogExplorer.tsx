"use client";

import React, { useId, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ModalDialog } from "@/components/ModalDialog";
import {
  CATALOG_PRODUCTS,
  CATEGORY_FILTERS,
  type CatalogProduct,
  type ProductCategory,
} from "@/data/catalog";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

const VALID_CATEGORIES = new Set<string>([
  "porcelanato",
  "revestimiento",
  "griferia",
  "sanitarios",
  "lavamanos",
]);

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

  const activeCategory: "all" | ProductCategory = useMemo(() => {
    const rawCat = searchParams.get("categoria");
    return rawCat && VALID_CATEGORIES.has(rawCat)
      ? (rawCat as ProductCategory)
      : "all";
  }, [searchParams]);

  const activeQuery = useMemo(
    () => (searchParams.get("q") ?? "").trim(),
    [searchParams]
  );

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

  const specTitleId = useId();
  const sampleTitleId = useId();
  const sampleProfId = useId();
  const sampleCityId = useId();
  const sampleItemsId = useId();

  const filteredProducts = useMemo(() => {
    const q = activeQuery.toLowerCase();

    return CATALOG_PRODUCTS.filter((item) => {
      const matchesCat =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.finish.toLowerCase().includes(q) ||
        item.dimensionsLabel.toLowerCase().includes(q) ||
        item.detailedDimensions.toLowerCase().includes(q) ||
        item.originBadge.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    }).toSorted((a, b) => a.featuredOrder - b.featuredOrder);
  }, [activeCategory, activeQuery]);

  const hasUrlFilter = activeCategory !== "all" || activeQuery.length > 0;

  const activeCategoryLabel = useMemo(() => {
    if (activeCategory === "all") return null;
    return (
      CATEGORY_FILTERS.find((c) => c.id === activeCategory)?.label ??
      activeCategory
    );
  }, [activeCategory]);

  const clearUrlFilter = () => {
    router.replace(pathname, { scroll: false });
  };

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

  return (
    <>
      {/* Encabezado Directo del Catálogo (Sin buscadores ni barras de filtros) */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5 lg:mb-7">
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

        <div className="flex flex-wrap items-center gap-2">
          {hasUrlFilter ? (
            <button
              type="button"
              onClick={clearUrlFilter}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold transition-colors"
            >
              <span>
                {activeCategoryLabel
                  ? `Filtro: ${activeCategoryLabel}`
                  : `Búsqueda: “${activeQuery}”`}
              </span>
              <Icon name="close" className="text-[16px]" />
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => {
              setSampleSubmitted(false);
              setSampleModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 bg-surface-container-high hover:bg-surface-variant text-on-surface px-4 py-2.5 min-h-[44px] rounded-lg font-label-md text-label-md transition-colors shadow-sm"
          >
            <Icon name="layers" className="text-primary text-[18px]" />
            <span>Pedir Muestrario Físico</span>
          </button>
        </div>
      </div>

      {/* Grilla Completa de Productos (3 columnas en escritorio, 2 en tablet, 1 en móvil) */}
      <section aria-label="Listado de piezas">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-surface-container-low rounded-xl p-6 border border-surface-container-high">
            <Icon
              name="search_off"
              className="text-secondary text-[44px] mb-2"
            />
            <h2 className="font-headline-md text-headline-md text-on-surface">
              No encontramos piezas con ese criterio
            </h2>
            <button
              type="button"
              onClick={clearUrlFilter}
              className="mt-4 min-h-[44px] bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-5 py-2.5 rounded transition-colors"
            >
              Ver Todas las Piezas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-gutter">
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
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
