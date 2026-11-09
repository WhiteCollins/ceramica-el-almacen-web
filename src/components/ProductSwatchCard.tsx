import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { CatalogProduct } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/data/site";

/**
 * Tarjeta de producto de lujo editorial inspirada en Manolo Blahnik:
 * - Fotografía limpia al corte sin cajas ni bordes pesados alrededor de la tarjeta
 * - Texto centrado debajo de la imagen con `uppercase tracking-[0.18em]`
 * - Subtítulo con medida y acabado en gris neutro espaciado
 * - Acción de cotizar / ver ficha que emerge suavemente al hacer hover
 */
export function ProductSwatchCard({
  product,
  priority = false,
  viewMode = "grid",
}: {
  product: CatalogProduct;
  priority?: boolean;
  viewMode?: "gallery" | "grid";
}) {
  const whatsappHref = buildWhatsAppUrl(product.whatsappText);
  const isGallery = viewMode === "gallery";

  return (
    <article className="group relative flex flex-col w-full">
      {/* Contenedor de fotografía limpia estilo galería */}
      <div
        className={`relative w-full overflow-hidden bg-surface-container-low ${
          isGallery ? "aspect-[16/11]" : "aspect-[4/3]"
        }`}
      >
        <Link
          href={`/catalogo/${product.id}`}
          aria-label={`Ver ficha técnica de ${product.name}`}
          className="block w-full h-full"
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            unoptimized
            priority={priority}
            sizes={
              isGallery
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            }
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Barra de acción inferior sutil al hacer hover (Cotizar / Ver ficha) */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-center gap-2 bg-gradient-to-t from-black/65 via-black/25 to-transparent lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-300">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${product.name} por WhatsApp`}
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#6b1d22] text-on-surface hover:text-white px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors shadow-sm"
          >
            <Icon name="chat" className="text-[14px]" />
            <span>Cotizar</span>
          </a>
          <Link
            href={`/catalogo/${product.id}`}
            className="inline-flex items-center justify-center bg-black/65 hover:bg-black text-white border border-white/40 px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors backdrop-blur-sm"
          >
            <span>Ficha</span>
          </Link>
        </div>
      </div>

      {/* Información centrada con tracking editorial (Estilo Manolo Blahnik) */}
      <Link
        href={`/catalogo/${product.id}`}
        className="pt-4 pb-2 px-2 flex flex-col items-center text-center gap-1"
      >
        <h3
          className={`uppercase tracking-[0.16em] font-semibold text-on-surface group-hover:text-[#6b1d22] transition-colors leading-snug ${
            isGallery ? "text-sm sm:text-base" : "text-xs sm:text-[13px]"
          }`}
        >
          {product.name}
        </h3>
        <p className="text-[11px] uppercase tracking-[0.14em] text-secondary">
          {product.dimensionsLabel} · {product.finish}
        </p>
      </Link>
    </article>
  );
}
