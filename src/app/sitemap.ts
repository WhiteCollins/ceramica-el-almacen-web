import type { MetadataRoute } from "next";
import { CATALOG_PRODUCTS } from "@/data/catalog";
import { SITE_INFO, VISIBLE_PROJECTS } from "@/data/site";
import { SPACES } from "@/data/spaces";

/**
 * /sitemap.xml con todas las páginas públicas. Se genera en la build a partir
 * de los mismos datos que las rutas, así que un producto, espacio u obra nueva
 * entra solo. Los proyectos de ejemplo (`draft`) no se incluyen en producción.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_INFO.url}${path}`;

  const mainPages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/catalogo"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/showroom"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/contacto"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/terminos"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const spacePages: MetadataRoute.Sitemap = SPACES.flatMap((space) => [
    { url: url(`/${space.slug}`), changeFrequency: "monthly", priority: 0.8 },
    ...space.types.map((type) => ({
      url: url(`/${space.slug}/${type.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  const productPages: MetadataRoute.Sitemap = CATALOG_PRODUCTS.map(
    (product) => ({
      url: url(`/catalogo/${product.id}`),
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  const projectPages: MetadataRoute.Sitemap = VISIBLE_PROJECTS.map(
    (project) => ({
      url: url(`/showroom/${project.id}`),
      changeFrequency: "yearly",
      priority: 0.5,
    })
  );

  return [...mainPages, ...spacePages, ...productPages, ...projectPages];
}
