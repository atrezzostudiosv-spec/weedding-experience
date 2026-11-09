import {existsSync} from 'node:fs';
const required=['src/pages/index.astro','src/pages/about.astro','src/pages/services.astro','src/pages/gallery.astro','src/pages/contact.astro',
'public/atrezzo-core/nav/atrezzo-navigation-01.css','public/atrezzo-core/nav/atrezzo-navigation-01.js',
'public/atrezzo-core/veil/atrezzo-preflight.js','public/atrezzo-core/veil/atrezzo-transitions.css','public/atrezzo-core/veil/atrezzo-transitions.js',
'public/atrezzo-core/buttons/atrezzobuttons-01.css','public/atrezzo-core/buttons/atrezzobuttons-01.js',
'public/atrezzo-core/scroll01/atrezzo-scroll-sections.css','public/atrezzo-core/scroll01/atrezzo-scroll-sections.js'];
const missing=required.filter(x=>!existsSync(x));
if(missing.length){console.error('Missing files:',missing.join('\\n'));process.exit(1)}
console.log('PASS: exact source engine files and page skeleton present');
