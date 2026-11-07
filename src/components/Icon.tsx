import React from "react";

/**
 * Íconos de Material Symbols que usa el sitio. La hoja de Google Fonts se pide
 * solo con estos nombres (parámetro `icon_names`), así la fuente pesa unos KB
 * en lugar de 4 MB. Si usas un ícono nuevo (también en src/data), agrégalo aquí
 * o se verá como texto.
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

/** URL de Google Fonts con ejes fijos (opsz 24, wght 400, GRAD 0) y relleno 0..1. */
export const ICON_FONT_URL = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&icon_names=${[
  ...ICON_NAMES,
]
  .sort()
  .join(",")}&display=block`;

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
