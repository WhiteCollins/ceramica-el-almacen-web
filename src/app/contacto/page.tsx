import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { QuoteForm } from "@/components/QuoteForm";
import {
  ADVISORS,
  FAQS,
  SITE_INFO,
  buildWhatsAppUrl,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Solicita tu cotización, contacta a nuestras asesoras o visita nuestros showrooms en San Pedro de Macorís y La Romana.",
};

export default function ContactoPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. CABECERA SPLIT EDITORIAL (Sin cortar la fotografía a la mitad) */}
      <section className="w-full bg-white border-b border-outline/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Columna Izquierda: Título, resumen y accesos directos */}
          <div className="lg:col-span-5 px-margin-mobile lg:px-14 py-12 lg:py-20 flex flex-col justify-center gap-6 bg-white">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b1d22] block">
                Atención Personalizada &amp; Proyectos
              </span>
              <h1 className="text-2xl sm:text-3xl uppercase tracking-[0.2em] font-semibold text-on-surface">
                Contacto &amp; Showrooms
              </h1>
              <p className="text-xs sm:text-sm tracking-wide text-secondary leading-relaxed">
                Agenda tu visita a nuestros showrooms en San Pedro de Macorís y
                La Romana, solicita muestrarios físicos para tu estudio o
                envíanos tus planos para cubicación y reserva de lote único.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#6b1d22] pl-4 text-xs text-secondary">
              <p>
                <strong className="uppercase tracking-[0.16em] text-on-surface font-semibold">
                  Central:
                </strong>{" "}
                <a
                  href={SITE_INFO.phoneHref}
                  className="hover:text-[#6b1d22] transition-colors font-medium"
                >
                  {SITE_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <strong className="uppercase tracking-[0.16em] text-on-surface font-semibold">
                  Planos &amp; Ventas:
                </strong>{" "}
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="hover:text-[#6b1d22] transition-colors font-medium"
                >
                  {SITE_INFO.email}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#cotizar"
                className="min-h-[44px] inline-flex items-center justify-center rounded-none bg-on-surface hover:bg-[#6b1d22] text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                Solicitar cotización
              </a>
              <a
                href="#sedes"
                className="min-h-[44px] inline-flex items-center justify-center rounded-none border border-on-surface bg-white hover:bg-on-surface text-on-surface hover:text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                Ver sucursales
              </a>
            </div>
          </div>

          {/* Columna Derecha: Fotografía completa en su proporción real sin recortes bruscos */}
          <div className="relative lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-inverse-surface">
            <Image
              src="/images/banners/contacto-banner.jpg"
              alt="Ducha revestida en piedra natural travertino con grifería dorada empotrada en Cerámica El Almacén"
              fill
              quality={95}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 1080px"
              className="object-cover object-[68%_45%]"
            />
          </div>
        </div>
      </section>

      {/* 2. SEDES Y HORARIOS EN DÚO SIMÉTRICO 50 / 50 */}
      <section
        id="sedes"
        aria-labelledby="sedes-titulo"
        className="w-full py-14 lg:py-20 px-margin-mobile lg:px-margin-desktop border-b border-outline/50 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col items-center text-center space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b1d22]">
              Visítanos en Piso de Exhibición
            </span>
            <h2
              id="sedes-titulo"
              className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface"
            >
              Showrooms &amp; Horarios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {SITE_INFO.locations.map((loc) => (
              <article
                key={loc.id}
                className="bg-white rounded-none border border-outline/60 border-t-2 border-t-[#6b1d22] p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-[0_18px_38px_-14px_rgba(107,29,34,0.16)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b1d22]">
                      <Icon name="location_on" className="text-[15px]" />
                      <span>{loc.city}</span>
                    </span>
                    <a
                      href={loc.phoneHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface hover:text-[#6b1d22] transition-colors"
                    >
                      <Icon name="call" className="text-[15px] text-[#6b1d22]" />
                      <span>{loc.phoneDisplay}</span>
                    </a>
                  </div>

                  <h3 className="text-base sm:text-lg uppercase tracking-[0.16em] font-semibold text-on-surface">
                    {loc.name}
                  </h3>

                  <p className="text-sm text-secondary leading-relaxed">
                    {loc.address}
                  </p>
                </div>

                <div className="pt-5 border-t border-outline/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 text-xs text-secondary">
                    <p>
                      <strong className="text-on-surface font-semibold uppercase tracking-wider">
                        Lun – Vie:
                      </strong>{" "}
                      8:00 AM – 6:00 PM
                    </p>
                    <p>
                      <strong className="text-on-surface font-semibold uppercase tracking-wider">
                        Sábados:
                      </strong>{" "}
                      8:30 AM – 1:00 PM
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[38px] inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface bg-surface hover:bg-on-surface hover:text-white px-3.5 py-2 border border-outline transition-colors"
                    >
                      <span>Google Maps</span>
                      <Icon name="arrow_forward" className="text-[13px]" />
                    </a>
                    {loc.wazeUrl ? (
                      <a
                        href={loc.wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[38px] inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface bg-white hover:border-on-surface px-3.5 py-2 border border-outline transition-colors"
                      >
                        <span>Waze</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BLOQUE PRINCIPAL: FORMULARIO (IZQUIERDA) + ESPECIALISTAS & ENVÍO DE PLANOS (DERECHA) */}
      <section
        id="cotizar"
        className="w-full py-14 lg:py-20 px-margin-mobile lg:px-margin-desktop scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda (7 columnas): Formulario "Solicitar cotización" */}
          <div className="lg:col-span-7 bg-white rounded-none border border-outline/60 p-6 sm:p-9 lg:p-11 space-y-7">
            <div className="space-y-2 border-b border-outline/60 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
                Presupuesto &amp; Muestras
              </span>
              <h2 className="text-lg sm:text-xl uppercase tracking-[0.16em] font-semibold text-on-surface">
                Solicitar cotización
              </h2>
              <p className="text-sm text-secondary leading-relaxed">
                Completa los datos de tu obra o remodelación y envíanos tu
                solicitud directamente por WhatsApp o correo electrónico.
              </p>
            </div>

            <QuoteForm />
          </div>

          {/* Columna Derecha (5 columnas): Asesoras en tarjetas amplias + Bloque Técnico de Planos */}
          <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Asesoría directa por WhatsApp (tarjetas apiladas con espacio completo) */}
            <div className="bg-white rounded-none border border-outline/60 p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between gap-2 border-b border-outline/50 pb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b1d22] block">
                    Atención Directa
                  </span>
                  <h2 className="text-sm sm:text-base uppercase tracking-[0.16em] font-semibold text-on-surface mt-0.5">
                    Asesoras Especializadas
                  </h2>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b1d22]">
                  En línea
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {ADVISORS.map((advisor, idx) => (
                  <a
                    key={advisor.id}
                    href={buildWhatsAppUrl(advisor.whatsappGreeting)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-none border border-outline/60 bg-surface hover:border-[#6b1d22] hover:bg-white transition-colors group"
                  >
                    <Image
                      src={advisor.contactAvatar}
                      alt={advisor.name}
                      width={56}
                      height={56}
                      quality={95}
                      priority={idx === 0}
                      className="w-14 h-14 rounded-none object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-on-surface group-hover:text-[#6b1d22] transition-colors">
                        {advisor.name}
                      </p>
                      <p className="text-xs text-secondary leading-snug">
                        {idx === 0
                          ? "Constructoras y obras · Cotización por cubicaje"
                          : "Diseño y showroom · Muestras físicas"}
                      </p>
                      <span className="inline-flex items-center gap-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b1d22]">
                        <span>Escribir por WhatsApp</span>
                        <Icon name="arrow_forward" className="text-[12px]" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Envío directo de Planos Técnicos para Arquitectos y Constructoras */}
            <div className="rounded-none border border-outline/60 bg-white p-6 sm:p-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b1d22]">
                <Icon name="architecture" className="text-[15px]" />
                <span>Arquitectos &amp; Constructoras</span>
              </span>
              <h2 className="text-base uppercase tracking-[0.16em] font-semibold text-on-surface">
                Envío de planos DWG / PDF
              </h2>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Si manejas listados de metraje o planos arquitectónicos, envíalos
                directamente a nuestro departamento de cubicación para cotizar
                por paleta y reservar un único lote.
              </p>
              <a
                href={`mailto:${SITE_INFO.email}?subject=${encodeURIComponent(
                  "Envío de planos para cubicación — Cerámica El Almacén"
                )}`}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-none border border-on-surface bg-white hover:bg-on-surface text-on-surface hover:text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
              >
                <Icon name="mail" className="text-[16px]" />
                <span>{SITE_INFO.email}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. FAQ EN FILAS EDITORIALES CON LÍNEAS FINAS (ESTILO MANOLO BLAHNIK) */}
      <section
        id="faq"
        className="w-full py-16 lg:py-24 px-margin-mobile lg:px-margin-desktop bg-white scroll-mt-20 border-t border-outline/60"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b1d22] block">
              Consultas &amp; Garantías
            </span>
            <h2 className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface">
              Preguntas frecuentes
            </h2>
            <p className="text-xs sm:text-sm tracking-wide text-secondary">
              Respuestas rápidas sobre despachos a obra, reservas de lote,
              muestras físicas y garantías.
            </p>
          </div>

          <div className="divide-y divide-outline/60 border-y border-outline/60">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-2">
                <summary className="flex items-center justify-between gap-4 min-h-[56px] py-3 cursor-pointer select-none">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold text-on-surface group-hover:text-[#6b1d22] transition-colors">
                    {faq.question}
                  </span>
                  <span className="h-8 w-8 bg-surface-container-low inline-flex items-center justify-center text-on-surface text-lg transition-all duration-200 group-open:rotate-45 group-open:bg-[#6b1d22] group-open:text-white shrink-0">
                    +
                  </span>
                </summary>
                <div className="pb-5 pr-8 text-sm text-secondary space-y-2.5 leading-relaxed">
                  {faq.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
