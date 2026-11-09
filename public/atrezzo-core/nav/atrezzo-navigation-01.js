/* ATREZZO NAVIGATION 01 — independent, accessible navigation patterns.
   API: window.ATREZZO_NAVIGATION_01.init(root?) -> { destroy() }.
   Auto-init once. Safe to initialize again; previous instance destroyed first. */
(function(){
  'use strict';
  const instances = new WeakMap();
  const prefersReduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selectAll = (root, sel) => Array.from(root.querySelectorAll(sel));
  function init(root = document){
    if(instances.has(root)) instances.get(root).destroy();
    const cleanups = [];
    const on=(el,type,fn,opts)=>{el.addEventListener(type,fn,opts);cleanups.push(()=>el.removeEventListener(type,fn,opts));};
    const timers = new Set();
    const after=(fn,ms)=>{let t=setTimeout(()=>{timers.delete(t);fn();},ms);timers.add(t);return t;};
    const menu=root.querySelector('[data-azn1-menu]');
    const trigger=root.querySelector('[data-azn1-menu-trigger]');
    const host=root.querySelector('.azn1');
    if(host) host.classList.add('azn1-ready');
    let menuOpen=false, menuTimer=0, oldFocus=null, mainInert=null;
    if(menu && trigger){
      const close=menu.querySelector('[data-azn1-menu-close]');
      const focusables=()=>selectAll(menu,'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])').filter(x=>x.getClientRects().length);
      const showPreview=(idx)=>{
        selectAll(menu,'[data-azn1-menu-photo]').forEach((p,i)=>p.classList.toggle('is-active',i===idx));
      };
      const openMenu=()=>{
        if(menuOpen)return;
        clearTimeout(menuTimer);menuOpen=true;oldFocus=document.activeElement;
        menu.hidden=false;menu.classList.add('is-opening');
        document.body.classList.add('azn1-menu-active');
        mainInert=root.querySelector('main')||document.querySelector('main');if(mainInert)mainInert.inert=true;
        trigger.setAttribute('aria-expanded','true');
        requestAnimationFrame(()=>{menu.classList.remove('is-opening');menu.classList.add('is-open');});
        after(()=>{if(menuOpen){const f=focusables();(f[0]||close||menu).focus({preventScroll:true});}},prefersReduced()?0:90);
      };
      const closeMenu=(restore=true)=>{
        if(!menuOpen)return;
        menuOpen=false;menu.classList.remove('is-open','is-opening');
        document.body.classList.remove('azn1-menu-active');
        if(mainInert){mainInert.inert=false;mainInert=null;}
        trigger.setAttribute('aria-expanded','false');
        if(restore && oldFocus && oldFocus.isConnected) oldFocus.focus({preventScroll:true});
        menuTimer=setTimeout(()=>{if(!menuOpen)menu.hidden=true;},prefersReduced()?0:820);
      };
      on(trigger,'click',openMenu);
      if(close) on(close,'click',()=>closeMenu());
      selectAll(menu,'[data-azn1-menu-link]').forEach((a,i)=>{
        on(a,'pointerenter',()=>showPreview(i));on(a,'focus',()=>showPreview(i));
        on(a,'click',e=>{
          const dest=new URL(a.href,location.href);
          const sameDocument=dest.origin===location.origin && dest.pathname===location.pathname && dest.search===location.search;
          const hash=sameDocument?dest.hash:'';
          const target=hash && document.getElementById(decodeURIComponent(hash.slice(1)));
          if(target){e.preventDefault();closeMenu(false);history.pushState(null,'',hash);target.scrollIntoView({behavior:prefersReduced()?'instant':'smooth',block:'start'});after(()=>target.focus({preventScroll:true}),60);}else closeMenu(false);
        });
      });
      on(menu,'keydown',e=>{
        if(!menuOpen)return;
        if(e.key==='Escape'){e.preventDefault();closeMenu();return;}
        if(e.key==='Tab'){
          const f=focusables();if(!f.length)return;
          const first=f[0],last=f[f.length-1];
          if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
          else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
        }
      });
      // Menu deliberately locks body scroll only while explicitly opened by user.
      cleanups.push(()=>{clearTimeout(menuTimer);menuOpen=false;menu.hidden=true;menu.classList.remove('is-open','is-opening');document.body.classList.remove('azn1-menu-active');if(mainInert) mainInert.inert=false;trigger.setAttribute('aria-expanded','false');});
    }
    const rail=root.querySelector('[data-azn1-rail]');
    if(rail){
      const links=selectAll(rail,'a[href^="#"]');
      const ids=links.map(a=>a.getAttribute('href').slice(1));
      const sections=ids.map(id=>document.getElementById(id));
      const fill=rail.querySelector('[data-azn1-rail-fill]');
      const region=root.querySelector('[data-azn1-rail-region]');
      let raf=0;
      const update=()=>{
        raf=0;
        if(!sections.length || sections.some(s=>!s))return;
        const point=window.innerHeight*.39;
        let active=0;sections.forEach((s,i)=>{if(s.getBoundingClientRect().top<=point)active=i;});
        links.forEach((a,i)=>{const on=i===active;a.classList.toggle('is-active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
        sections.forEach((s,i)=>s.classList.toggle('is-current',i===active));
        if(fill && region){const r=region.getBoundingClientRect();const usable=Math.max(r.height-window.innerHeight,1);const progressed=Math.min(1,Math.max(0,-r.top/usable));fill.style.width=(progressed*100).toFixed(2)+'%';}
      };
      const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
      on(window,'scroll',request,{passive:true});on(window,'resize',request,{passive:true});
      update();cleanups.push(()=>cancelAnimationFrame(raf));
    }
    const projectRoot=root.querySelector('[data-azn1-projects]');
    const dock=root.querySelector('[data-azn1-dock]');
    if(projectRoot && dock){
      const projects=selectAll(projectRoot,'[data-azn1-project]');
      const label=dock.querySelector('[data-azn1-dock-title]');
      const counter=dock.querySelector('[data-azn1-dock-counter]');
      const progress=dock.querySelector('[data-azn1-dock-progress]');
      const prev=dock.querySelector('[data-azn1-dock-prev]');
      const next=dock.querySelector('[data-azn1-dock-next]');
      let idx=projects.findIndex(p=>p.classList.contains('is-active'));if(idx<0)idx=0;
      const display=(i)=>{
        if(!projects.length)return;
        idx=(i+projects.length)%projects.length;
        projects.forEach((p,j)=>{const active=j===idx;p.classList.toggle('is-active',active);p.setAttribute('aria-hidden',String(!active));});
        if(label)label.textContent=projects[idx].dataset.azn1Title||'Project';
        if(counter)counter.textContent=String(idx+1).padStart(2,'0')+' / '+String(projects.length).padStart(2,'0');
        if(progress)progress.style.width=((idx+1)/projects.length*100)+'%';
      };
      display(idx);
      if(prev)on(prev,'click',()=>display(idx-1));
      if(next)on(next,'click',()=>display(idx+1));
      on(dock,'keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();display(idx+1);}else if(e.key==='ArrowLeft'){e.preventDefault();display(idx-1);}});
      const show=()=>{const r=projectRoot.getBoundingClientRect();dock.classList.toggle('is-visible',r.top<window.innerHeight*.64&&r.bottom>window.innerHeight*.47)};
      let raf=0;const request=()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;show();});};
      on(window,'scroll',request,{passive:true});on(window,'resize',request,{passive:true});show();cleanups.push(()=>cancelAnimationFrame(raf));
    }
    const instance={destroy(){cleanups.splice(0).reverse().forEach(fn=>fn());timers.forEach(clearTimeout);timers.clear();if(host)host.classList.remove('azn1-ready');instances.delete(root);}};
    instances.set(root,instance);return instance;
  }
  window.ATREZZO_NAVIGATION_01={init};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>init(document),{once:true});else init(document);
})();