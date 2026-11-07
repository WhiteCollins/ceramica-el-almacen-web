"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COLOR_SWATCHES, buildWhatsAppUrl } from "@/data/site";

export function ColorShowcase() {
  const [selectedId, setSelectedId] = useState<string>(COLOR_SWATCHES[0].id);

  const activeSwatch =
    COLOR_SWATCHES.find((s) => s.id === selectedId) ?? COLOR_SWATCHES[0];

  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Columna de Selección de Color */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs text-primary font-medium">
                10×10 &amp; 15×15 cm
              </span>
              <h2 className="font-serif text-2xl text-on-surface">
                “El color lo cambia a todo”
              </h2>
              <p className="text-base text-secondary max-w-xl">
                Baldosas vidriadas artesanales en tonos intensos con esmalte
                vitrificado para cocinas, salpicaderos, barras y baños de autor.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-secondary">
                  Paleta en stock inmediato
                </span>
                <span className="text-sm text-primary font-semibold">
                  {activeSwatch.name}
                </span>
              </div>

              <div
                role="group"
                aria-label="Seleccionar color de baldosa artesanal"
                className="grid grid-cols-5 gap-2"
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
                          ? "flex flex-col items-center gap-1.5 p-2 min-h-[68px] bg-white ring-2 ring-primary rounded-lg text-center transition-all"
                          : "flex flex-col items-center gap-1.5 p-2 min-h-[68px] bg-white/60 hover:bg-white rounded-lg text-center transition-all group"
                      }
                    >
                      <span
                        className="w-full h-9 sm:h-10 rounded-lg block transition-transform group-hover:scale-[1.03]"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span
                        className={
                          isSelected
                            ? "text-xs text-on-surface font-semibold truncate w-full"
                            : "text-xs text-secondary truncate w-full"
                        }
                      >
                        {swatch.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={buildWhatsAppUrl(
                  `Hola, quisiera solicitar muestras físicas de la colección artesanal de baldosas en tono ${activeSwatch.name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Pedir muestrario ({activeSwatch.shortName})
              </a>
              <Link
                href="/catalogo?categoria=revestimiento"
                className="min-h-[44px] inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
              >
                <span>Ver colección →</span>
              </Link>
            </div>
          </div>

          {/* Vista Previa Dinámica por Color */}
          <div className="lg:col-span-6 relative aspect-[4/3] w-full rounded-lg bg-surface overflow-hidden">
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
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={
                    isCurrent
                      ? "object-cover opacity-100 transition-opacity duration-300"
                      : "object-cover opacity-0 pointer-events-none transition-opacity duration-300"
                  }
                />
              );
            })}

            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3.5 py-2 rounded-lg flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-3.5 h-3.5 rounded-full shrink-0"
                style={{ backgroundColor: activeSwatch.hex }}
              />
              <p
                aria-live="polite"
                className="text-xs font-medium text-on-surface truncate"
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
