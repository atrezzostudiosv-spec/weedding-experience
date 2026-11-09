# THE WEDDING EXPERIENCE — RESULTADOS QA FASE 04

Fecha: 2026-11-09
Tipo: inspección real del artefacto Astro compilado + auditoría estática. NO equivale a aprobación visual.

## Compilación verificada
- GitHub Actions run [42620841313](https://github.com/atrezzostudiosv-spec/weedding-experience/actions/runs/42620841313): SUCCESS.
- Pasos: npm install, npm run check:source, npm run build, subida de artefacto: SUCCESS.
- Artefacto: wedding-phase04-static-build; ID GitHub 13676506417. Se recuperó y examinó como ZIP.
- Compilador produce 5 páginas HTML: /, /about/, /services/, /gallery/, /contact/.
- No se ha realizado despliegue ni activado GitHub Pages.

## Auditoría estática local del HTML compilado — PASS
Analizador HTML BeautifulSoup + rutas generadas por Astro:
| Página | H1 | robots noindex,nofollow,noarchive | Enlaces locales internos | Enlaces rotos | CSS/JS locales ausentes |
|---|---|---|---:|---:|---:|
| Home | Some moments stay forever. | Sí | 15 | 0 | 0 |
| About | An eye for the meaningful. | Sí | 14 | 0 | 0 |
| Services | Thoughtfully celebrated. | Sí | 14 | 0 | 0 |
| Gallery | The beauty of being together. | Sí | 14 | 0 | 0 |
| Contact | Tell us about your moment. | Sí | 13 | 0 | 0 |

- Se verificó que los recursos locales del HTML tienen ruta real en el artefacto y que el prefijo `/weedding-experience/` está aplicado.
- `node --check` a los nueve JS originales: PASS para todos los archivos JavaScript.
- La comparación Git blob SHA1 contra los originales de COMPONENTES.zip para los nueve motores es idéntica.
- HTML Home incluye data-ats-effect="expand". Contact tiene botón de envío de demostración expresamente deshabilitado.
- Media externas en Unsplash: disponibilidad, derecho de imagen específico, recorte y red no verificados por estas pruebas.

## Pruebas visuales reales — NO EJECUTADAS
- Se intentó abrir la compilación mediante navegador automatizado local; el runtime devolvió `net::ERR_BLOCKED_BY_ADMINISTRATOR` al navegar a localhost.
- **No se intentó eludir ese control de seguridad**. No existe evidencia de captura del website renderizado.
- Quedan pendientes QA visual real a 375/768/1024/1440 px, menú con teclado, modal (aún no integrado), preferencia reduced-motion, scroll inverso, diferentes navegadores, zoom 200%, imágenes externas y video.
- No se debe afirmar que el sitio ha sido visualmente certificado o que ya está publicado.

## Alcance implementado a la fecha
- Se ha construido un **esqueleto HTML multipágina funcional a nivel compilación** y los motores globales Nav/VEIL/Buttons + Expand Home con sus orígenes íntegros.
- Las otras páginas todavía tienen contenido base temporal, sin los motores cinematográficos aprobados de su respectiva partitura. Home aún no incluye Handoff 02. Esto es trabajo pendiente, NO declaración de que el diseño total está finalizado.
- No se incluyó video Hero por derechos pendientes. La foto de Hero es recurso de referencia registrado y no se atribuye como obra de la clienta.

## Próxima secuencia de control
1. QA visual de Home, Navigation, Buttons, VEIL, Expand, reduced motion y no-JS en un navegador permitido.
2. Resolver defectos reproducibles sin alterar la aprobación visual del motor original.
3. Completar las escenas Handoff / About Layered / Services Atlas / Gallery Editorial Index + Lightbox, en ese orden, con QA por escena.
4. Formulario real solo cuando exista destino confirmado y autorización; publicación oficial solo con contenido/licencias aprobados.
