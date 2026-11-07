import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CATALOG_PRODUCTS } from "@/data/catalog";
import { VISIBLE_PROJECTS, type ShowroomProject } from "@/data/site";

function productsFor(project: ShowroomProject) {
  return project.productIds
    .map((id) => CATALOG_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof CATALOG_PRODUCTS)[number] => Boolean(p));
}

function DraftBadge() {
  return (
    <span className="absolute top-3 left-3 z-10 rounded bg-white/95 px-2.5 py-1 text-xs font-semibold text-on-surface shadow-sm">
      Ejemplo
    </span>
  );
}

/** Metadatos en una línea: ubicación, tipo y año. */
function ProjectMeta({ project }: { project: ShowroomProject }) {
  return (
    <p className="text-sm text-secondary">
      {project.location}
      <span aria-hidden="true"> · </span>
      {project.category}
      <span aria-hidden="true"> · </span>
      {project.year}
    </p>
  );
}

/** Proyecto destacado: foto grande y ficha con los productos usados. */
function FeaturedProject({ project }: { project: ShowroomProject }) {
  const products = productsFor(project);
  const href = `/showroom/${project.id}`;

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
      <Link
        href={href}
        className="group relative block lg:col-span-7 aspect-[4/3] overflow-hidden rounded-lg bg-surface-container-low"
      >
        {project.draft ? <DraftBadge /> : null}
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="scroll-reveal object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="lg:col-span-5 flex flex-col gap-5">
        <div className="space-y-2">
          <ProjectMeta project={project} />
          <h2 className="font-serif text-3xl text-on-surface">
            <Link href={href} className="hover:text-primary transition-colors">
              {project.title}
            </Link>
          </h2>
          <p className="text-base text-secondary">{project.summary}</p>
        </div>

        <p className="text-base font-semibold text-on-surface">
          {project.area}
        </p>

        {products.length > 0 ? (
          <div className="space-y-2.5 border-t border-outline pt-5">
            <h3 className="text-sm font-semibold text-on-surface">
              Productos usados
            </h3>
            <ul role="list" className="flex flex-col gap-2">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/catalogo/${product.id}`}
                    className="group/prod flex items-center gap-3 min-h-[44px] rounded-lg"
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-container-low">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                    <span className="text-sm text-on-surface group-hover/prod:text-primary group-hover/prod:underline">
                      {product.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Link
          href={href}
          className="w-fit min-h-[44px] inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-container transition-colors"
        >
          <span>Ver proyecto</span>
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </div>
    </article>
  );
}

/** Tarjeta de proyecto: misma proporción de foto y mismo orden de datos. */
export function ProjectCard({ project }: { project: ShowroomProject }) {
  const products = productsFor(project);
  const href = `/showroom/${project.id}`;

  return (
    <article className="flex flex-col gap-4">
      <Link
        href={href}
        className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-surface-container-low"
      >
        {project.draft ? <DraftBadge /> : null}
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="scroll-reveal object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-col gap-2">
        <ProjectMeta project={project} />
        <h2 className="font-serif text-xl text-on-surface">
          <Link href={href} className="hover:text-primary transition-colors">
            {project.title}
          </Link>
        </h2>
        <p className="text-sm text-secondary line-clamp-2">{project.summary}</p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-outline pt-3">
        <span className="text-sm font-semibold text-on-surface">
          {project.area}
        </span>
        {products.length > 0 ? (
          <ul role="list" aria-label="Productos usados" className="flex -space-x-2">
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/catalogo/${product.id}`}
                  title={product.name}
                  className="relative block h-11 w-11 overflow-hidden rounded-full border-2 border-surface bg-surface-container-low hover:z-10 hover:scale-110 transition-transform"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

/** Ocupa el hueco de la última fila para que la cuadrícula no quede coja. */
function NextProjectCard() {
  return (
    <Link
      href="/contacto"
      className="group flex flex-col justify-center gap-3 rounded-lg border border-dashed border-outline p-8 min-h-[280px] hover:border-primary hover:bg-surface-container-low transition-colors"
    >
      <h2 className="font-serif text-xl text-on-surface">
        Tu obra puede ser la próxima
      </h2>
      <p className="text-sm text-secondary max-w-xs">
        Cubicamos tus planos, reservamos un solo lote y despachamos a pie de
        obra en todo el país.
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
        <span>Cotizar mi proyecto</span>
        <Icon name="arrow_forward" className="text-[18px]" />
      </span>
    </Link>
  );
}

export function ProjectsGrid() {
  const [featured, ...rest] = VISIBLE_PROJECTS;
  const regions = new Set(VISIBLE_PROJECTS.map((p) => p.location)).size;
  const columns = rest.length >= 3 ? 3 : 2;
  const leavesGap = rest.length > 0 && rest.length % columns !== 0;

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      <header className="max-w-2xl space-y-3">
        <h1 className="font-serif text-4xl text-on-surface">Proyectos</h1>
        <p className="text-base text-secondary">
          Obras residenciales y comerciales que equipamos desde nuestro
          almacén en San Pedro de Macorís: {VISIBLE_PROJECTS.length} proyectos
          en {regions} localidades de la República Dominicana.
        </p>
      </header>

      {featured ? <FeaturedProject project={featured} /> : null}

      {rest.length > 0 ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 ${
            columns === 3 ? "lg:grid-cols-3" : ""
          }`}
        >
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {leavesGap ? <NextProjectCard /> : null}
        </div>
      ) : null}
    </div>
  );
}
