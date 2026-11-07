import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/data/catalog";

/**
 * Tarjeta tipo muestrario: foto cuadrada, nombre y una línea con formato y
 * acabado. Sin insignias: la disponibilidad se ve en la ficha.
 */
export function ProductSwatchCard({
  product,
  priority = false,
}: {
  product: CatalogProduct;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/catalogo/${product.id}`}
      className="group flex flex-col gap-3"
    >
      <span className="relative block aspect-square w-full overflow-hidden rounded-md bg-surface-container-low">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors">
          {product.name}
        </span>
        <span className="text-sm text-secondary">
          {product.dimensionsLabel}
          <span aria-hidden="true"> · </span>
          {product.finish}
        </span>
      </span>
    </Link>
  );
}
