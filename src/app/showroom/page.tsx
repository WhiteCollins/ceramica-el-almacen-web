import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { TileCalculator } from "@/components/TileCalculator";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: "Proyectos & Showroom",
  description:
    "Proyectos residenciales y comerciales suministrados en el Este, visita nuestro showroom en San Pedro de Macorís y calcula tus cajas de cerámica.",
};

export default function ShowroomPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* SECCIÓN 1: PROYECTOS (BENTO GRID + CHIPS DE MATERIALES) */}
      <section className="w-full py-16 lg:py-24 px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          <ProjectsGrid />
        </div>
      </section>

      {/* SECCIÓN 2: VISITA EL SHOWROOM (FOTOS + HORARIO + MAPA, LO QUE SALIÓ DE CONTACTO) */}
      <section className="w-full py-16 lg:py-24 px-margin-mobile lg:px-margin-desktop bg-surface-container-low">
        <div className="scroll-reveal max-w-7xl mx-auto space-y-10 lg:space-y-12">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-serif text-2xl text-on-surface">
              Visita nuestro showroom
            </h2>
            <p className="text-base text-secondary">
              Ambientes a escala 1:1, acceso con rampa nivelada y parqueo
              privado en {SITE_INFO.address.street}, {SITE_INFO.address.city}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Fotos del showroom y mapa */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-surface">
                    <Image
                      src="/images/showroom/vignette-sottovento.jpg"
                      alt="Exhibición de la tina exenta Sottovento blanco mate en el showroom"
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-secondary">
                    Exhibición escala 1:1 · Suite Sottovento
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-surface">
                    <Image
                      src="/images/showroom/expositores-imex.jpg"
                      alt="Expositores de grifería IMEX en el showroom de Cerámica El Almacén"
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-secondary">
                    Muestrario técnico · Griferías IMEX
                  </p>
                </div>
              </div>

              <a
                href={SITE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-52 sm:h-64 w-full rounded-lg overflow-hidden group border border-outline"
              >
                <Image
                  src="/images/showroom/mapa-san-pedro.png"
                  alt="Mapa de ubicación en Av. Rolando Martínez 33, San Pedro de Macorís"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 bg-white/95 text-primary px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm">
                  Abrir ubicación en Google Maps →
                </span>
              </a>
            </div>

            {/* Horario, dirección y rutas */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-on-surface">
                  Dirección
                </h3>
                <p className="text-sm text-secondary">
                  {SITE_INFO.address.street}, {SITE_INFO.address.city}{" "}
                  {SITE_INFO.address.postalCode}
                </p>
                <a
                  href={SITE_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline pt-1"
                >
                  <Icon name="call" className="text-[16px]" />
                  <span>{SITE_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div className="space-y-2 pt-6 border-t border-outline">
                <h3 className="text-base font-semibold text-on-surface">
                  Horario de atención
                </h3>
                <div className="text-sm text-secondary space-y-1.5">
                  <p className="flex justify-between">
                    <span>Lunes a viernes</span>
                    <span className="text-on-surface font-medium">
                      8:00 AM – 6:00 PM
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sábados</span>
                    <span className="text-on-surface font-medium">
                      8:30 AM – 1:00 PM
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Domingos</span>
                    <span>Cerrado (previa cita)</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-6 border-t border-outline">
                <h3 className="text-base font-semibold text-on-surface">
                  Cómo llegar
                </h3>
                <ul className="text-sm text-secondary space-y-2">
                  <li>
                    <strong className="text-on-surface font-medium">
                      Desde Santo Domingo:
                    </strong>{" "}
                    50 min por Autovía del Este hacia Av. Rolando Martínez.
                  </li>
                  <li>
                    <strong className="text-on-surface font-medium">
                      Desde La Romana / Casa de Campo:
                    </strong>{" "}
                    35 min directos por Autopista Coral.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: CALCULADORA DE CAJAS (FONDO NEUTRO, SIN CAJA) */}
      <section
        id="calculadora"
        className="w-full py-16 lg:py-24 px-margin-mobile lg:px-margin-desktop bg-surface scroll-mt-20"
      >
        <div className="scroll-reveal max-w-7xl mx-auto">
          <TileCalculator />
        </div>
      </section>

      {/* SECCIÓN 4: CTA FINAL EN FONDO CLARO (TEXTO + 2 BOTONES) */}
      <section className="w-full py-16 lg:py-24 px-margin-mobile lg:px-margin-desktop bg-surface-container-low border-t border-outline">
        <div className="scroll-reveal max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <h2 className="font-serif text-2xl text-on-surface">
              ¿Trabajas en una obra o remodelación?
            </h2>
            <p className="text-base text-secondary">
              Trae tus planos al showroom o solicítanos muestras físicas y
              reserva de lote sin costo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contacto"
              className="min-h-[44px] inline-flex items-center justify-center bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Solicitar presupuesto
            </Link>
            <a
              href={SITE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 border border-outline bg-white hover:bg-surface text-on-surface px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Icon name="location_on" className="text-[16px] text-primary" />
              <span>Cómo llegar</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
