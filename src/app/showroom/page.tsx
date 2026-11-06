import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { TileCalculator } from "@/components/TileCalculator";
import {
  ADVISORS,
  SHOWROOM_PROJECTS,
  SHOWROOM_ZONES,
  SITE_INFO,
  buildWhatsAppUrl,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Showroom & Proyectos",
  description:
    "Conoce nuestro Atelier y Showroom accesible en San Pedro de Macorís, explora obras residenciales y comerciales suministradas en la Región Este y calcula tus cajas de porcelanato.",
};

export default function ShowroomPage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECCIÓN 1: HERO VISUAL-FIRST DEL ATELIER & SHOWROOM */}
      <section className="w-full bg-surface pt-3 pb-8 lg:py-12 border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-4">
          <nav
            aria-label="Ruta de exploración"
            className="flex items-center gap-space-xs font-label-md text-label-md text-secondary"
          >
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] py-2 hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="text-on-surface font-semibold">
              Showroom &amp; Proyectos
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-gutter-lg items-center">
            {/* Galería Fotográfica Primero */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-2.5 sm:gap-space-md">
              <div className="col-span-12 sm:col-span-7 relative rounded-xl overflow-hidden shadow-md h-56 sm:h-[380px] group">
                <Image
                  src="/images/showroom/vignette-sottovento.jpg"
                  alt="Exhibición en escala real de la tina exenta Sottovento blanco mate junto a grifería negra de piso en Cerámica El Almacén"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 35vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3.5">
                  <div className="text-white">
                    <span className="font-label-caps text-label-caps uppercase text-primary-fixed">
                      Vignette Escala 1:1
                    </span>
                    <p className="font-headline-sm text-headline-sm font-semibold">
                      Suite Sottovento &amp; Madera Cerámica
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-5 grid grid-cols-2 sm:flex sm:flex-col gap-2.5 sm:gap-space-md">
                <div className="relative rounded-xl overflow-hidden shadow-sm h-32 sm:flex-1 group">
                  <Image
                    src="/images/showroom/expositores-imex.jpg"
                    alt="Expositores técnicos de grifería IMEX en acabados oro cepillado, negro mate y cromo en el showroom"
                    fill
                    sizes="(max-width: 640px) 50vw, 22vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3">
                    <div className="text-white">
                      <span className="font-label-caps text-label-caps uppercase text-primary-fixed block">
                        IMEX
                      </span>
                      <p className="font-headline-sm text-sm sm:text-base font-semibold">
                        Griferías PVD
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-inverse-surface text-inverse-on-surface p-3.5 sm:p-4 rounded-xl flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="font-label-caps text-label-caps text-primary-fixed uppercase block">
                      Muestras
                    </span>
                    <p className="font-headline-sm text-sm sm:text-base leading-snug mt-0.5">
                      Paletas físicas para arquitectos
                    </p>
                  </div>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-1 min-h-[44px] font-label-md text-label-md text-primary-fixed hover:underline"
                  >
                    <span>Solicitar</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Columna de Texto y Acciones */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-high text-primary font-label-caps text-label-caps uppercase">
                <Icon name="storefront" className="text-[15px]" />
                <span>Atelier San Pedro de Macorís • Escala Real 1:1</span>
              </div>

              <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-on-surface font-normal tracking-tight">
                Un Atelier para Tocar la{" "}
                <span className="italic text-primary">Arquitectura</span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Contrastamos vetas de mármol, esmaltes artesanales y griferías
                PVD bajo iluminación natural antes de ordenar tu lote.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl(
                    "Hola, me gustaría agendar un recorrido guiado en el Showroom de Cerámica El Almacén."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-container text-on-primary rounded font-label-lg text-label-lg uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Icon name="calendar_month" className="text-[18px]" />
                  <span>Agendar Visita</span>
                </a>
                <a
                  href="#calculadora"
                  className="flex-1 sm:flex-none min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-container-highest hover:bg-surface-variant text-on-surface rounded font-label-lg text-label-lg uppercase tracking-wider transition-colors"
                >
                  <Icon
                    name="calculate"
                    className="text-[18px] text-primary"
                  />
                  <span>Calculadora m²</span>
                </a>
              </div>

              <div className="bg-surface-container-low p-3.5 rounded-lg flex items-start gap-3 border border-surface-container-high">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon name="accessible" className="text-[22px]" />
                </div>
                <div>
                  <span className="font-label-caps text-label-caps text-primary uppercase block">
                    Espacio 100% Inclusivo y Cómodo
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Rampa nivelada de acceso continuo, pasillos amplios y
                    estacionamiento privado en {SITE_INFO.address.street}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: LAS 4 ZONAS DE EXPERIENCIA (2×2 EN MÓVIL, 4 EN ESCRITORIO) */}
      <section className="w-full bg-surface-container-low py-9 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="max-w-2xl space-y-1 mb-6 lg:mb-10">
            <span className="font-label-caps text-label-caps text-primary uppercase">
              Recorrido Curado
            </span>
            <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface">
              Cuatro Zonas de Especificación Técnica
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter">
            {SHOWROOM_ZONES.map((zone) => (
              <article
                key={zone.tag}
                className="bg-surface-container-lowest p-4 sm:p-6 rounded-xl shadow-sm flex flex-col justify-between gap-3 border border-surface-container"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center">
                    <Icon name={zone.icon} className="text-[22px]" />
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-secondary uppercase block">
                      {zone.tag}
                    </span>
                    <h3 className="font-headline-sm text-base sm:text-headline-sm text-on-surface font-semibold mt-0.5 leading-snug">
                      {zone.title}
                    </h3>
                  </div>
                  <p className="font-body-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                    {zone.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: PORTAFOLIO DE OBRAS Y PROYECTOS SUMINISTRADOS */}
      <section className="w-full bg-surface py-9 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6 lg:mb-10">
            <div className="max-w-2xl">
              <span className="font-label-caps text-label-caps text-primary uppercase">
                Inspiración Aplicada en el Caribe
              </span>
              <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface mt-0.5">
                Proyectos &amp; Ambientes Destacados
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Villas y espacios comerciales en Juan Dolio, La Romana y San Pedro
              de Macorís con suministro y reserva de lote garantizada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-gutter">
            {SHOWROOM_PROJECTS.map((project) => (
              <article
                key={project.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-atelier transition-shadow border border-surface-container flex flex-col group"
              >
                <div className="relative aspect-[16/10] bg-surface-container overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface px-2.5 py-1 rounded font-label-caps text-label-caps uppercase">
                    {project.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-surface/95 backdrop-blur-sm text-primary px-2.5 py-1 rounded font-label-md text-label-md font-semibold">
                    {project.area}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                  <div className="space-y-1.5">
                    <span className="font-label-caps text-label-caps text-secondary uppercase flex items-center gap-1">
                      <Icon
                        name="location_on"
                        className="text-[15px] text-primary"
                      />
                      {project.location}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                      {project.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-surface-container">
                    <div className="space-y-1.5">
                      <span className="font-label-caps text-label-caps text-secondary uppercase block">
                        Materiales Especificados
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.materials.map((mat) => (
                          <Link
                            key={mat}
                            href={`/catalogo?q=${encodeURIComponent(
                              mat.split(" ")[0]
                            )}`}
                            className="inline-flex items-center min-h-[44px] px-3 py-2 bg-surface-container hover:bg-surface-container-highest text-on-surface rounded font-label-md text-label-md transition-colors"
                          >
                            {mat}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <a
                      href={buildWhatsAppUrl(
                        `Hola, me inspiró el proyecto "${project.title}" (${project.location}) y deseo cotizar esos acabados.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary py-2.5 rounded font-label-md text-label-md uppercase tracking-wider transition-colors"
                    >
                      <Icon name="chat" className="text-[16px]" />
                      <span>Cotizar Este Look</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CALCULADORA INTERACTIVA DE METRAJE Y CAJAS */}
      <section
        id="calculadora"
        className="w-full bg-surface-container-low py-9 lg:py-14 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <TileCalculator />
        </div>
      </section>

      {/* SECCIÓN 5: MESA DE ARQUITECTURA & VISITA GUIADA */}
      <section className="w-full bg-surface py-9 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="bg-primary text-on-primary rounded-xl p-6 sm:p-8 lg:p-10 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="font-label-caps text-label-caps text-on-primary-container uppercase">
                Atención a Profesionales y Propietarios
              </span>
              <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl font-normal">
                Reserva una Sesión en Nuestra Mesa de Arquitectura
              </h2>
              <p className="font-body-md sm:text-body-lg text-on-primary/90 max-w-2xl">
                Trae tus planos o renders a {SITE_INFO.address.street}.{" "}
                {ADVISORS[0].name} y {ADVISORS[1].name} prepararán muestras
                físicas y reserva de lote sin costo para tu obra.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <Link
                href="/contacto"
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-surface text-primary hover:bg-surface-container py-3 px-5 rounded font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                <Icon name="assignment" className="text-[18px]" />
                <span>Solicitar Presupuesto</span>
              </Link>
              <a
                href={SITE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-on-primary-fixed-variant text-on-primary py-3 px-5 rounded font-label-md text-label-md uppercase tracking-wider transition-colors"
              >
                <Icon name="directions" className="text-[18px]" />
                <span>Cómo Llegar</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
