import { existsSync,readFileSync } from 'node:fs';
import {join} from 'node:path';
const root='dist';
const paths=['index.html','about/index.html','services/index.html','gallery/index.html','contact/index.html',
  'assets/video/wedding-hero-preview.mp4','assets/video/wedding-hero-poster.jpg','atrezzo-core/nav/atrezzo-navigation-01.css','atrezzo-core/nav/atrezzo-navigation-01.js',
  'atrezzo-core/veil/atrezzo-transitions.css','atrezzo-core/veil/atrezzo-transitions.js',
  'atrezzo-core/veil/atrezzo-preflight.js','atrezzo-core/buttons/atrezzobuttons-01.css',
  'atrezzo-core/buttons/atrezzobuttons-01.js',
  'atrezzo-core/scroll01/atrezzo-scroll-sections.css','atrezzo-core/scroll01/atrezzo-scroll-sections.js'];
let missing=[];
for(const path of paths){if(!existsSync(join(root,path))) missing.push(path)}
if(missing.length){console.error('Missing build outputs:',missing.join(', '));process.exit(1)}
const base='/weedding-experience/';
for(const path of paths.filter(p=>p.endsWith('.html'))){
 const h=readFileSync(join(root,path),'utf8');
 if(!h.includes('noindex,nofollow')) throw new Error('Missing noindex on '+path);
 if(!h.includes(base+'contact/')) throw new Error('Missing base-aware Contact link on '+path);
 if(!h.includes('data-azn1-menu')) throw new Error('Missing Atrezzo menu on '+path);
 if(!h.includes('data-atz-link')) throw new Error('Missing Atrezzo transitions on '+path);
}
const home=readFileSync(join(root,'index.html'),'utf8');
if(!home.includes('data-ats-effect="expand"'))throw new Error('Home missing approved Expand');
console.log('PASS: five static routes, base-aware links, Atrezzo core assets, noindex, scene markup');

if(!home.includes("<video")||!home.includes("wedding-hero-preview.mp4")) throw new Error("Hero video missing");
if(home.includes("hero__content")||home.includes("hero__top")) throw new Error("Unexpected text overlay in Hero");
