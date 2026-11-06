import Image from "next/image";
import Link from "next/link";
import { ColorShowcase } from "@/components/ColorShowcase";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
import { MAIN_CATEGORIES } from "@/data/site";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECCIÓN 1: BANNER CARRUSEL DE IMÁGENES EN TRANSICIÓN */}
      <HeroBanner />

      {/* SECCIÓN 2: CATEGORÍAS PRINCIPALES (CARDS SIMPLIFICADAS Y LIMPIAS) */}
      <section className="w-full bg-surface-container-low py-9 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6 lg:mb-8">
            <div>
              <span className="font-label-caps text-label-caps text-primary uppercase">
                Curaduría de Acabados
              </span>
              <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface mt-0.5">
                Categorías Principales
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Piezas cerámicas y sanitarias con estándares europeos de baja
              absorción y máxima durabilidad.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-gutter">
            {MAIN_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogo?categoria=${cat.slug}`}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-atelier transition-all duration-300 flex flex-col border border-surface-container-high"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-surface-container">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <h3 className="font-headline-sm sm:font-headline-md text-base sm:text-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors leading-snug">
                      {cat.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {cat.subtitle}
                    </p>
                  </div>

                  <span className="inline-flex items-center justify-between gap-1 min-h-[36px] pt-2.5 border-t border-surface-container text-primary font-label-md text-label-md font-semibold">
                    <span>{cat.cta}</span>
                    <Icon
                      name="east"
                      className="text-[16px] shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: SELECTOR INTERACTIVO DE COLOR ('EL COLOR LO CAMBIA A TODO') */}
      <ColorShowcase />
    </div>
  );
}
