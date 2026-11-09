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
      {/* BANNER SUPERIOR CON ESTÉTICA EDITORIAL CENTRADA */}
      <section className="relative w-full overflow-hidden bg-inverse-surface h-[240px] sm:h-[300px] lg:h-[360px]">
        <Image
          src="/images/banners/contacto-banner.jpg"
          alt="Ambiente de baño revestido en piedra natural travertino con grifería dorada en Cerámica El Almacén"
          fill
          unoptimized
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col items-center justify-center text-center gap-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
            Atención Personalizada &amp; Proyectos
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            Contacto
          </h1>
        </div>
      </section>

      {/* LAYOUT 2 COLUMNAS: FORMULARIO (IZQUIERDA) + 2 SEDES Y ASESORAS COMPACTAS (DERECHA) */}
      <section className="w-full py-14 lg:py-20 px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda (7 columnas): Formulario "Solicitar cotización" */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-outline/60 p-6 sm:p-9 lg:p-11 space-y-7">
            <div className="space-y-2 border-b border-outline/60 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
                Presupuesto &amp; Muestras
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-on-surface">
                Solicitar cotización
              </h2>
              <p className="text-sm text-secondary leading-relaxed">
                Completa los datos de tu obra o remodelación y envíanos tu
                solicitud por WhatsApp o correo electrónico (
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="text-[#6b1d22] hover:underline font-medium"
                >
                  {SITE_INFO.email}
                </a>
                ).
              </p>
            </div>

            <QuoteForm />
          </div>

          {/* Columna Derecha (5 columnas): Las 2 sedes principales (San Pedro de Macorís y La Romana) + Bloque de Asesoras */}
          <aside className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {SITE_INFO.locations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-white rounded-sm border border-outline/60 p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-[#6b1d22]/45 hover:shadow-[0_14px_34px_-10px_rgba(107,29,34,0.16)]"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b1d22]">
                        <Icon name="location_on" className="text-[15px]" />
                        <span>Showroom {loc.city}</span>
                      </span>
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface bg-surface hover:border-on-surface px-3 py-1.5 border border-outline/70 transition-colors shrink-0"
                      >
                        <span>Ver mapa</span>
                        <Icon name="arrow_forward" className="text-[13px]" />
                      </a>
                    </div>

                    <h2 className="font-serif text-xl text-on-surface">
                      {loc.name}
                    </h2>
                    <p className="text-sm text-secondary leading-relaxed">
                      {loc.address}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-outline/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-secondary">
                    <div className="space-y-0.5">
                      <p>
                        <strong className="text-on-surface font-medium">
                          Lun – Vie:
                        </strong>{" "}
                        8:00 AM – 6:00 PM
                      </p>
                      <p>
                        <strong className="text-on-surface font-medium">
                          Sábados:
                        </strong>{" "}
                        8:30 AM – 1:00 PM
                      </p>
                    </div>

                    <a
                      href={loc.phoneHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface hover:text-[#6b1d22] transition-colors"
                    >
                      <Icon name="call" className="text-[15px] text-[#6b1d22]" />
                      <span>{loc.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bloque horizontal compacto de Asesoras comerciales */}
            <div className="bg-white rounded-sm border border-outline/60 p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-serif text-lg text-on-surface">
                  Asesoría directa por WhatsApp
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b1d22]">
                  En línea
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADVISORS.map((advisor, idx) => (
                  <a
                    key={advisor.id}
                    href={buildWhatsAppUrl(advisor.whatsappGreeting)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-sm border border-outline/60 bg-surface hover:border-[#6b1d22] hover:bg-surface-container-low transition-colors group"
                  >
                    <Image
                      src={advisor.contactAvatar}
                      alt={advisor.name}
                      width={42}
                      height={42}
                      priority={idx === 0}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface group-hover:text-[#6b1d22] transition-colors truncate">
                        {advisor.name}
                      </p>
                      <p className="text-[11px] text-secondary truncate">
                        {idx === 0
                          ? "Constructoras y obras"
                          : "Diseño y showroom"}
                      </p>
                    </div>
                    <Icon
                      name="chat"
                      className="text-[15px] text-[#6b1d22] shrink-0"
                    />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ EN 2 COLUMNAS CON CONTENEDORES EDITORIALES */}
      <section
        id="faq"
        className="w-full py-16 lg:py-24 px-margin-mobile lg:px-margin-desktop bg-surface-container-low scroll-mt-20 border-t border-outline/50"
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-2xl mx-auto text-center space-y-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b1d22] block">
              Consultas &amp; Garantías
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface">
              Preguntas frecuentes
            </h2>
            <p className="text-sm text-secondary">
              Respuestas rápidas sobre despachos a obra, reservas de lote,
              muestras físicas y garantías.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-sm border border-outline/60 px-6 py-4 transition-all open:border-[#6b1d22]/45 open:shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 min-h-[44px] cursor-pointer select-none">
                  <span className="font-serif text-base sm:text-lg text-on-surface group-hover:text-[#6b1d22] transition-colors">
                    {faq.question}
                  </span>
                  <span className="h-7 w-7 bg-surface inline-flex items-center justify-center text-secondary text-lg transition-transform duration-200 group-open:rotate-45 group-open:bg-[#6b1d22] group-open:text-white shrink-0">
                    +
                  </span>
                </summary>
                <div className="pt-3 pb-1 mt-2 border-t border-outline/40 text-sm text-secondary space-y-2 leading-relaxed">
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
