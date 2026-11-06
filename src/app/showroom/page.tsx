import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { TileCalculator } from "@/components/TileCalculator";
import {
  ADVISORS,
  SHOWROOM_PROJECTS,
  SITE_INFO,
  buildWhatsAppUrl,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Proyectos & Ambientes Destacados",
  description:
    "Villas y espacios comerciales en Juan Dolio, La Romana y San Pedro de Macorís con suministro de porcelanatos, griferías y baños europeos de Cerámica El Almacén.",
};

export default function ShowroomPage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECCIÓN PRINCIPAL: PROYECTOS & AMBIENTES DESTACADOS */}
      <section className="w-full bg-surface py-8 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6 lg:mb-10">
            <div className="max-w-2xl">
              <span className="font-label-caps text-label-caps text-primary uppercase">
                Inspiración Aplicada en el Caribe
              </span>
              <h1 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface mt-0.5">
                Proyectos &amp; Ambientes Destacados
              </h1>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Villas y espacios comerciales en Juan Dolio, La Romana y San Pedro
              de Macorís con suministro y reserva de lote garantizada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-gutter">
            {SHOWROOM_PROJECTS.map((project, index) => (
              <Link
                key={project.id}
                href={`/showroom/${project.id}`}
                className="scroll-reveal bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-atelier transition-all border border-surface-container-high flex flex-col group"
              >
                <div className="relative aspect-[16/10] bg-surface-container overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div className="space-y-1">
                    <span className="font-label-caps text-label-caps text-primary uppercase">
                      {project.location} • {project.category}
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="font-body-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <span className="inline-flex items-center justify-between gap-1 min-h-[36px] pt-3 border-t border-surface-container text-primary font-label-md text-label-md font-semibold">
                    <span>Ver Proyecto Completo</span>
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

      {/* SECCIÓN 2: CALCULADORA INTERACTIVA DE METRAJE Y CAJAS */}
      <section
        id="calculadora"
        className="w-full bg-surface-container-low py-9 lg:py-14 scroll-mt-20"
      >
        <div className="scroll-reveal max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <TileCalculator />
        </div>
      </section>

      {/* SECCIÓN 3: MESA DE ARQUITECTURA & VISITA GUIADA */}
      <section className="w-full bg-surface py-9 lg:py-14">
        <div className="scroll-reveal max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
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
