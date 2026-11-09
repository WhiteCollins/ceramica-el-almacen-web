import React from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

/**
 * Bloque de cierre de las páginas de producto: invita a ver las piezas en el
 * showroom con dirección, horario y dos acciones directas con estética editorial.
 */
export function ShowroomBanner({ topic }: { topic?: string }) {
  const message = topic
    ? `Hola, quiero ver ${topic.toLowerCase()} en el showroom de Cerámica El Almacén.`
    : "Hola, quiero agendar una visita al showroom de Cerámica El Almacén.";

  return (
    <section className="w-full bg-surface-container-low border-t border-surface-container-highest">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="relative lg:col-span-6 aspect-[16/10] overflow-hidden rounded-sm bg-surface group">
          <Image
            src="/images/banners/showroom-islas-marmol.jpg"
            alt="Exhibición de islas de porcelanato, mármol y grifería a escala real en el showroom de Cerámica El Almacén"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="lg:col-span-6 flex flex-col gap-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b1d22]">
            Atelier &amp; Exhibición
          </span>
          <h2 className="text-xl sm:text-2xl uppercase tracking-[0.16em] font-semibold text-on-surface">
            Míralo y tócalo en el showroom
          </h2>
          <p className="text-sm lg:text-base text-secondary max-w-xl leading-relaxed">
            Ambientes a escala real en {SITE_INFO.address.street},{" "}
            {SITE_INFO.address.city}. {SITE_INFO.hours.weekdays}.{" "}
            {SITE_INFO.hours.saturday}.
          </p>
          <div className="flex flex-wrap gap-3.5 pt-2">
            <a
              href={buildWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] inline-flex items-center gap-2.5 bg-on-surface hover:bg-[#6b1d22] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors"
            >
              <Icon name="chat" className="text-[16px]" />
              <span>Agendar visita</span>
            </a>
            <a
              href={SITE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[46px] inline-flex items-center gap-2 border border-outline bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-on-surface hover:border-on-surface transition-colors"
            >
              <Icon name="location_on" className="text-[16px] text-[#6b1d22]" />
              <span>Cómo llegar</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
