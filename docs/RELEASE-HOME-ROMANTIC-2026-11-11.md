# Romantic Editorial Home — Preview Release

Fecha: 2026-11-11

Estado: DEMO TÉCNICA, no web oficial de la clienta.

## Publicación
- Integrada la revisión aprobada de Home en `main`.
- El build de Astro compilado se sincroniza automáticamente a la raíz del repositorio para GitHub Pages.
- Confirmado que `index.html` en `main` incluye `romance-collage`, `romance-possibilities` y `romance-editorial`.
- Se conserva Navigation 01, VEIL, Buttons 01, Scroll Sections Expand original y el vídeo hero sin texto.
- Contenido e imágenes ilustrativos y provisionales, no presentados como eventos realizados por la clienta.

## Límites del estado
- QA de compilación GitHub Actions: aprobado.
- QA visual en navegadores reales: pendiente (375, 768, 1024, 1440px; desplazamiento inverso; movimiento reducido; teclado).
- El formulario sigue en modo demostración sin destino real; no simular envío.
- No publicar como página comercial oficial hasta contar con aprobación y medios/licencias verificados.

## Instrucción para siguientes cambios
- Editar `src/` y dejar que `.github/workflows/ci.yml` construya y sincronice `dist/` en la raíz.
- Nunca dar por visible una modificación de `src/pages/index.astro` sin comprobar la salida compilada en `index.html` y el despliegue de Pages.
