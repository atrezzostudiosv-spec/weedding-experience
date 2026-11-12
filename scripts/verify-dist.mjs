import { existsSync,readFileSync } from 'node:fs';
import {join} from 'node:path';
const root='dist';
const paths=['index.html','about/index.html','services/index.html','gallery/index.html','contact/index.html',
  'assets/motion/mobile-editorial.css','assets/motion/mobile-editorial.js',
  'assets/brand/favicon.svg','assets/brand/favicon-32.png','assets/brand/apple-touch-icon.png',
  'assets/video/wedding-hero-preview.mp4','assets/video/wedding-hero-poster.jpg','atrezzo-core/nav/atrezzo-navigation-01.css','atrezzo-core/nav/atrezzo-navigation-01.js',
  'atrezzo-core/veil/atrezzo-transitions.css','atrezzo-core/veil/atrezzo-transitions.js',
  'atrezzo-core/veil/atrezzo-preflight.js','atrezzo-core/buttons/atrezzobuttons-01.css',
  'atrezzo-core/buttons/atrezzobuttons-01.js',
  'atrezzo-core/scroll01/atrezzo-scroll-sections.css','atrezzo-core/scroll01/atrezzo-scroll-sections.js'];
let missing=[];
for(const path of paths){if(!existsSync(join(root,path))) missing.push(path)}
if(missing.length){console.error('Missing build outputs:',missing.join(', '));process.exit(1)}
const base='/weedding-experience/';
const site='https://atrezzostudiosv-spec.github.io';
const titles=new Set(), descriptions=new Set();
for(const path of paths.filter(p=>p.endsWith('.html'))){
 const h=readFileSync(join(root,path),'utf8');
 if(!h.includes('noindex,nofollow')) throw new Error('Missing noindex on '+path);
 if(!h.includes(base+'assets/motion/mobile-editorial.js') || !h.includes(base+'assets/motion/mobile-editorial.css')) throw new Error('Missing responsive editorial assets on '+path);
 if(/AN ATREZZO EDITORIAL CONCEPT|header-kicker/i.test(h)) throw new Error('Obsolete header label on '+path);
 for(const [rel,asset] of [['icon','favicon-32.png'],['icon','favicon.svg'],['apple-touch-icon','apple-touch-icon.png']]){
   if(!h.match(new RegExp('<link[^>]*rel="'+rel+'"[^>]*href="'+base+'assets/brand/'+asset.replaceAll('.','[.]')+'"[^>]*>'))) throw new Error('Missing favicon link on '+path+': '+asset);
 }
 const nav=h.match(/<nav class="azn1-fallback-nav"[^>]*>(.*?)<\/nav>/s)?.[1];
 const menu=h.match(/<ul class="azn1-menu__links"[^>]*>(.*?)<\/ul>/s)?.[1];
 for(const marker of ['data-azn1-menu-trigger','data-azn1-menu-close','id="wedding-menu"','aria-controls="wedding-menu"','atrezzo-navigation-01.css','atrezzo-navigation-01.js']){
   if(!h.includes(marker)) throw new Error('Missing immersive menu wiring on '+path+': '+marker);
 }
 for(const slug of ['', 'about/', 'services/', 'gallery/', 'contact/']){
   if(!nav?.includes(`href="${base+slug}"`) || !menu?.includes(`href="${base+slug}"`)) throw new Error('Missing menu or fallback link on '+path+': '+slug);
 }
 const slug=path.replace(/index\.html$/, '');
 for(const links of [nav,menu]){
   const active=links.match(/<a\b[^>]*aria-current="page"[^>]*>/g)??[];
   if(active.length!==1 || !active[0].includes(`href="${base+slug}"`) || !active[0].includes('data-atz-effect="veil"')) throw new Error('Missing active link or VEIL transition on '+path);
 }
 if((h.match(/<img\b[^>]*data-azn1-menu-photo/g)??[]).length!==5) throw new Error('Missing original menu images on '+path);
 const canonical=site+base+slug;
 if(!h.includes(`rel="canonical" href="${canonical}"`) || !h.includes(`property="og:url" content="${canonical}"`)){
   throw new Error('Missing canonical URL on '+path);
 }
 const title=h.match(/<title>([^<]+)<\/title>/)?.[1];
 const description=h.match(/<meta name="description" content="([^"]+)"/)?.[1];
 if(!title || !description || titles.has(title) || descriptions.has(description)){
   throw new Error('Missing or duplicate metadata on '+path);
 }
 titles.add(title);
 descriptions.add(description);
 const shareImage=site+base+'assets/video/wedding-hero-poster.jpg';
 if(!h.includes(`property="og:image" content="${shareImage}"`) || !h.includes(`name="twitter:image" content="${shareImage}"`) || !h.includes('name="twitter:card" content="summary_large_image"')){
   throw new Error('Missing social preview metadata on '+path);
 }
}
const home=readFileSync(join(root,'index.html'),'utf8');
if(!home.includes('data-ats-effect="expand"'))throw new Error('Home missing approved Expand');
console.log('PASS: five static routes, immersive menu and fallback navigation, canonical URLs, social cards, noindex, scene markup');

if(!home.includes("<video")||!home.includes("wedding-hero-preview.mp4")) throw new Error("Hero video missing");
if(home.includes("hero__content")||home.includes("hero__top")) throw new Error("Unexpected text overlay in Hero");
