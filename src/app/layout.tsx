import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_INFO } from "@/data/site";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ceramicaelalmacen.com"),
  title: {
    default: `${SITE_INFO.name} | Porcelanatos, Griferías & Baños en San Pedro de Macorís`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.description,
  keywords: [
    "Cerámica El Almacén",
    "porcelanatos República Dominicana",
    "porcelanato 60x120 San Pedro de Macorís",
    "grifería IMEX",
    "tina Sottovento",
    "baños y acabados Región Este",
    "importadores de cerámica España Italia",
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
  openGraph: {
    title: `${SITE_INFO.name} — ${SITE_INFO.tagline}`,
    description: SITE_INFO.description,
    locale: "es_DO",
    type: "website",
    siteName: SITE_INFO.legalName,
    images: [
      {
        url: "/images/hero/tina-sottovento-hero.jpg",
        width: 1200,
        height: 900,
        alt: "Showroom Cerámica El Almacén — Tina Sottovento y acabados europeos",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  name: SITE_INFO.legalName,
  description: SITE_INFO.description,
  telephone: SITE_INFO.phoneDisplay,
  email: SITE_INFO.email,
  url: "https://ceramicaelalmacen.com",
  sameAs: [SITE_INFO.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_INFO.address.street,
    addressLocality: SITE_INFO.address.city,
    postalCode: SITE_INFO.address.postalCode,
    addressCountry: "DO",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:30",
      closes: "13:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "248",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${notoSerif.variable} ${plusJakarta.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-on-primary focus:px-4 focus:py-3 focus:min-h-[44px] focus:inline-flex focus:items-center focus:rounded font-label-md text-label-md shadow-md"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main
          id="contenido-principal"
          className="w-full bg-surface min-h-[calc(100vh-20rem)]"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
