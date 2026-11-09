import type { Metadata } from "next";
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
  findType,
  productsOfSpace,
  productsOfType,
} from "@/data/spaces";

interface TypePageProps {
  params: Promise<{ espacio: string; tipo: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SPACES.flatMap((space) =>
    space.types.map((type) => ({ espacio: space.slug, tipo: type.slug }))
  );
}

export async function generateMetadata({
  params,
}: TypePageProps): Promise<Metadata> {
  const { espacio, tipo } = await params;
  const space = findSpace(espacio);
  const type = space && findType(space, tipo);
  if (!space || !type) return {};
  const url = `/${space.slug}/${type.slug}`;
  return {
    title: `${type.title} · ${space.label}`,
    description: type.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${type.title} | Cerámica El Almacén`,
      description: type.description,
      url,
      images: [{ url: type.image, alt: type.imageAlt }],
    },
  };
}

export default async function TypePage({ params }: TypePageProps) {
  const { espacio, tipo } = await params;
  const space = findSpace(espacio);
  const type = space && findType(space, tipo);
  if (!space || !type) notFound();

  const products = productsOfType(type);
  const typeIds = new Set(products.map((p) => p.id));
  const moreInSpace = productsOfSpace(space).filter((p) => !typeIds.has(p.id));

  return (
    <div className="flex flex-col w-full bg-surface">
      <CoverBanner
        eyebrow={space.label}
        title={type.title}
        description={type.description}
        image={type.image}
        imageAlt={type.imageAlt}
        imagePosition={type.imagePosition}
      />

      <div className="max-w-7xl w-full mx-auto px-margin-mobile lg:px-margin-desktop py-8 lg:py-14 flex flex-col gap-14 lg:gap-20">
        <section aria-labelledby="piezas" className="flex flex-col gap-6">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: space.label, href: `/${space.slug}` },
              { label: type.label },
            ]}
          />

          {/* Otros tipos del mismo espacio */}
          {space.types.length > 1 ? (
            <nav aria-label={`Tipos de ${space.label}`}>
              <ul role="list" className="flex flex-wrap gap-2">
                {space.types.map((t) => {
                  const current = t.slug === type.slug;
                  return (
                    <li key={t.slug}>
                      <Link
                        href={`/${space.slug}/${t.slug}`}
                        aria-current={current ? "page" : undefined}
                        className={
                          current
                            ? "inline-flex items-center min-h-[40px] px-4 py-2 bg-on-surface text-white text-[11px] font-semibold uppercase tracking-[0.18em]"
                            : "inline-flex items-center min-h-[40px] px-4 py-2 border border-outline bg-white text-on-surface text-[11px] font-medium uppercase tracking-[0.18em] hover:border-on-surface transition-colors"
                        }
                      >
                        {t.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}

          <div className="flex flex-wrap items-end justify-between gap-3 pt-2">
            <h2 id="piezas" className="font-serif text-3xl text-on-surface">
              Piezas
            </h2>
            <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              {pieceCount(products.length)}
            </p>
          </div>
          <SwatchGrid products={products} />
        </section>

        {moreInSpace.length > 0 ? (
          <section
            aria-labelledby="mas"
            className="flex flex-col gap-6 pt-6 border-t border-outline/60"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="mas" className="font-serif text-3xl text-on-surface">
                Más en {space.label.toLowerCase()}
              </h2>
              <Link
                href={`/${space.slug}`}
                className="inline-flex items-center min-h-[44px] text-xs font-semibold uppercase tracking-[0.18em] text-[#6b1d22] hover:underline"
              >
                Ver todo {space.label.toLowerCase()}
              </Link>
            </div>
            <SwatchGrid products={moreInSpace} />
          </section>
        ) : null}

        <RelatedProjects products={products} />
      </div>

      <ShowroomBanner topic={type.title} />
    </div>
  );
}
