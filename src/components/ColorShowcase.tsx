import React from "react";
import Image from "next/image";
import Link from "next/link";

const MATERIAL_CARDS = [
  {
    id: "ceramica",
    title: "Cerámica",
    description:
      "Revestimientos artesanales y formatos versátiles de pasta blanca con esmaltes cálidos, relieves táctiles y alta resistencia para muros, cocinas y baños.",
    image: "/images/materials/ceramica.jpg",
    imageAlt:
      "Exhibición de cerámica artesanal y revestimientos texturizados en tonos cálidos en el showroom",
    href: "/catalogo?categoria=revestimiento",
  },
  {
    id: "porcelanato",
    title: "Porcelanato",
    description:
      "Losas rectificadas de gran formato con mínima absorción de agua y vetas continuas, ideales para pisos residenciales y áreas comerciales de alto tráfico.",
    image: "/images/materials/porcelanato.jpg",
    imageAlt:
      "Paneles corredizos con losas de porcelanato español de gran formato en acabado mármol cálido",
    href: "/catalogo?categoria=porcelanato",
  },
  {
    id: "piedra-natural",
    title: "Piedra Natural",
    description:
      "Superficies con la nobleza orgánica del travertino, la caliza y el mármol, seleccionadas para aportar textura auténtica y carácter arquitectónico atemporal.",
    image: "/images/materials/piedra-natural.jpg",
    imageAlt:
      "Exhibidor de placas y bloques de piedra natural, travertino y mármol bajo luz natural en el showroom",
    href: "/catalogo?acabado=M%C3%A1rmol",
  },
] as const;

export function ColorShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F0EA] py-16 lg:py-24 border-y border-outline/60">
      {/* Retícula arquitectónica de despiece de losas (64×64 px) con máscara radial suave */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(107, 29, 34, 0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(107, 29, 34, 0.055) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 50%, #000 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 50%, #000 45%, transparent 100%)",
        }}
      />

      {/* Halo radial cálido central con sutil matiz arena/vino */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(107, 29, 34, 0.07) 0%, rgba(235, 226, 213, 0.45) 45%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-10 lg:gap-12">
        <div className="scroll-reveal flex flex-col items-center text-center space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface">
            Materiales y superficies
          </h2>
          <p className="text-sm sm:text-base text-secondary max-w-2xl">
            Explora nuestras líneas de cerámica, porcelanato y piedra natural
            seleccionadas para proyectos residenciales y comerciales.
          </p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {MATERIAL_CARDS.map((item, idx) => (
            <li
              key={item.id}
              data-reveal-delay={String(idx * 130)}
              className="scroll-reveal flex flex-col"
            >
              <Link
                href={item.href}
                className="
                  card-wine-glow group relative block overflow-hidden aspect-[4/3]
                  rounded-2xl bg-inverse-surface
                  ring-1 ring-black/5 hover:ring-2 hover:ring-[#6b1d22]/80
                  transition-all duration-300 ease-out hover:-translate-y-1.5
                "
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradiente sutil con matiz cálido en hover para realzar el resplandor vino sin restar nitidez */}
                <div
                  className="
                    pointer-events-none absolute inset-0
                    bg-gradient-to-t from-black/80 via-black/20 to-transparent
                    transition-all duration-500
                    group-hover:from-[#2b090c]/90 group-hover:via-black/40
                  "
                />

                {/* Título superpuesto y descripción breve con animación fluida al pasar el puntero */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-2xl sm:text-[26px] text-white tracking-tight transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                    {item.title}
                  </h3>

                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 transition-all duration-300 ease-out">
                    <div className="overflow-hidden">
                      <p className="pt-2.5 text-xs sm:text-sm text-white/90 leading-relaxed">
                        {item.description}
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
  );
}
