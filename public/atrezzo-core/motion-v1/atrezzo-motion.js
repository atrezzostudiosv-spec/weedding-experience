/**
 * ATREZZO Motion Library v1.0.1
 * Original implementation of documented motion patterns; not Spain Collection theme code.
 * Dependency-free ES module. Progressive enhancement, reduced-motion support, clean lifecycle.
 * Copyright (c) 2026 ATREZZO. Client assets are not part of the reusable runtime.
 */
const VERSION = '1.0.1';
const DESKTOP = '(min-width: 1101px)';
const REDUCED = '(prefers-reduced-motion: reduce)';
const clamp = (n, a=0, b=1) => Math.max(a, Math.min(b, n));
const mix = (a,b,t) => a+(b-a)*t;
const dom = (r,s) => [...r.querySelectorAll(s)];
const isElement = x => x && (x.nodeType === 1 || x.nodeType === 9);
const ready = (el) => el.setAttribute('data-am-ready','');
const pOf = (el) => { const r=el.getBoundingClientRect(); return clamp(-r.top / Math.max(1,r.height)); };
const easeOutExpo = t => t >= 1 ? 1 : 1-Math.pow(2,-10*t);
const safePlay = v => { if (!(v instanceof HTMLMediaElement)) return; const p=v.play(); if (p && typeof p.catch==='function') p.catch(()=>{}); };

/** Pure, testable mapping of documented hero displacements. */
export const motionMath = Object.freeze({
  heroFrame(index, progress, width, height, desktop) {
    const t = clamp(progress), w = width, h = height;
    if (index === 5) return {x:0,y:desktop && t ? -.15*w*t : 0,scale:desktop?mix(.4,1,t):1,innerScale:desktop?mix(1.4,1,t):1};
    const base=desktop ? [[-.5*w,-h],[0,-h],[.5*w,-h],[-.5*w,-h],[.5*w,-h]] :
        [[-.10*w,-.05*h],[.10*w,-.075*h],[.15*w,-.125*h],[-.15*w,.10*h],[.10*w,.05*h]];
    if (!Number.isInteger(index) || index<0 || index>4) throw new RangeError('media index must be 0..5');
    const [x,y]=base[index];return {x:x*t,y:y*t,scale:1,innerScale:1};
  },
  linearProgress(value,start,end) {return clamp((value-start)/(end-start || 1));}
});

class AtrezzoMotion {
  constructor(root=document, options={}) {
    if (!isElement(root)) throw new TypeError('root must be an Element or Document');
    this.root=root; this.options=options; this.cleanups=[]; this.scrollTasks=[]; this.observers=[];
    this.raf=0; this.destroyed=false; this.activeModal=null; this.lockCount=0;
    this.reduce=window.matchMedia(REDUCED); this.desktop=window.matchMedia(DESKTOP);
    this.onMotionChange=()=>this.refresh();
    this.reduce.addEventListener('change',this.onMotionChange);
    this.desktop.addEventListener('change',this.onMotionChange);
    this.cleanups.push(()=>{this.reduce.removeEventListener('change',this.onMotionChange);this.desktop.removeEventListener('change',this.onMotionChange);});
    this.init();
  }
  get reduced(){return this.reduce.matches;}
  get isDesktop(){return this.desktop.matches;}
  listen(el,type,fn,opts){el.addEventListener(type,fn,opts);this.cleanups.push(()=>el.removeEventListener(type,fn,opts));}
  onVisible(selector, callback, margin='0px 0px -15% 0px') {
    const nodes=dom(this.root,selector); if(!nodes.length)return;
    if(this.reduced || !('IntersectionObserver' in window)) {nodes.forEach(callback);return;}
    const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){callback(e.target);observer.unobserve(e.target);}})},{rootMargin:margin,threshold:0});
    nodes.forEach(el=>observer.observe(el));this.observers.push(observer);
  }
  onScroll(fn){this.scrollTasks.push(fn);}
  render=()=>{this.raf=0;if(this.destroyed || this.reduced)return;for(const fn of this.scrollTasks){try{fn();}catch(err){console.error('[ATREZZO Motion]',err);}}};
  schedule=()=>{if(!this.raf)this.raf=requestAnimationFrame(this.render);};
  lock(){this.lockCount++;if(this.lockCount===1)document.documentElement.classList.add('am-scroll-locked');}
  unlock(){this.lockCount=Math.max(0,this.lockCount-1);if(!this.lockCount)document.documentElement.classList.remove('am-scroll-locked');}
  init(){
    this.text();this.buttons();this.parallax();this.scrollVideo();this.homeHero();this.stack();
    this.destinations();this.ambassadors();this.footer();this.weddingsHero();this.weddingJourney();
    this.burned();this.mobileNav();this.videoModals();this.pageTransitions();
    this.listen(window,'scroll',this.schedule,{passive:true});
    this.listen(window,'resize',this.schedule,{passive:true});
    this.schedule();
  }
  text(){
    for(const el of dom(this.root,'[data-am-text]')){
      const source=el.textContent; if(!source.trim() || el.querySelector('a,button,input,svg,img'))continue;
      if(this.reduced){el.dataset.amTextAccessible='';continue;}
      const frag=document.createDocumentFragment();let i=0;
      const content=document.createElement('span');content.className='am-text__visual';content.setAttribute('aria-hidden','true');
      for(const part of source.match(/\S+|\s+/gu)||[]){
        if(/^\s+$/u.test(part)){content.append(document.createTextNode(part));continue;}
        const word=document.createElement('span');word.className='am-word';
        for(const char of [...part]){const c=document.createElement('span');c.className='am-char';c.textContent=char;c.style.setProperty('--am-delay',`${Math.min(i++,500)*5}ms`);word.append(c);}
        content.append(word);
      }
      frag.append(content);el.setAttribute('aria-label',source.trim());el.replaceChildren(frag);ready(el);
      this.cleanups.push(()=>{el.replaceChildren(document.createTextNode(source));el.removeAttribute('aria-label');el.removeAttribute('data-am-ready');el.classList.remove('am-inview');});
      if(el.dataset.amText==='scrub'){
        const chars=dom(el,'.am-char');this.onScroll(()=>{
          const r=el.getBoundingClientRect();const start=innerHeight;const end=innerHeight*.6-r.height;
          const t=clamp((start-r.top)/Math.max(1,start-end));const count=chars.length;
          chars.forEach((c,j)=>{const q=clamp((t-j/Math.max(1,count)*.35)/.65);c.style.opacity=String(q);c.style.transform=`translateY(${mix(-20,0,q)}%) scaleX(${mix(.7,1,q)})`;});
        });
      }
    }
    this.onVisible('[data-am-text]:not([data-am-text="scrub"])',el=>requestAnimationFrame(()=>el.classList.add('am-inview')));
  }
  buttons(){for(const el of dom(this.root,'[data-am-button]'))ready(el);this.onVisible('[data-am-button]',el=>requestAnimationFrame(()=>el.classList.add('am-inview')));}
  parallax(){
    for(const el of dom(this.root,'[data-am-parallax]')){
      ready(el);const child=el.firstElementChild;if(!child)continue;
      this.onScroll(()=>{const r=el.getBoundingClientRect();const t=clamp((innerHeight-r.top)/Math.max(1,innerHeight+r.height));
        const range=this.isDesktop?80:20;child.style.setProperty('--am-y',`${mix(-range,range,t).toFixed(2)}px`);
        child.style.setProperty('--am-scale',`${mix(1,1.2,t).toFixed(4)}`);
      });
      this.cleanups.push(()=>{child.style.removeProperty('--am-y');child.style.removeProperty('--am-scale');});
    }
  }
  scrollVideo(){
    const videos=dom(this.root,'video[data-am-autoplay]');if(!videos.length)return;
    videos.forEach(v=>{v.muted=true;v.playsInline=true;});
    if(!('IntersectionObserver' in window)){videos.forEach(safePlay);return;}
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){if(!this.reduced)safePlay(e.target);}else e.target.pause();}),{rootMargin:this.isDesktop?'5% 0px 5% 0px':'50% 0px 50% 0px'});
    videos.forEach(v=>obs.observe(v));this.observers.push(obs);
    this.cleanups.push(()=>videos.forEach(v=>v.pause()));
  }
  homeHero(){
    for(const hero of dom(this.root,'[data-am-home-hero]')){
      const media=dom(hero,'[data-am-media-index]');const title=hero.querySelector('[data-am-hero-title]');
      if(media.length!==6){console.warn('[ATREZZO Motion] Home hero requires 6 media items');continue;}
      media.forEach((el,i)=>el.style.setProperty('--am-index',i));ready(hero);
      this.onScroll(()=>{
        const rect=hero.getBoundingClientRect();const t=clamp(-rect.top/Math.max(1,rect.height-innerHeight));const w=innerWidth,h=innerHeight;
        media.forEach((el,i)=>{
          const f=motionMath.heroFrame(i,t,w,h,this.isDesktop);
          el.style.setProperty('--am-x',`${f.x.toFixed(1)}px`);
          el.style.setProperty('--am-y',`${f.y.toFixed(1)}px`);
          el.style.setProperty('--am-scale',f.scale.toFixed(4));
          if(i===5)el.style.setProperty('--am-inner-scale',f.innerScale.toFixed(4));
        });
        if(title){const q=this.isDesktop?clamp((t-.82)/.18):1;title.style.opacity=String(q);title.style.transform=`translateY(${(1-q)*15}px)`;}
        hero.style.setProperty('--am-progress',String(t));
      });
      this.cleanups.push(()=>media.forEach(el=>['--am-x','--am-y','--am-scale','--am-inner-scale','--am-index'].forEach(p=>el.style.removeProperty(p))));
    }
  }
  stack(){
    for(const el of dom(this.root,'[data-am-stack]')){
      const cards=dom(el,'[data-am-stack-card]');ready(el);
      this.onScroll(()=>{cards.forEach((card,i)=>{
        const r=card.getBoundingClientRect();const entry=clamp((innerHeight-r.top)/Math.max(1,innerHeight*.5));
        const next=cards[i+1];const exit=next?clamp((innerHeight*1.15-next.getBoundingClientRect().top)/Math.max(1,innerHeight*.95)):0;
        card.style.setProperty('--am-card-scale',this.isDesktop?mix(.95,1,entry).toFixed(4):'1');
        card.style.setProperty('--am-card-y',`${this.isDesktop?0:Math.round(-.25*innerHeight*exit)}px`);
        card.style.setProperty('--am-card-dim',`${Math.min(.66,exit*.66).toFixed(3)}`);
      });});
    }
  }
  destinations(){for(const el of dom(this.root,'[data-am-destination]'))ready(el);this.onVisible('[data-am-destination]',el=>el.classList.add('am-inview'),'0px 0px 2.5% 0px');}
  ambassadors(){for(const group of dom(this.root,'[data-am-ambassadors]')){ready(group);
    const buttons=dom(group,'[data-am-ambassador-next], [data-am-ambassador-prev]');
    const scroller=group.querySelector('[data-am-ambassador-track]');
    for(const b of buttons){this.listen(b,'click',()=>{if(scroller)scroller.scrollBy({left:(b.hasAttribute('data-am-ambassador-next')?1:-1)*Math.max(250,scroller.clientWidth*.7),behavior:this.reduced?'instant':'smooth'});});}
  }}
  footer(){for(const el of dom(this.root,'[data-am-footer-line]')){ready(el);this.onScroll(()=>{const host=el.closest('footer')||el.parentElement;const r=host.getBoundingClientRect();const t=clamp((innerHeight*.9-r.top)/Math.max(1,r.height-innerHeight*.1));el.style.setProperty('--am-line-scale',t.toFixed(4));});}}
  weddingsHero(){for(const hero of dom(this.root,'[data-am-wedding-hero]')){
    ready(hero);this.onScroll(()=>{const t=pOf(hero),clip=hero.querySelector('[data-am-wedding-clip]'),video=hero.querySelector('video, [data-am-wedding-visual]'),sub=hero.querySelector('[data-am-wedding-subtitle]');
      if(clip)clip.style.clipPath=`inset(${mix(42,0,t)}% ${mix(42,0,t)}% ${mix(42,0,t)}% ${mix(42,0,t)}%)`;
      if(video)video.style.transform=`scale(${mix(.2,1,t).toFixed(4)})`;
      if(sub){const q=clamp((t-.82)/.18);sub.style.opacity=String(q);sub.style.transform=`translateY(${(1-q)*15}px)`;}
    });
  }}
  weddingJourney(){for(const root of dom(this.root,'[data-am-journey]')){
    const steps=dom(root,'[data-am-journey-step]'),frames=dom(root,'[data-am-journey-frame]'),counter=root.querySelector('[data-am-journey-counter]');
    if(!steps.length)return;ready(root);
    this.onScroll(()=>{if(!this.isDesktop)return;let active=0;let score=Infinity;
      steps.forEach((s,i)=>{const r=s.getBoundingClientRect();const dist=Math.abs(r.top-innerHeight*.4);if(dist<score){score=dist;active=i;}});
      frames.forEach((f,i)=>{f.classList.toggle('am-active',i===active);f.setAttribute('aria-hidden',String(i!==active));});
      if(counter){counter.textContent=String(active+1).padStart(2,'0');}
    });
    this.cleanups.push(()=>frames.forEach(f=>{f.classList.remove('am-active');f.removeAttribute('aria-hidden');}));
  }}
  burned(){for(const el of dom(this.root,'[data-am-burned]')){
    ready(el);this.onScroll(()=>{const r=el.getBoundingClientRect();const t=clamp((innerHeight-r.top)/(innerHeight+r.height));
      el.style.setProperty('--am-burned-t',t.toFixed(4));el.style.setProperty('--am-brightness',mix(1.3,1,t).toFixed(3));el.style.setProperty('--am-contrast',mix(2,1,t).toFixed(3));el.style.setProperty('--am-sepia',mix(.2,0,t).toFixed(3));el.style.setProperty('--am-burned-y',`${mix(this.isDesktop?-80:-20,this.isDesktop?80:20,t).toFixed(1)}px`);
    });
  }}
  mobileNav(){
    for(const nav of dom(this.root,'[data-am-nav]')){
      const toggle=nav.querySelector('[data-am-nav-toggle]'),panel=nav.querySelector('[data-am-nav-panel]');if(!toggle||!panel)continue;
      const id=panel.id||`am-nav-panel-${Math.random().toString(36).slice(2,8)}`;panel.id=id;toggle.setAttribute('aria-controls',id);toggle.setAttribute('aria-expanded','false');
      if(!this.isDesktop)panel.inert=true;let lastFocus=null;const close=(restore=true)=>{if(!nav.classList.contains('am-nav--open'))return;nav.classList.remove('am-nav--open');toggle.setAttribute('aria-expanded','false');panel.inert=!this.isDesktop;this.unlock();if(restore)lastFocus?.focus();};
      const open=()=>{if(nav.classList.contains('am-nav--open'))return;lastFocus=document.activeElement;panel.inert=false;nav.classList.add('am-nav--open');toggle.setAttribute('aria-expanded','true');this.lock();requestAnimationFrame(()=>{const first=panel.querySelector('a,button');first?.focus();});};
      this.listen(toggle,'click',()=>nav.classList.contains('am-nav--open')?close():open());
      this.listen(nav,'keydown',e=>{if(!nav.classList.contains('am-nav--open'))return;if(e.key==='Escape'){e.preventDefault();close();}if(e.key==='Tab'){const items=dom(panel,'a[href],button:not([disabled]),[tabindex="0"]').filter(x=>x.getClientRects().length);if(!items.length)return;const a=items[0],b=items.at(-1);if(e.shiftKey && document.activeElement===a){e.preventDefault();b.focus();}else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus();}}});
      this.listen(panel,'click',e=>{if(e.target.closest('a[href]'))close(false);});
      this.listen(document,'pointerdown',e=>{if(nav.classList.contains('am-nav--open')&&!nav.contains(e.target))close();});
      const media=window.matchMedia(DESKTOP);const onWidth=()=>{if(media.matches)close(false);panel.inert=!media.matches;};media.addEventListener('change',onWidth);
      this.cleanups.push(()=>{media.removeEventListener('change',onWidth);close(false);panel.inert=false;});
    }
  }
  videoModals(){for(const modal of dom(this.root,'[data-am-modal]')){
    if(!modal.id)continue;modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-hidden','true');modal.hidden=true;
    const triggers=dom(this.root,`[data-am-modal-open="${CSS.escape(modal.id)}"]`);
    let lastFocus=null,closing=null;
    const close=()=>{if(modal.hidden)return;clearTimeout(closing);modal.classList.remove('am-modal--open');
      dom(modal,'video').forEach(v=>v.pause());modal.setAttribute('aria-hidden','true');
      closing=setTimeout(()=>{modal.hidden=true;},this.reduced?0:480);
      this.unlock();this.activeModal=null;lastFocus?.focus();};
    const open=(trigger)=>{if(this.activeModal && this.activeModal!==modal)return;clearTimeout(closing);lastFocus=trigger;modal.hidden=false;modal.setAttribute('aria-hidden','false');this.activeModal=modal;this.lock();requestAnimationFrame(()=>{modal.classList.add('am-modal--open');modal.querySelector('[data-am-modal-close],button,[tabindex="0"]')?.focus();});
      if(!this.reduced)dom(modal,'video').forEach(safePlay);
    };
    triggers.forEach(b=>this.listen(b,'click',e=>{e.preventDefault();open(b);}));
    this.listen(modal,'click',e=>{if(e.target===modal || e.target.closest('[data-am-modal-close]'))close();});
    this.listen(modal,'keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}if(e.key==='Tab'){const items=dom(modal,'button:not([disabled]),a[href],[tabindex="0"]').filter(x=>x.getClientRects().length);if(!items.length)return;const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
    this.cleanups.push(()=>{clearTimeout(closing);if(!modal.hidden)close();modal.hidden=true;modal.classList.remove('am-modal--open');});
  }}
  pageTransitions(){
    const root=this.root.nodeType===9?this.root.documentElement:this.root;
    if(!root.hasAttribute('data-am-page-transitions'))return;
    const layer=document.createElement('div');layer.className='am-page-wipe';layer.setAttribute('aria-hidden','true');document.body.append(layer);
    let busy=false;this.listen(this.root,'click',e=>{
      if(this.reduced||e.defaultPrevented||busy||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
      const a=e.target.closest('a[href]');if(!a||a.hasAttribute('download')||a.target&&a.target!=='_self'||a.getAttribute('rel')?.includes('external')||a.hasAttribute('data-am-no-transition'))return;
      let url;try{url=new URL(a.href,location.href);}catch{return;}
      if(!['http:','https:'].includes(url.protocol)||url.origin!==location.origin||url.pathname===location.pathname&&url.search===location.search)return;
      e.preventDefault();busy=true;layer.classList.add('am-page-wipe--show');
      const timer=setTimeout(()=>{location.assign(url.href);},900);this.cleanups.push(()=>clearTimeout(timer));
    });
    this.cleanups.push(()=>layer.remove());
  }
  refresh(){if(this.destroyed)return;this.schedule();}
  destroy(){if(this.destroyed)return;this.destroyed=true;cancelAnimationFrame(this.raf);this.observers.forEach(o=>o.disconnect());
    this.cleanups.slice().reverse().forEach(fn=>{try{fn();}catch(e){console.error(e);}});this.cleanups.length=0;
    this.scrollTasks.length=0;this.lockCount=0;document.documentElement.classList.remove('am-scroll-locked');
  }
}
const instances=new WeakMap();
export function initAtrezzoMotion(root=document,options={}){
  const prev=instances.get(root);if(prev&&!prev.destroyed)return prev;
  const inst=new AtrezzoMotion(root,options);instances.set(root,inst);return inst;
}
export {VERSION as ATREZZO_MOTION_VERSION,AtrezzoMotion};