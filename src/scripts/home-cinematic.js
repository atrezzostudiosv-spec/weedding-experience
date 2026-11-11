/*
 * ATREZZO — Wedding Home Motion.
 * Original implementation, inspired by the observed visual language of Spain Collection.
 * Native scroll; no scroll hijacking, third-party requests, dependencies, or copied theme scripts.
 * Existing approved Navigation / VEIL / Buttons / Expand engines remain untouched.
 */
(() => {
  "use strict";
  const root = document.documentElement;
  const story = document.querySelector("[data-romance-story]");
  const collage = document.querySelector("[data-romance-collage]");
  if (!story || !collage) return;

  const desktop = window.matchMedia("(min-width: 1101px)");
  const allowed = window.matchMedia("(prefers-reduced-motion: no-preference)");
  const photos = Array.from(collage.querySelectorAll("[data-drift-x]"));
  const moments = Array.from(story.querySelectorAll("[data-romance-moment]"));
  const counter = story.querySelector("[data-romance-count]");
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  let enabled = false;
  let scheduled = false;

  const progressOf = (element) => {
    const rect = element.getBoundingClientRect();
    return clamp(-rect.top / Math.max(1, rect.height - window.innerHeight), 0, 1);
  };

  function render() {
    scheduled = false;
    if (!enabled) return;

    const p = progressOf(collage);
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    for (const img of photos) {
      const x = Number(img.dataset.driftX || 0);
      const y = Number(img.dataset.driftY || 0);
      img.style.transform = `translate3d(${((p - 0.5) * x * vw / 100).toFixed(2)}px, ${((p - 0.5) * y * vh / 100).toFixed(2)}px, 0)`;
    }

    const phase = progressOf(story) * (moments.length - 1);
    let mostVisible = 0;
    let maxOpacity = -1;
    moments.forEach((moment, index) => {
      const opacity = clamp(1 - Math.abs(phase - index), 0, 1);
      moment.style.opacity = opacity.toFixed(3);
      moment.style.transform = `scale(${(1.025 - opacity * 0.025).toFixed(4)})`;
      if (opacity > maxOpacity) {
        maxOpacity = opacity;
        mostVisible = index;
      }
    });

    moments.forEach((moment, index) => {
      moment.setAttribute("aria-hidden", String(index !== mostVisible));
    });
    if (counter) counter.textContent = String(mostVisible + 1).padStart(2, "0");
  }

  function requestRender() {
    if (enabled && !scheduled) {
      scheduled = true;
      window.requestAnimationFrame(render);
    }
  }

  function reset() {
    for (const photo of photos) photo.style.removeProperty("transform");
    for (const moment of moments) {
      moment.style.removeProperty("opacity");
      moment.style.removeProperty("transform");
      moment.removeAttribute("aria-hidden");
    }
    if (counter) counter.textContent = "01";
  }

  function setDesktopState() {
    const shouldEnable = desktop.matches && allowed.matches;
    if (shouldEnable === enabled) return;
    enabled = shouldEnable;
    if (enabled) {
      root.classList.add("romance-motion-active");
      requestRender();
    } else {
      root.classList.remove("romance-motion-active");
      reset();
    }
  }

  // Content is fully visible if JS, IntersectionObserver, or reduced-motion is unavailable.
  if (allowed.matches && "IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll("[data-romance-reveal]");
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("romance-revealed");
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
    revealElements.forEach((el) => io.observe(el));
    root.classList.add("romance-reveal-ready");
  }

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender, { passive: true });
  desktop.addEventListener("change", setDesktopState);
  allowed.addEventListener("change", () => {
    // Reverse styles when reduced motion becomes enabled while the page is open.
    root.classList.remove("romance-reveal-ready");
    document.querySelectorAll("[data-romance-reveal]").forEach((el) => el.classList.add("romance-revealed"));
    setDesktopState();
  });

  setDesktopState();
})();
