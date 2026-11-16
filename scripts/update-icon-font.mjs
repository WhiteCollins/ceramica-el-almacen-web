#!/usr/bin/env node
/**
 * Regenera src/app/fonts/material-symbols-subset.woff2 con solo los íconos
 * listados en ICON_NAMES (src/components/Icon.tsx).
 *
 * Ejecútalo cada vez que agregues o quites un ícono:  npm run icons
 *
 * La fuente se aloja en el propio sitio para no depender de una hoja de
 * estilos externa de Google Fonts, que bloqueaba el pintado de cada página.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const iconSource = await readFile(path.join(root, "src/components/Icon.tsx"), "utf8");
const list = iconSource.match(/ICON_NAMES = \[([\s\S]*?)\] as const/);
if (!list) throw new Error("No encontré ICON_NAMES en src/components/Icon.tsx");
const names = [...list[1].matchAll(/"([a-z0-9_]+)"/g)].map((m) => m[1]).sort();

const cssUrl =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0" +
  `&icon_names=${names.join(",")}&display=block`;

// Google Fonts solo entrega woff2 a navegadores modernos.
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const css = await (await fetch(cssUrl, { headers: { "User-Agent": userAgent } })).text();
const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1];
if (!fontUrl) throw new Error(`Google Fonts no devolvió una fuente:\n${css}`);

const font = Buffer.from(await (await fetch(fontUrl)).arrayBuffer());
const out = path.join(root, "src/app/fonts/material-symbols-subset.woff2");
await writeFile(out, font);
console.log(`${names.length} íconos -> ${path.relative(root, out)} (${(font.length / 1024).toFixed(1)} KB)`);
