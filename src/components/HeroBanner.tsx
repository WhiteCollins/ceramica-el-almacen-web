"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";

interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  href: string;
  ctaLabel: string;
  image: string;
  alt: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: "sottovento",
    badge: "Colección Wellness • Italia",
    title: "Tina Exenta Sottovento Blanco Mate",
    subtitle: "Monolito acrílico sanitario 170 × 75 cm en exhibición 1:1",
    href: "/catalogo?categoria=sanitarios",
    ctaLabel: "Ver Sanitarios y Tinas",
    image: "/images/hero/tina-sottovento-hero.jpg",
    alt: "Baño contemporáneo con tina exenta Sottovento blanco mate y grifería de piso dorada frente a revestimiento travertino",
  },
  {
    id: "porcelanatos",
    badge: "Importación Directa • Castellón, España",
    title: "Porcelanatos Rectificados de Gran Formato",
    subtitle: "Mármol Calacatta 60 × 120 cm y maderas cerámicas 20 × 120 cm",
    href: "/catalogo?categoria=porcelanato",
    ctaLabel: "Ver Porcelanatos",
    image: "/images/categories/porcelanatos-calacatta.jpg",
    alt: "Sala contemporánea con piso de porcelanato español tipo mármol Calacatta pulido de gran formato",
  },
  {
    id: "griferia-pvd",
    badge: "Ingeniería Hidráulica • IMEX España",
    title: "Grifería en PVD Oro Cepillado & Negro Mate",
    subtitle: "Monomandos gourmet extraíbles y columnas de ducha termostáticas",
    href: "/catalogo?categoria=griferia",
    ctaLabel: "Ver Griferías",
    image: "/images/hero/griferia-oro-hero.jpg",
    alt: "Detalle de grifería gourmet en oro cepillado PVD con rociador extraíble sobre fregadero negro mate",
  },
  {
    id: "esmaltados",
    badge: "Tendencia Mediterránea • 15 × 15 cm",
    title: "Revestimientos Artesanales Esmaltados",
    subtitle: "Tonos esmeralda, cobalto, terracota y mostaza de alto brillo",
    href: "/catalogo?categoria=revestimiento",
    ctaLabel: "Ver Revestimientos",
    image: "/images/hero/gama-esmaltada-hero.jpg",
    alt: "Composición cenital de baldosas cerámicas esmaltadas artesanales en verde esmeralda, azul cobalto, mostaza y vino tinto",
  },
];

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoverOrFocus, setHoverOrFocus] = useState(false);

  const slideCount = BANNER_SLIDES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Respect prefers-reduced-motion on initial mount
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsPaused(true);
    }
  }, []);

  // Auto-advance every 4.5s unless paused or hovered/focused
  useEffect(() => {
    if (isPaused || hoverOrFocus) return;
    const timer = window.setInterval(nextSlide, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, hoverOrFocus, nextSlide]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Colecciones destacadas de Cerámica El Almacén"
      onMouseEnter={() => setHoverOrFocus(true)}
      onMouseLeave={() => setHoverOrFocus(false)}
      onFocusCapture={() => setHoverOrFocus(true)}
      onBlurCapture={() => setHoverOrFocus(false)}
      className="relative w-full bg-surface pt-3 pb-6 lg:py-8"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="relative overflow-hidden rounded-xl bg-inverse-surface shadow-atelier h-[340px] sm:h-[440px] lg:h-[520px]">
          {/* Pista animada en el compositor mediante transform translateX */}
          <div
            className="flex h-full w-full transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {BANNER_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} de ${slideCount}: ${slide.title}`}
                  aria-hidden={!isCurrent}
                  className="relative min-w-full h-full shrink-0 select-none"
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    fetchPriority={idx === 0 ? "high" : "low"}
                    loading={idx === 0 ? "eager" : "lazy"}
                    sizes="100vw"
                    className="object-cover"
                  />

                  {/* Gradiente editorial para lectura nítida */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                  {/* Contenido superpuesto de la diapositiva */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-16 sm:pb-16">
                    <div className="max-w-2xl space-y-1.5 sm:space-y-2 text-white">
                      <span className="inline-flex items-center px-3 py-1 rounded bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider">
                        {slide.badge}
                      </span>
                      <h1
                        className="font-display-hero text-headline-xl-mobile sm:text-display-hero font-normal tracking-tight text-white"
                      >
                        {slide.title}
                      </h1>
                      <p className="font-body-md sm:text-body-lg text-white/90">
                        {slide.subtitle}
                      </p>
                    </div>

                    <Link
                      href={slide.href}
                      tabIndex={isCurrent ? 0 : -1}
                      className="w-fit shrink-0 min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded bg-surface text-on-surface hover:bg-primary hover:text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors shadow-md"
                    >
                      <span>{slide.ctaLabel}</span>
                      <Icon name="arrow_forward" className="text-[18px]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Barra de Controles: Indicadores + Anterior / Pausa / Siguiente (todos >= 44px) */}
          <div className="absolute bottom-3 inset-x-4 sm:inset-x-8 lg:inset-x-12 z-10 flex items-center justify-between gap-2">
            {/* Indicadores de diapositiva */}
            <div
              role="group"
              aria-label="Seleccionar diapositiva"
              className="flex items-center gap-1"
            >
              {BANNER_SLIDES.map((slide, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Ir a imagen ${idx + 1}: ${slide.title}`}
                    aria-current={isCurrent ? "true" : undefined}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2"
                  >
                    <span
                      className={
                        isCurrent
                          ? "h-2 w-7 rounded-full bg-white transition-all"
                          : "h-2 w-2 rounded-full bg-white/50 hover:bg-white/80 transition-all"
                      }
                    />
                  </button>
                );
              })}
            </div>

            {/* Botones Anterior / Pausar / Siguiente */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Imagen anterior"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
              >
                <Icon name="chevron_left" className="text-[22px]" />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-label={
                  isPaused
                    ? "Reanudar cambio automático de imágenes"
                    : "Pausar cambio automático de imágenes"
                }
                aria-pressed={isPaused}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
              >
                <Icon
                  name={isPaused ? "play_arrow" : "pause"}
                  className="text-[20px]"
                />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Siguiente imagen"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-sm transition-colors"
              >
                <Icon name="chevron_right" className="text-[22px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
