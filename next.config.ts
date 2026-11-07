import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // /catalogo se renderiza por petición; sin esto Next 15 transmite title y
  // meta description al final del <body> para algunos agentes (Googlebot
  // incluido). Con /.*/ los metadatos van siempre en el <head>.
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
