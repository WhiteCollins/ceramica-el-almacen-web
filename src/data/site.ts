/**
 * Datos generales de Cerámica El Almacén SRL.
 * Edita este archivo para actualizar teléfonos, horarios, asesoras, reseñas o preguntas frecuentes.
 */

export const SITE_INFO = {
  name: "Cerámica El Almacén",
  legalName: "Cerámica El Almacén SRL",
  /** Dominio de producción: base de las URL canónicas, del sitemap y de robots.txt. */
  url: "https://ceramicaelalmacen.com",
  tagline: "La Perfección en Cerámica",
  description:
    "Importadores directos de porcelanatos europeos de gran formato, revestimientos cerámicos, griferías de autor, bañeras exentas y lavamanos escultóricos en República Dominicana.",
  phoneDisplay: "+1 809-246-2221",
  phoneHref: "tel:+18092462221",
  whatsappNumber: "18092462221",
  email: "ventas@ceramicaelalmacen.com",
  instagramLabel: "Síguenos en Instagram",
  instagramUrl: "https://instagram.com/ceramicaelalmacenalterna",
  address: {
    street: "Av. Rolando Martínez 33",
    city: "San Pedro de Macorís",
    postalCode: "21000",
    country: "República Dominicana",
    full: "Av. Rolando Martínez 33, San Pedro de Macorís, República Dominicana",
  },
  mapsUrl:
    "https://maps.google.com/?q=Av.+Rolando+Mart%C3%ADnez+33,+San+Pedro+de+Macor%C3%ADs",
  wazeUrl:
    "https://waze.com/ul?q=Ceramica+El+Almacen+Av+Rolando+Martinez+33",
  hours: {
    weekdays: "Lunes a Viernes: 8:00 AM – 6:00 PM",
    saturday: "Sábados: 8:30 AM – 1:00 PM",
    sunday: "Domingos: Cerrado (Atención Previa Cita)",
  },
  locations: [
    {
      id: "san-pedro",
      name: "Ubicación 1 (San Pedro de Macorís)",
      city: "San Pedro de Macorís",
      address: "Av. Rolando Martínez 33",
      phoneDisplay: "+1 809-246-2221",
      phoneHref: "tel:+18092462221",
      mapsUrl:
        "https://maps.google.com/?q=Av.+Rolando+Mart%C3%ADnez+33,+San+Pedro+de+Macor%C3%ADs",
      hours: {
        weekdays: "Lunes a viernes: 8:00 AM – 6:00 PM",
        saturday: "Sábados: 8:30 AM – 1:00 PM",
      },
    },
    {
      id: "la-romana",
      name: "Ubicación 2 (La Romana)",
      city: "La Romana",
      address: "Av. Profesor Juan Bosch (antigua Av. Padre Abreu)",
      phoneDisplay: "+1 809-556-4116",
      phoneHref: "tel:+18095564116",
      mapsUrl:
        "https://maps.google.com/?q=Av.+Profesor+Juan+Bosch,+La+Romana,+Rep%C3%BAblica+Dominicana",
      hours: {
        weekdays: "Lunes a viernes: 8:00 AM – 6:00 PM",
        saturday: "Sábados: 8:30 AM – 1:00 PM",
      },
    },
  ],
  metrics: {
    googleRating: "4.5",
    googleReviewsCount: "+248 reseñas en Google",
    dispatchHours: "24–48h",
    warranty: "100%",
  },
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

export interface Advisor {
  id: string;
  initials: string;
  name: string;
  roleHome: string;
  roleCatalog: string;
  segment: string;
  segmentIcon: string;
  bio: string;
  homeAvatar: string;
  contactAvatar: string;
  whatsappGreeting: string;
  locationLabel: string;
}

export const ADVISORS: Advisor[] = [
  {
    id: "dally-moreno",
    initials: "DM",
    name: "Dally Moreno",
    roleHome: "Especialista en Porcelanatos & Griferías",
    roleCatalog: "Asesora Técnica Showroom",
    segment: "Constructoras & Obras",
    segmentIcon: "domain",
    bio: "Atención a constructoras, cotizaciones mayoristas por cubicaje y especificación técnica de proyectos en volumen.",
    homeAvatar: "/images/team/dally-moreno-home.jpg",
    contactAvatar: "/images/team/dally-moreno-contacto.jpg",
    whatsappGreeting:
      "Hola Dally Moreno, deseo cotizar materiales para un proyecto con Cerámica El Almacén.",
    locationLabel: "+1 809-246-2221",
  },
  {
    id: "margarita-baez",
    initials: "MB",
    name: "Margarita Báez",
    roleHome: "Asesora de Baños, Tinas & Muebles",
    roleCatalog: "Especialista en Porcelanatos & Diseño",
    segment: "Diseño & Showroom",
    segmentIcon: "palette",
    bio: "Selección de paletas cromáticas, asesoría para baños residenciales, tinas exentas y muestras físicas en piso.",
    homeAvatar: "/images/team/margarita-baez-home.jpg",
    contactAvatar: "/images/team/margarita-baez-contacto.jpg",
    whatsappGreeting:
      "Hola Margarita Báez, quisiera asesoría de diseño y agendar cita en el showroom.",
    locationLabel: "Atelier San Pedro",
  },
];

export const MAIN_CATEGORIES = [
  {
    slug: "porcelanato",
    title: "Porcelanatos & Revestimientos",
    subtitle: "Gran formato 60×120 y 20×120 cm",
    cta: "Explorar Superficies",
    image: "/images/categories/porcelanatos-calacatta.jpg",
    alt: "Sala contemporánea con piso de porcelanato español tipo mármol Calacatta pulido de gran formato",
  },
  {
    slug: "griferia",
    title: "Grifería de Vanguardia",
    subtitle: "Monomandos PVD y duchas termostáticas",
    cta: "Ver Griferías",
    image: "/images/categories/griferia-vanguardia.jpg",
    alt: "Exhibidor de griferías modernas en dorado cepillado, negro mate y gunmetal en el showroom",
  },
  {
    slug: "sanitarios",
    title: "Bañeras & Sanitarios",
    subtitle: "Tinas exentas Sottovento e inodoros",
    cta: "Ver Sanitarios",
    image: "/images/categories/baneras-sanitarios.jpg",
    alt: "Tina exenta arquitectónica modelo Sottovento blanco mate frente a revestimiento cálido tipo madera",
  },
  {
    slug: "lavamanos",
    title: "Muebles & Lavamanos",
    subtitle: "Cuencos estriados y bachas de apoyo",
    cta: "Ver Lavamanos",
    image: "/images/categories/muebles-lavamanos.jpg",
    alt: "Colección de lavamanos de apoyo artesanales en cerámica estriada, terrazo y piedra mineral sobre madera",
  },
] as const;

export const COLOR_SWATCHES = [
  {
    id: "esmeralda",
    name: "Esmeralda",
    shortName: "Esmeralda",
    size: "10×10 & 15×15 cm",
    hex: "#1e4a38",
    image: "/images/colors/esmeralda.jpg",
    caption: "Tono Esmeralda • Esmalte Vitrificado & Bordes Rústicos",
  },
  {
    id: "cobalto",
    name: "Cobalto",
    shortName: "Cobalto",
    size: "10×10 & 15×15 cm",
    hex: "#1f3a60",
    image: "/images/colors/cobalto.jpg",
    caption: "Tono Azul Cobalto • Esmalte Vitrificado & Bordes Rústicos",
  },
  {
    id: "vino",
    name: "Vino Tinto",
    shortName: "Vino",
    size: "10×10 & 15×15 cm",
    hex: "#8b1e1e",
    image: "/images/colors/vino.jpg",
    caption: "Tono Vino Tinto • Esmalte Vitrificado & Bordes Rústicos",
  },
  {
    id: "mostaza",
    name: "Mostaza",
    shortName: "Mostaza",
    size: "10×10 & 15×15 cm",
    hex: "#d97706",
    image: "/images/colors/mostaza.jpg",
    caption: "Tono Mostaza • Esmalte Vitrificado & Bordes Rústicos",
  },
  {
    id: "terracota",
    name: "Terracota",
    shortName: "Terracota",
    size: "10×10 & 15×15 cm",
    hex: "#c2410c",
    image: "/images/colors/terracota.jpg",
    caption: "Tono Terracota • Esmalte Vitrificado & Bordes Rústicos",
  },
] as const;

export const TESTIMONIALS = [
  {
    initials: "CR",
    author: "Carlos Rodríguez",
    role: "Desarrollador Residencial",
    quote:
      "Excelente variedad de porcelanatos. No tuvimos que viajar a Santo Domingo para conseguir porcelanatos rectificados formato 60×120 para nuestra villa en Juan Dolio. El servicio de Dally fue impecable.",
    accentClass: "bg-primary-container text-on-primary-container",
  },
  {
    initials: "LP",
    author: "Laura Peralta",
    role: "Propietaria • San Pedro",
    quote:
      "Compramos la tina Sottovento blanco mate y griferías doradas para dos baños principales. Llegó todo embalado de fábrica, intacto y en fecha acordada. Da gusto comprar en El Almacén.",
    accentClass: "bg-surface-container text-on-surface",
  },
  {
    initials: "MA",
    author: "Arq. Miguel Abreu",
    role: "Estudio Arquitectura Abreu & Asoc.",
    quote:
      "Como arquitecto valoro que tengan fichas técnicas impresas y muestras físicas para presentar a mis clientes. El showroom es súper espacioso, cómodo y tienen estacionamiento privado.",
    accentClass: "bg-surface-container-high text-on-surface-variant",
  },
] as const;

export const FAQS = [
  {
    icon: "local_shipping",
    question: "¿Tienen servicio de entrega a pie de obra en la región Este?",
    paragraphs: [
      "Sí, totalmente. Contamos con una flotilla logística propia y alianzas especializadas de transporte de carga para realizar despachos directos hasta la obra en San Pedro de Macorís, La Romana, Casa de Campo, Juan Dolio, Bayahíbe, Punta Cana, Bávaro y Santo Domingo.",
      "Coordinamos las entregas con el personal de recibo en sitio para asegurar la integridad de porcelanatos de gran formato y loza sanitaria delicada.",
    ],
  },
  {
    icon: "percent",
    question: "¿Ofrecen precios al por mayor y condiciones para constructoras?",
    paragraphs: [
      "Al ser importadores directos desde España e Italia sin intermediarios locales, ofrecemos escalas de precios diferenciadas por volumen (paletas completas o contenedores consolidados).",
      "Nuestra asesora comercial Dally Moreno elabora propuestas personalizadas con reservas de lote para garantizar que no existan variaciones de tonalidad (destonificación) a lo largo de las distintas etapas de construcción de su desarrollo residencial o turístico.",
    ],
  },
  {
    icon: "floor_lamp",
    question: "¿Puedo visitar el showroom para ver y tocar muestras físicas?",
    paragraphs: [
      "Absolutamente. Recomendamos a arquitectos y propietarios evaluar las piezas bajo la luz natural de nuestro showroom. Disponemos de vignettes de baño montados a escala 1:1 donde pueden probar alturas de grifería, texturas antideslizantes para áreas húmedas y cortes de losa.",
      "Además, facilitamos muestras de mano tipo paleta para que los diseñadores puedan presentarlas a sus clientes o contrastarlas directamente en obra.",
    ],
  },
  {
    icon: "build_circle",
    question: "¿Disponen de repuestos originales de grifería y asesoría técnica?",
    paragraphs: [
      "Sí. Brindamos respaldo y garantía para todas nuestras marcas oficiales (como las líneas IMEX y Corona). Mantenemos stock permanente de cartuchos cerámicos, aireadores, mangueras flexibles y empaquetaduras originales en nuestro almacén en San Pedro de Macorís.",
    ],
  },
] as const;

export interface ShowroomProject {
  id: string;
  location: string;
  fullLocation: string;
  regionFilter: "Punta Cana / Bávaro" | "La Romana" | "Santo Domingo" | "Costa Este";
  category: "Residencial" | "Comercial";
  spaceBadge: string;
  filterType: "Residencial" | "Comercial";
  title: string;
  area: string;
  areaValue: string;
  areaUnit: string;
  year: string;
  summary: string;
  fullDescription: string[];
  highlights: string[];
  materials: { label: string; href: string }[];
  productIds: string[];
  image: string;
  alt: string;
  /**
   * Proyecto de ejemplo (datos y fotos ilustrativos). Se muestra en desarrollo
   * con la etiqueta "Ejemplo" y se oculta en la build de producción.
   * Reemplázalo por una obra real y quita `draft` para publicarlo.
   */
  draft?: boolean;
}

/**
 * Los borradores se ven con `npm run dev`. En producción solo se publican si
 * se compila con NEXT_PUBLIC_SHOW_DRAFTS=1 (útil para revisar el diseño).
 */
export const SHOW_DRAFT_PROJECTS =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1";

export const SHOWROOM_PROJECTS: ShowroomProject[] = [
  {
    id: "villa-marina-juan-dolio",
    location: "Juan Dolio",
    fullLocation: "Juan Dolio, Rep. Dominicana",
    regionFilter: "Costa Este",
    category: "Residencial",
    spaceBadge: "Residencial de Lujo",
    filterType: "Residencial",
    title: "Villa Brisa Marina",
    area: "420 m² suministrados",
    areaValue: "420 m²",
    areaUnit: "suministrados en obra",
    year: "2025",
    summary:
      "Porcelanato Statuario Imperial 60×120 cm, tina exenta Sottovento blanco mate y grifería PVD oro cepillado.",
    fullDescription: [
      "Villa Brisa Marina fue concebida para integrar las áreas sociales interiores con las terrazas frente al mar mediante un pavimento continuo de baja absorción y junta rectificada milimétrica.",
      "Nuestro equipo técnico suministró 420 m² del mismo lote y calibre de Porcelanato Statuario Imperial 60×120 cm para el nivel social, mientras que en la suite principal se instaló la tina exenta Sottovento blanco mate acompañada de grifería IMEX en acabado PVD oro cepillado resistente al salitre costero.",
    ],
    highlights: [
      "Reserva de lote único garantizada para 420 m² sin variación de tono ni calibre.",
      "Acabados metálicos en tratamiento PVD anticorrosión aptos para ambientes frente al mar.",
      "Despacho programado por etapas directamente a pie de obra en Juan Dolio.",
    ],
    materials: [
      {
        label: "Porcelanato Statuario 60×120",
        href: "/catalogo/porcelanato-statuario-imperial",
      },
      {
        label: "Tina Sottovento",
        href: "/catalogo/tina-sottovento-blanco-mate",
      },
      {
        label: "Grifería Oro Cepillado",
        href: "/catalogo/griferia-monomando-gourmet-oro",
      },
    ],
    productIds: [
      "porcelanato-statuario-imperial",
      "tina-sottovento-blanco-mate",
      "griferia-monomando-gourmet-oro",
    ],
    image: "/images/hero/tina-sottovento-hero.jpg",
    alt: "Baño principal de Villa Brisa Marina con tina exenta Sottovento blanco mate y grifería dorada",
  },
  {
    id: "residencia-estancia-romana",
    location: "La Romana",
    fullLocation: "La Romana, Rep. Dominicana",
    regionFilter: "La Romana",
    category: "Residencial",
    spaceBadge: "Residencial de Lujo",
    filterType: "Residencial",
    title: "Residencia Los Almendros",
    area: "310 m² suministrados",
    areaValue: "310 m²",
    areaUnit: "suministrados en obra",
    year: "2025",
    summary:
      "Listón cerámico Roble Escandinavo 20×120 cm y baños equipados con lavamanos estriados Oval Fluted.",
    fullDescription: [
      "En Residencia Los Almendros se buscaba la calidez visual de la madera natural sin los problemas de dilatación o mantenimiento causados por la humedad tropical del Caribe.",
      "Se especificaron 310 m² de porcelanato español rectificado Roble Escandinavo 20×120 cm con textura sincronizada 3D Touch y clasificación antideslizante C2, complementado en los baños sociales y secundarios con lavamanos de apoyo Oval Fluted negro mate y columnas de ducha termostáticas.",
    ],
    highlights: [
      "Superficie porcelánica antideslizante e inmune a la humedad en áreas interiores y terrazas techadas.",
      "Instalación trabada al 20% con junta de 2 mm y mortero polimérico flexible.",
      "Equipamiento sanitario completo con grifería termostática de seguridad a 38 °C.",
    ],
    materials: [
      {
        label: "Roble Escandinavo 20×120",
        href: "/catalogo/porcelanato-roble-escandinavo-mate",
      },
      {
        label: "Lavamanos Oval Fluted",
        href: "/catalogo/lavamanos-oval-fluted-ranurado",
      },
      {
        label: "Ducha Termostática",
        href: "/catalogo/columna-ducha-termostatica-suecia",
      },
    ],
    productIds: [
      "porcelanato-roble-escandinavo-mate",
      "lavamanos-oval-fluted-ranurado",
      "columna-ducha-termostatica-suecia",
    ],
    image: "/images/products/porcelanato-roble-hd.jpg",
    alt: "Sala abierta con piso de porcelanato tipo madera Roble Escandinavo 20x120 cm",
  },
  {
    id: "atelier-gastronomico-spm",
    location: "San Pedro",
    fullLocation: "San Pedro de Macorís, Rep. Dominicana",
    regionFilter: "Costa Este",
    category: "Comercial",
    spaceBadge: "Comercial / Gastronomía",
    filterType: "Comercial",
    title: "Bistró & Café del Puerto",
    area: "145 m² suministrados",
    areaValue: "145 m²",
    areaUnit: "suministrados en obra",
    year: "2025",
    summary:
      "Revestimiento artesanal vidriado Colors of Life 15×15 cm en tonos terracota y grifería gourmet PVD.",
    fullDescription: [
      "Para el proyecto gastronómico Bistró & Café del Puerto, el estudio de diseño requería una barra protagonista con carácter artesanal mediterráneo y máxima higiene operativa frente a manchas y vapor.",
      "Se revistió el frente de barra y salpicadero principal con la colección cerámica esmaltada a 1,200 °C Colors of Life en formato 15×15 cm, integrando grifería monomando gourmet de alto tráfico y bachas esculturales Mineral Stone en los baños de comensales.",
    ],
    highlights: [
      "Esmalte vitrificado impermeable a grasas, ácidos cítricos y limpieza intensiva diaria.",
      "Combinación de cajas alternadas en obra para resaltar el matiz artesanal V3.",
      "Entrega inmediata desde nuestro almacén local en San Pedro de Macorís.",
    ],
    materials: [
      {
        label: "Colors of Life 15×15",
        href: "/catalogo/mural-artesanal-colors-of-life",
      },
      {
        label: "Grifería Gourmet PVD",
        href: "/catalogo/griferia-monomando-gourmet-oro",
      },
      {
        label: "Bacha Mineral Stone",
        href: "/catalogo/bacha-escultural-mineral-stone",
      },
    ],
    productIds: [
      "mural-artesanal-colors-of-life",
      "griferia-monomando-gourmet-oro",
      "bacha-escultural-mineral-stone",
    ],
    image: "/images/hero/editorial-color-backsplash.jpg",
    alt: "Salpicadero artesanal con baldosas vidriadas en tonos terracota y detalles en latón cepillado",
  },
  // PROYECTOS DE EJEMPLO (draft: true). Datos ilustrativos y fotos de
  // Unsplash para revisar el diseño con más de tres obras.
  // Se ocultan en producción. Sustitúyelos por obras reales y quita `draft`.
  {
    id: "ejemplo-apartamento-bavaro",
    draft: true,
    location: "Bávaro",
    fullLocation: "Bávaro · Punta Cana, Rep. Dominicana",
    regionFilter: "Punta Cana / Bávaro",
    category: "Residencial",
    spaceBadge: "Penthouse",
    filterType: "Residencial",
    title: "Apartamento Mirador Bávaro",
    area: "180 m² suministrados",
    areaValue: "180 m²",
    areaUnit: "suministrados en obra",
    year: "2026",
    summary:
      "Porcelanato tipo madera Roble Escandinavo 20×120 cm en áreas sociales, con baños equipados con inodoro Tornado Flush y ducha termostática.",
    fullDescription: [
      "Apartamento en piso alto con salida a terraza, donde se buscaba un piso cálido tipo madera que soportara la arena y la humedad de la costa sin mantenimiento.",
      "Se suministró porcelanato Roble Escandinavo 20×120 cm en sala, comedor y habitaciones, instalado a junta trabada, y se equiparon los dos baños con inodoros one-piece Tornado Flush y columnas de ducha termostáticas.",
    ],
    highlights: [
      "Piso continuo tipo madera sin dilatación ni mantenimiento en clima costero.",
      "Un solo lote de producción para toda la superficie, sin variación de tono.",
      "Entrega coordinada con la administración del edificio en Bávaro.",
    ],
    materials: [
      {
        label: "Roble Escandinavo 20×120",
        href: "/catalogo/porcelanato-roble-escandinavo-mate",
      },
      {
        label: "Inodoro Tornado Flush",
        href: "/catalogo/inodoro-one-piece-tornado-flush",
      },
      {
        label: "Ducha Termostática",
        href: "/catalogo/columna-ducha-termostatica-suecia",
      },
    ],
    productIds: [
      "porcelanato-roble-escandinavo-mate",
      "inodoro-one-piece-tornado-flush",
      "columna-ducha-termostatica-suecia",
    ],
    image: "/images/projects/ejemplo-apartamento-vista-mar.jpg",
    alt: "Sala de apartamento con piso tipo madera claro, panel de mármol oscuro y ventanal con vista al mar",
  },
  {
    id: "ejemplo-hotel-bayahibe",
    draft: true,
    location: "Bayahíbe",
    fullLocation: "Bayahíbe · La Romana, Rep. Dominicana",
    regionFilter: "La Romana",
    category: "Comercial",
    spaceBadge: "Comercial / Hotelería",
    filterType: "Comercial",
    title: "Hotel Boutique Arrecife",
    area: "12 baños equipados",
    areaValue: "12 baños",
    areaUnit: "equipados llave en mano",
    year: "2026",
    summary:
      "Bachas de piedra Mineral Stone, columnas de ducha termostáticas e inodoros one-piece para las habitaciones de un hotel boutique.",
    fullDescription: [
      "Hotel boutique de doce habitaciones que quería baños con materiales naturales y luz cálida, sin renunciar a piezas resistentes al uso diario de huéspedes.",
      "Cada baño se equipó con una bacha escultural Mineral Stone de acabado martillado, columna de ducha termostática y un inodoro one-piece Tornado Flush de bajo consumo.",
    ],
    highlights: [
      "Mismo equipamiento en las doce habitaciones, entregado en una sola fase.",
      "Duchas termostáticas que mantienen la temperatura estable para los huéspedes.",
      "Inodoros de doble descarga para reducir el consumo de agua del hotel.",
    ],
    materials: [
      {
        label: "Bacha Mineral Stone",
        href: "/catalogo/bacha-escultural-mineral-stone",
      },
      {
        label: "Ducha Termostática",
        href: "/catalogo/columna-ducha-termostatica-suecia",
      },
      {
        label: "Inodoro Tornado Flush",
        href: "/catalogo/inodoro-one-piece-tornado-flush",
      },
    ],
    productIds: [
      "bacha-escultural-mineral-stone",
      "columna-ducha-termostatica-suecia",
      "inodoro-one-piece-tornado-flush",
    ],
    image: "/images/projects/ejemplo-hotel-bano-piedra.jpg",
    alt: "Baño de hotel con lavabo de piedra tipo travertino, lámpara colgante de fibra y pared de listones de madera",
  },
  {
    id: "ejemplo-lobby-santo-domingo",
    draft: true,
    location: "Santo Domingo",
    fullLocation: "Piantini · Santo Domingo, Rep. Dominicana",
    regionFilter: "Santo Domingo",
    category: "Comercial",
    spaceBadge: "Comercial / Hotelería",
    filterType: "Comercial",
    title: "Lobby Torre Corporativa Piantini",
    area: "650 m² suministrados",
    areaValue: "650 m²",
    areaUnit: "suministrados en obra",
    year: "2026",
    summary:
      "Porcelanato pulido tipo mármol en gran formato para el lobby y baños comunes con lavamanos Oval Fluted y grifería gourmet.",
    fullDescription: [
      "Remodelación del lobby de una torre de oficinas con alto tránsito, donde se necesitaba el aspecto del mármol con la resistencia y el bajo mantenimiento del porcelanato.",
      "Se suministraron 650 m² de porcelanato Statuario Imperial pulido 60×120 cm para el lobby y pasillos, y se renovaron los baños comunes con lavamanos Oval Fluted y grifería monomando en acabado PVD.",
    ],
    highlights: [
      "Gran formato rectificado con junta mínima para un piso visualmente continuo.",
      "Absorción de agua menor a 0,1 %, apta para limpieza intensiva diaria.",
      "Despacho nocturno por fases para no interrumpir la operación de la torre.",
    ],
    materials: [
      {
        label: "Porcelanato Statuario 60×120",
        href: "/catalogo/porcelanato-statuario-imperial",
      },
      {
        label: "Lavamanos Oval Fluted",
        href: "/catalogo/lavamanos-oval-fluted-ranurado",
      },
      {
        label: "Grifería Gourmet PVD",
        href: "/catalogo/griferia-monomando-gourmet-oro",
      },
    ],
    productIds: [
      "porcelanato-statuario-imperial",
      "lavamanos-oval-fluted-ranurado",
      "griferia-monomando-gourmet-oro",
    ],
    image: "/images/projects/ejemplo-lobby-marmol.jpg",
    alt: "Lobby de doble altura con piso pulido tipo mármol gris, paneles de madera y sillones rojos",
  },
];

/** Proyectos que se publican (sin borradores en producción). */
export const VISIBLE_PROJECTS = SHOWROOM_PROJECTS.filter(
  (project) => SHOW_DRAFT_PROJECTS || !project.draft
);

export const SHOWROOM_ZONES = [
  {
    icon: "grid_view",
    tag: "Zona 01 • Superficies",
    title: "Galería de Paneles Giratorios 120 cm",
    description:
      "Compara a escala real vetas de mármol Calacatta, piedras sinterizadas y maderas cerámicas bajo iluminación cálida y neutra.",
  },
  {
    icon: "bathtub",
    tag: "Zona 02 • Wellness",
    title: "Vignettes de Baño Escala 1:1",
    description:
      "Ambientes completos con tinas exentas Sottovento, inodoros Tornado Flush y muebles de baño suspendidos listos para inspeccionar.",
  },
  {
    icon: "water_drop",
    tag: "Zona 03 • Hidráulica",
    title: "Laboratorio Técnico IMEX & Corona",
    description:
      "Expositores modulares para probar la ergonomía de monomandos extraíbles, columnas termostáticas y acabados PVD anticorrosión.",
  },
  {
    icon: "calculate",
    tag: "Zona 04 • Proyectos",
    title: "Mesa de Arquitectura y Cubicación",
    description:
      "Espacio privado con café recién hecho donde revisamos tus planos DWG/PDF, calculamos desperdicios y armamos tu moodboard de materiales.",
  },
] as const;
