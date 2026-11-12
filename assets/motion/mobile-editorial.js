/* Wedding-specific mobile presentation adapter.
 * ATZ-MOT-001 entry rhythm for new title text; the existing data-am-text engine
 * retains ownership of its own characters. Paragraphs use a readable scroll scrub
 * inspired by ATZ-MOT-002, with a monotonic word reveal. No core edits or dependencies.
 */
const clamp = (x) => Math.max(0, Math.min(1, x));
export function readingProgress(top, height, viewport) {
  const start = viewport * .94;
  const end = Math.max(viewport * .22, viewport * .65 - height * .42);
  return clamp((start - top) / Math.max(1, start - end));
}
export function wordOpacity(progress, index, total) {
  const offset = index / Math.max(1, total - 1) * .78;
  return .24 + .76 * clamp((progress - offset) / .22);
}
const titles = [
  '.home-intro h1','.romance-possibilities__intro h2','.romance-story__heading h3',
  '.romance-breath__copy h2','.romance-editorial__heading h2','.home-closing h2',
  '.philosophy-opening h1','.philosophy-chapter h2','.philosophy-connection h2',
  '.service-manifesto h2','.service-chapter h2','.service-journey__intro h2','.journey-step h3',
  '.gallery-opening h1','.gallery-chapter h2','.inner-invitation h2','.inquiry-opening h1'
].join(',');
const paragraphs = [
  '.home-intro__narrative p','.romance-possibilities__intro p','.romance-story__copy p',
  '.romance-breath__statement','.romance-editorial__prelude p','.home-closing__body p',
  '.philosophy-opening p','.philosophy-chapter__content p','.philosophy-connection > p',
  '.service-manifesto > p','.service-chapter__copy > p','.service-journey__intro p',
  '.journey-step > p','.gallery-preface > p','.gallery-chapter header p','.inner-invitation > p'
].join(',');
const photos = [
  '.romance-story__photo--0 img','.romance-breath__image img',
  '.romance-editorial__track img','.romance-editorial__image img',
  '.philosophy-chapter__image img','.philosophy-connection figure img',
  '.service-chapter figure img','.journey-step__mobile','.gallery-photo__crop img'
].join(',');
const actions = [
  '.home-intro__foot .ab-underline','.romance-possibilities__next .ab-underline',
  '.romance-breath__copy .ab-underline','.romance-editorial__heading .ab-underline',
  '.home-closing .ab-directional','.inner-invitation .ab-directional'
].join(',');

function splitText(el, isTitle) {
  // Preserve the original markup, including emphasis and the existing ATZ-MOT-001 nodes.
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (n.nodeValue.trim() && !n.parentElement.closest('[data-am-text], a, button, .sr-only, [aria-hidden="true"]:not(span)')) nodes.push(n);
  }
  const changes = [], tokens = [];
  for (const node of nodes) {
    const fragment = document.createDocumentFragment(), inserted = [];
    for (const part of node.nodeValue.match(/\S+|\s+/gu) || []) {
      if (/^\s+$/u.test(part)) {
        const space = document.createTextNode(part);
        fragment.append(space); inserted.push(space); continue;
      }
      const word = document.createElement('span');
      word.className = isTitle ? 'wm-title-word' : 'wm-reading-word';
      if (isTitle) {
        for (const char of [...part]) {
          const letter = document.createElement('span');
          letter.className = 'wm-letter';
          letter.textContent = char;
          letter.style.setProperty('--wm-delay', Math.min(tokens.length, 90) * 9 + 'ms');
          word.append(letter); tokens.push(letter);
        }
      } else {
        word.textContent = part; tokens.push(word);
      }
      fragment.append(word); inserted.push(word);
    }
    const parent = node.parentNode;
    parent.replaceChild(fragment, node);
    changes.push(() => {
      if (!inserted[0]?.parentNode) return;
      inserted[0].before(node);
      inserted.forEach(n => n.remove());
    });
  }
  return {tokens, restore: () => changes.reverse().forEach(fn => fn())};
}

function mount(main) {
  let raf = 0;
  const cleanups = [], active = new Set(), reading = new Map();
  const visible = (el) => el.getClientRects().length > 0;
  const enter = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const target = e.target;
      enter.unobserve(target);
      if (target instanceof HTMLImageElement && !target.complete) {
        const show = () => target.classList.add('wm-in');
        target.addEventListener('load', show, {once:true});
        target.addEventListener('error', show, {once:true});
        cleanups.push(() => {target.removeEventListener('load',show);target.removeEventListener('error',show);});
      } else target.classList.add('wm-in');
    }
  }, {rootMargin:'0px 0px -7% 0px',threshold:0.03});
  const readObserver = new IntersectionObserver(entries => {
    for (const e of entries) {
      const state = reading.get(e.target);
      if (!state || state.progress === 1) continue;
      if (e.isIntersecting) active.add(e.target);
      else {
        if (e.boundingClientRect.bottom <= 0) paint(e.target, 1);
        active.delete(e.target);
      }
    }
    schedule();
  }, {rootMargin:'100px 0px 100px 0px',threshold:0});
  function paint(el, value) {
    const state = reading.get(el);
    if (!state) return;
    const progress = Math.max(state.progress, value);
    if (progress === state.progress) return;
    state.progress = progress;
    for (let i=0;i<state.tokens.length;i++) {
      const opacity = wordOpacity(progress,i,state.tokens.length);
      if (opacity !== state.values[i]) {
        state.values[i] = opacity;
        state.tokens[i].style.setProperty('--wm-opacity',opacity.toFixed(3));
      }
    }
    if (progress === 1) { active.delete(el); readObserver.unobserve(el); el.classList.add('wm-reading-done'); }
  }
  function render() {
    raf = 0;
    const h = document.documentElement.clientHeight || innerHeight;
    for (const el of active) {
      const r = el.getBoundingClientRect();
      paint(el, readingProgress(r.top,r.height,h));
    }
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(render); }
  function mark(el, kind) {
    if (!visible(el)) return;
    el.setAttribute('data-wm-entry',kind);
    cleanups.push(() => {el.removeAttribute('data-wm-entry');el.classList.remove('wm-in');});
    const r = el.getBoundingClientRect();
    // Do not blank out media already visible on first paint or after a deep link.
    if (kind === 'photo' && r.top < innerHeight*.8 && r.bottom > 0) el.classList.add('wm-in');
    else if (r.bottom <= 0) el.classList.add('wm-in');
    else enter.observe(el);
  }
  for (const el of main.querySelectorAll(titles)) {
    if (!visible(el) || el.hasAttribute('data-am-text')) continue;
    const split = splitText(el,true);
    if (!split.tokens.length) continue;
    const previous = el.getAttribute('aria-label');
    if (!previous) el.setAttribute('aria-label',el.textContent.trim());
    cleanups.push(() => {split.restore();if(previous===null)el.removeAttribute('aria-label');else el.setAttribute('aria-label',previous);});
    mark(el,'title');
  }
  for (const el of main.querySelectorAll(paragraphs)) {
    if (!visible(el) || el.closest('details,form,dialog') || el.querySelector('a,button,input')) continue;
    const split = splitText(el,false);
    if (split.tokens.length < 2) {split.restore();continue;}
    el.setAttribute('data-wm-reading','');
    reading.set(el,{tokens:split.tokens,values:[],progress:-1});
    cleanups.push(() => {el.removeAttribute('data-wm-reading');el.classList.remove('wm-reading-done');split.restore();});
    const r = el.getBoundingClientRect();
    paint(el,r.bottom <= 0 ? 1 : readingProgress(r.top,r.height,innerHeight));
    if (reading.get(el).progress < 1) readObserver.observe(el);
  }
  for (const el of main.querySelectorAll(photos)) mark(el,'photo');
  for (const el of main.querySelectorAll(actions)) mark(el,'action');
  function focusReveal(event) {
    const el = event.target.closest('[data-wm-entry]') || event.target.querySelector?.('[data-wm-entry]');
    if(el) {el.classList.add('wm-in');enter.unobserve(el);}
  }
  main.addEventListener('focusin',focusReveal);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('pageshow',schedule);
  schedule();
  return () => {
    enter.disconnect();readObserver.disconnect();cancelAnimationFrame(raf);
    main.removeEventListener('focusin',focusReveal);
    window.removeEventListener('scroll',schedule);
    window.removeEventListener('resize',schedule);
    window.removeEventListener('pageshow',schedule);
    cleanups.reverse().forEach(fn=>fn());
  };
}
if (typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined') {
  const mobile = matchMedia('(max-width: 767px) and (prefers-reduced-motion: no-preference)');
  let unmount = null;
  function update() {
    if (mobile.matches && !unmount) {
      const main = document.getElementById('main');
      if(main) unmount = mount(main);
    } else if (!mobile.matches && unmount) {unmount();unmount=null;}
  }
  mobile.addEventListener('change',update);
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',update,{once:true});
  else update();
}
