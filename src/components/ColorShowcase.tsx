"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { COLOR_SWATCHES, buildWhatsAppUrl } from "@/data/site";

export function ColorShowcase() {
  const [selectedId, setSelectedId] = useState<string>(COLOR_SWATCHES[0].id);

  const activeSwatch =
    COLOR_SWATCHES.find((s) => s.id === selectedId) ?? COLOR_SWATCHES[0];

  return (
    <section className="w-full bg-surface-container-highest py-9 lg:py-14">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="scroll-reveal bg-surface-container-lowest rounded-xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Columna de Selección de Color */}
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <span className="inline-flex items-center px-3 py-1 bg-primary text-on-primary rounded font-label-caps text-label-caps uppercase">
                Tendencia 2025 • 10×10 &amp; 15×15 cm
              </span>
              <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface font-normal">
                “El color lo cambia a todo”
              </h2>
              <p className="font-body-md sm:text-body-lg text-on-surface-variant max-w-xl">
                Baldosas vidriadas artesanales en tonos intensos con esmalte
                vitrificado para cocinas, salpicaderos, barras y baños de autor.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-label-caps text-label-caps text-secondary uppercase">
                  Paleta en Stock Inmediato (Toca un color para previsualizar)
                </span>
                <span className="font-label-md text-label-md text-primary font-semibold">
                  {activeSwatch.name}
                </span>
              </div>

              <div
                role="group"
                aria-label="Seleccionar color de baldosa artesanal"
                className="grid grid-cols-5 gap-1.5 sm:gap-2.5"
              >
                {COLOR_SWATCHES.map((swatch) => {
                  const isSelected = swatch.id === activeSwatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedId(swatch.id)}
                      className={
                        isSelected
                          ? "flex flex-col items-center gap-1.5 p-1.5 sm:p-2 min-h-[72px] bg-surface-container-high ring-2 ring-primary rounded-lg text-center transition-all shadow-sm"
                          : "flex flex-col items-center gap-1.5 p-1.5 sm:p-2 min-h-[72px] bg-surface hover:bg-surface-container rounded-lg text-center transition-all group"
                      }
                    >
                      <span
                        className="w-full h-9 sm:h-11 rounded block transition-transform group-hover:scale-[1.03] shadow-inner"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span
                        className={
                          isSelected
                            ? "font-label-md text-label-md text-on-surface font-bold leading-tight truncate w-full"
                            : "font-label-md text-label-md text-on-surface-variant leading-tight truncate w-full"
                        }
                      >
                        {swatch.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsAppUrl(
                  `Hola, quisiera solicitar muestras físicas de la colección artesanal de baldosas en tono ${activeSwatch.name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-inverse-surface text-inverse-on-surface hover:bg-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm"
              >
                <Icon name="palette" className="text-[18px]" />
                <span>Pedir Muestrario ({activeSwatch.shortName})</span>
              </a>
              <Link
                href="/catalogo?categoria=revestimiento"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 font-label-md text-label-md text-primary hover:bg-surface-container rounded uppercase tracking-wider transition-colors"
              >
                <span>Ver Colección</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </Link>
            </div>
          </div>

          {/* Vista Previa Dinámica por Color */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-auto lg:min-h-full bg-surface-container overflow-hidden">
            {COLOR_SWATCHES.map((swatch, idx) => {
              const isCurrent = swatch.id === activeSwatch.id;
              return (
                <Image
                  key={swatch.id}
                  src={swatch.image}
                  alt={`Salpicadero de cocina revestido con baldosas artesanales vidriadas en tono ${swatch.name}`}
                  fill
                  fetchPriority={idx === 0 ? undefined : "low"}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={
                    isCurrent
                      ? "object-cover opacity-100 transition-opacity duration-300"
                      : "object-cover opacity-0 pointer-events-none transition-opacity duration-300"
                  }
                />
              );
            })}

            <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/95 backdrop-blur px-3.5 py-2.5 rounded-lg shadow-md flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="w-4 h-4 rounded-full shrink-0 ring-1 ring-black/15"
                style={{ backgroundColor: activeSwatch.hex }}
              />
              <p
                aria-live="polite"
                className="font-headline-sm text-sm sm:text-headline-sm text-on-surface font-semibold truncate"
              >
                {activeSwatch.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
