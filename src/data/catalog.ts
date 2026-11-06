/**
 * Catálogo de productos de Cerámica El Almacén SRL.
 * Puedes agregar, editar o reordenar piezas directamente en el arreglo CATALOG_PRODUCTS;
 * los conteos por categoría se calculan automáticamente desde los datos reales.
 */

export type ProductCategory =
  | "porcelanato"
  | "revestimiento"
  | "griferia"
  | "sanitarios"
  | "lavamanos";

export interface ProductTechSpec {
  label: string;
  value: string;
}

export interface CatalogProduct {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  finish:
    | "Blanco Mate"
    | "Pulido Brillante"
    | "Dorado Cepillado"
    | "Negro Mate"
    | "Mármol"
    | "Madera"
    | "Esmaltado Artesanal";
  formatFilter: "60x120" | "20x120" | "170x75" | "40x40" | "15x15";
  dimensionsLabel: string;
  detailedDimensions: string;
  originBadge: string;
  originCountry: string;
  topBadge: string;
  topSubBadge?: string;
  topBadgeTone?: "primary" | "dark" | "neutral" | "gold";
  stockBadge: string;
  immediateStock: boolean;
  featuredOrder: number;
  materialBase: string;
  description: string;
  highlightIcon: string;
  highlightText: string;
  techSpecs: ProductTechSpec[];
  technicalNotes: string[];
  image: string;
  imageAlt: string;
  whatsappText: string;
}

export const CATEGORY_FILTERS: {
  id: "all" | ProductCategory;
  label: string;
  shortLabel: string;
}[] = [
  { id: "all", label: "Todas las Piezas", shortLabel: "Todas" },
  {
    id: "porcelanato",
    label: "Porcelanatos Españoles",
    shortLabel: "Porcelanatos",
  },
  {
    id: "revestimiento",
    label: "Revestimientos Cerámicos",
    shortLabel: "Revestimientos",
  },
  { id: "griferia", label: "Griferías de Autor", shortLabel: "Griferías" },
  {
    id: "sanitarios",
    label: "Sanitarios y Tinas",
    shortLabel: "Sanitarios y Tinas",
  },
  {
    id: "lavamanos",
    label: "Lavamanos y Bachas",
    shortLabel: "Lavamanos",
  },
];

export const FINISH_FILTERS = [
  "Blanco Mate",
  "Pulido Brillante",
  "Dorado Cepillado",
  "Negro Mate",
  "Mármol",
  "Madera",
  "Esmaltado Artesanal",
] as const;

export const FORMAT_FILTERS = [
  { value: "60x120", label: "60 × 120 cm (Gran Formato)" },
  { value: "20x120", label: "20 × 120 cm (Listón Madera)" },
  { value: "170x75", label: "170 × 75 cm (Tina Exenta)" },
  { value: "40x40", label: "Piezas Sanitarias & Grifería" },
  { value: "15x15", label: "15 × 15 cm (Mural Cerámico)" },
] as const;

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "tina-sottovento-blanco-mate",
    sku: "TSO-2025-W",
    name: "Tina Sottovento Blanco Mate",
    category: "sanitarios",
    finish: "Blanco Mate",
    formatFilter: "170x75",
    dimensionsLabel: "170 × 75 cm",
    detailedDimensions: "170 × 75 × 58 cm (Exenta)",
    originBadge: "Importado • Italia",
    originCountry: "Italia",
    topBadge: "Destacado",
    topSubBadge: "Lujo Exento",
    topBadgeTone: "primary",
    stockBadge: "En Stock Local",
    immediateStock: true,
    featuredOrder: 1,
    materialBase: "Resina mineral acrílica atérmica de doble pared",
    description:
      "Monolito acrílico sanitario reforzado con aislamiento térmico. Silueta ergonómica envolvente con rebosadero lineal integrado.",
    highlightIcon: "check_circle",
    highlightText: "Acabado mate aterciopelado anti-manchas",
    techSpecs: [
      { label: "Capacidad Útil", value: "265 litros (inmersión profunda)" },
      { label: "Peso en Vacío", value: "46 kg (doble pared termoaislante)" },
      {
        label: "Drenaje & Rebosadero",
        value: "Válvula click-clack Ø 52 mm + sifón flexible incluidos",
      },
      {
        label: "Normativa Sanitaria",
        value: "UNE-EN 14516 (Bañeras de uso residencial)",
      },
    ],
    technicalNotes: [
      "Instalación exenta sobre losa nivelada con patas ocultas regulables; compatible con grifería de piso o mural de caño largo.",
      "Superficie acrílica sanitaria no porosa de fácil mantenimiento; planos de plomería y bloques CAD/BIM disponibles bajo solicitud.",
    ],
    image: "/images/products/tina-sottovento.jpg",
    imageAlt:
      "Tina exenta ovalada moderna modelo Sottovento en acabado blanco mate junto a grifería de piso negra en baño contemporáneo",
    whatsappText:
      "Hola, me interesa cotizar la Tina Sottovento Blanco Mate 170×75 (SKU: TSO-2025-W).",
  },
  {
    id: "griferia-monomando-gourmet-oro",
    sku: "IMX-GLD-904",
    name: "Grifería Monomando Gourmet Oro Cepillado",
    category: "griferia",
    finish: "Dorado Cepillado",
    formatFilter: "40x40",
    dimensionsLabel: "Alt. 48 × Alc. 23 cm",
    detailedDimensions: "Altura 48 cm • Alcance de caño extraíble 23 cm",
    originBadge: "Serie Valencia",
    originCountry: "España",
    topBadge: "IMEX España",
    topBadgeTone: "dark",
    stockBadge: "Entrega Inmediata",
    immediateStock: true,
    featuredOrder: 2,
    materialBase: "Latón macizo con recubrimiento PVD Brushed Gold",
    description:
      "Cuerpo de latón macizo con tratamiento PVD ultra-resistente al salitre y la humedad costera. Cartucho cerámico Sedal de giro suave.",
    highlightIcon: "water_drop",
    highlightText: "Aireador Neoperl economizador 40%",
    techSpecs: [
      { label: "Cartucho", value: "Cerámico Sedal Ø 35 mm (España)" },
      { label: "Presión de Trabajo", value: "1 – 5 bar (óptima 3 bar)" },
      {
        label: "Conexiones & Tope",
        value: 'Mangueras inox 3/8" • Perforación Ø 35 mm',
      },
      {
        label: "Normativa Hidráulica",
        value: "UNE-EN 817 • Acabado PVD anticorrosión",
      },
    ],
    technicalNotes: [
      "Caño flexible orientable 360° con cabezal magnético bimodo (chorro aireado laminar y ducha de enjuague).",
      "Repuestos originales IMEX (cartuchos cerámicos, aireadores y empaques) disponibles en nuestro almacén de San Pedro de Macorís.",
    ],
    image: "/images/products/griferia-gourmet-oro.jpg",
    imageAlt:
      "Grifería de cocina monomando gourmet en oro cepillado montada sobre fregadero doble negro mate",
    whatsappText:
      "Hola, quisiera cotizar la Grifería Monomando Gourmet Oro Cepillado (SKU: IMX-GLD-904).",
  },
  {
    id: "porcelanato-statuario-imperial",
    sku: "PRC-STAT-6012",
    name: "Porcelanato Statuario Imperial Pulido",
    category: "porcelanato",
    finish: "Pulido Brillante",
    formatFilter: "60x120",
    dimensionsLabel: "60 × 120 cm",
    detailedDimensions: "60 × 120 cm • Espesor 9 mm • Caja 1.44 m²",
    originBadge: "Castellón • España",
    originCountry: "España",
    topBadge: "Rectificado",
    topBadgeTone: "primary",
    stockBadge: "Caja 1.44 m²",
    immediateStock: true,
    featuredOrder: 3,
    materialBase: "Gres Porcelánico Esmaltado Rectificado",
    description:
      "Esmaltado mirror-polish con 6 patrones gráficos aleatorios. Canto rectificado para junta milimétrica en pisos residenciales y comerciales.",
    highlightIcon: "verified",
    highlightText: "Absorción de agua ≤ 0.1% Grupo BIa",
    techSpecs: [
      {
        label: "Norma & Clasificación",
        value: "ISO 13006 / UNE-EN 14411 — Grupo BIa",
      },
      {
        label: "Abrasión & Absorción",
        value: "PEI IV • Absorción de agua ≤ 0.1%",
      },
      { label: "Rendimiento por Caja", value: "1.44 m² (2 piezas • 31.5 kg)" },
      {
        label: "Junta & Adhesivo",
        value: "Junta mín. 1.5 mm • Mortero polimérico C2TE S1",
      },
    ],
    technicalNotes: [
      "6 caras gráficas destonificadas V2 para lograr continuidad de veta natural en salas, lobbies y baños principales.",
      "Reserva garantizada del mismo lote y calibre en almacén para evitar variaciones de tono en su obra.",
    ],
    image: "/images/products/porcelanato-statuario.jpg",
    imageAlt:
      "Losa de porcelanato Statuario Imperial pulido con vetas grises y sutiles matices dorados sobre fondo blanco cristalino",
    whatsappText:
      "Hola, solicito cotización del Porcelanato Statuario Imperial Pulido 60×120 (SKU: PRC-STAT-6012).",
  },
  {
    id: "lavamanos-oval-fluted-ranurado",
    sku: "LV-FLUT-BLK",
    name: "Lavamanos Oval Fluted Ranurado",
    category: "lavamanos",
    finish: "Negro Mate",
    formatFilter: "40x40",
    dimensionsLabel: "55 × 38 × 14 cm",
    detailedDimensions: '55 × 38 × 14 cm • Desagüe estándar Ø 45 mm (1¼")',
    originBadge: "Colección Atelier",
    originCountry: "España",
    topBadge: "Tendencia 2025",
    topBadgeTone: "dark",
    stockBadge: "En Stock Local",
    immediateStock: true,
    featuredOrder: 4,
    materialBase: "Porcelana Vitrificada de Alta Densidad",
    description:
      "Textura perimetral estriada arquitectónica. Fabricado en porcelana vitrificada de alta densidad con acabado exterior micro-mate sedoso.",
    highlightIcon: "texture",
    highlightText: "Superficie hidrófuga anti-bacteriana",
    techSpecs: [
      { label: "Instalación", value: "De apoyo sobre encimera (Vessel)" },
      {
        label: "Desagüe Requerido",
        value: 'Válvula click-clack Ø 45 mm (1¼") sin rebosadero',
      },
      {
        label: "Grifería Compatible",
        value: "Monomando de caño alto (≥ 25 cm) o mural empotrada",
      },
      {
        label: "Normativa Sanitaria",
        value: "UNE-EN 14688 (Lavabos cerámicos vitrificados)",
      },
    ],
    technicalNotes: [
      "Cocción a 1,250 °C con vitrificado integral resistente a cosméticos, cal y agentes de limpieza neutros.",
      "Compatible con mesetas de piedra sinterizada, cuarzo, mármol o mobiliario hidrófugo.",
    ],
    image: "/images/products/lavamanos-oval-fluted.jpg",
    imageAlt:
      "Lavamanos de apoyo ovalado con exterior estriado sobre encimera de nogal con grifería empotrada negra",
    whatsappText:
      "Hola, me interesa cotizar el Lavamanos Oval Fluted Ranurado (SKU: LV-FLUT-BLK).",
  },
  {
    id: "mural-artesanal-colors-of-life",
    sku: "ART-COL-1515",
    name: "Mural Artesanal 'Colors of Life'",
    category: "revestimiento",
    finish: "Esmaltado Artesanal",
    formatFilter: "15x15",
    dimensionsLabel: "15 × 15 cm",
    detailedDimensions: "15 × 15 cm • Espesor 8.5 mm • Caja 0.85 m²",
    originBadge: "Mural & Backsplash",
    originCountry: "España",
    topBadge: "Esmalte Vivo",
    topBadgeTone: "primary",
    stockBadge: "6 Tonos Disponibles",
    immediateStock: true,
    featuredOrder: 5,
    materialBase: "Cerámica de Pasta Blanca Esmaltada",
    description:
      "Esmaltes reactivos cocidos a 1,200 °C con variaciones tonales sutiles y bordes artesanales. Ideal para barras, cocinas y baños de autor.",
    highlightIcon: "palette",
    highlightText: "Gama Mediterránea: Esmeralda, Índigo y Teja",
    techSpecs: [
      {
        label: "Norma & Clasificación",
        value: "ISO 13006 / UNE-EN 14411 — Grupo BIII (Pasta Blanca)",
      },
      {
        label: "Aplicación",
        value: "Exclusivo revestimiento mural interior y salpicaderos",
      },
      { label: "Rendimiento por Caja", value: "0.85 m² (38 piezas)" },
      {
        label: "Junta & Destonificación",
        value: "Junta 2 – 3 mm • Variación cromática artesanal V3",
      },
    ],
    technicalNotes: [
      "Esmalte cristalino impermeable a manchas de grasa, vapor y salpicaduras en frentes de cocina y cafeterías.",
      "Se recomienda alternar piezas de 3 o más cajas durante la instalación para realzar el matiz artesanal.",
    ],
    image: "/images/products/mural-colors-of-life.jpg",
    imageAlt:
      "Composición de seis baldosas cerámicas artesanales cuadradas en esmeralda, azul cobalto, terracota y mostaza sobre piedra travertino",
    whatsappText:
      "Hola, deseo cotizar la colección de revestimiento artesanal Colors of Life 15×15 (SKU: ART-COL-1515).",
  },
  {
    id: "columna-ducha-termostatica-suecia",
    sku: "IMX-DCH-BLK",
    name: "Columna de Ducha Termostática",
    category: "griferia",
    finish: "Negro Mate",
    formatFilter: "40x40",
    dimensionsLabel: "Alt. 85–130 cm • Ø 25 cm",
    detailedDimensions: "Altura regulable 85–130 cm • Rociador Ø 25 cm",
    originBadge: "Serie Suecia",
    originCountry: "España",
    topBadge: "Termostático",
    topBadgeTone: "dark",
    stockBadge: "En Stock Local",
    immediateStock: true,
    featuredOrder: 6,
    materialBase: "Latón y Acero Inoxidable S304 Negro Electroforético",
    description:
      "Regulación de temperatura constante con bloqueo de seguridad a 38 °C. Rociador extraplano con boquillas antical y flexo antitorsión.",
    highlightIcon: "tune",
    highlightText: "Tubo telescópico regulable en altura",
    techSpecs: [
      {
        label: "Control Termostático",
        value: "Cartucho Vernet con tope de seguridad a 38 °C",
      },
      {
        label: "Caudal & Presión",
        value: "12 L/min a 3 bar • Rango 1.5 – 5 bar",
      },
      {
        label: "Tomas Hidráulicas",
        value: 'Tomas murales 1/2" estándar a 15 cm entre ejes',
      },
      {
        label: "Normativa Hidráulica",
        value: "UNE-EN 1111 (Grifería termostática sanitaria)",
      },
    ],
    technicalNotes: [
      "Incluye barra telescópica S304 ajustable en obra (85 a 130 cm), teleducha de mano con soporte deslizante y flexo de 1.50 m.",
      "Acabado negro mate electroforético resistente a la calcificación y al pelado por humedad.",
    ],
    image: "/images/products/columna-ducha-termostatica.jpg",
    imageAlt:
      "Columna de ducha termostática negro mate con rociador redondo efecto lluvia instalada sobre piedra gris",
    whatsappText:
      "Hola, solicito cotización de la Columna de Ducha Termostática Negro Mate (SKU: IMX-DCH-BLK).",
  },
  {
    id: "inodoro-one-piece-tornado-flush",
    sku: "CRN-TOR-901",
    name: "Inodoro One-Piece Tornado Flush",
    category: "sanitarios",
    finish: "Blanco Mate",
    formatFilter: "40x40",
    dimensionsLabel: "Desagüe 30.5 cm • 68 × 37 cm",
    detailedDimensions: '68 × 37 × 74 cm • Distancia al desagüe 305 mm (12")',
    originBadge: "Sanitarios Corona",
    originCountry: "Colombia",
    topBadge: "Doble Descarga 4.8L",
    topBadgeTone: "neutral",
    stockBadge: "En Stock Local",
    immediateStock: true,
    featuredOrder: 7,
    materialBase: "Porcelana Sanitaria Vitrificada Antimicrobiana",
    description:
      "Sistema de barrido centrífugo Tornado 360° silencioso. Faldón liso oculto de fácil limpieza y asiento ultradelgado de cierre suave.",
    highlightIcon: "energy_savings_leaf",
    highlightText: "Ahorro de agua certificado WaterSense",
    techSpecs: [
      {
        label: "Distancia al Desagüe",
        value: '30.5 cm / 305 mm (12" rough-in estándar al piso)',
      },
      {
        label: "Consumo de Agua",
        value: "Doble descarga 4.8 L sólidos / 3.8 L líquidos",
      },
      {
        label: "Sifón & Capacidad",
        value: "Sifón 100% esmaltado Ø 54 mm • MaP 800 g",
      },
      {
        label: "Certificaciones",
        value: "ASME A112.19.2 / EPA WaterSense",
      },
    ],
    technicalNotes: [
      "Incluye herraje interno preinstalado, anillo de cera reforzado, pernos de anclaje y asiento Soft-Close desmontable.",
      "Diseño rimless sin cavidades ocultas en el borde de la taza para máxima higiene residencial y hotelera.",
    ],
    image: "/images/products/inodoro-tornado-flush.jpg",
    imageAlt:
      "Inodoro moderno de una sola pieza en cerámica blanca con diseño minimalista de faldón liso",
    whatsappText:
      "Hola, me gustaría cotizar el Inodoro One-Piece Tornado Flush (SKU: CRN-TOR-901).",
  },
  {
    id: "porcelanato-roble-escandinavo-mate",
    sku: "WD-ROB-2012",
    name: "Porcelanato Roble Escandinavo Mate",
    category: "porcelanato",
    finish: "Madera",
    formatFilter: "20x120",
    dimensionsLabel: "20 × 120 cm",
    detailedDimensions: "20 × 120 cm • Espesor 9.5 mm • Caja 1.20 m²",
    originBadge: "Gres Español",
    originCountry: "España",
    topBadge: "Textura 3D Touch",
    topBadgeTone: "gold",
    stockBadge: "Caja 1.20 m²",
    immediateStock: true,
    featuredOrder: 8,
    materialBase: "Porcelánico Rectificado Antideslizante C2",
    description:
      "Reproducción fidedigna de vetas y nudos naturales con relieve sincronizado. Alta resistencia al tráfico e inmune a la humedad tropical.",
    highlightIcon: "nature",
    highlightText: "No requiere sellado ni pulido con cera",
    techSpecs: [
      {
        label: "Norma & Clasificación",
        value: "ISO 13006 / UNE-EN 14411 — Grupo BIa",
      },
      {
        label: "Abrasión & Agarre",
        value: "PEI IV • Antideslizante Clase 2 (R10) • Absorción ≤ 0.1%",
      },
      { label: "Rendimiento por Caja", value: "1.20 m² (5 listones • 26.4 kg)" },
      {
        label: "Traba & Junta",
        value: "Traba máx. 20% (24 cm) • Junta recomendada 2 mm",
      },
    ],
    technicalNotes: [
      "Apto para salas interiores, dormitorios, duchas y terrazas techadas expuestas a brisa marina.",
      "Para instalación en espiga o trabada a 1/4 se recomienda calcular un 15% adicional por cortes perimetrales.",
    ],
    image: "/images/products/porcelanato-roble-escandinavo.jpg",
    imageAlt:
      "Piso de porcelanato listón madera Roble Escandinavo instalado en espiga trabada en sala luminosa",
    whatsappText:
      "Hola, deseo cotizar el Porcelanato Roble Escandinavo Mate 20×120 (SKU: WD-ROB-2012).",
  },
  {
    id: "bacha-escultural-mineral-stone",
    sku: "BCH-MNR-42",
    name: "Bacha Escultural Mineral Stone",
    category: "lavamanos",
    finish: "Mármol",
    formatFilter: "40x40",
    dimensionsLabel: "Ø 42 × 15 cm",
    detailedDimensions: "Diámetro 42 cm × Altura 15 cm (Base plana Ø 18 cm)",
    originBadge: "Pieza Única",
    originCountry: "España",
    topBadge: "Edición Limitada",
    topBadgeTone: "dark",
    stockBadge: "En Stock Local",
    immediateStock: true,
    featuredOrder: 9,
    materialBase: "Compuesto Cerámico Mineral Texturizado",
    description:
      "Acabado martillado orgánico exterior con cuenco interior vitrificado suave. Pieza escultórica para baños de visitas y suites principales.",
    highlightIcon: "architecture",
    highlightText: "Tratamiento impermeabilizante nanométrico",
    techSpecs: [
      { label: "Instalación", value: "De apoyo sobre encimera o pedestal" },
      {
        label: "Diámetro & Altura",
        value: "Ø 42 cm exterior × 15 cm alto (espesor de borde 14 mm)",
      },
      {
        label: "Desagüe Requerido",
        value: 'Válvula click-clack Ø 45 mm (1¼") sin rebosadero',
      },
      {
        label: "Normativa Sanitaria",
        value: "UNE-EN 14688 • Interior vitrificado de baja porosidad",
      },
    ],
    technicalNotes: [
      "Exterior texturizado con sellado hidrofugante de fábrica; limpiar únicamente con paño húmedo y jabón neutro.",
      "Requiere grifería monomando de caño alto (≥ 26 cm) o grifería empotrada a pared.",
    ],
    image: "/images/products/bacha-mineral-stone.jpg",
    imageAlt:
      "Lavamanos escultural artesanal con textura exterior de piedra mineral exhibido sobre pedestal iluminado",
    whatsappText:
      "Hola, quisiera cotizar la Bacha Escultural Mineral Stone Ø 42 cm (SKU: BCH-MNR-42).",
  },
];

export function getCategoryCount(categoryId: "all" | ProductCategory): number {
  if (categoryId === "all") return CATALOG_PRODUCTS.length;
  return CATALOG_PRODUCTS.filter((p) => p.category === categoryId).length;
}
