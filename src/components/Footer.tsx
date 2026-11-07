import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Icon } from "@/components/Icon";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface shadow-[0_-1px_8px_rgba(0,0,0,0.03)] border-t border-surface-container-highest">
      <div className="scroll-reveal max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop py-10 lg:py-14">
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
                  href="/pisos"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Porcelanatos Españoles &amp; Italianos
                </Link>
              </li>
              <li>
                <Link
                  href="/paredes"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Cerámicas de Revestimiento
                </Link>
              </li>
              <li>
                <Link
                  href="/cocinas/griferia"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Grifería de Cocina
                </Link>
              </li>
              <li>
                <Link
                  href="/banos/sanitarios-y-tinas"
                  className="inline-flex items-center min-h-[44px] py-2 w-full hover:text-primary transition-colors"
                >
                  Sanitarios y Tinas Arquitectónicas
                </Link>
              </li>
              <li>
                <Link
                  href="/banos/lavamanos"
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

      {/* Botón flotante de WhatsApp */}
      <a
        href={buildWhatsAppUrl(
          "Hola Cerámica El Almacén, me gustaría recibir asesoría para mi proyecto."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp con un asesor"
        className="fixed bottom-5 right-5 z-30 h-14 w-14 inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform hover:scale-105"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M12.031 2c-5.516 0-9.999 4.486-9.999 10.002 0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.343a9.957 9.957 0 0 0 4.906 1.292h.004c5.515 0 9.998-4.486 9.998-10.001 0-2.672-1.04-5.184-2.928-7.074A9.936 9.936 0 0 0 12.031 2Zm5.847 14.303c-.246.693-1.434 1.326-1.996 1.411-.513.077-1.163.11-1.878-.118-.434-.138-.99-.322-1.703-.63-2.996-1.293-4.953-4.31-5.103-4.51-.15-.2-1.219-1.622-1.219-3.095 0-1.473.771-2.197 1.045-2.497.274-.3.598-.375.798-.375.199 0 .399.002.573.01.184.009.43-.07.673.514.249.599.847 2.072.922 2.222.075.15.125.324.025.524-.1.2-.15.325-.299.499-.15.175-.314.391-.449.525-.15.15-.306.312-.131.612.174.3.775 1.278 1.664 2.071 1.143 1.02 2.107 1.336 2.406 1.486.3.15.474.125.649-.075.174-.2.748-.874.947-1.174.2-.3.399-.25.673-.15.274.1 1.745.824 2.044.973.3.15.499.225.573.35.075.125.075.724-.171 1.417Z" />
        </svg>
      </a>
    </footer>
  );
}
