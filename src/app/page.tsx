import Image from "next/image";
import Link from "next/link";
import { ColorShowcase } from "@/components/ColorShowcase";
import { HeroBanner } from "@/components/HeroBanner";
import { HomeCatalogCarousel } from "@/components/HomeCatalogCarousel";
import { HomeNewCollection } from "@/components/HomeNewCollection";
import { ShowroomBanner } from "@/components/ShowroomBanner";

const EXPLORE_DUO = [
  {
    id: "porcelanatos-superficies",
    eyebrow: "Pisos & Muros de Gran Formato",
    title: "Porcelanatos & Mármol",
    description:
      "Losas rectificadas 60 × 120 cm y listones en acabado madera natural con baja absorción y reserva de lote único para proyectos.",
    ctaLabel: "Explorar pisos",
    href: "/catalogo?categoria=porcelanato",
    image: "/images/categories/porcelanatos-calacatta.jpg",
    imageAlt:
      "Sala residencial contemporánea con pisos de porcelanato blanco veteado tipo Calacatta",
  },
  {
    id: "banos-griferia-pvd",
    eyebrow: "Equipamiento & Acabados PVD",
    title: "Baños & Grifería",
    description:
      "Tinas exentas Sottovento, lavamanos escultóricos y columnas termostáticas IMEX en latón macizo y acabado PVD resistente.",
    ctaLabel: "Explorar grifería",
    href: "/catalogo?categoria=griferia",
    image: "/images/categories/griferia-vanguardia.jpg",
    imageAlt:
      "Exhibición de grifería arquitectónica de vanguardia en acabados PVD dorado cepillado y negro mate",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECCIÓN 1: BANNER PRINCIPAL CON AUTOPLAY Y BARRAS DE PROGRESO LINEALES */}
      <HeroBanner />

      {/* SECCIÓN 2: EXHIBICIÓN ASIMÉTRICA DE 5 PIEZAS DE AUTOR (ESTILO MANOLO BLAHNIK "NEW COLLECTION") */}
      <HomeNewCollection />

      {/* SECCIÓN 3: DÚO EDITORIAL 50 / 50 (ESTILO "EXPLORE MORE") */}
      <section
        aria-labelledby="explora-colecciones-titulo"
        className="w-full bg-surface py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-10 lg:gap-14">
          <div className="scroll-reveal flex flex-col items-center text-center space-y-2.5">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#6b1d22] font-semibold">
              Universos de Diseño
            </span>
            <h2
              id="explora-colecciones-titulo"
              className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface"
            >
              Explora más colecciones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {EXPLORE_DUO.map((item, idx) => (
              <article
                key={item.id}
                data-reveal-delay={idx > 0 ? "110" : undefined}
                className="scroll-reveal group flex flex-col"
              >
                <Link
                  href={item.href}
                  className="card-wine-glow relative block aspect-[4/5] w-full overflow-hidden rounded-none bg-inverse-surface"
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                  <span className="pointer-events-none absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.26em] text-white/90 font-semibold">
                    {item.eyebrow}
                  </span>
                </Link>

                <div className="pt-6 flex flex-col items-center text-center gap-3 px-2">
                  <h3 className="text-base sm:text-lg uppercase tracking-[0.18em] font-semibold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm tracking-wide text-secondary max-w-md leading-relaxed">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-1 min-h-[42px] inline-flex items-center justify-center rounded-none border border-on-surface bg-transparent hover:bg-on-surface text-on-surface hover:text-white px-7 py-2.5 text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300"
                  >
                    {item.ctaLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CARRUSEL CURADO DEL CATÁLOGO POR CATEGORÍA (ESTILO "GET INSPIRED") */}
      <HomeCatalogCarousel />

      {/* SECCIÓN 5: CURADURÍA EUROPEA — MATERIALES Y SUPERFICIES */}
      <ColorShowcase />

      {/* SECCIÓN 6: INVITACIÓN AL SHOWROOM */}
      <ShowroomBanner />
    </div>
  );
}
