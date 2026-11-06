/**
 * Datos generales de Cerámica El Almacén SRL.
 * Edita este archivo para actualizar teléfonos, horarios, asesoras, reseñas o preguntas frecuentes.
 */

export const SITE_INFO = {
  name: "Cerámica El Almacén",
  legalName: "Cerámica El Almacén SRL",
  tagline: "La Perfección en Cerámica",
  description:
    "Importadores directos de porcelanatos europeos de gran formato, revestimientos cerámicos, griferías de autor, bañeras exentas y lavamanos escultóricos en San Pedro de Macorís, República Dominicana.",
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
    full: "Av. Rolando Martínez 33, San Pedro de Macorís 21000, República Dominicana",
  },
  mapsUrl:
    "https://maps.google.com/?q=Av.+Rolando+Mart%C3%ADnez+33,+San+Pedro+de+Macor%C3%ADs",
  wazeUrl:
    "https://waze.com/ul?q=Ceramica+El+Almacen+San+Pedro+de+Macoris",
  hours: {
    weekdays: "Lunes a Viernes: 8:00 AM – 6:00 PM",
    saturday: "Sábados: 8:30 AM – 1:00 PM",
    sunday: "Domingos: Cerrado (Atención Previa Cita)",
  },
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

export const SHOWROOM_PROJECTS = [
  {
    id: "villa-marina-juan-dolio",
    location: "Juan Dolio • Costa Caribe",
    category: "Residencial de Lujo",
    title: "Villa Brisa Marina",
    area: "420 m² suministrados",
    summary:
      "Integración continua de porcelanato español Statuario Imperial 60×120 cm en áreas sociales y suite principal con tina exenta Sottovento blanco mate y grifería PVD oro cepillado.",
    materials: [
      "Porcelanato Statuario Imperial 60×120",
      "Tina Sottovento 170×75 cm",
      "Grifería IMEX Oro Cepillado",
    ],
    image: "/images/hero/tina-sottovento-hero.jpg",
    alt: "Baño principal de Villa Brisa Marina con tina exenta Sottovento blanco mate y grifería dorada",
  },
  {
    id: "residencia-estancia-romana",
    location: "La Romana • Región Este",
    category: "Arquitectura Interior",
    title: "Residencia Los Almendros",
    area: "310 m² suministrados",
    summary:
      "Pisos continuos en listón cerámico Roble Escandinavo 20×120 cm resistentes a la humedad tropical, combinados con baños de visitas equipados con lavamanos estriados Oval Fluted.",
    materials: [
      "Porcelanato Roble Escandinavo 20×120",
      "Lavamanos Oval Fluted Negro Mate",
      "Columna Ducha Termostática Suecia",
    ],
    image: "/images/products/porcelanato-roble-escandinavo.jpg",
    alt: "Sala abierta con piso de porcelanato tipo madera Roble Escandinavo 20x120 cm",
  },
  {
    id: "atelier-gastronomico-spm",
    location: "San Pedro de Macorís",
    category: "Comercial & Hospitalidad",
    title: "Bistró & Café del Puerto",
    area: "145 m² suministrados",
    summary:
      "Barra principal y frente de cocina revestidos con cerámica vidriada artesanal Colors of Life en tonos terracota y ámbar, acompañada de grifería gourmet de alto tráfico.",
    materials: [
      "Mural Artesanal Colors of Life 15×15",
      "Grifería Monomando Gourmet PVD",
      "Bacha Escultural Mineral Stone",
    ],
    image: "/images/hero/editorial-color-backsplash.jpg",
    alt: "Salpicadero artesanal con baldosas vidriadas en tonos terracota y detalles en latón cepillado",
  },
] as const;

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
