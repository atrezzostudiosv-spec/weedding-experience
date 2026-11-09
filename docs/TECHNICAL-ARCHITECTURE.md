# THE WEDDING EXPERIENCE — ARQUITECTURA TÉCNICA ATREZZO

Fecha de decisión: 2026-11-09
Estado: arquitectura técnica preparada; implementación aún no comenzada.

## Elección técnica
- Sitio estático MULTIPÁGINA con Astro SSG utilizado exclusivamente como herramienta de composición/build.
- Salida final: documentos HTML independientes, CSS y JavaScript nativos. Sin SPA, router cliente, scroll suave global, Lenis, GSAP, ScrollTrigger ni animaciones de framework.
- Los motores originales de Atrezzo se integran sin alterar su algoritmo o estructura; se adaptan solo tokens, contenido, imágenes, enlaces e identificadores conforme a sus guías.
- Alojamiento pendiente de decidir; el proyecto debe funcionar en GitHub Pages bajo subruta del repositorio o bajo dominio propio mediante una configuración de base coherente. No publicar sin autorización.

## Árbol planificado — NO EXISTE TODAVÍA
/
  astro.config.mjs
  package.json
  src/
    layouts/SiteLayout.astro
    pages/index.astro
    pages/about.astro
    pages/services.astro
    pages/gallery.astro
    pages/contact.astro
    styles/tokens.css
    styles/global.css
    styles/layout.css
    content/demo-content.ts
    components/AtrezzoPageShell.astro
  public/
    atrezzo-core/css/               # archivos de producción seleccionados
    atrezzo-core/js/                # archivos de producción seleccionados
    assets/images/                  # solo imágenes licenciadas para demo
    assets/video/                   # solo cuando el uso sea acreditado
  docs/
    COMPONENT-INTEGRATION-MATRIX.md
    CONTENT-ASSET-REGISTER.md
    QA-RELEASE-GATES.md
  ATREZZO-PROJECT-STATUS.md

## Sistema de tokens aprobado para la propuesta
- --w-white: #FFFFFF
- --w-black: #111111
- --w-gold: #B59A60
- Tonos auxiliares solo si son necesarios para contraste; NO asumir dorado sobre blanco como color de texto accesible.
- White dominant / black structural / gold accent, aproximadamente 80/17/3 por equilibrio editorial.
- Fuentes definitivas NO seleccionadas ni autorizadas; priorizar fallback serif editorial y sans neutral hasta confirmar licencia de tipografías.

## Flujo de página
1. Astro compone HTML semántico completo en build; contenido y enlaces existen sin JS.
2. Layout comparte header, footer, metadatos, enlaces y estructura.
3. Cada página carga EXCLUSIVAMENTE los CSS/JS Atrezzo de los patrones que utiliza; Nav y Transitions se cargan desde el layout común.
4. Preflight de Transitions se ejecuta en HEAD; AtrezzoTransitions se instancia una sola vez al final del BODY, después de existir el DOM.
5. La navegación es documental con enlaces reales. Solo enlaces internos same-origin apropiados incorporan data-atz-link y efecto veil.
6. Componentes scroll con API init se inician después de insertar su contenedor y se gestionan sin instancias duplicadas.
7. Componentes de auto-inicialización se cargan una vez por documento. No llamarlos adicionalmente sin revisar su fuente.
8. El formulario será HTML semántico. No activar success falso; hasta conectar destino, será una demostración claramente no funcional.

## Contratos técnicos
- No importar estilos preview/showroom o HTML autónomo con Base64 a la web.
- No importar recursos de otros clientes. En demos: fotografías con permiso explícito y origen registrado.
- Un único controlador de transiciones; sin segundo motor de scroll global.
- No aplicar transform/overflow a ancestros sticky sin prueba de compatibilidad.
- Video Hero: poster real, carga diferida/controlada, muted playsinline si es autoplay, fallback estático y video desactivable cuando sea pertinente. Mantener H1 HTML fuera del video.
- Responsive plan: 375, 768, 1024, 1440 px; respetar la adaptación móvil propia de cada motor.
- Con prefers-reduced-motion el flujo debe seguir siendo comprensible; sin JavaScript deben existir textos, imágenes y navegación.
- SEO de demo: noindex,nofollow en las páginas públicas mientras no haya autorización; esto NO sustituye controles de privacidad. Evitar información SEO local inventada.
- La demo pública no es web oficial. Mantener señalamiento editorial discreto en la presentación/demostración, sin alterar identidad visual.
- Contenido provisional centralizado en registro editorial para cambios sin tocar motores.
- GitHub es fuente de verdad de código y decisiones, no publicar materiales fuente maestros de 383 MB.

## Dependencias y licencia
- Los nueve motores centrales examinados no necesitan dependencias de ejecución de terceros.
- Astro/Node será solo dependencia de build cuando se inicie la siguiente fase; elegir/pinear versiones al generar package-lock y probar.
- Licencias fotográficas, de video, tipografías y de paquetes históricos o Codrops de referencia son ajenas a la aprobación visual de Atrezzo; comprobar antes de copiar/publicar.
- No usar ELEGANT_MASSAGE ni ELITE_REAL_ESTATE como contenido visual, nombre, texto, fuente o licencia del Wedding Planner.

## Política de control
Cambiar exclusivamente la integración de cada patrón. Un fallo reproducible se registra en ATREZZO-PROJECT-STATUS.md con ruta, viewport, evidencia, causa y resolución. No reinterpretar la aprobación original de la biblioteca.
