/**
 * Organización del catálogo por espacios y tipos (ej. /banos/duchas).
 * Cada tipo agrupa productos de CATALOG_PRODUCTS por su `id`; un mismo
 * producto puede aparecer en varios tipos (ej. el mural Colors of Life está
 * en Paredes y en Cocinas). Para añadir un tipo, agrégalo aquí: la ruta, el
 * menú y el sitemap de páginas estáticas se generan solos.
 */
import { CATALOG_PRODUCTS, type CatalogProduct } from "@/data/catalog";

export interface SpaceType {
  slug: string;
  /** Nombre corto para menús y migas de pan. */
  label: string;
  /** Título grande del banner (H1). */
  title: string;
  /** 1–2 frases para la cabecera y la meta description. */
  description: string;
  image: string;
  imageAlt: string;
  productIds: string[];
}

export interface Space {
  slug: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  types: SpaceType[];
}

export const SPACES: Space[] = [
  {
    slug: "pisos",
    label: "Pisos",
    title: "Pisos de porcelanato",
    description:
      "Porcelanatos rectificados de gran formato con aspecto de mármol y de madera, de baja absorción para interiores y terrazas techadas.",
    image: "/images/categories/porcelanatos-calacatta.jpg",
    imageAlt:
      "Sala con piso de porcelanato tipo mármol Calacatta pulido de gran formato",
    types: [
      {
        slug: "tipo-marmol",
        label: "Tipo mármol",
        title: "Porcelanato tipo mármol",
        description:
          "Vetas de mármol en porcelanato pulido 60 × 120 cm: el aspecto de la piedra natural sin su mantenimiento.",
        image: "/images/products/porcelanato-statuario.jpg",
        imageAlt: "Porcelanato Statuario Imperial pulido con vetas grises",
        productIds: ["porcelanato-statuario-imperial"],
      },
      {
        slug: "tipo-madera",
        label: "Tipo madera",
        title: "Porcelanato tipo madera",
        description:
          "Listones cerámicos 20 × 120 cm con textura de madera natural, sin dilatación por humedad ni necesidad de pulido.",
        image: "/images/products/porcelanato-roble-escandinavo.jpg",
        imageAlt: "Sala con piso de porcelanato tipo madera Roble Escandinavo",
        productIds: ["porcelanato-roble-escandinavo-mate"],
      },
    ],
  },
  {
    slug: "paredes",
    label: "Paredes",
    title: "Revestimientos de pared",
    description:
      "Revestimientos artesanales esmaltados y porcelanato de gran formato para muros de baños, cocinas y áreas sociales.",
    image: "/images/hero/gama-esmaltada-hero.jpg",
    imageAlt:
      "Baldosas esmaltadas artesanales en verde esmeralda, azul cobalto, mostaza y vino",
    types: [
      {
        slug: "artesanales",
        label: "Artesanales",
        title: "Revestimientos artesanales",
        description:
          "Baldosas 15 × 15 cm esmaltadas a mano en tonos intensos, con la variación de color propia de la pieza artesanal.",
        image: "/images/hero/gama-esmaltada-hero.jpg",
        imageAlt:
          "Composición de baldosas esmaltadas artesanales en tonos intensos",
        productIds: ["mural-artesanal-colors-of-life"],
      },
      {
        slug: "gran-formato",
        label: "Gran formato",
        title: "Muros de gran formato",
        description:
          "Porcelanato 60 × 120 cm para revestir muros con juntas mínimas y continuidad visual con el piso.",
        image: "/images/categories/porcelanatos-calacatta.jpg",
        imageAlt:
          "Muro y piso revestidos con porcelanato tipo mármol de gran formato",
        productIds: ["porcelanato-statuario-imperial"],
      },
    ],
  },
  {
    slug: "banos",
    label: "Baños",
    title: "Baños",
    description:
      "Tinas exentas, inodoros, lavamanos de apoyo y duchas termostáticas en exhibición a escala real en el showroom.",
    image: "/images/hero/tina-sottovento-hero.jpg",
    imageAlt:
      "Baño con tina exenta Sottovento blanco mate y grifería de piso dorada",
    types: [
      {
        slug: "sanitarios-y-tinas",
        label: "Sanitarios y tinas",
        title: "Sanitarios y tinas",
        description:
          "Tinas exentas de resina mineral e inodoros one-piece de bajo consumo para baños principales y de visitas.",
        image: "/images/categories/baneras-sanitarios.jpg",
        imageAlt:
          "Tina exenta blanca frente a un revestimiento cálido tipo madera",
        productIds: [
          "tina-sottovento-blanco-mate",
          "inodoro-one-piece-tornado-flush",
        ],
      },
      {
        slug: "lavamanos",
        label: "Lavamanos",
        title: "Lavamanos y bachas",
        description:
          "Lavamanos de apoyo en cerámica estriada y bachas esculturales de piedra para muebles de baño.",
        image: "/images/categories/muebles-lavamanos.jpg",
        imageAlt:
          "Lavamanos de apoyo de cerámica estriada, terrazo y piedra sobre madera",
        productIds: [
          "lavamanos-oval-fluted-ranurado",
          "bacha-escultural-mineral-stone",
        ],
      },
      {
        slug: "duchas",
        label: "Duchas",
        title: "Duchas",
        description:
          "Columnas de ducha termostáticas con temperatura estable y altura regulable.",
        image: "/images/products/columna-ducha-termostatica.jpg",
        imageAlt: "Columna de ducha termostática negra mate en baño de piedra",
        productIds: ["columna-ducha-termostatica-suecia"],
      },
    ],
  },
  {
    slug: "cocinas",
    label: "Cocinas",
    title: "Cocinas",
    description:
      "Grifería monomando con caño extraíble y revestimientos esmaltados para salpicaderos y barras.",
    image: "/images/hero/griferia-oro-hero.jpg",
    imageAlt:
      "Grifería de cocina en oro cepillado con rociador extraíble sobre fregadero negro",
    types: [
      {
        slug: "griferia",
        label: "Grifería",
        title: "Grifería de cocina",
        description:
          "Monomandos de latón macizo con caño extraíble y acabado PVD resistente a la corrosión.",
        image: "/images/hero/griferia-oro-hero.jpg",
        imageAlt: "Grifería monomando oro cepillado con caño extraíble",
        productIds: ["griferia-monomando-gourmet-oro"],
      },
      {
        slug: "salpicaderos",
        label: "Salpicaderos",
        title: "Salpicaderos",
        description:
          "Revestimientos esmaltados impermeables a grasas y vapor para el frente de la cocina y la barra.",
        image: "/images/hero/editorial-color-backsplash.jpg",
        imageAlt:
          "Salpicadero de cocina con baldosas esmaltadas en tonos terracota",
        productIds: ["mural-artesanal-colors-of-life"],
      },
    ],
  },
];

export function findSpace(slug: string): Space | undefined {
  return SPACES.find((s) => s.slug === slug);
}

export function findType(
  space: Space,
  typeSlug: string
): SpaceType | undefined {
  return space.types.find((t) => t.slug === typeSlug);
}

/** Productos de un tipo, en el orden en que se declararon. */
export function productsOfType(type: SpaceType): CatalogProduct[] {
  return type.productIds
    .map((id) => CATALOG_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is CatalogProduct => Boolean(p));
}

/** Todos los productos de un espacio, sin repetir. */
export function productsOfSpace(space: Space): CatalogProduct[] {
  const ids = [...new Set(space.types.flatMap((t) => t.productIds))];
  return ids
    .map((id) => CATALOG_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is CatalogProduct => Boolean(p));
}
