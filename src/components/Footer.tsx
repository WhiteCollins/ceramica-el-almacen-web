import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Icon } from "@/components/Icon";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface shadow-[0_-1px_8px_rgba(0,0,0,0.03)] border-t border-surface-container-highest">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-gutter-lg">
          {/* Columna 1: Marca */}
          <div className="flex flex-col gap-space-sm">
            <Link
              href="/"
              className="w-fit min-h-[44px] inline-flex items-center py-1"
            >
              <BrandLogo showTagline />
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Importadores directos de porcelanatos europeos, revestimientos,
              griferías y sanitarios de alta gama en la República Dominicana.
            </p>
            <div>
              <a
                href={SITE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] py-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-[18px] text-primary shrink-0"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>{SITE_INFO.instagramLabel}</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Colecciones (todos los enlaces con área táctil >= 44px) */}
          <div className="flex flex-col gap-2">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Colecciones &amp; Acabados
            </h2>
            <ul
              role="list"
              className="flex flex-col font-body-md text-body-md text-on-surface-variant"
            >
              <li>
                <Link
                  href="/catalogo?categoria=porcelanato"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Porcelanatos Españoles &amp; Italianos
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=revestimiento"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Cerámicas de Revestimiento
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=griferia"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Griferías de Cocina y Baño
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=sanitarios"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Sanitarios y Tinas Arquitectónicas
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=lavamanos"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Muebles de Baño y Lavamanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atelier & Showroom */}
          <div className="flex flex-col gap-space-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Atelier &amp; Showroom
            </h2>
            <address className="not-italic flex flex-col gap-space-sm font-body-md text-body-md text-on-surface-variant">
              <div className="flex items-start gap-2">
                <Icon
                  name="location_on"
                  className="text-[18px] text-primary shrink-0 mt-1"
                />
                <span>{SITE_INFO.address.full}</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon
                  name="schedule"
                  className="text-[18px] text-primary shrink-0 mt-1"
                />
                <div>
                  <p>Lun – Vie: 8:00 AM – 6:00 PM</p>
                  <p>Sáb: 8:30 AM – 1:00 PM</p>
                </div>
              </div>
              <div>
                <a
                  href={SITE_INFO.phoneHref}
                  className="inline-flex items-center gap-2 min-h-[44px] py-2 font-semibold text-on-surface hover:text-primary transition-colors"
                >
                  <Icon
                    name="call"
                    className="text-[18px] text-primary shrink-0"
                  />
                  <span>{SITE_INFO.phoneDisplay}</span>
                </a>
              </div>
            </address>
          </div>

          {/* Columna 4: Facilidades */}
          <div className="flex flex-col gap-space-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Facilidades &amp; Servicios
            </h2>
            <ul
              role="list"
              className="flex flex-col gap-2.5 font-body-md text-body-md text-on-surface-variant"
            >
              <li className="flex items-center gap-2">
                <Icon name="accessible" className="text-[18px] text-primary shrink-0" />
                <span>Showroom accesible para sillas de ruedas</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon
                  name="local_parking"
                  className="text-[18px] text-primary shrink-0"
                />
                <span>Estacionamiento privado para clientes</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon
                  name="local_shipping"
                  className="text-[18px] text-primary shrink-0"
                />
                <span>Despacho directo a obras en todo el país</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon
                  name="architecture"
                  className="text-[18px] text-primary shrink-0"
                />
                <span>Asesoría técnica para arquitectos</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {SITE_INFO.legalName}. Todos los
            derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 font-label-md text-label-md">
            <Link
              href="/contacto#faq"
              className="inline-flex items-center min-h-[44px] py-2 px-1 hover:text-primary transition-colors"
            >
              Términos de Garantía
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center min-h-[44px] py-2 px-1 hover:text-primary transition-colors"
            >
              Atención al Cliente
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center min-h-[44px] py-2 px-1 hover:text-primary transition-colors"
            >
              Fichas Técnicas
            </Link>
          </div>
        </div>
      </div>

      {/* Botón flotante de conserjería WhatsApp */}
      <a
        href={buildWhatsAppUrl(
          "Hola Cerámica El Almacén, me gustaría recibir asesoría para mi proyecto."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp con un asesor"
        className="fixed bottom-4 right-4 z-30 min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0e6f64] text-white px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-[1.03]"
      >
        <Icon name="chat" className="text-[20px]" />
        <span className="hidden sm:inline font-label-md text-label-md uppercase tracking-wider">
          Asesoría WhatsApp
        </span>
      </a>
    </footer>
  );
}
