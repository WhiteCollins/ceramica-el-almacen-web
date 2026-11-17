import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Proyectos & Showroom",
  description:
    "Obras residenciales y comerciales equipadas con porcelanatos, griferías y sanitarios de Cerámica El Almacén.",
};

export default function ShowroomPage() {
  const whatsappPlanesHref = buildWhatsAppUrl(
    "Hola, deseo enviar los planos de mi proyecto para cubicación y reserva de lote."
  );

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* SECCIÓN 1: PORTAFOLIO EDITORIAL DE PROYECTOS */}
      <section className="w-full pt-12 pb-16 lg:pt-20 lg:pb-24 px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          <ProjectsGrid />
        </div>
      </section>

      {/* SECCIÓN 2: BLOQUE SPLIT 50 / 50 "TU OBRA PUEDE SER LA PRÓXIMA" (ESTILO MANOLO BLAHNIK) */}
      <section
        aria-labelledby="tu-obra-proxima-titulo"
        className="w-full bg-white border-t border-outline/60"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Columna Izquierda (Editorial & Captación Técnica) */}
          <div className="lg:col-span-6 px-margin-mobile lg:px-14 py-14 lg:py-20 flex flex-col justify-center gap-6 bg-white">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b1d22] block">
                Departamento Técnico &amp; Obras
              </span>
              <h2
                id="tu-obra-proxima-titulo"
                className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface"
              >
                Tu obra puede ser la próxima
              </h2>
              <p className="text-xs sm:text-sm tracking-wide text-secondary leading-relaxed max-w-lg">
                Cubicamos tus planos DWG o PDF sin costo, garantizamos reserva
                de un solo lote para evitar variaciones de tono y programamos
                despachos a pie de obra en todo el país.
              </p>
            </div>

            <ul
              role="list"
              className="space-y-2 text-xs sm:text-sm text-on-surface"
            >
              <li className="flex items-start gap-2.5">
                <span className="text-[#6b1d22] font-bold">–</span>
                <span>
                  Cálculo exacto de m² y porcentaje de desperdicio por ambiente
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#6b1d22] font-bold">–</span>
                <span>
                  Muestras físicas a escala real para presentación a clientes
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#6b1d22] font-bold">–</span>
                <span>
                  Asesoría directa en {SITE_INFO.address.city} y La Romana
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/contacto"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 rounded-none bg-on-surface hover:bg-[#6b1d22] text-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                <span>Enviar planos para cubicación</span>
              </Link>
              <a
                href={whatsappPlanesHref}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 rounded-none border border-on-surface bg-white hover:bg-on-surface text-on-surface hover:text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                <Icon name="chat" className="text-[15px]" />
                <span>Hablar con especialista</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha (Fotografía a sangre de Showroom / Especificación) */}
          <div className="relative lg:col-span-6 min-h-[340px] lg:min-h-[480px] overflow-hidden bg-surface-container-low">
            <Image
              src="/images/banners/showroom-exhibicion-1a1.jpg"
              alt="Exhibición técnica a escala real de superficies y acabados arquitectónicos en Cerámica El Almacén"
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
