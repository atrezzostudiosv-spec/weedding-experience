# ATREZZO PROJECT STATUS — THE WEDDING EXPERIENCE

Actualizado: 2026-11-09
Responsable de dirección: ATREZZO STUDIOS
Repositorio: https://github.com/atrezzostudiosv-spec/weedding-experience
Estado de publicación: NO PUBLICAR COMO SITIO OFICIAL
Fase actual: 03 — PREPARACIÓN TÉCNICA DOCUMENTADA. SIGUIENTE: BOOTSTRAP E INTEGRACIÓN CONTROLADA.

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
- No se ha programado ninguna página, instalado dependencias, publicado una demo ni ejecutado QA de integración del nuevo sitio.

## Registro de fase
- FASE 01: AUDITORÍA ESTRATÉGICA — CERRADA.
- FASE 02: DIRECCIÓN ARTÍSTICA Y PARTITURA DE CINCO PÁGINAS — APROBADA POR EL USUARIO.
- FASE 03: PREPARACIÓN TÉCNICA DOCUMENTAL — CERRADA. Sin integración ni pruebas web.
- FASE 04: BASE ESTÁTICA + INTEGRACIÓN DE COMPONENTES — PENDIENTE.
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
Construir el esqueleto Astro SSG multipágina y migrar SOLO el motor necesario para la navegación y la primera escena del Home, desde fuentes originales exactas de COMPONENTES.zip. Integrar sin rediseñar el componente, registrar cada archivo y validar viewport, teclado, reduced-motion y sin JS antes de avanzar al resto.
