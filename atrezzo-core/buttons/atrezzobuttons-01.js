/* ATREZZO BUTTONS 01 — progressive enhancement; no dependencies */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionEnabled = () => !reduce.matches && document.documentElement.dataset.abMotion !== 'off';

  // Directional reveal: choose the nearest entry/exit edge.
  document.querySelectorAll('[data-ab-directional]').forEach(button => {
    function updateSide(event) {
      if (!motionEnabled() || !finePointer.matches) return;
      const r = button.getBoundingClientRect();
      const px = (event.clientX-r.left-r.width/2)/(r.width/2);
      const py = (event.clientY-r.top-r.height/2)/(r.height/2);
      const side = Math.abs(px) > Math.abs(py) ? (px > 0 ? 'right' : 'left') : (py > 0 ? 'bottom' : 'top');
      button.dataset.abSide = side;
    }
    button.addEventListener('pointerenter', updateSide, {passive:true});
    button.addEventListener('pointerleave', updateSide, {passive:true});
  });

  // Magnetic button: only inner disc moves; outer hit target remains stationary.
  document.querySelectorAll('[data-ab-magnetic]').forEach(button => {
    const disc = button.querySelector('.ab-magnetic__disc');
    if (!disc) return;
    const reset = () => {disc.style.setProperty('--ab-x','0px');disc.style.setProperty('--ab-y','0px');};
    button.addEventListener('pointermove', e => {
      if (!motionEnabled() || !finePointer.matches || e.pointerType === 'touch') {reset();return;}
      const r=button.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.16;
      const y=(e.clientY-r.top-r.height/2)*.16;
      disc.style.setProperty('--ab-x', `${Math.max(-14,Math.min(14,x)).toFixed(2)}px`);
      disc.style.setProperty('--ab-y', `${Math.max(-14,Math.min(14,y)).toFixed(2)}px`);
    }, {passive:true});
    button.addEventListener('pointerleave',reset,{passive:true});
    button.addEventListener('blur',reset);
    reduce.addEventListener?.('change',reset);
    document.addEventListener('ab:motion-change',reset);
  });

  // Split visible text safely into per-character spans; accessible name stays on anchor.
  document.querySelectorAll('[data-ab-stagger]').forEach(button => {
    const primary=button.querySelector('.ab-stagger__line--primary');
    const secondary=button.querySelector('.ab-stagger__line--secondary');
    if (!primary || !secondary) return;
    if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label',primary.textContent.trim());
    const label=primary.textContent;
    function split(layer) {
      layer.textContent='';
      [...label].forEach((char,idx) => {
        const span=document.createElement('span');
        span.className='ab-stagger__char';
        span.style.setProperty('--i',idx);
        span.textContent=char===' ' ? '\u00a0' : char;
        layer.appendChild(span);
      });
      layer.setAttribute('aria-hidden','true');
    }
    split(primary);split(secondary);
    button.setAttribute('data-ab-ready','');
  });
})();
