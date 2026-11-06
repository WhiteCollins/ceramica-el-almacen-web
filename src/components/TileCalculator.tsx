"use client";

import React, { useId, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { buildWhatsAppUrl } from "@/data/site";

const TILE_SPECS = [
  {
    id: "60x120",
    label: "Porcelanato Gran Formato 60 × 120 cm",
    boxCoverage: 1.44,
  },
  {
    id: "20x120",
    label: "Listón Madera Cerámica 20 × 120 cm",
    boxCoverage: 1.2,
  },
  {
    id: "15x15",
    label: "Revestimiento Artesanal 15 × 15 cm",
    boxCoverage: 0.85,
  },
] as const;

export function TileCalculator() {
  const areaId = useId();
  const formatId = useId();

  const [netArea, setNetArea] = useState<string>("45");
  const [selectedFormatId, setSelectedFormatId] = useState<string>("60x120");
  const [wastePercent, setWastePercent] = useState<10 | 15>(10);

  const calculation = useMemo(() => {
    const parsed = parseFloat(netArea);
    const validArea = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    const spec =
      TILE_SPECS.find((s) => s.id === selectedFormatId) ?? TILE_SPECS[0];

    const totalAreaWithWaste = validArea * (1 + wastePercent / 100);
    const boxes =
      validArea > 0 ? Math.ceil(totalAreaWithWaste / spec.boxCoverage) : 0;
    const coveredArea = boxes * spec.boxCoverage;
    // Rendimiento promedio de mortero polimérico gran formato: ~4.5 m² por funda de 50 lb
    const mortarBags = validArea > 0 ? Math.ceil(totalAreaWithWaste / 4.5) : 0;

    return {
      validArea,
      spec,
      totalAreaWithWaste,
      boxes,
      coveredArea,
      mortarBags,
    };
  }, [netArea, selectedFormatId, wastePercent]);

  const whatsappHref = buildWhatsAppUrl(
    `Hola Cerámica El Almacén, realicé un cómputo preliminar en la web y deseo cotizar:\n• Formato: ${
      calculation.spec.label
    }\n• Área neta: ${calculation.validArea.toFixed(
      1
    )} m² (+${wastePercent}% desperdicio)\n• Total requerido: ${
      calculation.boxes
    } cajas (${calculation.coveredArea.toFixed(
      2
    )} m²)\n• Pegamento estimado: ${calculation.mortarBags} fundas`
  );

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-atelier border border-surface-container-highest grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
      {/* Controles de Entrada */}
      <div className="lg:col-span-7 space-y-space-md">
        <div className="space-y-space-xs">
          <div className="inline-flex items-center gap-space-xs text-primary font-label-caps text-label-caps uppercase tracking-widest">
            <Icon name="calculate" className="text-[16px]" />
            <span>Herramienta de Cubicación Arquitectónica</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Calculadora de Cajas y Desperdicio (m²)
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Estima al instante la cantidad exacta de cajas y mortero adhesivo
            según las normas técnicas de instalación en República Dominicana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <div className="space-y-1">
            <label
              htmlFor={areaId}
              className="font-label-caps text-label-caps text-secondary uppercase block"
            >
              Área Neta a Revestir (m²)
            </label>
            <input
              id={areaId}
              type="text"
              inputMode="decimal"
              value={netArea}
              onChange={(e) => setNetArea(e.target.value)}
              placeholder="Ej. 45"
              className="w-full min-h-[48px] bg-surface-container-low text-base text-on-surface p-3 rounded border border-surface-container-highest focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor={formatId}
              className="font-label-caps text-label-caps text-secondary uppercase block"
            >
              Formato de Pieza
            </label>
            <select
              id={formatId}
              value={selectedFormatId}
              onChange={(e) => setSelectedFormatId(e.target.value)}
              className="w-full min-h-[48px] bg-surface-container-low text-base text-on-surface p-3 rounded border border-surface-container-highest focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
            >
              {TILE_SPECS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} ({s.boxCoverage} m²/caja)
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="space-y-1.5">
          <legend className="font-label-caps text-label-caps text-secondary uppercase block mb-1">
            Patrón de Instalación (Factor de Cortes)
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="waste_factor"
                checked={wastePercent === 10}
                onChange={() => setWastePercent(10)}
                className="peer sr-only"
              />
              <span className="flex items-center min-h-[48px] p-3 rounded bg-surface-container-low peer-checked:bg-primary peer-checked:text-on-primary text-on-surface font-label-md text-label-md transition-colors">
                Instalación Recta (+10% recomendado)
              </span>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="waste_factor"
                checked={wastePercent === 15}
                onChange={() => setWastePercent(15)}
                className="peer sr-only"
              />
              <span className="flex items-center min-h-[48px] p-3 rounded bg-surface-container-low peer-checked:bg-primary peer-checked:text-on-primary text-on-surface font-label-md text-label-md transition-colors">
                Trabada / Espiga / Cortes (+15%)
              </span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* Panel de Resultados */}
      <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-space-lg border border-surface-container-highest flex flex-col justify-between gap-space-md">
        <div className="space-y-space-sm">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider block">
            Resultado del Cómputo Técnico
          </span>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="bg-surface-container-lowest p-space-md rounded border border-surface-container-highest">
              <span className="font-label-caps text-label-caps text-secondary uppercase block">
                Cajas Cerradas
              </span>
              <p className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                {calculation.boxes}
              </p>
              <span className="font-body-sm text-body-sm text-secondary">
                {calculation.coveredArea.toFixed(2)} m² totales
              </span>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded border border-surface-container-highest">
              <span className="font-label-caps text-label-caps text-secondary uppercase block">
                Mortero Adhesivo
              </span>
              <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">
                {calculation.mortarBags}
              </p>
              <span className="font-body-sm text-body-sm text-secondary">
                Fundas de 50 lb aprox.
              </span>
            </div>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Incluye reserva de lote recomendada para mantenimiento futuro sin
            variación tonal (destonificación).
          </p>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary py-3.5 px-space-lg rounded font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm"
        >
          <Icon name="chat" className="text-[18px]" />
          <span>Cotizar Este Metraje por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
