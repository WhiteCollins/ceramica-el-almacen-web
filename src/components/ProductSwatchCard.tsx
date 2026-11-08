import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { CatalogProduct } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/data/site";

/**
 * Tarjeta de producto con microinteracciones:
 * - Badge sutil en la imagen con la medida principal (ej. 60×120 cm o 170×75 cm)
 * - Título en semibold y línea de acabado en gris neutro
 * - Botón flotante / visible al hacer hover para cotizar directo por WhatsApp con la referencia lista
 */
export function ProductSwatchCard({
  product,
  priority = false,
}: {
  product: CatalogProduct;
  priority?: boolean;
}) {
  const whatsappHref = buildWhatsAppUrl(product.whatsappText);

  return (
    <article className="group relative flex flex-col rounded-xl bg-white border border-outline/70 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Botón flotante visible en móvil y revelado con microinteracción al hacer hover en escritorio */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Cotizar ${product.name} por WhatsApp`}
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary-container text-white px-3.5 py-2 text-xs font-semibold shadow-md transition-all duration-300 lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0"
        >
          <Icon name="chat" className="text-[15px]" />
          <span>Cotizar</span>
        </a>
      </div>

      {/* Información del producto */}
      <Link
        href={`/catalogo/${product.id}`}
        className="p-4 flex flex-col justify-between flex-1 gap-1.5"
      >
        <h3 className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2 pt-0.5 text-xs text-secondary">
          <span className="truncate">
            {product.finish} · {product.stockBadge}
          </span>
          <span className="font-medium text-primary group-hover:translate-x-0.5 transition-transform shrink-0">
            Ver ficha →
          </span>
        </div>
      </Link>
    </article>
  );
}
