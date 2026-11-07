import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { buildWhatsAppUrl } from "@/data/site";

/**
 * Banner fijo de la portada (sustituye al carrusel): una sola imagen, el
 * mensaje de la tienda como H1 y dos acciones.
 */
export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-inverse-surface h-[440px] sm:h-[520px] lg:h-[600px]">
      <Image
        src="/images/hero/tina-sottovento-hero.jpg"
        alt="Baño contemporáneo con tina exenta Sottovento blanco mate y grifería de piso dorada frente a revestimiento travertino"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5" />

      <div className="absolute inset-x-0 bottom-0 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-3 text-white">
          <p className="text-sm sm:text-base font-medium text-white/85">
            Showroom en San Pedro de Macorís
          </p>
          <h1 className="max-w-3xl font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            Porcelanatos, grifería y baños para tu obra
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-white/90">
            Importación directa de España e Italia, en exhibición a escala real
            y con despacho a pie de obra.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <Link
              href="/catalogo"
              className="min-h-[48px] inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-on-surface hover:bg-surface transition-colors"
            >
              <span>Ver catálogo</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
            <a
              href={buildWhatsAppUrl(
                "Hola, deseo cotizar materiales con Cerámica El Almacén."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center gap-2 rounded-lg border border-white/70 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Cotizar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
