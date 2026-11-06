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
    "Solicita tu presupuesto formal para obra, contacta directamente a nuestras asesoras Dally Moreno y Margarita Báez o visita nuestro showroom accesible en San Pedro de Macorís.",
};

export default function ContactoPage() {
  return (
    <div className="flex flex-col w-full">
      {/* BARRA HERO ARQUITECTÓNICA SUPERIOR */}
      <section className="w-full bg-surface-container-high py-6 lg:py-10 px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-gutter">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase">
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"
              />
              <span>Atención Directa &amp; Showroom San Pedro de Macorís</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl font-normal tracking-tight text-on-surface">
              Asesoría y Cotizaciones para tus Proyectos
            </h1>
            <p className="font-body-md sm:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Atención personalizada para arquitectos, ingenieros, maestros de
              obra y propietarios en San Pedro de Macorís y toda la región Este.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex items-center gap-3 lg:justify-end">
            <div className="bg-surface-container-lowest p-3 sm:p-4 shadow-sm rounded-lg flex items-center gap-2.5">
              <Icon name="verified" className="text-primary text-[24px] shrink-0" />
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Importación
                </p>
                <p className="font-headline-sm text-base text-on-surface font-semibold">
                  100% Europea
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-3 sm:p-4 shadow-sm rounded-lg flex items-center gap-2.5">
              <Icon
                name="local_shipping"
                className="text-primary text-[24px] shrink-0"
              />
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Despacho
                </p>
                <p className="font-headline-sm text-base text-on-surface font-semibold">
                  Región Este
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÁREA PRINCIPAL DE INTERACCIÓN: ASESORAS & FORMULARIO DE COTIZACIÓN */}
      <section className="w-full py-9 lg:py-14 px-margin-mobile lg:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter-lg items-start">
          {/* Columna Izquierda: Asesoras y Canales Directos (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-primary font-label-caps text-label-caps uppercase">
                <Icon name="groups" className="text-[16px]" />
                <span>Atención Especializada In Situ</span>
              </div>
              <h2 className="font-headline-lg text-headline-xl-mobile lg:text-headline-lg text-on-surface font-medium">
                Contacta a tu Asesora Designada
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Respuestas ágiles vía WhatsApp con disponibilidad real en
                almacén.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {ADVISORS.map((advisor, idx) => (
                <article
                  key={advisor.id}
                  className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-surface-container"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <Image
                        src={advisor.contactAvatar}
                        alt={`Retrato profesional de ${advisor.name}, asesora de Cerámica El Almacén`}
                        width={72}
                        height={72}
                        priority={idx === 0}
                        className="w-[72px] h-[72px] rounded-full object-cover shadow-inner"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-surface-container-lowest"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-label-caps text-primary uppercase font-bold">
                          {advisor.segment}
                        </span>
                        <Icon
                          name={advisor.segmentIcon}
                          className="text-secondary text-[18px]"
                        />
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                        {advisor.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                        {advisor.bio}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-surface-container-low -mx-5 -mb-5 px-4 py-2.5 flex items-center justify-between gap-2">
                    {idx === 0 ? (
                      <a
                        href={SITE_INFO.phoneHref}
                        className="inline-flex items-center gap-1.5 min-h-[44px] py-2 text-on-surface hover:text-primary font-body-sm text-body-sm font-semibold transition-colors"
                      >
                        <Icon
                          name="call"
                          className="text-primary text-[18px]"
                        />
                        <span>{advisor.locationLabel}</span>
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 min-h-[44px] text-on-surface font-body-sm text-body-sm font-medium">
                        <Icon
                          name="location_city"
                          className="text-primary text-[18px]"
                        />
                        <span>{advisor.locationLabel}</span>
                      </div>
                    )}
                    <a
                      href={buildWhatsAppUrl(advisor.whatsappGreeting)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center gap-1.5 bg-[#128C7E] hover:bg-[#0c6b5e] text-white px-4 py-2.5 rounded text-label-md font-label-md uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <Icon name="chat" className="text-[16px]" />
                      <span>WhatsApp {advisor.name.split(" ")[0]}</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Canal Directo de Instagram */}
            <div className="bg-surface-container p-4 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[20px] h-[20px]"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-headline-sm text-base text-on-surface font-semibold truncate">
                    Instagram Oficial • Showroom
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Videos reales de tinas, griferías y formatos
                  </p>
                </div>
              </div>
              <a
                href={SITE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center px-3.5 py-2 rounded text-primary hover:bg-surface-container-highest transition-colors font-label-md text-label-md uppercase font-semibold shrink-0"
              >
                Abrir Perfil
              </a>
            </div>

            {/* Central Telefónica Showroom (Enlace completo >= 44px) */}
            <a
              href={SITE_INFO.phoneHref}
              className="bg-primary hover:bg-primary-container text-on-primary p-5 rounded-xl shadow-md space-y-1 block transition-colors"
            >
              <span className="font-label-caps text-label-caps uppercase text-primary-fixed block">
                Central Telefónica Showroom
              </span>
              <div className="flex items-center justify-between gap-3 min-h-[44px]">
                <span className="font-headline-md text-headline-md font-semibold tracking-tight">
                  {SITE_INFO.phoneDisplay}
                </span>
                <span className="bg-on-primary text-primary px-4 py-2 rounded font-label-md text-label-md uppercase font-bold">
                  Llamar Ahora
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-primary-fixed/90">
                Lun – Vie: 8:00 AM a 6:00 PM • Sábados hasta la 1:00 PM
              </p>
            </a>
          </div>

          {/* Columna Derecha: Formulario Formal de Cotización (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 sm:p-8 shadow-md space-y-5 border border-surface-container">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-primary font-label-caps text-label-caps uppercase font-bold">
                <Icon name="assignment" className="text-[16px]" />
                <span>Cotizador Formal de Especificaciones</span>
              </div>
              <h2 className="font-headline-lg text-headline-xl-mobile lg:text-headline-lg text-on-surface font-medium">
                Solicita tu Presupuesto para Obra
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Recibe cubicación técnica detallada y tarifas corporativas
                directo a tu WhatsApp o correo electrónico.
              </p>
            </div>

            <QuoteForm />
          </div>
        </div>
      </section>

      {/* VISITA AL SHOWROOM & ACCESIBILIDAD UNIVERSAL */}
      <section className="w-full py-9 lg:py-14 px-margin-mobile lg:px-margin-desktop bg-surface-container-low">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-primary font-label-caps text-label-caps uppercase">
                <Icon name="storefront" className="text-[16px]" />
                <span>Instalaciones Principales</span>
              </div>
              <h2 className="font-headline-lg text-headline-xl-mobile lg:text-headline-xl text-on-surface font-medium">
                Visita Nuestro Showroom en San Pedro de Macorís
              </h2>
            </div>

            <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex items-start gap-3 max-w-md">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon name="accessible" className="text-[22px]" />
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-primary uppercase font-bold">
                  Compromiso de Inclusión
                </span>
                <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                  Rampa nivelada, pasillos amplios y parqueo adaptado para
                  sillas de ruedas.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter-lg items-stretch">
            <div className="lg:col-span-4 flex flex-col justify-between gap-5 bg-surface-container-lowest p-5 sm:p-6 rounded-xl shadow-sm">
              <div className="space-y-5">
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block">
                    Ubicación Central
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                    {SITE_INFO.address.street}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {SITE_INFO.address.city} {SITE_INFO.address.postalCode},{" "}
                    {SITE_INFO.address.country}.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                      Horarios de Atención
                    </span>
                    <span className="inline-flex items-center font-label-caps text-label-caps text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                      Lun – Sáb
                    </span>
                  </div>
                  <div className="space-y-2 font-body-md text-body-md">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                      <span className="text-on-surface">Lunes a Viernes</span>
                      <span className="font-semibold text-on-surface">
                        8:00 AM – 6:00 PM
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                      <span className="text-on-surface">Sábados</span>
                      <span className="font-semibold text-on-surface">
                        8:30 AM – 1:00 PM
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-secondary">
                      <span>Domingos</span>
                      <span className="font-medium">Cerrado (Previa Cita)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase block">
                    Rutas Recomendadas
                  </span>
                  <ul
                    role="list"
                    className="space-y-2 font-body-sm text-body-sm text-on-surface-variant"
                  >
                    <li className="flex items-start gap-2">
                      <Icon
                        name="navigation"
                        className="text-primary text-[16px] shrink-0 mt-0.5"
                      />
                      <span>
                        <strong>Desde Santo Domingo:</strong> 50 min vía Autovía
                        del Este hacia Av. Rolando Martínez.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon
                        name="navigation"
                        className="text-primary text-[16px] shrink-0 mt-0.5"
                      />
                      <span>
                        <strong>Desde La Romana / Casa de Campo:</strong> 35 min
                        directos por Autopista Coral.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={SITE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-inverse-surface hover:bg-black text-inverse-on-surface py-3 rounded font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Icon name="directions" className="text-[18px]" />
                  <span>Abrir en Google Maps</span>
                </a>
                <a
                  href={buildWhatsAppUrl(
                    "Hola, quisiera agendar una visita guiada al showroom en San Pedro de Macorís."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 text-primary hover:bg-surface-container py-2.5 rounded font-label-md text-label-md uppercase tracking-wider transition-colors"
                >
                  <Icon name="calendar_month" className="text-[18px]" />
                  <span>Agendar Recorrido con Asesor</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative rounded-xl overflow-hidden shadow-sm h-44 sm:h-60 group">
                  <Image
                    src="/images/showroom/vignette-sottovento.jpg"
                    alt="Exhibición en Cerámica El Almacén con tina exenta Sottovento blanco mate y grifería de pie negra"
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                    <div className="text-white">
                      <span className="font-label-caps text-label-caps uppercase text-primary-fixed block">
                        Vignette 1:1
                      </span>
                      <p className="font-headline-sm text-sm sm:text-headline-sm font-semibold">
                        Tina Sottovento
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-sm h-44 sm:h-60 group">
                  <Image
                    src="/images/showroom/expositores-imex.jpg"
                    alt="Galería de griferías de cocina y lavamanos marca IMEX en el showroom de Cerámica El Almacén"
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                    <div className="text-white">
                      <span className="font-label-caps text-label-caps uppercase text-primary-fixed block">
                        Hidráulica
                      </span>
                      <p className="font-headline-sm text-sm sm:text-headline-sm font-semibold">
                        Expositores IMEX
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl p-3 sm:p-4 shadow-sm space-y-2">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 font-label-caps text-label-caps text-on-surface uppercase">
                    <Icon
                      name="pin_drop"
                      className="text-primary text-[18px]"
                    />
                    <span>Ubicación Satelital • Parqueo Privado</span>
                  </div>
                </div>

                <a
                  href={SITE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-56 sm:h-72 rounded-lg shadow-inner relative overflow-hidden group"
                >
                  <Image
                    src="/images/showroom/mapa-san-pedro.png"
                    alt="Vista satelital de Av. Rolando Martínez 33, San Pedro de Macorís"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-surface/95 backdrop-blur-md p-3 rounded-lg shadow-lg flex items-center gap-3 border border-outline-variant/30">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
                      <Icon name="storefront" className="text-[20px]" />
                    </div>
                    <div>
                      <p className="font-headline-sm text-base text-on-surface font-semibold leading-tight">
                        {SITE_INFO.legalName}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {SITE_INFO.address.street} • Abrir ruta
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (Acordeón Exclusivo Nativo <details name="faq">) */}
      <section
        id="faq"
        className="w-full py-9 lg:py-14 px-margin-mobile lg:px-margin-desktop bg-surface scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 text-primary font-label-caps text-label-caps uppercase">
              <Icon name="help_outline" className="text-[16px]" />
              <span>Dudas Comunes</span>
            </div>
            <h2 className="font-headline-lg text-headline-xl-mobile lg:text-headline-xl text-on-surface font-medium">
              Preguntas Frecuentes para Proyectos y Obras
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <details
                key={faq.question}
                name="faq"
                open={idx === 0}
                className="group bg-surface-container-lowest rounded-xl shadow-sm p-4 sm:p-5 transition-all border border-surface-container"
              >
                <summary className="flex items-center justify-between gap-3 min-h-[44px] cursor-pointer select-none">
                  <span className="font-headline-sm text-base sm:text-headline-sm text-on-surface font-semibold flex items-center gap-2.5">
                    <Icon
                      name={faq.icon}
                      className="text-primary text-[22px] shrink-0"
                    />
                    <span>{faq.question}</span>
                  </span>
                  <Icon
                    name="expand_more"
                    className="text-secondary transition-transform duration-300 group-open:rotate-180 shrink-0"
                  />
                </summary>
                <div className="mt-3 pt-3 border-t border-surface-container font-body-md text-body-md text-on-surface-variant space-y-2">
                  {faq.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="bg-surface-container-high p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                ¿Tienes una consulta específica sobre tu metraje?
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Escríbenos directamente y una asesora te atenderá al instante.
              </p>
            </div>
            <a
              href={buildWhatsAppUrl(
                "Hola, tengo una consulta específica sobre el metraje de mi proyecto."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Chatear Ahora</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
