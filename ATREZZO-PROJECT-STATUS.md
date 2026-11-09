# ATREZZO PROJECT STATUS — THE WEDDING EXPERIENCE

Actualizado: 2026-11-09
Responsable de dirección: ATREZZO STUDIOS
Repositorio: https://github.com/atrezzostudiosv-spec/weedding-experience
Estado de publicación: NO PUBLICAR COMO SITIO OFICIAL
Fase actual: 04 — BASE TÉCNICA IMPLEMENTADA; VALIDACIÓN VISUAL Y FUNCIONAL PENDIENTE.

## Decisiones cerradas — no reabrir sin causa
- Propuesta comercial demostrativa, no web oficial de la clienta.
- Dirección artística: Romantic Editorial Cinematic — Black-Tie Edition.
- Paleta: blanco #FFFFFF predominante, negro #111111, dorado discreto #B59A60; 80/17/3 como orientación compositiva, no regla rígida.
- Idioma editorial: inglés.
- Páginas: Home, About, Services, Gallery, Contact.
- Narrativa de scroll concebida desde la arquitectura; scroll nativo, lectura libre, movimiento reducido y fallback sin JS.
- Partitura aprobada: Home (Hero + Expand + Cinematic Handoff); About (Editorial Layered Panels); Services (Guided Service Atlas); Gallery (Editorial Index + Photographic Lightbox); Contact (formulario estable).
- Navegación: Immersive Menu. Transición documental: VEIL. Botones primarios: Directional Wipe; secundarios: Editorial Underline.
- TODOS los componentes originales de COMPONENTES.zip están VISUALMENTE APROBADOS por el usuario, según ATREZZO-CORE-ESTADO-APROBACION.md de 2026-11-09. Las notas históricas de validación visual pendiente no revocan esa aprobación.

## Hechos comprobados
- GitHub existía vacío (0 archivos / 0 commits) antes de esta fase.
- Archivo COMPONENTES.zip inspeccionado: 12 ZIP internos; nueve familias centrales de motores originales y tres paquetes de proyectos o referencias.
- Motores centrales principales son CSS/JS nativos sin dependencias de runtime; hay diferencias reales de ciclo de vida entre motores y algunos auto-inicializan.
- Video entregado para posible Hero: MP4, H.264, 1920x1080, 25 fps, 10.56 segundos, aproximadamente 9.65 MB; licencia y derechos comerciales sin verificar.
- No se ha recuperado el contenido HTML/visual de la página histórica Wix desde el acceso disponible; su enlace es una referencia facilitada por el usuario.

## Preparación técnica efectuada
- Se decide arquitectura de salida HTML multipágina estática, mediante Astro SSG como herramienta de construcción, sin enrutador SPA ni hidratación de framework para los motores Atrezzo.
- Se documentan estructura de carpetas, carga selectiva de componentes, ciclo de vida, alcance de contenidos, QA y condiciones de publicación.
- No se copian previews, fotografías de otros clientes, fuentes de terceros ni ZIPs maestros al repositorio.
- Estado histórico de la Fase 03. Sustituido por el registro de avance Fase 04 al final del documento.

## Registro de fase
- FASE 01: AUDITORÍA ESTRATÉGICA — CERRADA.
- FASE 02: DIRECCIÓN ARTÍSTICA Y PARTITURA DE CINCO PÁGINAS — APROBADA POR EL USUARIO.
- FASE 03: PREPARACIÓN TÉCNICA DOCUMENTAL — CERRADA. Sin integración ni pruebas web.
- FASE 04: BASE ESTÁTICA, MOTOR DE NAVEGACIÓN, TRANSICIÓN, BOTONES Y HOME EXPAND — IMPLEMENTADOS; CI APROBADO; QA VISUAL PENDIENTE.
- FASE 05: QA RESPONSIVE / SCROLL / ACCESIBILIDAD — PENDIENTE.
- FASE 06: PRESENTACIÓN DE DEMO Y ACEPTACIÓN — PENDIENTE.
- FASE 07: PERSONALIZACIÓN CON DATOS REALES Y PUBLICACIÓN AUTORIZADA — BLOQUEADA.

## Bloqueos editoriales y legales
- Nombre comercial, servicios definitivos, ubicación y datos de contacto sin confirmar.
- Fotografías y video de demostración no acreditan eventos realizados por la clienta.
- No inventar testimonios, premios, experiencia, estadísticas, email, teléfono o casos.
- Formulario sin destino real: mostrar como demo no operativa y no simular envíos.
- El repositorio es público: no añadir material de terceros, credenciales, datos personales ni licencias no comprobadas.
- La URL Wix anterior no fue inspeccionada directamente: no declarar auditoría visual verificada.

## Próxima acción única
Ejecutar QA de navegador real sobre Home + navegación + transición en 375/768/1024/1440 px, teclado, reduced-motion, no-JS y scroll inverso. Resolver defectos antes de introducir nuevas escenas.


## Registro factual añadido — FASE 04 (2026-11-09, último commit de integración: 4344bfeefd)

- Implementado código Astro SSG para Home, About, Services, Gallery y Contact.
- Integrados exactamente los 9 archivos originales de los motores Navigation 01, Transitions 01 (incluido preflight), Buttons 01 y Scroll Sections 01. Comprobados hashes Git del repositorio contra archivos fuente locales: IDÉNTICOS BYTE A BYTE.
- Cargados selectivamente: Scroll Sections 01 solo en Home; navegación, VEIL y Buttons en todas las rutas.
- Implementados tokens #FFFFFF, #111111, #B59A60; rutas con base /weedding-experience/ y robots noindex,nofollow.
- Hero actual: foto de Unsplash registrada. El video aportado NO se ha subido ni integrado por derechos de uso pendientes.
- Home: elemento estructural Scroll Sections Expand con inicialización explícita y contenido semántico sin JS. Handoff todavía no implementado.
- About, Services, Gallery y Contact: cimientos editoriales navegables; los motores Layered, Atlas, Gallery Index y Lightbox aún NO están integrados.
- Contact: formulario de demostración visiblemente deshabilitado; no hay envío a backend.
- GitHub Actions ejecución 42620422540 (commit 4344bfeefd): PASS en npm install, source check y Astro build + dist check.
- No se han ejecutado ni certificado todavía pruebas reales de navegador, visual responsive, imágenes en red, teclado, transiciones, scroll inverso o movimiento reducido.
- No se ha realizado despliegue en GitHub Pages ni publicación como web oficial.

**Estado de componentes:** aprobados visualmente por el usuario; integración en Wedding: compilación estática verificada, comportamiento visual/funcional EN VALIDACIÓN.


## Control QA adicional (2026-11-09)
- GitHub Actions 42620841313: SUCCESS, artefacto Astro construido.
- Inspección HTML estática del artefacto: 5 páginas con H1, robots noindex y 0 enlaces/archivos locales rotos; 9 JS originales con `node --check` PASS.
- Prueba renderizada de navegador: NO REALIZADA porque el navegador del entorno bloqueó navegación a localhost con `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Sin intentar eludir la restricción.
- Evidencias, límites y trabajo pendiente: [docs/PHASE04-QA-RESULTS.md](docs/PHASE04-QA-RESULTS.md).


## PREVIEW GITHUB PAGES — ACTIVADO Y DESPLEGADO (2026-11-09)
- El usuario habilitó GitHub Pages con `main` como fuente.
- La primera ejecución de `pages build and deployment` falló por intentar procesar el código fuente Astro con Jekyll (`Invalid YAML front matter in src/layouts/SiteLayout.astro`); no era un error de compilación Astro.
- Se incluyeron en la raíz de `main` los 5 documentos HTML compilados, el CSS generado y nueve archivos originales Atrezzo Core; se añadió `.nojekyll` para servir estáticos sin Jekyll.
- Commit de publicación: `c9d78ec25e226440ee9bd93c4c1276238979a76f`.
- GitHub Pages run `42645049876`: **SUCCESS** (build+deploy); URL confirmada por log: https://atrezzostudiosv-spec.github.io/weedding-experience/
- Build de fuente CI run `42645051155`: **SUCCESS**.
- **La publicación del preview NO significa que el sitio esté aprobado visualmente, ni constituye una web oficial de la clienta.** Están pendientes QA de scroll, menú, tamaños 375/768/1024/1440, imágenes externas, accesibilidad y las escenas posteriores.
- Por configuración `main/(root)`, el preview sirve una copia del `dist/` compilado en la raíz. Los cambios en `src/` NO actualizan el preview por sí solos. Cada release futuro debe compilar Astro y sincronizar el build en la raíz o migrar explícitamente GitHub Pages a GitHub Actions antes de eliminar los archivos estáticos.
- Continúa el `noindex,nofollow,noarchive` en las cinco rutas y las advertencias de contenido demostrativo; evitar enlace comercial como sitio oficial.
