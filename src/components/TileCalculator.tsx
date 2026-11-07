"use client";

import React, { useId, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { buildWhatsAppUrl } from "@/data/site";

const TILE_SPECS = [
  {
    id: "60x120",
    label: "Porcelanato gran formato 60 × 120 cm",
    boxCoverage: 1.44,
  },
  {
    id: "20x120",
    label: "Listón madera cerámica 20 × 120 cm",
    boxCoverage: 1.2,
  },
  {
    id: "15x15",
    label: "Revestimiento artesanal 15 × 15 cm",
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
    `Hola Cerámica El Almacén, calculé mi metraje en la web y deseo cotizar:\n• Formato: ${
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Columna izquierda: Controles sin caja */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-on-surface">
            Calculadora de cajas y desperdicio
          </h2>
          <p className="text-base text-secondary">
            Estima al instante la cantidad de cajas cerradas y mortero adhesivo
            según el formato y tipo de corte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor={areaId}
              className="text-sm font-medium text-on-surface block"
            >
              Área neta a revestir (m²)
            </label>
            <input
              id={areaId}
              type="text"
              inputMode="decimal"
              value={netArea}
              onChange={(e) => setNetArea(e.target.value)}
              placeholder="Ej. 45"
              className="w-full min-h-[44px] bg-white text-base text-on-surface px-3.5 py-2.5 rounded-lg border border-outline focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor={formatId}
              className="text-sm font-medium text-on-surface block"
            >
              Formato de pieza
            </label>
            <select
              id={formatId}
              value={selectedFormatId}
              onChange={(e) => setSelectedFormatId(e.target.value)}
              className="w-full min-h-[44px] bg-white text-base text-on-surface px-3.5 py-2.5 rounded-lg border border-outline focus:border-primary focus:outline-none"
            >
              {TILE_SPECS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} ({s.boxCoverage} m²/caja)
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-on-surface block">
            Patrón de instalación
          </legend>
          <div className="flex flex-wrap gap-2">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="waste_factor"
                checked={wastePercent === 10}
                onChange={() => setWastePercent(10)}
                className="peer sr-only"
              />
              <span className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full border border-outline bg-white text-sm font-medium text-on-surface peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors">
                Instalación recta (+10%)
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
              <span className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full border border-outline bg-white text-sm font-medium text-on-surface peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors">
                Trabada o espiga (+15%)
              </span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* Columna derecha: Resultado limpio separado por línea */}
      <div className="lg:col-span-5 lg:pl-10 lg:border-l border-outline space-y-6">
        <div className="grid grid-cols-2 gap-6 pb-6 border-b border-outline">
          <div>
            <span className="text-xs text-secondary block">
              Cajas cerradas
            </span>
            <p className="font-serif text-2xl text-primary mt-1">
              {calculation.boxes}
            </p>
            <span className="text-xs text-secondary">
              {calculation.coveredArea.toFixed(2)} m² totales
            </span>
          </div>

          <div>
            <span className="text-xs text-secondary block">
              Mortero adhesivo
            </span>
            <p className="font-serif text-2xl text-on-surface mt-1">
              {calculation.mortarBags}
            </p>
            <span className="text-xs text-secondary">
              Fundas de 50 lb aprox.
            </span>
          </div>
        </div>

        <p className="text-sm text-secondary">
          Incluye margen recomendado para cortes y reserva del mismo lote.
        </p>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white py-2.5 px-6 rounded-lg text-sm font-semibold transition-colors"
        >
          <Icon name="chat" className="text-[16px]" />
          <span>Cotizar este metraje</span>
        </a>
      </div>
    </div>
  );
}
