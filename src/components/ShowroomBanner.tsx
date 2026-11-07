import React from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

/**
 * Bloque de cierre de las páginas de producto: invita a ver las piezas en el
 * showroom con dirección, horario y dos acciones directas.
 */
export function ShowroomBanner({ topic }: { topic?: string }) {
  const message = topic
    ? `Hola, quiero ver ${topic.toLowerCase()} en el showroom de Cerámica El Almacén.`
    : "Hola, quiero agendar una visita al showroom de Cerámica El Almacén.";

  return (
    <section className="w-full bg-surface-container-low border-t border-surface-container-highest">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="relative lg:col-span-5 aspect-[16/10] overflow-hidden rounded-lg bg-surface">
          <Image
            src="/images/showroom/vignette-sottovento.jpg"
            alt="Ambiente de baño a escala real en el showroom de Cerámica El Almacén"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h2 className="font-serif text-3xl text-on-surface">
            Míralo y tócalo en el showroom
          </h2>
          <p className="text-base text-secondary max-w-xl">
            Ambientes a escala real en {SITE_INFO.address.street},{" "}
            {SITE_INFO.address.city}. {SITE_INFO.hours.weekdays}.{" "}
            {SITE_INFO.hours.saturday}.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={buildWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-container transition-colors"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Agendar visita por WhatsApp</span>
            </a>
            <a
              href={SITE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 rounded-lg border border-outline bg-white px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-surface transition-colors"
            >
              <Icon name="location_on" className="text-[18px] text-primary" />
              <span>Cómo llegar</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
