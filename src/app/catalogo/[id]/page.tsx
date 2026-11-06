import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { CATALOG_PRODUCTS, CATEGORY_FILTERS } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/data/site";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return CATALOG_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = CATALOG_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: `${product.name} (${product.dimensionsLabel})`,
    description: `${product.description} ${product.detailedDimensions}. Disponible en Cerámica El Almacén.`,
    openGraph: {
      title: `${product.name} | Cerámica El Almacén`,
      description: product.description,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = CATALOG_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const categoryInfo = CATEGORY_FILTERS.find((c) => c.id === product.category);
  const relatedProducts = CATALOG_PRODUCTS.filter(
    (p) => p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="w-full bg-surface py-6 lg:py-12">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-10 lg:space-y-14">
        {/* Barra superior de retorno y migas de pan */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-4">
          <nav
            aria-label="Ruta de navegación"
            className="flex flex-wrap items-center gap-1.5 font-label-md text-label-md text-secondary"
          >
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] hover:text-primary transition-colors"
            >
              Inicio
            </Link>
            <Icon name="chevron_right" className="text-[15px]" />
            <Link
              href="/catalogo"
              className="inline-flex items-center min-h-[44px] hover:text-primary transition-colors"
            >
              Catálogo
            </Link>
            {categoryInfo ? (
              <>
                <Icon name="chevron_right" className="text-[15px]" />
                <Link
                  href={`/catalogo?categoria=${product.category}`}
                  className="inline-flex items-center min-h-[44px] hover:text-primary transition-colors"
                >
                  {categoryInfo.shortLabel}
                </Link>
              </>
            ) : null}
            <Icon name="chevron_right" className="text-[15px]" />
            <span className="text-on-surface font-semibold truncate max-w-[220px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors"
          >
            <Icon name="arrow_back" className="text-[18px] text-primary" />
            <span>Volver al Catálogo</span>
          </Link>
        </div>

        {/* Bloque Principal: Foto del Producto + Descripción Completa y Ficha Técnica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Imagen del Producto */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-surface-container shadow-atelier border border-surface-container-highest">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-primary text-on-primary px-3 py-1 rounded font-label-caps text-label-caps uppercase tracking-wider shadow-sm w-fit">
                  {product.topBadge}
                </span>
                {product.topSubBadge ? (
                  <span className="bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface px-2.5 py-1 rounded font-label-caps text-label-caps uppercase w-fit">
                    {product.topSubBadge}
                  </span>
                ) : null}
              </div>

              <div className="absolute bottom-4 right-4 bg-surface-container-lowest/95 backdrop-blur-sm px-3.5 py-1.5 rounded-lg text-primary font-label-md text-label-md font-semibold shadow-md">
                {product.stockBadge}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Descripción Completa y Especificaciones */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2 font-label-caps text-label-caps uppercase">
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary font-semibold">
                  {categoryInfo?.label ?? product.category}
                </span>
                <span className="text-secondary">•</span>
                <span className="text-secondary">{product.originBadge}</span>
                <span className="text-secondary">•</span>
                <span className="text-secondary">SKU: {product.sku}</span>
              </div>

              <h1 className="font-display-hero text-headline-xl-mobile sm:text-headline-xl text-on-surface font-normal tracking-tight">
                {product.name}
              </h1>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary/10 text-primary font-label-md text-label-md font-semibold">
                <Icon name={product.highlightIcon} className="text-[19px]" />
                <span>{product.highlightText}</span>
              </div>
            </div>

            {/* Descripción completa */}
            <div className="space-y-2">
              <h2 className="font-label-caps text-label-caps uppercase text-secondary">
                Descripción del Producto
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Resumen de Atributos Principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high">
                <span className="font-label-caps text-label-caps uppercase text-secondary block">
                  Dimensiones y Formato
                </span>
                <p className="font-headline-sm text-base text-on-surface font-semibold mt-1">
                  {product.detailedDimensions}
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high">
                <span className="font-label-caps text-label-caps uppercase text-secondary block">
                  Material Base
                </span>
                <p className="font-headline-sm text-base text-on-surface font-semibold mt-1">
                  {product.materialBase}
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high">
                <span className="font-label-caps text-label-caps uppercase text-secondary block">
                  Acabado Superficial
                </span>
                <p className="font-headline-sm text-base text-on-surface font-semibold mt-1">
                  {product.finish}
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high">
                <span className="font-label-caps text-label-caps uppercase text-secondary block">
                  País de Origen
                </span>
                <p className="font-headline-sm text-base text-on-surface font-semibold mt-1">
                  {product.originCountry} ({product.originBadge})
                </p>
              </div>
            </div>

            {/* Tabla de Especificaciones Técnicas */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container-highest overflow-hidden">
              <div className="bg-surface-container-low px-4 py-3 border-b border-surface-container-highest flex items-center gap-2">
                <Icon name="description" className="text-[18px] text-primary" />
                <h2 className="font-headline-sm text-base text-on-surface font-semibold">
                  Ficha Técnica de Especificación
                </h2>
              </div>
              <dl className="divide-y divide-surface-container">
                {product.techSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="px-4 py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline"
                  >
                    <dt className="sm:col-span-5 font-label-md text-label-md text-secondary">
                      {spec.label}
                    </dt>
                    <dd className="sm:col-span-7 font-body-md text-body-md text-on-surface font-semibold">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Notas de Instalación y Conservación */}
            <div className="bg-surface-container-low p-4 sm:p-5 rounded-xl border border-surface-container-high space-y-2.5">
              <h2 className="font-label-caps text-label-caps uppercase text-primary flex items-center gap-1.5">
                <Icon name="verified" className="text-[16px]" />
                <span>Recomendaciones de Instalación &amp; Obra</span>
              </h2>
              <ul className="space-y-2 font-body-sm sm:text-body-md text-on-surface-variant">
                {product.technicalNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botones de Acción Directa */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={buildWhatsAppUrl(product.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-6 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                <Icon name="chat" className="text-[19px]" />
                <span>Cotizar por WhatsApp</span>
              </a>
              <Link
                href="/contacto"
                className="sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-variant text-on-surface px-5 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider font-semibold transition-colors"
              >
                <Icon name="layers" className="text-[19px] text-primary" />
                <span>Solicitar Muestra</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        <section className="pt-8 border-t border-surface-container-high space-y-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-label-caps text-label-caps text-primary uppercase">
                Explorar Más Opciones
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">
                Otras Piezas del Catálogo
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1 min-h-[44px] text-primary font-label-md text-label-md font-semibold hover:underline"
            >
              <span>Ver Todo el Catálogo</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/catalogo/${item.id}`}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-container-highest shadow-sm hover:shadow-atelier transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <span className="font-label-caps text-label-caps text-secondary uppercase">
                      {item.dimensionsLabel} • {item.finish}
                    </span>
                    <h3 className="font-headline-sm text-base text-on-surface font-semibold group-hover:text-primary transition-colors mt-0.5">
                      {item.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary font-label-md text-label-md font-semibold pt-1">
                    <span>Ver Descripción Completa</span>
                    <Icon name="arrow_forward" className="text-[15px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
