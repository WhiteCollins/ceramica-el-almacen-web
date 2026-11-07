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

      {/* SECCIÓN 2: CATEGORÍAS PRINCIPALES */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="scroll-reveal flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8 lg:mb-10">
            <h2 className="font-serif text-2xl text-on-surface">
              Categorías principales
            </h2>
            <p className="text-sm text-secondary max-w-md">
              Piezas cerámicas y sanitarias con estándares europeos de baja
              absorción y máxima durabilidad.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {MAIN_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogo?categoria=${cat.slug}`}
                className="scroll-reveal group flex flex-col gap-3"
              >
                <div className="relative overflow-hidden aspect-[4/3] rounded-lg bg-surface-container-low">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-secondary">{cat.subtitle}</p>
                  <span className="inline-flex items-center gap-1 pt-1 text-primary text-sm font-medium group-hover:underline">
                    <span>{cat.cta}</span>
                    <span>→</span>
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
