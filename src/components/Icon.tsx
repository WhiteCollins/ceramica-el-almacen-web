import React from "react";

/**
 * Íconos de Material Symbols que usa el sitio. La fuente se genera solo con
 * estos nombres y se aloja en src/app/fonts (pesa unos 7 KB en lugar de 4 MB).
 * Si usas un ícono nuevo (también en src/data), agrégalo aquí y ejecuta
 * `npm run icons`, o se verá como texto.
 */
export const ICON_NAMES = [
  "accessible",
  "architecture",
  "arrow_back",
  "arrow_forward",
  "assignment",
  "bathtub",
  "build_circle",
  "calculate",
  "call",
  "chat",
  "check_circle",
  "chevron_left",
  "chevron_right",
  "close",
  "description",
  "domain",
  "energy_savings_leaf",
  "error",
  "expand_more",
  "floor_lamp",
  "grid_view",
  "layers",
  "local_parking",
  "local_shipping",
  "location_on",
  "mail",
  "menu",
  "nature",
  "palette",
  "pause",
  "percent",
  "play_arrow",
  "schedule",
  "search",
  "search_off",
  "texture",
  "tune",
  "verified",
  "warehouse",
  "water_drop",
] as const;


interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export function Icon({ name, className = "", filled = false }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
      style={
        filled
          ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
          : undefined
      }
    >
      {name}
    </span>
  );
}
