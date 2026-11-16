import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CATALOG_PRODUCTS } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/data/site";

/**
 * 5 piezas icónicas seleccionadas para la exhibición asimétrica debajo del Hero,
 * inspirada en la sección "New Collection" de manoloblahnik.com/gb/.
 */
const SHOWCASE_IDS = [
  "tina-sottovento-blanco-mate",
  "porcelanato-statuario-imperial",
  "griferia-monomando-gourmet-oro",
  "lavamanos-oval-fluted-ranurado",
  "mural-artesanal-colors-of-life",
] as const;

const STAGGER_OFFSETS = [
  "lg:mt-0",
  "lg:mt-12",
  "lg:mt-4",
  "lg:mt-12",
  "lg:mt-0",
];

export function HomeNewCollection() {
  const showcaseProducts = SHOWCASE_IDS.map((id) =>
    CATALOG_PRODUCTS.find((p) => p.id === id)
  ).filter((p): p is (typeof CATALOG_PRODUCTS)[number] => Boolean(p));

  return (
    <section
      aria-labelledby="nueva-coleccion-titulo"
      className="w-full bg-white py-16 lg:py-24 border-b border-outline/40"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-12 lg:gap-16">
        {/* Cabecera editorial */}
        <div className="scroll-reveal flex flex-col items-center text-center space-y-2.5">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#6b1d22] font-semibold">
            Selección Destacada
          </span>
          <h2
            id="nueva-coleccion-titulo"
            className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface"
          >
            Piezas de Autor &amp; Colección
          </h2>
          <p className="text-xs sm:text-sm tracking-wide text-secondary max-w-xl">
            Cinco referencias insignia de nuestro catálogo disponibles en stock
            local para entrega inmediata y especificación de obra.
          </p>
        </div>

        {/* Galería flotante asimétrica (5 columnas escalonadas sin marcos ni bordes) */}
        <ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-7 items-start"
        >
          {showcaseProducts.map((product, idx) => {
            const staggerClass = STAGGER_OFFSETS[idx] ?? "";
            const spanLastOnMobile =
              idx === showcaseProducts.length - 1
                ? "col-span-2 sm:col-span-1 max-w-[260px] sm:max-w-none mx-auto w-full"
                : "";

            return (
              <li
                key={product.id}
                data-reveal-delay={String(idx * 90)}
                className={`scroll-reveal ${staggerClass} ${spanLastOnMobile}`}
              >
                <article className="group flex flex-col">
                  {/* Imagen limpia al corte con sombra orgánica de estudio */}
                  <Link
                    href={`/catalogo/${product.id}`}
                    aria-label={`${product.name} — ${product.dimensionsLabel}`}
                    className="
                      relative block aspect-[4/5] w-full overflow-hidden rounded-none bg-surface-container-low
                      shadow-[0_18px_36px_-14px_rgba(26,28,26,0.18)]
                      group-hover:shadow-[0_26px_46px_-12px_rgba(107,29,34,0.28)]
                      transition-all duration-500 ease-out group-hover:-translate-y-1.5
                    "
                  >
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="pointer-events-none absolute bottom-3 inset-x-3 text-center text-[10px] uppercase tracking-[0.22em] text-white font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Ver pieza
                    </span>
                  </Link>

                  {/* Ficha minimalista: siempre visible en móvil/táctil; en desktop emerge suavemente al hover */}
                  <div className="pt-4 flex flex-col items-center text-center gap-1 lg:opacity-0 lg:-translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-focus-within:opacity-100 lg:group-focus-within:translate-y-0 transition-all duration-300">
                    <Link
                      href={`/catalogo/${product.id}`}
                      className="text-xs uppercase tracking-[0.16em] font-semibold text-on-surface hover:text-[#6b1d22] transition-colors line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-secondary">
                      {product.dimensionsLabel} · {product.finish}
                    </span>
                    <a
                      href={buildWhatsAppUrl(product.whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#6b1d22] hover:underline"
                    >
                      <span>Cotizar</span>
                      <Icon name="arrow_forward" className="text-[12px]" />
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {/* Botón CTA rectangular fino estilo "SHOP THE EDIT" */}
        <div className="flex justify-center pt-2">
          <Link
            href="/catalogo"
            className="min-h-[46px] inline-flex items-center justify-center rounded-none border border-on-surface bg-transparent hover:bg-on-surface text-on-surface hover:text-white px-9 py-3 text-xs uppercase tracking-[0.22em] font-semibold transition-colors duration-300"
          >
            Explorar todo el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
