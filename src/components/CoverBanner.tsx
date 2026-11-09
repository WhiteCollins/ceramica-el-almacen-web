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
  /** Encuadre de la foto (object-position), ej. "50% 70%". */
  imagePosition?: string;
  children?: React.ReactNode;
}

/**
 * Banner de portada fijo (sin carrusel) con composición editorial centrada.
 */
export function CoverBanner({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imagePosition,
  children,
}: CoverBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-inverse-surface h-[320px] sm:h-[400px] lg:h-[480px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
      <div className="relative z-10 h-full max-w-5xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col items-center justify-center text-center gap-3 text-white">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm sm:text-base text-white/90 leading-relaxed">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
