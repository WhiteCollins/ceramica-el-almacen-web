import React from "react";
import Image from "next/image";

interface CoverBannerProps {
  /** Nivel superior en pequeño (ej. "Baños"). */
  eyebrow: string;
  /** Título grande; es el H1 de la página. */
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
}

/**
 * Banner de portada fijo (sin carrusel): foto a todo el ancho con el espacio
 * en pequeño y el tipo en grande, como en las páginas de categoría.
 */
export function CoverBanner({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
}: CoverBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-inverse-surface h-[300px] sm:h-[380px] lg:h-[460px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-2 text-white">
          <p className="text-sm sm:text-base font-medium text-white/85">
            {eyebrow}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-base sm:text-lg text-white/90">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
