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
  title: "Contacto & Cotización",
  description:
    "Solicita tu cotización en menos de 24 horas laborables, contacta a nuestras asesoras o visita nuestro showroom en San Pedro de Macorís.",
};

export default function ContactoPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* ENCABEZADO + FORMULARIO (60%) + ASIDE FIJO (40%) */}
      <section className="w-full py-16 lg:py-24 px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
          {/* Encabezado limpio */}
          <div className="max-w-2xl space-y-4">
            <h1 className="font-serif text-2xl text-on-surface">
              Hablemos de tu proyecto
            </h1>
            <p className="text-base text-secondary">
              Cotizaciones en menos de 24 h laborables.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={buildWhatsAppUrl(
                  "Hola Cerámica El Almacén, me gustaría cotizar materiales para mi proyecto."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                <Icon name="chat" className="text-[16px]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={SITE_INFO.phoneHref}
                className="min-h-[44px] inline-flex items-center gap-2 border border-outline bg-white hover:bg-surface-container-low text-on-surface px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <Icon name="call" className="text-[16px] text-primary" />
                <span>Llamar</span>
              </a>

              <a
                href={SITE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-1 px-2 py-2 text-primary hover:underline text-sm font-medium"
              >
                <Icon name="location_on" className="text-[16px]" />
                <span>{SITE_INFO.address.street} →</span>
              </a>
            </div>
          </div>

          {/* Grilla principal: Formulario (60%) + Aside fijo (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-8 border-t border-outline">
            {/* Formulario (60% -> 7 columnas) */}
            <div className="lg:col-span-7">
              <QuoteForm />
            </div>

            {/* Aside fijo (40% -> 5 columnas; en móvil pasa debajo del formulario) */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
              {/* Tus asesoras */}
              <div className="space-y-3">
                <h2 className="text-base font-semibold text-on-surface">
                  Tus asesoras
                </h2>
                <div className="divide-y divide-outline border-y border-outline">
                  {ADVISORS.map((advisor, idx) => (
                    <a
                      key={advisor.id}
                      href={buildWhatsAppUrl(advisor.whatsappGreeting)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 py-3.5 hover:bg-surface-container-low px-2 -mx-2 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Image
                          src={advisor.contactAvatar}
                          alt={advisor.name}
                          width={44}
                          height={44}
                          priority={idx === 0}
                          className="w-11 h-11 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                            {advisor.name}
                          </p>
                          <p className="text-sm text-secondary truncate">
                            {idx === 0
                              ? "Constructoras y obras"
                              : "Diseño y showroom"}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-primary shrink-0">
                        WhatsApp →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Horario */}
              <div className="space-y-2">
                <h2 className="text-base font-semibold text-on-surface">
                  Horario
                </h2>
                <div className="text-sm text-secondary space-y-1">
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
                </div>
              </div>

              {/* Dirección + mini mapa */}
              <div className="space-y-3">
                <div className="space-y-0.5">
                  <h2 className="text-base font-semibold text-on-surface">
                    Dirección
                  </h2>
                  <p className="text-sm text-secondary">
                    {SITE_INFO.address.street}, {SITE_INFO.address.city}
                  </p>
                </div>

                <a
                  href={SITE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative h-40 w-full rounded-lg overflow-hidden group border border-outline"
                >
                  <Image
                    src="/images/showroom/mapa-san-pedro.png"
                    alt="Ubicación de Cerámica El Almacén en San Pedro de Macorís"
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2.5 right-2.5 bg-white/95 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                    Abrir en Google Maps →
                  </span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (Acordeón con líneas, sin tarjetas ni íconos) */}
      <section
        id="faq"
        className="w-full py-16 lg:py-24 px-margin-mobile lg:px-margin-desktop bg-surface-container-low scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-2xl text-on-surface">
            Preguntas frecuentes
          </h2>

          <div className="divide-y divide-outline border-y border-outline">
            {FAQS.map((faq, idx) => (
              <details
                key={faq.question}
                name="faq"
                open={idx === 0}
                className="group py-5"
              >
                <summary className="flex items-center justify-between gap-4 min-h-[44px] cursor-pointer select-none">
                  <span className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <span className="text-secondary text-lg transition-transform duration-200 group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <div className="pt-3 text-sm text-secondary space-y-2 leading-relaxed">
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
