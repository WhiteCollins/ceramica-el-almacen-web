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
  href: `/${space.slug}`,
  ctaLabel: `Ver ${space.label.toLowerCase()}`,
  image: space.image,
  alt: space.imageAlt,
  imagePosition: space.imagePosition,
}));

/**
 * Banner de la portada: cambia de forma automática y continua (autoplay)
 * sin detenerse cuando el cursor está encima.
 */
export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideCount = SLIDES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Autoplay continuo sin pausarse por hover del ratón
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
      className="relative w-full overflow-hidden bg-inverse-surface h-[460px] sm:h-[520px] lg:h-[600px]"
    >
      {/* Único H1 de la portada; los títulos de cada diapositiva son h2 */}
      <h1 id="hero-titulo" className="sr-only">
        Cerámica El Almacén: porcelanatos, grifería y baños en República
        Dominicana
      </h1>

      {/* Pista que se desplaza con transform (solo compositor) */}
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
                priority={idx === 0}
                fetchPriority={idx === 0 ? "high" : "low"}
                loading={idx === 0 ? "eager" : "lazy"}
                quality={95}
                sizes="100vw"
                className="object-cover"
                style={
                  slide.imagePosition
                    ? { objectPosition: slide.imagePosition }
                    : undefined
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5" />

              <div className="absolute inset-x-0 bottom-0 pb-[84px] sm:pb-20">
                <div className="max-w-7xl mx-auto px-margin-mobile sm:px-24 flex flex-col gap-3 text-white">
                  <p className="text-sm sm:text-base font-medium text-white/85">
                    {slide.eyebrow}
                  </p>
                  <h2 className="max-w-3xl font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                    {slide.title}
                  </h2>
                  <p className="max-w-2xl text-base sm:text-lg text-white/90">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={slide.href}
                      className="min-h-[48px] inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-on-surface hover:bg-surface transition-colors"
                    >
                      <span>{slide.ctaLabel}</span>
                      <Icon name="arrow_forward" className="text-[18px]" />
                    </Link>
                    <a
                      href={buildWhatsAppUrl(
                        `Hola, deseo cotizar ${slide.eyebrow.toLowerCase()} con Cerámica El Almacén.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white/70 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      <Icon name="chat" className="text-[18px]" />
                      <span>Cotizar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flechas: centradas a los lados desde sm; abajo en móvil para no tapar el texto */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Espacio anterior"
        className="absolute z-20 left-3 sm:left-6 bottom-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 h-12 w-12 inline-flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/75 transition-colors"
      >
        <Icon name="chevron_left" className="text-[28px]" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Espacio siguiente"
        className="absolute z-20 right-3 sm:right-6 bottom-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 h-12 w-12 inline-flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/75 transition-colors"
      >
        <Icon name="chevron_right" className="text-[28px]" />
      </button>

      {/* Puntos indicadores centrados abajo */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center">
        <div
          role="group"
          aria-label="Elegir espacio"
          className="flex items-center"
        >
          {SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Ver ${slide.eyebrow}`}
                aria-current={isCurrent ? "true" : undefined}
                className="h-11 w-11 inline-flex items-center justify-center"
              >
                <span
                  className={
                    isCurrent
                      ? "h-2 w-8 rounded-full bg-white transition-all"
                      : "h-2 w-2 rounded-full bg-white/55 hover:bg-white/85 transition-all"
                  }
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
