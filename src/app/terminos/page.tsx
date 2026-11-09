import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Términos de Garantía y Condiciones Comerciales",
  description:
    "Políticas de garantía, recepción de mercancía, reservas de lote, devoluciones y condiciones comerciales de Cerámica El Almacén SRL.",
};

const WARRANTY_SECTIONS = [
  {
    number: "01",
    icon: "verified",
    title: "Cobertura de Garantía por Línea de Producto",
    items: [
      {
        subtitle: "Porcelanatos y Revestimientos Cerámicos (1.ª Calidad Europea)",
        text: "Garantía de fábrica contra defectos de manufactura, planaridad, calibre y absorción de agua conforme a la norma ISO 13006 / UNE-EN 14411. La garantía aplica exclusivamente antes de la instalación en obra.",
      },
      {
        subtitle: "Griferías, Columnas de Ducha y Sistemas Empotrables",
        text: "Cobertura de hasta 5 años en cuerpos de latón/acero inoxidable S304 y cartuchos cerámicos contra defectos de fabricación, manteniendo repuestos originales disponibles en nuestro almacén local.",
      },
      {
        subtitle: "Bañeras Exentas, Lavamanos y Loza Sanitaria",
        text: "Garantía de 3 a 5 años en estructura de resina mineral (Solid Surface), esmalte vitrificado y mecanismos internos de descarga.",
      },
    ],
  },
  {
    number: "02",
    icon: "local_shipping",
    title: "Recepción de Mercancía e Inspección en Obra",
    items: [
      {
        subtitle: "Verificación al Momento de la Entrega",
        text: "El cliente o encargado de obra debe revisar las cajas, piezas sanitarias y griferías al momento de la recepción junto a nuestro personal de despacho, firmando el conduce de conformidad.",
      },
      {
        subtitle: "Reporte de Averías de Transporte",
        text: "Cualquier pieza con rotura atribuible al traslado debe notificarse dentro de las primeras 48 horas hábiles posteriores a la entrega, adjuntando fotografías del embalaje original y etiqueta de lote.",
      },
    ],
  },
  {
    number: "03",
    icon: "layers",
    title: "Tono, Calibre y Reserva de Lote",
    items: [
      {
        subtitle: "Verificación Previa a la Colocación",
        text: "Es responsabilidad del instalador verificar código de tono, calibre y destonificación gráfica en las cajas antes de colocar el material. Una vez instalado el revestimiento o porcelanato, se considera aceptado su aspecto visual y no proceden reclamaciones por variaciones de tono.",
      },
      {
        subtitle: "Reservas de Lote para Proyectos",
        text: "Las reservas de lote único para constructoras y obras residenciales se mantienen vigentes según el cronograma acordado en la cotización formal con el anticipo correspondiente.",
      },
    ],
  },
  {
    number: "04",
    icon: "build_circle",
    title: "Condiciones de Instalación y Mantenimiento",
    items: [
      {
        subtitle: "Recomendaciones Técnicas de Colocación",
        text: "Para conservar la validez de la garantía, los porcelanatos rectificados deben instalarse con mortero adhesivo adecuado al formato, crucetas niveladoras y una junta mínima recomendada de 1.5 mm a 2 mm.",
      },
      {
        subtitle: "Cuidado de Acabados Especiales (PVD, Negro Mate y Piedra)",
        text: "Las griferías en acabado PVD oro cepillado, negro mate electroforético y bachas minerales deben limpiarse únicamente con paño suave de microfibra, agua y jabón neutro. Quedan excluidos de garantía los daños causados por ácido muriático, cloro, abrasivos o esponjas metálicas.",
      },
    ],
  },
  {
    number: "05",
    icon: "assignment",
    title: "Cambios, Devoluciones y Pedidos Especiales",
    items: [
      {
        subtitle: "Condiciones para Cambios de Mercancía en Stock",
        text: "Se aceptan cambios o notas de crédito dentro de los 15 días calendario posteriores a la facturación, siempre que las cajas de cerámica o empaques de grifería se encuentren cerrados de fábrica, sin humedad, manchas de cemento ni roturas, y pertenezcan a un lote activo en inventario.",
      },
      {
        subtitle: "Exclusiones",
        text: "No se aceptan devoluciones de piezas sueltas (fracciones de caja), materiales cortados o instalados, ni pedidos de importación especial bajo encargo.",
      },
    ],
  },
] as const;

export default function TerminosGarantiaPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Encabezado Editorial Centrado */}
      <section className="w-full bg-surface-container-low border-b border-outline/60 py-14 lg:py-20 px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-4">
          <nav
            aria-label="Ruta de navegación"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-secondary"
          >
            <Link
              href="/"
              className="hover:text-on-surface transition-colors"
            >
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-on-surface font-semibold">
              Términos de Garantía y Condiciones
            </span>
          </nav>

          <div className="space-y-3 pt-2">
            <span className="inline-flex items-center gap-1.5 bg-[#6b1d22]/10 text-[#6b1d22] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
              <Icon name="verified" className="text-[14px]" />
              <span>Respaldo Oficial · {SITE_INFO.legalName}</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight">
              Términos de Garantía y Condiciones Comerciales
            </h1>
            <p className="text-sm sm:text-base text-secondary max-w-2xl mx-auto leading-relaxed">
              En {SITE_INFO.name} respaldamos la calidad de cada porcelanato,
              revestimiento cerámico, pieza sanitaria y grifería que importamos.
              A continuación detallamos nuestras políticas de garantía,
              inspección en obra y cuidado de materiales.
            </p>
          </div>
        </div>
      </section>

      {/* Bloques de Políticas y Condiciones */}
      <section className="w-full py-14 lg:py-20 px-margin-mobile lg:px-margin-desktop">
        <div className="max-w-5xl mx-auto space-y-6">
          {WARRANTY_SECTIONS.map((section) => (
            <article
              key={section.number}
              className="bg-white rounded-sm border border-outline/60 p-6 sm:p-9 space-y-6 transition-all duration-300 hover:border-[#6b1d22]/40"
            >
              <div className="flex items-center gap-3.5 border-b border-outline/50 pb-4">
                <span className="h-10 w-10 bg-on-surface text-white inline-flex items-center justify-center font-serif font-semibold text-sm shrink-0">
                  {section.number}
                </span>
                <div className="flex items-center gap-2">
                  <Icon
                    name={section.icon}
                    className="text-[19px] text-[#6b1d22] shrink-0"
                  />
                  <h2 className="font-serif text-xl sm:text-2xl text-on-surface">
                    {section.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <div key={item.subtitle} className="space-y-1.5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-surface">
                      {item.subtitle}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}

          {/* Bloque de Soporte de Garantía y Contacto Directo */}
          <div className="rounded-sm border border-[#6b1d22]/30 bg-gradient-to-br from-[#FAF6F2] via-surface-container-low to-[#F3ECE4] p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
                Atención Postventa &amp; Repuestos
              </span>
              <h2 className="font-serif text-2xl text-on-surface">
                ¿Necesitas tramitar una garantía o solicitar un repuesto?
              </h2>
              <p className="text-sm text-secondary leading-relaxed">
                Nuestro equipo técnico en San Pedro de Macorís (
                {SITE_INFO.phoneDisplay}) y La Romana (
                {SITE_INFO.locations[1].phoneDisplay}) está disponible con tu
                número de factura o conduce de despacho.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={buildWhatsAppUrl(
                  "Hola, deseo asistencia sobre términos de garantía o repuestos con mi número de factura."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-on-surface hover:bg-[#6b1d22] text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                <Icon name="chat" className="text-[16px]" />
                <span>Soporte por WhatsApp</span>
              </a>
              <Link
                href="/contacto"
                className="min-h-[46px] inline-flex items-center justify-center gap-1.5 bg-white hover:border-on-surface text-on-surface border border-outline px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                <span>Ir a contacto</span>
                <Icon name="arrow_forward" className="text-[15px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
