import { readFileSync, existsSync } from "node:fs";

const get = (path) => readFileSync(path, "utf8");
const fail = (why) => { console.error("HOME MASTER CHECK FAILED:", why); process.exitCode = 1; };
const home = get("src/pages/index.astro");
const master = get("docs/HOME-EDITORIAL-MASTER.md");
const layout = get("src/layouts/SiteLayout.astro");
const pickSection = (a,b) => master.split(`## ${a} —`)[1]?.split(`## ${b} —`)[0] ?? "";
const getCopy = (block,key) => {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const found = block.match(new RegExp(`- ${escaped}: \`([^\`]+)\``));
  if (!found) { fail(`Editorial master missing ${key}`); return ""; }
  return found[1];
};
const s2=pickSection("02","03"),s3=pickSection("03","04"),s4=pickSection("04","05"),s5=pickSection("05","06"),s6=pickSection("06","07"),s7=master.split("## 07 —")[1]?.split("## Microcopy global")[0]??"";
for(const [section,key] of [[s2,"Paragraph 1"],[s2,"Paragraph 2"],[s3,"Supporting"],[s4,"Introduction"],[s5,"Paragraph"],[s6,"Supporting"],[s7,"Supporting"]]) {
  const copy=getCopy(section,key);
  if(copy && !home.includes(copy)) fail(`Home differs from full master copy: ${key}, starts: ${copy.slice(0,35)}`);
}
for(const name of ["Estado A — WEDDINGS","Estado B — PRIVATE EVENTS","Estado C — EVENT DESIGN","Estado D — EVENT COORDINATION"]) {
  const block=s4.split(`**${name}:**`)[1]?.split("**Estado ")[0]??"";
  for(const key of ["Title","Paragraph"]){
    const copy=getCopy(block,key);
    if(copy && !home.includes(copy)) fail(`Home differs from master: ${name} / ${key}`);
  }
}
const hero=home.match(/<section class="hero hero--video"[\s\S]*?<\/section>/)?.[0]??"";
if(!hero || /<(?:h[1-6]|p|a)\b|<PrimaryAction/.test(hero)) fail("Hero must contain the video and navigation only — no text or CTA");
if(home.includes('data-am-home-hero') || home.includes('data-am-media-index')) fail("Unapproved extra six-photo collage must not return");
for(const needle of ['data-am-hero-exit','data-am-stack-slot','data-am-stack-card','data-am-text','data-am-quote-image','data-am-destination','data-am-ambassadors']){
  if(!home.includes(needle)) fail(`Missing scene component: ${needle}`);
}
for(const [section,key] of [[s2,"Eyebrow"],[s2,"CTA"],[s3,"Eyebrow"],[s4,"Eyebrow"],[s5,"Eyebrow"],[s5,"CTA"],[s6,"Eyebrow"],[s6,"CTA"],[s7,"Eyebrow"],[s7,"CTA"]]) {
  const copy=getCopy(section,key); if(copy && !home.includes(copy)) fail(`Missing literal master ${key}: ${copy}`);
}
if(!layout.includes('An Atrezzo Studios design concept. Copy and imagery are illustrative.')) fail('Master disclosure missing');
if(home.includes("home-cinematic.js")||existsSync("src/scripts/home-cinematic.js")) fail("Obsolete parallel scroll engine must not return");
if(home.includes("data-romance-reveal")||home.includes("data-romance-story")) fail("Obsolete animated markup must not return");
for(const path of ["public/atrezzo-core/motion-v1/atrezzo-motion.js","public/atrezzo-core/motion-v1/atrezzo-motion.css","public/atrezzo-core/motion-v1/wedding-init.js"]){
  if(!existsSync(path)) fail(`Actual original ATREZZO Motion v1 runtime missing: ${path}`);
}
for(const anchor of ["atrezzo-navigation-01.js","atrezzo-transitions.js","atrezzobuttons-01.js","atrezzo-scroll-sections.js"]){
  if(!layout.includes(anchor)) fail(`Approved ATREZZO engine was removed: ${anchor}`);
}
if(!layout.includes("motion-v1/wedding-init.js")) fail("Motion v1 is not initialized");
if(!process.exitCode) console.log("PASS: full editorial master, video-only hero and ATREZZO Motion wiring and reference scene structure preserved");
