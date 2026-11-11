import Image from "next/image";
import Link from "next/link";
import { ColorShowcase } from "@/components/ColorShowcase";
import { HeroBanner } from "@/components/HeroBanner";
import { ShowroomBanner } from "@/components/ShowroomBanner";
import { SPACES } from "@/data/spaces";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECCIÓN 1: BANNER PRINCIPAL CON AUTOPLAY Y BARRAS DE PROGRESO LINEALES */}
      <HeroBanner />

      {/* SECCIÓN 2: ELIGE POR ESPACIO (ESTÉTICA DE GALERÍA EDITORIAL) */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-10 lg:gap-14">
          <div className="scroll-reveal flex flex-col items-center text-center space-y-2.5">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#6b1d22] font-semibold">
              Arquitectura Interior
            </span>
            <h2 className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface">
              Elige por espacio
            </h2>
          </div>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          >
            {SPACES.map((space, idx) => (
              <li
                key={space.slug}
                data-reveal-delay={String(idx * 110)}
                className="scroll-reveal flex flex-col gap-3"
              >
                <Link
                  href={space.catalogHref}
                  className="
                    card-wine-glow group relative block overflow-hidden
                    aspect-[4/5] rounded-sm bg-inverse-surface
                    ring-1 ring-black/5 hover:ring-2 hover:ring-[#6b1d22]/80
                    transition-all duration-300 ease-out hover:-translate-y-1.5
                  "
                >
                  <Image
                    src={space.image}
                    alt={space.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={
                      space.imagePosition
                        ? { objectPosition: space.imagePosition }
                        : undefined
                    }
                  />

                  {/* Gradiente para garantizar contraste del título y descripción dentro de la imagen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-all duration-500 group-hover:from-[#2b090c]/90 group-hover:via-black/50" />

                  {/* Contenido superpuesto dentro de la imagen */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center justify-end text-white">
                    <h3 className="text-sm sm:text-base uppercase tracking-[0.22em] font-semibold text-white transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                      {space.label}
                    </h3>

                    {/* Detalle/descripción que se despliega suavemente al pasar el cursor (hover / focus) */}
                    <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 transition-all duration-300 ease-out">
                      <div className="overflow-hidden">
                        <p className="pt-2.5 text-xs text-white/90 leading-relaxed">
                          {space.cardDetail}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECCIÓN 3: MATERIALES Y SUPERFICIES (CERÁMICA, PORCELANATO Y PIEDRA NATURAL) */}
      <ColorShowcase />

      {/* SECCIÓN 4: INVITACIÓN AL SHOWROOM */}
      <ShowroomBanner />
    </div>
  );
}
