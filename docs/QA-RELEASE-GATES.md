# PLAN DE CONTROL DE CALIDAD Y GATES DE PUBLICACIÓN

Fecha: 2026-11-09. Estado: PLANIFICADO; NO EJECUTADO.
No confundir pruebas de los previews originales con pruebas realizadas sobre Wedding Experience.

## Matriz mínima de validación real
| Área | Prueba exigida | Evidencia que debe registrarse |
|---|---|---|
| Viewport | 375, 768, 1024, 1440 px y altura reducida | Capturas por página + ausencia de overflow |
| Navegación | enlaces de menú, logo, CTA, footer y rutas internas | Lista de URL/respuestas y recorrido Home→About→Services→Gallery→Contact |
| Transiciones | VEIL mismo origen, back/forward, apertura en pestaña nueva, teclado | Video o capturas secuenciales y consola |
| Scroll | arriba/abajo, rápido, reversa, ancla profunda, refresco a mitad | Video de Home/About/Services/Gallery por desktop y móvil |
| Sticky | ancestros sin transform/overflow conflictivos; footer y fixed header libres | Capturas de límites de escena |
| Lectura | textos permanecen legibles durante zoom/reveal | Inspección visual a velocidad de desplazamiento normal y rápida |
| Movimiento reducido | emulación prefers-reduced-motion: reduce | Video/capturas por página |
| Sin JavaScript | navegación y todo el contenido comercial visible | Capturas/caso de prueba |
| Teclado | Tab, Shift+Tab, Enter, Space, Escape, flechas en menús y lightbox | Registro de foco y resultados |
| Accesibilidad | jerarquía H1/H2, alt, etiquetas, contraste, focus-visible, zoom 200% | Reporte manual + automatizado |
| Media | autoplay muted playsinline, poster, no CLS y permisos de uso | Registros de red/asset y licencia |
| Rendimiento | Core Web Vitals, carga rápida, imágenes optimizadas, scripts por página | Lighthouse/Web Vitals con fecha y entorno |
| Formulario | validaciones, consentimiento aplicable, entrega real y errores, antispam | Pruebas de envío solo tras conectar destino |
| SEO demo | noindex y metadatos honestos, URLs canónicas correctas, sin SEO local falso | HTML y prueba de ruta |
| Integridad | JS sin errores, 404 inexistentes, assets base path, pruebas Safari/iOS | Log de consola/red y QA manual por navegador |

## Criterios obligatorios antes de mostrar la demo al cliente
- Ningún CTA inerte ni enlace a página inexistente.
- Ningún texto afirmando falsamente que es la web oficial o que la clienta realizó bodas de fotografías ilustrativas.
- Sin contenido imprescindible que aparezca solo después de una animación.
- Los efectos no secuestran rueda/touch, ni fuerzan espera, ni ocultan el contenido en reduced-motion.
- Contenido legible en todos los breakpoints; no hay scroll horizontal accidental.
- Menú y modal responden a teclado y controles táctiles; Escape y foco funcionan.
- El formulario no muestra un envío ficticio.
- Si la demo es pública, señalización comercial y noindex; ninguna credencial ni información de clientes en repo público.
- No confundir aprobación del componente original con aceptación de su integración en Wedding.

## Gates por fase
- Fase 03 Preparación: documentación y matriz; NO autoriza decir que las páginas funcionan.
- Fase 04 Desarrollo: código versionado, build reproducible, rutas correctas; verificar antes del siguiente módulo.
- Fase 05 QA: capturas y resultados reales; cualquier incidencia reproducible se incorpora a STATUS con ruta/viewport/pasos/corrección.
- Fase 06 Revisión demo: cliente aprueba diseño, no constituye permiso de publicación oficial.
- Fase 07 Producción: requiere autorización de publicación, información comercial y medios con licencia.

## Criterios de rechazo
- Duplicación de motores o escucha doble de scroll.
- Transiciones repetidas sobre anclas internas.
- Reutilización de preview styles o imágenes de otros clientes.
- Bloqueo de scroll/animación obligatoria.
- Ausencia de fallback por falta de JS.
- Declaración de pruebas no ejecutadas.

## Estado de pruebas al registrar este documento
- Archivo ZIP: nombres/estructura/fuentes y documentación revisados.
- Hero: metadatos multimedia y un fotograma comprobados.
- Repo: creado estado y documentación, no sitio construido.
- Todas las pruebas web anteriores: PENDIENTES.
