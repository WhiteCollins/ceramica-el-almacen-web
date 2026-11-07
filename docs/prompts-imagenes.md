# Prompts para imágenes de ejemplo — Cerámica El Almacén

Imágenes de **ambiente** para banners (portada, espacios y tipos). Son ilustrativas:
no las uses como foto de un producto concreto del catálogo (ej. "Tina Sottovento"),
porque el cliente esperaría encontrar exactamente esa pieza en tienda.

Los prompts están en inglés porque los generadores (Midjourney, ChatGPT/DALL·E,
Gemini/Imagen, Flux, Firefly) responden mejor así.

---

## 1. Bloque de estilo (pégalo al final de cada prompt)

```
Architectural interior photography for a premium tile and bathroom showroom in the Dominican Republic.
Photorealistic, shot on a full-frame camera with a 24mm tilt-shift lens at f/8, straight verticals,
soft natural Caribbean daylight from a large window, warm neutral palette, realistic material textures
(visible porcelain veining, glaze reflections, brushed metal grain), clean and uncluttered styling,
high dynamic range, crisp detail, no people, no text, no logos, no watermarks, no brand names.
Main subject in the central third of the frame; keep the lower-left area calm and darker so white text
can sit on top.
```

## 2. Prompt negativo (si tu herramienta lo admite)

```
text, letters, logo, watermark, signature, people, hands, faces, distorted perspective, warped tiles,
melted fixtures, extra faucets, duplicated objects, cartoon, 3d render look, plastic look, oversaturated,
HDR halos, blurry, low resolution, fisheye
```

## 3. Formato de entrega

| Uso | Proporción | Tamaño mínimo | Parámetro Midjourney |
|---|---|---|---|
| Banner de portada y de espacio | 16:9 | 2400 × 1350 px | `--ar 16:9 --style raw` |
| Banner de tipo | 21:9 | 2520 × 1080 px | `--ar 21:9 --style raw` |

- JPG o WebP, idealmente menos de 600 KB (Next las optimiza igual).
- Nómbralas exactamente como en las tablas y pásamelas; yo las coloco en `public/images/banners/`.
- En móvil el banner se recorta por el centro: lo importante debe quedar en el tercio central.

---

## 4. Banners de portada y de espacio (4 imágenes, 16:9)

| Archivo | Prompt (+ bloque de estilo) |
|---|---|
| `espacio-pisos.jpg` | Wide view of a bright open-plan living room with a seamless large-format 60x120 cm polished white marble-look porcelain floor with soft grey veining and ultra-thin joints, low linen sofa, travertine coffee table, floor-to-ceiling glass doors opening to a tropical garden terrace with palms. |
| `espacio-paredes.jpg` | Kitchen backsplash wall fully covered in handmade glossy 15x15 cm zellige-style tiles in emerald green, with natural tone variation and irregular edges catching the light, light oak open shelf with ceramic bowls, white farmhouse sink below, travertine countertop. |
| `espacio-banos.jpg` | Serene master bathroom with an oval freestanding matte white bathtub, brushed gold floor-mounted bath filler, warm travertine-look large-format wall tiles, arched mirror, wooden stool with a folded towel, a potted palm. |
| `espacio-cocinas.jpg` | Close view of a modern kitchen corner with a brushed gold pull-down kitchen faucet over a matte black undermount sink, white quartz countertop, terracotta glazed tile backsplash softly out of focus, morning light. |

## 5. Banners de tipo (9 imágenes, 21:9)

| Archivo | Ruta | Prompt (+ bloque de estilo) |
|---|---|---|
| `tipo-pisos-tipo-marmol.jpg` | /pisos/tipo-marmol | Low-angle view across a polished Statuario-style marble-look porcelain floor in 60x120 cm slabs, dramatic grey veining, reflections of a large window, minimal living room in the background. |
| `tipo-pisos-tipo-madera.jpg` | /pisos/tipo-madera | Bright Caribbean living and dining room with a warm Scandinavian oak wood-look porcelain plank floor in 20x120 cm planks laid in a staggered pattern, white walls, rattan chairs, sliding doors to a terrace. |
| `tipo-paredes-artesanales.jpg` | /paredes/artesanales | Frontal close-up of a wall of handmade glossy square ceramic tiles in cobalt blue, emerald green, mustard yellow and wine red arranged in a random pattern, natural glaze variation, raking side light. |
| `tipo-paredes-gran-formato.jpg` | /paredes/gran-formato | Bathroom wall clad floor to ceiling in large-format 60x120 cm white marble-look porcelain slabs with continuous veining, floating walnut vanity, round backlit mirror. |
| `tipo-banos-sanitarios-y-tinas.jpg` | /banos/sanitarios-y-tinas | Minimal bathroom with a matte white freestanding tub and a sleek one-piece white toilet, warm wood-look wall tiles with indirect LED strip light, light stone floor. |
| `tipo-banos-lavamanos.jpg` | /banos/lavamanos | Floating light oak vanity with two sculptural vessel sinks, one fluted white ceramic and one textured natural stone, matte black wall-mounted faucets, round mirrors, soft daylight. |
| `tipo-banos-duchas.jpg` | /banos/duchas | Walk-in shower with a matte black thermostatic shower column and large rain head, dark grey slate-look porcelain wall tiles, frameless glass panel, built-in niche with towels. |
| `tipo-cocinas-griferia.jpg` | /cocinas/griferia | Detail shot of a brushed gold pull-down kitchen faucet with spray head over a matte black sink, droplets of water, white countertop, blurred warm kitchen background. |
| `tipo-cocinas-salpicaderos.jpg` | /cocinas/salpicaderos | Rustic-modern kitchen with a backsplash of glossy handmade terracotta and amber 15x15 cm tiles, brass utensil rail with copper pots, butcher-block countertop, white ceramic sink. |

---

## 6. Consejos

- Genera 3–4 variantes de cada una y quédate con la que tenga perspectiva recta y juntas
  de baldosa regulares (es lo que más delata una imagen generada).
- Revisa grifos y desagües: los generadores a veces duplican caños o mandos.
- Cuando tengas fotos reales del showroom u obras, sustituyen a estas: venden más.
