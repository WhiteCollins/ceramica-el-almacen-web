import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverBanner } from "@/components/CoverBanner";
import { ShowroomBanner } from "@/components/ShowroomBanner";
import {
  Breadcrumbs,
  RelatedProjects,
  SwatchGrid,
  pieceCount,
} from "@/components/SpaceSections";
import {
  SPACES,
  findSpace,
  productsOfSpace,
  productsOfType,
} from "@/data/spaces";

interface SpacePageProps {
  params: Promise<{ espacio: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SPACES.map((space) => ({ espacio: space.slug }));
}

export async function generateMetadata({
  params,
}: SpacePageProps): Promise<Metadata> {
  const { espacio } = await params;
  const space = findSpace(espacio);
  if (!space) return {};
  return {
    title: space.title,
    description: space.description,
    alternates: { canonical: `/${space.slug}` },
    openGraph: {
      title: `${space.title} | Cerámica El Almacén`,
      description: space.description,
      url: `/${space.slug}`,
      images: [{ url: space.image, alt: space.imageAlt }],
    },
  };
}

export default async function SpacePage({ params }: SpacePageProps) {
  const { espacio } = await params;
  const space = findSpace(espacio);
  if (!space) notFound();

  const products = productsOfSpace(space);

  return (
    <div className="flex flex-col w-full bg-surface">
      <CoverBanner
        eyebrow="Colecciones por Espacio"
        title={space.title}
        description={space.description}
        image={space.image}
        imageAlt={space.imageAlt}
        imagePosition={space.imagePosition}
      />

      <div className="max-w-7xl w-full mx-auto px-margin-mobile lg:px-margin-desktop py-8 lg:py-14 flex flex-col gap-14 lg:gap-20">
        {/* Migas de pan + tipos dentro del espacio */}
        <section aria-labelledby="tipos" className="flex flex-col gap-6">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: space.label }]}
          />
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
              Subcategorías
            </span>
            <h2 id="tipos" className="font-serif text-3xl text-on-surface">
              ¿Qué buscas para {space.label.toLowerCase()}?
            </h2>
          </div>
          <ul
            role="list"
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
              space.types.length >= 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {space.types.map((type) => (
              <li key={type.slug}>
                <Link
                  href={`/${space.slug}/${type.slug}`}
                  className="group flex flex-col gap-3.5"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-sm bg-surface-container-low border border-outline/40 transition-all duration-300 group-hover:border-[#6b1d22]/45 group-hover:shadow-[0_14px_34px_-10px_rgba(107,29,34,0.2)]">
                    <Image
                      src={type.cardImage ?? type.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={
                        !type.cardImage && type.imagePosition
                          ? { objectPosition: type.imagePosition }
                          : undefined
                      }
                    />
                  </span>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-serif text-xl text-on-surface group-hover:text-[#6b1d22] transition-colors">
                      {type.title}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-secondary shrink-0">
                      {pieceCount(productsOfType(type).length)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Todas las piezas del espacio */}
        <section aria-labelledby="piezas" className="flex flex-col gap-6 pt-6 border-t border-outline/60">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b1d22] block">
                Selección Curada
              </span>
              <h2 id="piezas" className="font-serif text-3xl text-on-surface">
                Todas las piezas
              </h2>
            </div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              {pieceCount(products.length)} en exhibición
            </p>
          </div>
          <SwatchGrid products={products} />
        </section>

        <RelatedProjects products={products} />
      </div>

      <ShowroomBanner topic={space.title} />
    </div>
  );
}
