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
  /**
   * Encuadre CSS (object-position) del banner, ej. "50% 70%". En escritorio
   * solo influye el valor vertical; en móvil, el horizontal.
   */
  imagePosition?: string;
  /** Foto distinta para la tarjeta del tipo en la página del espacio. */
  cardImage?: string;
  productIds: string[];
}

export interface Space {
  slug: string;
  label: string;
  title: string;
  description: string;
  /** Descripción breve que se revela al hacer hover en las 4 cards de categorías. */
  cardDetail: string;
  /** Enlace directo al catálogo filtrado para esta categoría. */
  catalogHref: string;
  image: string;
  imageAlt: string;
  /** Encuadre CSS (object-position) del banner, ej. "50% 70%". */
  imagePosition?: string;
  types: SpaceType[];
}

export const SPACES: Space[] = [
  {
    slug: "pisos",
    label: "Pisos",
    title: "Pisos de porcelanato",
    description:
      "Porcelanatos rectificados de gran formato con aspecto de mármol y de madera, de baja absorción para interiores y terrazas techadas.",
    cardDetail:
      "Formatos rectificados 60 × 120 y 20 × 120 cm en acabados tipo mármol pulido y madera natural antideslizante.",
    catalogHref: "/catalogo?categoria=porcelanato",
    image: "/images/banners/espacio-pisos.webp",
    imageAlt:
      "Sala abierta con piso de porcelanato tipo mármol blanco pulido de gran formato y puertas de vidrio hacia una terraza con palmas",
    imagePosition: "55% 60%",
    types: [
      {
        slug: "tipo-marmol",
        label: "Tipo mármol",
        title: "Porcelanato tipo mármol",
        description:
          "Vetas de mármol en porcelanato pulido 60 × 120 cm: el aspecto de la piedra natural sin su mantenimiento.",
        image: "/images/banners/tipo-pisos-tipo-marmol.webp",
        imageAlt:
          "Piso de porcelanato tipo mármol blanco pulido con vetas grises en una sala amplia",
        imagePosition: "60% 55%",
        productIds: ["porcelanato-statuario-imperial"],
      },
      {
        slug: "tipo-madera",
        label: "Tipo madera",
        title: "Porcelanato tipo madera",
        description:
          "Listones cerámicos 20 × 120 cm con textura de madera natural, sin dilatación por humedad ni necesidad de pulido.",
        image: "/images/banners/tipo-pisos-tipo-madera.webp",
        imageAlt:
          "Sala y comedor con piso de porcelanato tipo madera de roble en listones largos y salida a una terraza tropical",
        imagePosition: "62% 50%",
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
    cardDetail:
      "Cerámica artesanal vidriada 15 × 15 cm en tonos intensos y losas de gran formato para muros con junta mínima.",
    catalogHref: "/catalogo?categoria=revestimiento",
    image: "/images/banners/espacio-paredes.webp",
    imageAlt:
      "Cocina con pared de azulejos artesanales esmaltados en verde esmeralda, repisa de roble y fregadero blanco",
    imagePosition: "60% 40%",
    types: [
      {
        slug: "artesanales",
        label: "Artesanales",
        title: "Revestimientos artesanales",
        description:
          "Baldosas 15 × 15 cm esmaltadas a mano en tonos intensos, con la variación de color propia de la pieza artesanal.",
        image: "/images/banners/tipo-paredes-artesanales.webp",
        imageAlt:
          "Muro de azulejos artesanales esmaltados en azul cobalto, verde, mostaza y vino con una banca de madera",
        imagePosition: "61% 50%",
        productIds: ["mural-artesanal-colors-of-life"],
      },
      {
        slug: "gran-formato",
        label: "Gran formato",
        title: "Muros de gran formato",
        description:
          "Porcelanato 60 × 120 cm para revestir muros con juntas mínimas y continuidad visual con el piso.",
        image: "/images/banners/tipo-paredes-gran-formato.webp",
        imageAlt:
          "Baño con muro de porcelanato tipo mármol blanco de gran formato, franja de piezas decorativas en relieve, mueble de madera flotante y espejo redondo con luz",
        imagePosition: "45% 45%",
        cardImage: "/images/banners/muro-marmol-relieve-tina.jpg",
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
    cardDetail:
      "Tinas exentas, inodoros one-piece, lavamanos escultóricos, griferías de baño y sistemas de ducha termostáticos.",
    catalogHref: "/catalogo?categoria=sanitarios",
    image: "/images/banners/espacio-banos.webp",
    imageAlt:
      "Baño con tina exenta blanca, grifería de piso dorada y muros de porcelanato tipo travertino de gran formato",
    imagePosition: "60% 65%",
    types: [
      {
        slug: "sanitarios-y-tinas",
        label: "Sanitarios y tinas",
        title: "Sanitarios y tinas",
        description:
          "Tinas exentas de resina mineral e inodoros one-piece de bajo consumo para baños principales y de visitas.",
        image: "/images/banners/banos-tina-piedra.webp",
        imageAlt:
          "Tina exenta blanca sobre una base de piedra, con grifería de piso dorada y muro de porcelanato tipo mármol",
        imagePosition: "50% 70%",
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
          "Lavamanos de apoyo en cerámica estriada, bachas esculturales de piedra y grifería especializada para baño.",
        image: "/images/banners/banos-lavamanos-piedra-roble.jpg",
        imageAlt:
          "Mueble de madera flotante con lavamanos estriado blanco y bacha de piedra natural con griferías negras empotradas",
        imagePosition: "55% 50%",
        cardImage: "/images/banners/banos-lavamanos-piedra-roble.jpg",
        productIds: [
          "lavamanos-oval-fluted-ranurado",
          "bacha-escultural-mineral-stone",
          "monomando-lavamanos-alto-negro",
          "griferia-bimando-dorada-cep",
          "monomando-cascada-inox-cep",
          "monomando-cilindrico-negro-mate",
          "monomando-bajo-cromo-espejo",
        ],
      },
      {
        slug: "duchas",
        label: "Duchas",
        title: "Duchas",
        description:
          "Columnas de ducha termostáticas, sistemas empotrables a muro y desagües de acero inoxidable.",
        image: "/images/banners/ducha-cabina-panoramica.jpg",
        imageAlt:
          "Ducha de obra con columna termostática negra mate, mampara de vidrio y muros de porcelanato tipo pizarra gris oscuro",
        imagePosition: "65% 50%",
        cardImage: "/images/banners/ducha-cabina-pizarra.jpg",
        productIds: [
          "columna-ducha-termostatica-suecia",
          "sistema-ducha-empotrable-negro",
          "griferia-mural-termostatica-ducha",
          "columna-ducha-cuadrada-cromo",
          "desague-ducha-oculto-negro",
        ],
      },
    ],
  },
  {
    slug: "cocinas",
    label: "Cocinas",
    title: "Cocinas",
    description:
      "Grifería monomando con caño extraíble y revestimientos esmaltados para salpicaderos y barras.",
    cardDetail:
      "Monomandos gourmet en acabado PVD oro cepillado y cerámicas esmaltadas impermeables para salpicaderos.",
    catalogHref: "/catalogo?categoria=griferia",
    image: "/images/banners/espacio-cocinas.webp",
    imageAlt:
      "Grifería de cocina en oro cepillado con caño extraíble sobre fregadero negro y salpicadero de azulejo terracota",
    imagePosition: "50% 45%",
    types: [
      {
        slug: "griferia",
        label: "Grifería",
        title: "Grifería de cocina",
        description:
          "Monomandos de latón macizo con caño extraíble y acabado PVD resistente a la corrosión.",
        image: "/images/banners/tipo-cocinas-griferia.webp",
        imageAlt:
          "Grifería monomando en oro cepillado con caño extraíble sobre fregadero negro y encimera blanca",
        imagePosition: "68% 50%",
        productIds: ["griferia-monomando-gourmet-oro"],
      },
      {
        slug: "salpicaderos",
        label: "Salpicaderos",
        title: "Salpicaderos",
        description:
          "Revestimientos esmaltados impermeables a grasas y vapor para el frente de la cocina y la barra.",
        image: "/images/banners/tipo-cocinas-salpicaderos.webp",
        imageAlt:
          "Cocina con salpicadero de azulejos esmaltados artesanales en tonos terracota, ollas de cobre, encimera de madera y fregadero blanco",
        imagePosition: "60% 50%",
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
