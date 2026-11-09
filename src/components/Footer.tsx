import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Icon } from "@/components/Icon";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface border-t border-outline/60">
      <div className="scroll-reveal max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Columna 1: Marca e Instagram */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="w-fit min-h-[44px] inline-flex items-center py-1"
            >
              <BrandLogo showTagline />
            </Link>
            <div>
              <a
                href={SITE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] py-2 text-xs uppercase tracking-[0.18em] font-semibold text-on-surface hover:text-[#6b1d22] transition-colors"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[17px] h-[17px] text-[#6b1d22] shrink-0"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>{SITE_INFO.instagramLabel}</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Sucursales & Horarios */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22]">
              Atelier &amp; Sucursales
            </h2>
            <address className="not-italic flex flex-col gap-3.5 text-sm text-secondary">
              <div className="flex items-start gap-2.5">
                <Icon
                  name="location_on"
                  className="text-[17px] text-[#6b1d22] shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-serif text-base text-on-surface font-medium">
                    San Pedro de Macorís
                  </p>
                  <p>Av. Rolando Martínez 33</p>
                  <a
                    href="tel:+18092462221"
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b1d22] hover:underline"
                  >
                    +1 809-246-2221
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Icon
                  name="location_on"
                  className="text-[17px] text-[#6b1d22] shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-serif text-base text-on-surface font-medium">
                    La Romana
                  </p>
                  <p>Av. Profesor Juan Bosch (antigua Av. Padre Abreu)</p>
                  <a
                    href="tel:+18095564116"
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6b1d22] hover:underline"
                  >
                    +1 809-556-4116
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Icon
                  name="schedule"
                  className="text-[17px] text-[#6b1d22] shrink-0 mt-0.5"
                />
                <div>
                  <p>Lun – Vie: 8:00 AM – 6:00 PM</p>
                  <p>Sáb: 8:30 AM – 1:00 PM</p>
                </div>
              </div>
            </address>
          </div>

          {/* Columna 3: Facilidades */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22]">
              Facilidades &amp; Servicios
            </h2>
            <ul
              role="list"
              className="flex flex-col gap-3 text-sm text-secondary"
            >
              <li className="flex items-center gap-2.5">
                <Icon
                  name="accessible"
                  className="text-[17px] text-[#6b1d22] shrink-0"
                />
                <span>Showroom accesible para sillas de ruedas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon
                  name="local_parking"
                  className="text-[17px] text-[#6b1d22] shrink-0"
                />
                <span>Estacionamiento privado para clientes</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon
                  name="local_shipping"
                  className="text-[17px] text-[#6b1d22] shrink-0"
                />
                <span>Despacho directo a obras en todo el país</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon
                  name="architecture"
                  className="text-[17px] text-[#6b1d22] shrink-0"
                />
                <span>Asesoría técnica para arquitectos</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-outline/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary">
          <p className="text-center sm:text-left uppercase tracking-[0.14em] text-[11px]">
            © {new Date().getFullYear()} {SITE_INFO.legalName}. Todos los
            derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.18em] font-semibold">
            <Link
              href="/terminos"
              className="inline-flex items-center min-h-[44px] py-2 px-1 text-on-surface hover:text-[#6b1d22] transition-colors"
            >
              Términos de Garantía
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center min-h-[44px] py-2 px-1 text-on-surface hover:text-[#6b1d22] transition-colors"
            >
              Atención al Cliente
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center min-h-[44px] py-2 px-1 text-on-surface hover:text-[#6b1d22] transition-colors"
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
