"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { buildWhatsAppUrl } from "@/data/site";
import { SPACES } from "@/data/spaces";

const SLIDE_INTERVAL_MS = 4500;

/** Una diapositiva por espacio (Pisos, Paredes, Baños, Cocinas). */
const SLIDES = SPACES.map((space) => ({
  id: space.slug,
  eyebrow: space.label,
  title: space.title,
  description: space.description,
  href: space.catalogHref,
  ctaLabel: `Explorar ${space.label}`,
  image: space.image,
  alt: space.imageAlt,
  imagePosition: space.imagePosition,
}));

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideCount = SLIDES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const timer = window.setInterval(nextSlide, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, nextSlide]);

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="hero-titulo"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
      }}
      className="relative w-full overflow-hidden bg-inverse-surface h-[500px] sm:h-[600px] lg:h-[calc(100svh-74px)] lg:min-h-[580px] lg:max-h-[780px]"
    >
      <h1 id="hero-titulo" className="sr-only">
        Cerámica El Almacén: porcelanatos, grifería y baños en República
        Dominicana
      </h1>

      {/* Pista de diapositivas */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {SLIDES.map((slide, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${idx + 1} de ${slideCount}: ${slide.title}`}
              aria-hidden={!isCurrent}
              inert={!isCurrent}
              className="relative min-w-full h-full shrink-0"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                unoptimized
                priority={idx === 0}
                fetchPriority={idx === 0 ? "high" : "low"}
                loading={idx === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="object-cover"
                style={
                  slide.imagePosition
                    ? { objectPosition: slide.imagePosition }
                    : undefined
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

              <div className="absolute inset-x-0 bottom-0 pb-20 sm:pb-24">
                <div className="max-w-7xl mx-auto px-margin-mobile sm:px-20 flex flex-col items-center text-center gap-3.5 text-white">
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-semibold text-white/90">
                    Colección · {slide.eyebrow}
                  </span>
                  <h2 className="max-w-3xl text-2xl sm:text-4xl uppercase tracking-[0.18em] font-semibold text-white">
                    {slide.title}
                  </h2>
                  <p className="max-w-xl text-xs sm:text-sm tracking-wide text-white/85 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
                    <Link
                      href={slide.href}
                      className="min-h-[44px] inline-flex items-center justify-center bg-white text-on-surface hover:bg-on-surface hover:text-white border border-white px-8 py-3 text-xs uppercase tracking-[0.22em] font-semibold transition-colors duration-300"
                    >
                      <span>{slide.ctaLabel}</span>
                    </Link>
                    <a
                      href={buildWhatsAppUrl(
                        `Hola, deseo cotizar ${slide.eyebrow.toLowerCase()} con Cerámica El Almacén.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex min-h-[44px] items-center justify-center gap-2 border border-white/80 bg-black/20 backdrop-blur-sm px-7 py-3 text-xs uppercase tracking-[0.22em] font-medium text-white hover:bg-white hover:text-on-surface transition-colors duration-300"
                    >
                      <span>Cotizar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flechas minimalistas con trazos finos estilo galería */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Espacio anterior"
        className="hidden sm:inline-flex absolute z-20 left-6 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center border border-white/35 bg-black/25 text-white backdrop-blur-sm hover:bg-white hover:text-on-surface transition-colors"
      >
        <Icon name="chevron_left" className="text-[24px]" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Espacio siguiente"
        className="hidden sm:inline-flex absolute z-20 right-6 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center border border-white/35 bg-black/25 text-white backdrop-blur-sm hover:bg-white hover:text-on-surface transition-colors"
      >
        <Icon name="chevron_right" className="text-[24px]" />
      </button>

      {/* Indicadores tipo Barra de Progreso Lineal (h-0.5) estilo Manolo Blahnik */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center px-6">
        <ul
          role="tablist"
          aria-label="Seleccionar diapositiva del banner"
          className="flex items-center gap-3 w-full max-w-md"
        >
          {SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <li key={slide.id} className="flex-1">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Ver ${slide.eyebrow}`}
                  onClick={() => setActiveIndex(idx)}
                  className="group w-full py-3 flex flex-col gap-1.5 text-left focus:outline-none"
                >
                  <span
                    className={`block text-[10px] uppercase tracking-[0.22em] transition-colors truncate ${
                      isCurrent
                        ? "text-white font-semibold"
                        : "text-white/60 group-hover:text-white/90"
                    }`}
                  >
                    {slide.eyebrow}
                  </span>
                  <div className="w-full h-[2px] bg-white/35 overflow-hidden">
                    <span
                      key={isCurrent ? `active-${activeIndex}` : `idle-${idx}`}
                      className={`block h-full bg-white ${
                        isCurrent ? "hero-progress-bar-fill" : "w-0"
                      }`}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
