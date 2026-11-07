import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
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
    <div className="w-full bg-surface py-6 lg:py-12">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop space-y-10 lg:space-y-14">
        {project.draft ? (
          <p
            role="note"
            className="rounded-lg border border-dashed border-outline bg-surface-container-low px-4 py-3 text-sm text-on-surface"
          >
            <strong>Proyecto de ejemplo.</strong> Datos e imagen ilustrativos:
            reemplázalo por una obra real en <code>src/data/site.ts</code>{" "}
            antes de publicarlo. No aparece en la build de producción.
          </p>
        ) : null}

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
              href="/showroom"
              className="inline-flex items-center min-h-[44px] hover:text-primary transition-colors"
            >
              Proyectos
            </Link>
            <Icon name="chevron_right" className="text-[15px]" />
            <span className="text-on-surface font-semibold truncate max-w-[220px] sm:max-w-none">
              {project.title}
            </span>
          </nav>

          <Link
            href="/showroom"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors"
          >
            <Icon name="arrow_back" className="text-[18px] text-primary" />
            <span>Volver a Proyectos</span>
          </Link>
        </div>

        {/* Bloque Principal: Imagen del Proyecto + Descripción Completa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Fotografía Principal */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-surface-container shadow-atelier border border-surface-container-highest">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-inverse-surface/85 backdrop-blur-sm text-inverse-on-surface px-3 py-1 rounded font-label-caps text-label-caps uppercase">
                {project.category}
              </div>
              <div className="absolute bottom-4 right-4 bg-surface/95 backdrop-blur-sm text-primary px-3.5 py-1.5 rounded-lg font-label-md text-label-md font-semibold shadow-md">
                {project.area}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Historia y Alcance del Proyecto */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="space-y-2">
              <span className="font-label-caps text-label-caps text-primary uppercase flex items-center gap-1.5">
                <Icon name="location_on" className="text-[16px]" />
                <span>{project.fullLocation}</span>
              </span>

              <h1 className="font-display-hero text-headline-xl-mobile sm:text-headline-xl text-on-surface font-normal tracking-tight">
                {project.title}
              </h1>
            </div>

            {/* Datos Clave del Proyecto */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high">
                <span className="font-label-caps text-label-caps uppercase text-secondary block">
                  Ubicación
                </span>
                <p className="font-headline-sm text-base text-on-surface font-semibold mt-1">
                  {project.location}
                </p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high">
                <span className="font-label-caps text-label-caps uppercase text-secondary block">
                  Tipología
                </span>
                <p className="font-headline-sm text-base text-on-surface font-semibold mt-1">
                  {project.category}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-surface-container-low p-4 rounded-xl border border-surface-container-high">
                <span className="font-label-caps text-label-caps uppercase text-secondary block">
                  Suministro
                </span>
                <p className="font-headline-sm text-base text-on-surface font-semibold mt-1">
                  {project.area}
                </p>
              </div>
            </div>

            {/* Descripción Completa */}
            <div className="space-y-3">
              <h2 className="font-label-caps text-label-caps uppercase text-secondary">
                Descripción Completa del Proyecto
              </h2>
              {project.fullDescription.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-body-lg text-body-lg text-on-surface leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Puntos Clave de Ejecución */}
            <div className="bg-surface-container-low p-5 rounded-xl border border-surface-container-high space-y-2.5">
              <h2 className="font-label-caps text-label-caps uppercase text-primary flex items-center gap-1.5">
                <Icon name="verified" className="text-[16px]" />
                <span>Claves Técnicas de Suministro</span>
              </h2>
              <ul className="space-y-2 font-body-sm sm:text-body-md text-on-surface-variant">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={buildWhatsAppUrl(
                  `Hola, me inspiró el proyecto "${project.title}" (${project.location}) y deseo cotizar esos acabados.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-6 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                <Icon name="chat" className="text-[19px]" />
                <span>Cotizar Este Proyecto</span>
              </a>
              <Link
                href="/contacto"
                className="sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-surface-variant text-on-surface px-5 py-3.5 rounded-lg font-label-lg text-label-lg uppercase tracking-wider font-semibold transition-colors"
              >
                <Icon name="assignment" className="text-[19px] text-primary" />
                <span>Solicitar Asesoría</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Materiales Especificados en este Proyecto (Con enlace a cada ficha de producto) */}
        <section className="pt-8 border-t border-surface-container-high space-y-5">
          <div>
            <span className="font-label-caps text-label-caps text-primary uppercase">
              Acabados Utilizados en Obra
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">
              Materiales Especificados en {project.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specifiedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/catalogo/${product.id}`}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-container-highest shadow-sm hover:shadow-atelier transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-surface-container overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <span className="font-label-caps text-label-caps text-secondary uppercase">
                      {product.dimensionsLabel} • {product.finish}
                    </span>
                    <h3 className="font-headline-sm text-base text-on-surface font-semibold group-hover:text-primary transition-colors mt-0.5">
                      {product.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary font-label-md text-label-md font-semibold pt-1">
                    <span>Ver Producto</span>
                    <Icon name="arrow_forward" className="text-[15px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Otros Proyectos */}
        <section className="pt-8 border-t border-surface-container-high space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Otros Proyectos Destacados
            </h2>
            <Link
              href="/showroom"
              className="inline-flex items-center gap-1 min-h-[44px] text-primary font-label-md text-label-md font-semibold hover:underline"
            >
              <span>Ver Todos</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {otherProjects.map((item) => (
              <Link
                key={item.id}
                href={`/showroom/${item.id}`}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-container-highest shadow-sm hover:shadow-atelier transition-all flex flex-col sm:flex-row"
              >
                <div className="relative sm:w-48 aspect-[16/10] sm:aspect-auto bg-surface-container overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <span className="font-label-caps text-label-caps text-primary uppercase">
                      {item.location} • {item.category}
                    </span>
                    <h3 className="font-headline-sm text-base text-on-surface font-semibold group-hover:text-primary transition-colors mt-0.5">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary line-clamp-2 mt-1">
                      {item.summary}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary font-label-md text-label-md font-semibold">
                    <span>Ver Proyecto</span>
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
