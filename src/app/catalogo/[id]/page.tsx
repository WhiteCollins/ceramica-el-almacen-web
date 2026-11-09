import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ProductSwatchCard } from "@/components/ProductSwatchCard";
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
    <div className="w-full bg-surface py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-12 lg:space-y-16">
        {/* Barra superior de retorno y migas de pan con estilo editorial */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline/60 pb-4">
          <nav
            aria-label="Ruta de navegación"
            className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-secondary"
          >
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] hover:text-on-surface transition-colors"
            >
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/catalogo"
              className="inline-flex items-center min-h-[44px] hover:text-on-surface transition-colors"
            >
              Catálogo
            </Link>
            {categoryInfo ? (
              <>
                <span aria-hidden="true">/</span>
                <Link
                  href={`/catalogo?categoria=${product.category}`}
                  className="inline-flex items-center min-h-[44px] hover:text-on-surface transition-colors"
                >
                  {categoryInfo.shortLabel}
                </Link>
              </>
            ) : null}
            <span aria-hidden="true">/</span>
            <span className="text-on-surface font-semibold truncate max-w-[220px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 border border-outline bg-white hover:border-on-surface text-on-surface text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            <Icon name="arrow_back" className="text-[15px] text-[#6b1d22]" />
            <span>Volver al catálogo</span>
          </Link>
        </div>

        {/* Bloque Principal: Foto del Producto + Descripción Completa y Ficha Técnica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Columna Izquierda: Imagen del Producto tipo Galería */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-surface-container-low border border-outline/50">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="bg-on-surface text-white px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] w-fit">
                  {product.topBadge}
                </span>
                {product.topSubBadge ? (
                  <span className="bg-white/95 backdrop-blur-sm text-on-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] w-fit">
                    {product.topSubBadge}
                  </span>
                ) : null}
              </div>

              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b1d22] shadow-sm">
                {product.stockBadge}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Descripción Completa y Especificaciones */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            <div className="space-y-3 border-b border-outline/60 pb-6">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                <span className="text-[#6b1d22]">
                  {categoryInfo?.label ?? product.category}
                </span>
                <span>·</span>
                <span>{product.originBadge}</span>
                <span>·</span>
                <span>SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-on-surface font-normal tracking-tight">
                {product.name}
              </h1>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#6b1d22]/10 text-[#6b1d22] text-xs font-semibold uppercase tracking-[0.14em] w-fit">
                <Icon name={product.highlightIcon} className="text-[17px]" />
                <span>{product.highlightText}</span>
              </div>
            </div>

            {/* Botones de Acción Directa (arriba como en Manolo Blahnik PDP) */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppUrl(product.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-on-surface hover:bg-[#6b1d22] text-white px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                <Icon name="chat" className="text-[17px]" />
                <span>Cotizar por WhatsApp</span>
              </a>
              <Link
                href="/contacto"
                className="sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 border border-outline bg-white hover:border-on-surface text-on-surface px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                <Icon name="layers" className="text-[17px] text-[#6b1d22]" />
                <span>Solicitar muestra</span>
              </Link>
            </div>

            {/* Descripción completa */}
            <div className="space-y-2.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
                Descripción de la Pieza
              </h2>
              <p className="text-sm sm:text-base text-on-surface leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Resumen de Atributos Principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-surface-container-low p-4 rounded-sm border border-outline/60">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary block">
                  Dimensiones y Formato
                </span>
                <p className="font-serif text-base text-on-surface font-medium mt-1">
                  {product.detailedDimensions}
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-sm border border-outline/60">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary block">
                  Material Base
                </span>
                <p className="font-serif text-base text-on-surface font-medium mt-1">
                  {product.materialBase}
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-sm border border-outline/60">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary block">
                  Acabado Superficial
                </span>
                <p className="font-serif text-base text-on-surface font-medium mt-1">
                  {product.finish}
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-sm border border-outline/60">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary block">
                  País de Origen
                </span>
                <p className="font-serif text-base text-on-surface font-medium mt-1">
                  {product.originCountry} ({product.originBadge})
                </p>
              </div>
            </div>

            {/* Tabla de Especificaciones Técnicas */}
            <div className="bg-white rounded-sm border border-outline/70 overflow-hidden">
              <div className="bg-surface-container-low px-5 py-3.5 border-b border-outline/60 flex items-center gap-2">
                <Icon
                  name="description"
                  className="text-[17px] text-[#6b1d22]"
                />
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-on-surface">
                  Ficha Técnica de Especificación
                </h2>
              </div>
              <dl className="divide-y divide-outline/40">
                {product.techSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="px-5 py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline"
                  >
                    <dt className="sm:col-span-5 text-xs uppercase tracking-[0.12em] text-secondary">
                      {spec.label}
                    </dt>
                    <dd className="sm:col-span-7 text-sm text-on-surface font-medium">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Notas de Instalación y Conservación */}
            <div className="bg-surface-container-low p-5 rounded-sm border border-outline/60 space-y-2.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b1d22] flex items-center gap-1.5">
                <Icon name="verified" className="text-[15px]" />
                <span>Recomendaciones de Instalación &amp; Obra</span>
              </h2>
              <ul className="space-y-2 text-sm text-secondary">
                {product.technicalNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2.5">
                    <span className="text-[#6b1d22] font-bold mt-0.5">–</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        <section className="pt-10 border-t border-outline/60 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
                Explorar Más Opciones
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-on-surface">
                Otras piezas de la colección
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold uppercase tracking-[0.18em] text-[#6b1d22] hover:underline"
            >
              <span>Ver todo el catálogo</span>
              <Icon name="arrow_forward" className="text-[15px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((item) => (
              <ProductSwatchCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
