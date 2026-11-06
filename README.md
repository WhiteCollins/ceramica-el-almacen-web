# Cerámica El Almacén — Sitio Web Oficial

Aplicación web construida en **Next.js (App Router) + TypeScript + Tailwind CSS** basada en el sistema de diseño **Atelier Porcelánico** exportado desde Google Stitch (`Project ID: 783291277896383907`).

## Ejecución en Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en tu navegador.

## Páginas Incluidas

- `/` — **Inicio:** Hero arquitectónico, categorías principales, paleta artesanal *“El color lo cambia a todo”*, ventajas competitivas, asesoras en showroom, reseñas de Google (4.5/5) y mapa de San Pedro de Macorís.
- `/catalogo` — **Catálogo & Colecciones:** Buscador en vivo (`<search>`), filtros combinables por categoría, acabado y formato, fichas técnicas en `<dialog>` nativo y solicitud de kit de muestras físicas.
- `/showroom` — **Showroom & Proyectos:** Recorrido por las 4 zonas de exhibición 1:1, portafolio de obras suministradas en Juan Dolio, La Romana y San Pedro de Macorís, y calculadora interactiva de m², cajas y mortero.
- `/contacto` — **Contacto & Cotización:** Tarjetas directas de las asesoras **Dally Moreno** y **Margarita Báez**, cotizador formal con envío estructurado por WhatsApp / correo electrónico, rutas de llegada y preguntas frecuentes.

## Edición Rápida de Contenidos

- `src/data/catalog.ts` — Agrega, edita o actualiza productos, códigos SKU, medidas, origen y especificaciones técnicas.
- `src/data/site.ts` — Actualiza teléfonos, WhatsApp (`+1 809-246-2221`), horarios, datos de asesoras, proyectos destacados y preguntas frecuentes.
- `stitch/` — Respaldo íntegro de las 8 pantallas exportadas desde Google Stitch (`screens/*.png`, `screens/*.html`, `DESIGN.md`, `project.json` y `assets/` en alta resolución).
