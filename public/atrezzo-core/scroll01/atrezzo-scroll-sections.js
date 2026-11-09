/* ATREZZO SCROLL SECTIONS 01 — original, dependency-free implementation.
 * Native scrolling. No wheel interception, scroll locking, timers or global selectors.
 * API: AtrezzoScrollSections.init(root, options) -> { refresh, destroy, setReduced }.
 */
(function (global) {
  'use strict';
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (x) => { const t = clamp(x); return t * t * (3 - 2 * t); };
  const range = (value, start, end) => ease((value - start) / (end - start));
  const set = (node, name, value) => node.style.setProperty(name, String(value));
  const round = (n) => Math.round(n * 100) / 100;
  function apply(scene, progress, viewportHeight, viewportWidth) {
    const p = clamp(progress);
    const effect = scene.getAttribute('data-ats-effect');
    scene.dataset.atsProgress = p.toFixed(3); // Useful for QA without changing layout.
    if (effect === 'expand') {
      const photo = range(p, .06, .62);
      const copy = range(p, .48, .77);
      const xEdge = (viewportWidth <= 780 ? 9 : 22) * (1 - photo);
      const yEdge = (viewportWidth <= 780 ? 11 : 17) * (1 - photo);
      set(scene, '--ats-x-edge', `${round(xEdge)}vw`);
      set(scene, '--ats-y-edge', `${round(yEdge)}svh`);
      set(scene, '--ats-fragment-alpha', round(1 - range(p, .13, .48)));
      set(scene, '--ats-fragment-shift', `${round(-75 * range(p, .1, .52))}px`);
      set(scene, '--ats-copy-alpha', round(copy));
      set(scene, '--ats-copy-shift', `${round(28 * (1 - copy))}px`);
    } else if (effect === 'split') {
      const collapse = range(p, .1, .64);
      const copy = range(p, .43, .74);
      set(scene, '--ats-image-clip', `${round(42 * collapse)}%`);
      set(scene, '--ats-copy-alpha', round(copy));
      set(scene, '--ats-copy-x', `${round(-32 * (1 - copy))}px`);
    } else if (effect === 'sequence') {
      const a = range(p, .08, .55);
      const b = range(p, .2, .64);
      const c = range(p, .29, .7);
      const copy = range(p, .57, .82);
      set(scene, '--ats-a-y', `${round(170 * (1 - a))}px`);
      set(scene, '--ats-b-y', `${round(-220 * (1 - b))}px`);
      set(scene, '--ats-c-y', `${round(230 * (1 - c))}px`);
      set(scene, '--ats-a-alpha', round(.24 + .76 * a));
      set(scene, '--ats-b-alpha', round(.24 + .76 * b));
      set(scene, '--ats-c-alpha', round(.24 + .76 * c));
      set(scene, '--ats-copy-alpha', round(copy));
      set(scene, '--ats-copy-shift', `${round(26 * (1 - copy))}px`);
    }
  }
  function init(root, options) {
    options = options || {};
    root = root || document;
    // Accept a scoping element, not a selector string; never alter other pages.
    const scope = root.nodeType === 9 ? root.querySelector('.ats-scope') : root;
    if (!scope || !scope.classList.contains('ats-scope')) {
      return { refresh: function () {}, destroy: function () {}, setReduced: function () {} };
    }
    if (scope.__atrezzoScrollSections) return scope.__atrezzoScrollSections;
    const scenes = Array.from(scope.querySelectorAll('.ats-scene[data-ats-effect]'));
    const media = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)');
    let manualReduced = !!options.reduced;
    let isDestroyed = false;
    let pending = false;
    let enhanced = false;
    function reduced() { return manualReduced || (media && media.matches); }
    function measureAndRender() {
      if (isDestroyed) return;
      pending = false;
      if (!enhanced) return;
      const h = Math.max(1, global.innerHeight);
      const w = global.innerWidth;
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const scrollDistance = Math.max(1, rect.height - h);
        const progress = clamp((-rect.top) / scrollDistance);
        apply(scene, progress, h, w);
      });
    }
    function requestUpdate() {
      if (!pending && !isDestroyed) { pending = true; global.requestAnimationFrame(measureAndRender); }
    }
    function syncMode() {
      enhanced = !reduced() && scenes.length > 0 && !!global.requestAnimationFrame;
      scope.classList.toggle('ats-enhanced', enhanced);
      scope.classList.toggle('ats-manual-reduced', manualReduced);
      // CSS shows complete content in unenhanced mode; only visuals use variables.
      scenes.forEach((scene) => {
        if (!enhanced) {
          scene.style.removeProperty('--ats-image-clip');
          scene.style.removeProperty('--ats-copy-alpha');
          scene.style.removeProperty('--ats-copy-x');
          scene.style.removeProperty('--ats-copy-shift');
          scene.style.removeProperty('--ats-a-y');
          scene.style.removeProperty('--ats-b-y');
          scene.style.removeProperty('--ats-c-y');
          scene.style.removeProperty('--ats-a-alpha');
          scene.style.removeProperty('--ats-b-alpha');
          scene.style.removeProperty('--ats-c-alpha');
          scene.style.removeProperty('--ats-x-edge');
          scene.style.removeProperty('--ats-y-edge');
          scene.style.removeProperty('--ats-fragment-alpha');
          scene.style.removeProperty('--ats-fragment-shift');
        }
      });
      requestUpdate();
    }
    function onResize() { requestUpdate(); }
    function onPageshow() { requestUpdate(); }
    function onMotionChanged() { syncMode(); }
    global.addEventListener('scroll', requestUpdate, { passive: true });
    global.addEventListener('resize', onResize, { passive: true });
    global.addEventListener('pageshow', onPageshow);
    if (media) {
      if (media.addEventListener) media.addEventListener('change', onMotionChanged);
      else if (media.addListener) media.addListener(onMotionChanged);
    }
    const controller = {
      refresh: requestUpdate,
      setReduced: function (value) { manualReduced = !!value; syncMode(); },
      destroy: function () {
        if (isDestroyed) return;
        isDestroyed = true;
        global.removeEventListener('scroll', requestUpdate);
        global.removeEventListener('resize', onResize);
        global.removeEventListener('pageshow', onPageshow);
        if (media) {
          if (media.removeEventListener) media.removeEventListener('change', onMotionChanged);
          else if (media.removeListener) media.removeListener(onMotionChanged);
        }
        scope.classList.remove('ats-enhanced', 'ats-manual-reduced');
        scenes.forEach((scene) => scene.removeAttribute('style'));
        delete scope.__atrezzoScrollSections;
      }
    };
    scope.__atrezzoScrollSections = controller;
    syncMode();
    return controller;
  }
  global.AtrezzoScrollSections = Object.freeze({ init: init, version: '1.0.0' });
})(window);
