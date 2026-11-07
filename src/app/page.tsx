import Image from "next/image";
import Link from "next/link";
import { ColorShowcase } from "@/components/ColorShowcase";
import { HeroBanner } from "@/components/HeroBanner";
import { ShowroomBanner } from "@/components/ShowroomBanner";
import { SPACES } from "@/data/spaces";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECCIÓN 1: BANNER FIJO CON MENSAJE Y DOS ACCIONES */}
      <HeroBanner />

      {/* SECCIÓN 2: COMPRAR POR ESPACIO (PISOS, PAREDES, BAÑOS, COCINAS) */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <h2 className="font-serif text-3xl text-on-surface">
              Elige por espacio
            </h2>
            <p className="text-sm text-secondary max-w-md">
              Piezas cerámicas y sanitarias con estándares europeos de baja
              absorción y máxima durabilidad.
            </p>
          </div>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
          >
            {SPACES.map((space) => (
              <li key={space.slug} className="flex flex-col gap-3">
                <Link
                  href={`/${space.slug}`}
                  className="group flex flex-col gap-3"
                >
                  <span className="relative block overflow-hidden aspect-[4/5] rounded-lg bg-surface-container-low">
                    <Image
                      src={space.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="font-serif text-2xl text-on-surface group-hover:text-primary transition-colors">
                    {space.label}
                  </span>
                </Link>
                <ul role="list" className="flex flex-wrap gap-x-3 -mt-1">
                  {space.types.map((type) => (
                    <li key={type.slug}>
                      <Link
                        href={`/${space.slug}/${type.slug}`}
                        className="inline-flex items-center min-h-[44px] text-sm text-secondary hover:text-primary hover:underline"
                      >
                        {type.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECCIÓN 3: SELECTOR INTERACTIVO DE COLOR ('EL COLOR LO CAMBIA A TODO') */}
      <ColorShowcase />

      {/* SECCIÓN 4: INVITACIÓN AL SHOWROOM */}
      <ShowroomBanner />
    </div>
  );
}
