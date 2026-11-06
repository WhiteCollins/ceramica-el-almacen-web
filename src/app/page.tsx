import Image from "next/image";
import Link from "next/link";
import { HeroBanner } from "@/components/HeroBanner";
import { Icon } from "@/components/Icon";
import {
  ADVISORS,
  COLOR_SWATCHES,
  MAIN_CATEGORIES,
  SITE_INFO,
  TESTIMONIALS,
  buildWhatsAppUrl,
} from "@/data/site";

const COMPACT_PILLARS = [
  {
    icon: "public",
    title: "Importación Directa",
    detail: "Fábricas en España e Italia sin intermediarios",
  },
  {
    icon: "calculate",
    title: "Cubicación Gratis",
    detail: "Cálculo de m², cortes y mortero sobre planos",
  },
  {
    icon: "accessible",
    title: "100% Accesible",
    detail: "Rampas niveladas y parqueo privado vigilado",
  },
  {
    icon: "local_shipping",
    title: "Despacho a Obra",
    detail: "San Pedro, Juan Dolio, La Romana y Punta Cana",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECCIÓN 1: BANNER CARRUSEL DE IMÁGENES EN TRANSICIÓN */}
      <HeroBanner />

      {/* SECCIÓN 2: CATEGORÍAS PRINCIPALES (CUADRÍCULA 2×2 COMPACTA EN MÓVIL, 4 EN ESCRITORIO) */}
      <section className="w-full bg-surface-container-low py-9 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6 lg:mb-10">
            <div>
              <span className="font-label-caps text-label-caps text-primary uppercase">
                Curaduría de Acabados
              </span>
              <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface mt-0.5">
                Categorías Principales
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Piezas cerámicas y sanitarias con estándares europeos de baja
              absorción y máxima durabilidad.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter">
            {MAIN_CATEGORIES.map((cat) => {
              const targetHref = `/catalogo?categoria=${cat.slug}`;
              return (
                <article
                  key={cat.slug}
                  className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-atelier transition-shadow flex flex-col group border border-surface-container-high"
                >
                  <Link
                    href={targetHref}
                    className="relative overflow-hidden aspect-[4/3] bg-surface-container block"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="hidden sm:inline-block absolute top-2.5 left-2.5 bg-surface-container-lowest/90 px-2.5 py-0.5 rounded font-label-caps text-label-caps text-on-surface">
                      {cat.badge}
                    </span>
                  </Link>

                  <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow gap-2">
                    <div>
                      <span className="font-label-caps text-label-caps text-secondary uppercase block">
                        {cat.eyebrow}
                      </span>
                      <h3 className="font-headline-sm sm:font-headline-md text-base sm:text-headline-md text-on-surface font-semibold mt-0.5 leading-snug">
                        {cat.title}
                      </h3>
                      <p className="hidden sm:line-clamp-2 font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                        {cat.description}
                      </p>
                    </div>

                    <Link
                      href={targetHref}
                      className="inline-flex items-center justify-between gap-1 min-h-[44px] pt-2 border-t border-surface-container text-primary font-label-md text-label-md group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{cat.cta}</span>
                      <Icon name="east" className="text-[16px] shrink-0" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: BANNER EDITORIAL DE COLOR ('EL COLOR LO CAMBIA A TODO') */}
      <section className="w-full bg-surface-container-highest py-9 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-5">
              <div className="space-y-2">
                <span className="inline-flex items-center px-3 py-1 bg-primary text-on-primary rounded font-label-caps text-label-caps uppercase">
                  Tendencia 2025 • 10×10 &amp; 15×15 cm
                </span>
                <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface font-normal">
                  “El color lo cambia a todo”
                </h2>
                <p className="font-body-md sm:text-body-lg text-on-surface-variant max-w-xl">
                  Baldosas vidriadas artesanales en tonos intensos con esmalte
                  vitrificado para cocinas, salpicaderos, barras y baños de
                  autor.
                </p>
              </div>

              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase block mb-2">
                  Paleta en Stock Inmediato
                </span>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
                  {COLOR_SWATCHES.map((swatch) => (
                    <Link
                      key={swatch.name}
                      href="/catalogo?categoria=revestimiento"
                      className="flex flex-col items-center gap-1 p-1.5 sm:p-2 min-h-[68px] bg-surface hover:bg-surface-container rounded text-center transition-colors group"
                    >
                      <span
                        className="w-full h-9 sm:h-11 rounded block transition-transform group-hover:scale-[1.03]"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="font-label-md text-label-md text-on-surface leading-tight truncate w-full">
                        {swatch.name.split(" ")[0]}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl(
                    "Hola, quisiera solicitar muestras físicas de la colección artesanal de baldosas de color."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-inverse-surface text-inverse-on-surface hover:bg-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Icon name="palette" className="text-[18px]" />
                  <span>Pedir Muestrario</span>
                </a>
                <Link
                  href="/catalogo?categoria=revestimiento"
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 font-label-md text-label-md text-primary hover:bg-surface-container rounded uppercase tracking-wider transition-colors"
                >
                  <span>Ver Colección</span>
                  <Icon name="arrow_forward" className="text-[16px]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-52 sm:h-64 lg:h-auto lg:min-h-full">
              <Image
                src="/images/hero/editorial-color-backsplash.jpg"
                alt="Salpicadero de cocina revestido con baldosas cuadradas vidriadas artesanales en tonos terracota y ámbar"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/95 backdrop-blur px-3.5 py-2.5 rounded shadow-md">
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Esmalte Vitrificado &amp; Bordes Rústicos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: FRANJA COMPACTA DE GARANTÍAS + ATENCIÓN DIRECTA DE ASESORAS */}
      <section className="w-full bg-surface py-8 lg:py-12 border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {COMPACT_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-surface-container p-3.5 sm:p-4 rounded-lg flex items-start gap-2.5"
              >
                <Icon
                  name={pillar.icon}
                  className="text-[22px] text-primary shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <h3 className="font-headline-sm text-base text-on-surface font-semibold leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
                    {pillar.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Barra Compacta de Asesoras (Reemplaza tarjetas extensas duplicadas de /contacto) */}
          <div className="bg-surface-container-low p-4 sm:px-6 rounded-xl border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex -space-x-2.5 shrink-0">
                {ADVISORS.map((advisor) => (
                  <Image
                    key={advisor.id}
                    src={advisor.homeAvatar}
                    alt={advisor.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-surface-container-lowest"
                  />
                ))}
              </div>
              <div>
                <p className="font-headline-sm text-base text-on-surface font-semibold">
                  Asesoría directa con {ADVISORS[0].name} y {ADVISORS[1].name}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Cuantificamos tus planos sin costo y reservamos tu lote en
                  almacén.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {ADVISORS.map((advisor) => (
                <a
                  key={advisor.id}
                  href={buildWhatsAppUrl(advisor.whatsappGreeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary border border-outline-variant/60 rounded font-label-md text-label-md transition-colors shadow-sm"
                >
                  <Icon name="chat" className="text-[16px]" />
                  <span>Consultar con {advisor.name.split(" ")[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: TESTIMONIOS REALES (CARRUSEL DESLIZABLE EN MÓVIL, 3 COLUMNAS EN ESCRITORIO) */}
      <section className="w-full bg-surface-container-low py-9 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5 lg:mb-8">
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <Icon
                    key={n}
                    name="star"
                    filled
                    className="text-[18px] text-tertiary-fixed-dim"
                  />
                ))}
                <Icon
                  name="star_half"
                  filled
                  className="text-[18px] text-tertiary-fixed-dim"
                />
                <span className="font-label-lg text-label-lg font-bold text-on-surface ml-1.5">
                  4.5 / 5.0 en Google
                </span>
              </div>
              <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface mt-0.5">
                Experiencias de Clientes
              </h2>
            </div>
            <span className="font-label-md text-label-md text-secondary md:hidden">
              Desliza para leer más →
            </span>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1">
            {TESTIMONIALS.map((review) => (
              <article
                key={review.author}
                className="min-w-[85%] sm:min-w-[62%] md:min-w-0 snap-start bg-surface-container-lowest p-5 lg:p-6 rounded-lg shadow-sm flex flex-col justify-between gap-4 border border-surface-container"
              >
                <p className="font-body-md text-body-md text-on-surface leading-relaxed italic">
                  “{review.quote}”
                </p>

                <div className="flex items-center gap-2.5 pt-3 border-t border-surface-container">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-label-md shrink-0 ${review.accentClass}`}
                  >
                    {review.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline-sm text-base text-on-surface truncate">
                      {review.author}
                    </h3>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block truncate">
                      {review.role}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: VISÍTANOS EN SAN PEDRO DE MACORÍS (TELÉFONO Y MAPAS >= 44PX) */}
      <section className="w-full bg-surface py-9 lg:py-14">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-gutter-lg items-center">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="font-label-caps text-label-caps text-primary uppercase">
                  Punto de Encuentro
                </span>
                <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-on-surface font-normal mt-0.5">
                  Visítanos en San Pedro de Macorís
                </h2>
              </div>

              <div className="bg-surface-container rounded-lg divide-y divide-surface-container-highest">
                <div className="flex items-start gap-3 p-3.5">
                  <Icon
                    name="location_on"
                    className="text-[22px] text-primary shrink-0 mt-0.5"
                  />
                  <div>
                    <h3 className="font-headline-sm text-base text-on-surface">
                      {SITE_INFO.address.street}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {SITE_INFO.address.city} {SITE_INFO.address.postalCode},{" "}
                      {SITE_INFO.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5">
                  <Icon
                    name="schedule"
                    className="text-[22px] text-primary shrink-0 mt-0.5"
                  />
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    <p className="font-semibold text-on-surface">
                      {SITE_INFO.hours.weekdays}
                    </p>
                    <p>{SITE_INFO.hours.saturday}</p>
                  </div>
                </div>

                {/* Enlace Telefónico Completo (>= 56px de alto para toque inmediato en móvil) */}
                <a
                  href={SITE_INFO.phoneHref}
                  className="flex items-center justify-between gap-3 p-3.5 min-h-[56px] hover:bg-surface-container-high transition-colors rounded-b-lg group"
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      name="call"
                      className="text-[22px] text-primary shrink-0"
                    />
                    <span>
                      <span className="font-label-caps text-label-caps text-secondary uppercase block">
                        Teléfono Directo Showroom
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold group-hover:underline">
                        {SITE_INFO.phoneDisplay}
                      </span>
                    </span>
                  </span>
                  <span className="px-3 py-1.5 bg-primary text-on-primary rounded font-label-md text-label-md uppercase">
                    Llamar
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={SITE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-container-highest hover:bg-surface-variant text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-colors"
                >
                  <Icon name="map" className="text-[18px]" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={SITE_INFO.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-surface-container-highest hover:bg-surface-variant text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-colors"
                >
                  <Icon name="navigation" className="text-[18px]" />
                  <span>Waze</span>
                </a>
              </div>
            </div>

            {/* Mapa Satelital Compacto y Cotización Rápida */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <a
                href={SITE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-52 sm:h-64 rounded-lg overflow-hidden shadow-md relative bg-surface-container block group"
              >
                <Image
                  src="/images/showroom/mapa-san-pedro.png"
                  alt="Mapa satelital de ubicación de Cerámica El Almacén en Av. Rolando Martínez 33, San Pedro de Macorís"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 z-10 bg-surface/95 backdrop-blur px-3 py-1.5 rounded shadow-sm text-on-surface flex items-center gap-1.5 font-label-caps text-label-caps">
                  <Icon
                    name="storefront"
                    className="text-[16px] text-primary"
                  />
                  <span>Showroom San Pedro</span>
                </div>
                <div className="absolute bottom-3 right-3 z-10 bg-inverse-surface/90 text-inverse-on-surface px-3 py-1.5 min-h-[36px] rounded font-label-md text-label-md inline-flex items-center gap-1 shadow-sm">
                  <Icon name="open_in_new" className="text-[15px]" />
                  <span>Abrir Ruta</span>
                </div>
              </a>

              <div className="bg-primary text-on-primary p-4 sm:p-5 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="font-headline-sm text-headline-sm font-semibold">
                    ¿Tienes una lista de materiales lista?
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-primary/90">
                    Envíanos tu plano o lista por WhatsApp y cotizamos hoy.
                  </p>
                </div>
                <a
                  href={buildWhatsAppUrl(
                    "Hola, quisiera cotizar un listado de materiales con Cerámica El Almacén."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 min-h-[44px] px-5 py-2.5 bg-surface text-primary hover:bg-surface-container rounded font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Icon name="chat" className="text-[18px]" />
                  <span>Cotizar Ahora</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
