# MATRIZ TÉCNICA DE COMPONENTES — WEDDING EXPERIENCE

Fuente: COMPONENTES.zip, inspección de paquetes el 2026-11-09.
Precedencia: ATREZZO-CORE-ESTADO-APROBACION.md. TODOS los componentes originales entregados están VISUALMENTE APROBADOS; la implementación de Wedding permanece SIN PROBAR.
No copiar HTML autónomo, CSS de preview, recursos demo o contenido de terceros.

| Página / propósito | Paquete exacto | Archivos de producción | Arranque / selector | Estado integración |
|---|---|---|---|---|
| Todas: navegación | Atrezzo_Navigation_01_COMPLETO.zip | src/atrezzo-navigation-01.css + .js | window.ATREZZO_NAVIGATION_01.init(root), auto-init documento | Pendiente |
| Todas: cambio de página VEIL | ATREZZO_TRANSITIONS_01_COMPLETO.zip | src/atrezzo-transitions.css + .js + atrezzo-preflight.js | new AtrezzoTransitions({defaultEffect:'veil',coverColor:'#111111',showLabel:false}); a[data-atz-link] | Pendiente |
| Todas: CTA | ATREZZO_BUTTONS_01_LUXURY_INTERACTIONS_COMPLETO.zip | assets/css/atrezzobuttons-01.css + assets/js/atrezzobuttons-01.js | [data-ab-directional] y enlaces Editorial Underline, JS auto ejecutado | Pendiente |
| Home: foto Expand | Atrezzo_Scroll_Sections_01.zip | src/atrezzo-scroll-sections.css + .js | window.AtrezzoScrollSections.init(.ats-scope); escena data-ats-effect="expand" | Pendiente |
| Home: cambio de foto Handoff | Atrezzo_Scroll_Sections_02.zip | src/atrezzo-scroll-sections-02.css + .js | window.AtrezzoScrollSections02.init(.ats2-scope); data-ats2-effect="handoff" | Pendiente |
| About: Editorial Layered Panels | Atrezzo_Scroll_Sections_03_COMPLETO.zip | assets/css/sticky-sections-03.css + assets/js/sticky-sections-03.js | auto-init sobre [data-ss03]; .ss03--panel | Pendiente |
| Services: Guided Service Atlas | Atrezzo_Service_Showcase_01_COMPLETO.zip | assets/css/atrezzo-service-showcase.css + assets/js/atrezzo-service-showcase.js | auto-init, API window.AtrezzoServiceShowcase.init(root); [data-atz-service-showcase] + [data-atz-atlas] | Pendiente |
| Gallery: Editorial Index | Atrezzo_Editorial_Gallery_01_COMPLETO.zip | src/atrezzo-editorial-gallery-01.css + .js | window.AtrezzoEditorialGallery01.init(.atg1); .atg1-index | Pendiente |
| Gallery: Photographic Lightbox | Atrezzo_Modals_01_COMPLETO.zip | assets/css/modals-01.css + assets/js/modals-01.js | auto IIFE en carga; [data-atm-open="lightbox"] y #atm-lightbox | Pendiente |
| Contact: formulario | NO EXISTE FORMS 01 en ZIP entregado | Se implementará formulario semántico propio, sin inventar envíos | submit real SOLO después de conectar destino | Pendiente |

## Reglas especiales de integración
1. Navigation 01, Modals 01, Buttons 01, Sticky Sections 03 y Service Showcase 01 contienen inicializaciones automáticas (según fuente inspeccionada); no ejecutar dos veces sin comprobar API.
2. Scroll Sections 01/02 y Editorial Gallery 01 requieren inicialización explícita después de existir el DOM.
3. Transitions 01 requiere preflight temprano y constructor tardío; no aplicar a enlaces externos, mailto, tel, anclas, descargas ni enlaces modificados.
4. Usar rutas correctas con base del repositorio al probar en GitHub Pages. No utilizar rutas absolutas a dominio raíz por defecto.
5. Del Atlas mantener correspondencia exacta entre artículos, fotografías y botones. En móvil su sticky se desactiva y la imagen aparece dentro del artículo.
6. Gallery 01 Editorial Index usa fotografía sticky en desktop, flujo lineal en móvil. Modal Photographic Lightbox actual está concebido para una galería por documento y un ID #atm-lightbox.
7. El HTML de preview autónomo no es la plantilla de producción: copiar ÚNICAMENTE la sección pertinente de los ejemplos de integración y los motores correctos.
8. El componente original no incluye una biblioteca genérica de formularios en el ZIP: no inventar la existencia de Forms 01 ni tomar formularios de otro cliente.
9. Para Gallery y servicios, preservar correspondencia de items/fotos/IDs y comprobar enlaces reales y alt.
10. Todos los colores de demostración deben ser reemplazados por los tokens Black-Tie aprobados mediante variables de estilo documentadas, sin alterar el motor.

## No incluidos deliberadamente en la partitura
- Scroll 01 Split y Sequence; Scroll 02 Filmstrip y Depth; Scroll 03 Full-Bleed y Split; Service Showcase Focus Stage y Immersive Bands.
- Gallery Contact Sheet y Perspective Slider; Modals Editorial Detail y Guide Drawer.
- Transitions SPLIT e IRIS; Navigation Chapter Rail y Context Dock; Buttons Bubble Arrow, Magnetic Orbit y Character Stagger.
Estos componentes siguen aprobados, pero NO se cargan por defecto. No añadir efectos por completar catálogo.

## Dependencias, fuente y límites
- Los motores centrales descritos utilizan JavaScript y CSS propios sin GSAP, Lenis, React o npm en runtime.
- ELEGANT_MASSAGE_01_HERO_ARCHIVOS.zip, ELEGANT_MASSAGE_02_SCROLL_SECCIONES_ORIGINALES.zip y ELITE_REAL_ESTATE_ARCHIVO_20261104_084844.zip son paquetes de proyecto/referencia; no copiarlos al nuevo sitio.
- Ningún QA de Wedding está realizado; las pruebas documentadas dentro de ZIP se refieren a demos originales y no certifican esta integración.
