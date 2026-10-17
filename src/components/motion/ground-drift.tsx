"use client";

import * as React from "react";

const hex = (h: string) => {
  const s = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16));
};

/**
 * The page ground drifts between chapter colours instead of cutting hard
 * at section edges. Each section declares `data-ground="#rrggbb"`; as the
 * next one rises past the middle of the screen the body colour blends
 * towards it. Sections themselves stay transparent.
 */
export function GroundDrift() {
  React.useEffect(() => {
    let raf = 0;
    let last = "";
    const frame = () => {
      raf = 0;
      const els = [...document.querySelectorAll<HTMLElement>("[data-ground]")];
      if (!els.length) return;
      const vh = window.innerHeight;
      const probe = vh * 0.55;
      let i = 0;
      for (let k = 0; k < els.length; k++) if (els[k].getBoundingClientRect().top <= probe) i = k;
      const cur = hex(els[i].dataset.ground!);
      const next = els[i + 1];
      let rgb = cur;
      if (next) {
        const t = Math.min(1, Math.max(0, (probe + vh * 0.45 - next.getBoundingClientRect().top) / (vh * 0.9)));
        const n = hex(next.dataset.ground!);
        rgb = cur.map((v, j) => Math.round(v + (n[j] - v) * t));
      }
      const c = `rgb(${rgb.join(",")})`;
      if (c !== last) {
        document.body.style.backgroundColor = c;
        last = c;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.body.style.backgroundColor = "";
    };
  }, []);
  return null;
}
