import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ProductSwatchCard } from "@/components/ProductSwatchCard";
import { CATALOG_PRODUCTS } from "@/data/catalog";
import { VISIBLE_PROJECTS, buildWhatsAppUrl } from "@/data/site";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return VISIBLE_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = VISIBLE_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: `${project.title} (${project.location}) — Proyectos`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Cerámica El Almacén`,
      description: project.summary,
      images: [{ url: project.image, alt: project.alt }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = VISIBLE_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const specifiedProducts = CATALOG_PRODUCTS.filter((prod) =>
    project.productIds.includes(prod.id)
  );

  const otherProjects = VISIBLE_PROJECTS.filter((p) => p.id !== project.id);

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
              href="/showroom"
              className="inline-flex items-center min-h-[44px] hover:text-on-surface transition-colors"
            >
              Proyectos
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-on-surface font-semibold truncate max-w-[220px] sm:max-w-none">
              {project.title}
            </span>
          </nav>

          <Link
            href="/showroom"
            className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 border border-outline bg-white hover:border-on-surface text-on-surface text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            <Icon name="arrow_back" className="text-[15px] text-[#6b1d22]" />
            <span>Volver a proyectos</span>
          </Link>
        </div>

        {/* Bloque Principal: Imagen del Proyecto + Descripción Completa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Columna Izquierda: Fotografía Principal */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-surface-container-low border border-outline/50">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-on-surface px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm">
                {project.spaceBadge}
              </div>
              <div className="absolute bottom-4 right-4 bg-inverse-surface/90 backdrop-blur-sm text-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]">
                {project.area}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Historia y Alcance del Proyecto */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] flex items-center gap-1.5">
                <Icon name="location_on" className="text-[15px]" />
                <span>{project.fullLocation}</span>
              </span>

              <h1 className="text-2xl sm:text-3xl uppercase tracking-[0.16em] font-semibold text-on-surface">
                {project.title}
              </h1>
            </div>

            {/* Datos Clave del Proyecto */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-surface-container-low p-4 rounded-sm border border-outline/60">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary block">
                  Ubicación
                </span>
                <p className="text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold text-on-surface mt-1">
                  {project.location}
                </p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-sm border border-outline/60">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary block">
                  Tipología
                </span>
                <p className="text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold text-on-surface mt-1">
                  {project.category}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-surface-container-low p-4 rounded-sm border-l-2 border-[#6b1d22]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary block">
                  Suministro
                </span>
                <p className="text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold text-[#6b1d22] mt-1">
                  {project.area}
                </p>
              </div>
            </div>

            {/* Descripción Completa */}
            <div className="space-y-3">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
                Memoria Descriptiva
              </h2>
              {project.fullDescription.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm sm:text-base text-on-surface leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Puntos Clave de Ejecución */}
            <div className="bg-surface-container-low p-5 rounded-sm border border-outline/60 space-y-3">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b1d22] flex items-center gap-1.5">
                <Icon name="verified" className="text-[15px]" />
                <span>Claves Técnicas de Suministro</span>
              </h2>
              <ul className="space-y-2 text-sm text-secondary">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#6b1d22] font-bold mt-0.5">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Acciones Editoriales */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={buildWhatsAppUrl(
                  `Hola, me inspiró el proyecto "${project.title}" (${project.location}) y deseo cotizar esos acabados.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-on-surface hover:bg-[#6b1d22] text-white px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                <Icon name="chat" className="text-[17px]" />
                <span>Cotizar este proyecto</span>
              </a>
              <Link
                href="/contacto"
                className="sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 border border-outline bg-white hover:border-on-surface text-on-surface px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
              >
                <Icon name="assignment" className="text-[17px] text-[#6b1d22]" />
                <span>Solicitar asesoría</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Materiales Especificados en este Proyecto */}
        <section className="pt-10 border-t border-outline/60 space-y-8">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b1d22]">
              Acabados Utilizados en Obra
            </span>
            <h2 className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface">
              Materiales especificados en {project.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {specifiedProducts.map((product) => (
              <ProductSwatchCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Otros Proyectos */}
        <section className="pt-10 border-t border-outline/60 space-y-6">
          <div className="flex items-end justify-between gap-2">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
                Portafolio
              </span>
              <h2 className="text-xl sm:text-2xl uppercase tracking-[0.18em] font-semibold text-on-surface">
                Otros proyectos destacados
              </h2>
            </div>
            <Link
              href="/showroom"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold uppercase tracking-[0.18em] text-[#6b1d22] hover:underline"
            >
              <span>Ver todos</span>
              <Icon name="arrow_forward" className="text-[15px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((item) => (
              <Link
                key={item.id}
                href={`/showroom/${item.id}`}
                className="group bg-white rounded-sm overflow-hidden border border-outline/60 transition-all duration-300 hover:border-[#6b1d22]/45 hover:shadow-[0_14px_34px_-10px_rgba(107,29,34,0.18)] flex flex-col sm:flex-row"
              >
                <div className="relative sm:w-52 aspect-[16/10] sm:aspect-auto bg-surface-container-low overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b1d22]">
                      {item.location} · {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base uppercase tracking-[0.16em] font-semibold text-on-surface group-hover:text-[#6b1d22] transition-colors mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-secondary line-clamp-2 mt-1.5 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface group-hover:text-[#6b1d22] transition-colors">
                    <span>Ver obra</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
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
