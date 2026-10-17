"use client";

import * as React from "react";
import type { MotionValue } from "motion/react";

/* ── Signal from Noise ───────────────────────────────────────────
 * The process chapter's visual. Points drift as a loose
 * constellation; as `progress` goes 0 → 1 they fly into a dot-matrix bar
 * chart that rises left to right. Each point has its own delay so the
 * chart assembles in a wave rather than all at once, and the cursor pushes
 * nearby points aside.
 *
 * Plain 2D canvas: a few hundred points is well within budget and avoids
 * shipping three.js for the first paint. It pauses off-screen, draws a
 * single still frame for reduced motion, and halves the point count on
 * low-power devices.
 * ─────────────────────────────────────────────────────────────── */

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Target slot in the chart; NaN for points that fade out instead. */
  tx: number;
  ty: number;
  /** Cursor push, eased toward the desired offset each frame. */
  ox: number;
  oy: number;
  r: number;
  delay: number;
  /** Top dot of a bar: drawn in sky blue once formed. */
  peak: boolean;
};

// Brand blues on a dark ground: bars in signal blue, bar tops in sky,
// loose points in a pale ink.
const SIGNAL = [59, 140, 255];
const SKY = [56, 198, 244];
const FG = [190, 200, 214];

function lowPower() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (
    (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4 || nav.connection?.saveData === true
  );
}

/** Slots for a rising bar chart inside the given box, roughly `want` of them. */
function chartSlots(box: { x: number; y: number; w: number; h: number }, bars: number, want: number) {
  const barDots = 2;
  const gapDots = 1;
  const cols = bars * barDots + (bars - 1) * gapDots;
  const heights = Array.from({ length: bars }, (_, b) => {
    const t = (b + 1) / bars;
    const wobble = b === Math.floor(bars * 0.35) ? -0.12 : b === Math.floor(bars * 0.7) ? -0.06 : 0;
    return Math.max(0.12, 0.16 + 0.84 * Math.pow(t, 1.5) + wobble);
  });
  // Dots in the chart ≈ rows × area. Choose rows so that stays under
  // `want` (every slot gets a point, so the tallest bar is never missing),
  // then the largest pitch that fits the box both ways.
  const area = heights.reduce((sum, f) => sum + f, 0) * barDots;
  const rows = Math.max(4, Math.floor(want / area));
  const s = Math.min(box.w / cols, box.h / rows);
  const slots: { x: number; y: number; peak: boolean }[] = [];
  const left = box.x + box.w - cols * s;
  const baseline = box.y + box.h;
  heights.forEach((f, b) => {
    const n = Math.max(2, Math.round(rows * f));
    for (let row = 0; row < n; row++) {
      for (let c = 0; c < barDots; c++) {
        const col = b * (barDots + gapDots) + c;
        slots.push({ x: left + col * s + s / 2, y: baseline - row * s - s / 2, peak: row === n - 1 });
      }
    }
  });
  return { slots, pitch: s };
}

type Box = { x: number; y: number; w: number; h: number };

/** Default layout: the chart fills most of the canvas, baseline near the bottom. */
const frameLayout = (w: number, h: number): Box => ({ x: w * 0.08, y: h * 0.14, w: w * 0.84, h: h * 0.66 });

export function SignalField({
  progress,
  className,
  layout = frameLayout,
}: {
  progress: MotionValue<number>;
  className?: string;
  layout?: (w: number, h: number) => Box;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scale = lowPower() ? 0.55 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let points: Point[] = [];
    let pitch = 10;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(300, Math.max(110, (w * h) / 3200)) * scale);
      const box = layout(w, h);
      const chart = chartSlots(box, w >= 520 ? 10 : 8, count * 0.85);
      pitch = chart.pitch;

      points = Array.from({ length: count }, (_, i) => {
        const slot = chart.slots[i];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          tx: slot ? slot.x : NaN,
          ty: slot ? slot.y : NaN,
          ox: 0,
          oy: 0,
          r: 0.6 + Math.random() * 1.4,
          // Left bars land first, with jitter, so the chart builds as a wave.
          delay: slot ? Math.min(1, (slot.x - box.x) / box.w) * 0.6 + Math.random() * 0.25 : Math.random(),
          peak: slot?.peak ?? false,
        };
      });
    };

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = (animate: boolean) => {
      const p = Math.min(1, Math.max(0, progress.get() / 0.7));
      ctx.clearRect(0, 0, w, h);
      const linkDist = Math.min(140, Math.max(90, w / 12));
      const pos: { x: number; y: number; e: number }[] = new Array(points.length);

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (animate) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.x < -10) pt.x = w + 10;
          if (pt.x > w + 10) pt.x = -10;
          if (pt.y < -10) pt.y = h + 10;
          if (pt.y > h + 10) pt.y = -10;
        }
        const e = ease(Math.min(1, Math.max(0, p * 1.6 - pt.delay * 0.6)));
        const hasSlot = !Number.isNaN(pt.tx);
        let x = hasSlot ? pt.x + (pt.tx - pt.x) * e : pt.x;
        let y = hasSlot ? pt.y + (pt.ty - pt.y) * e : pt.y;

        // Cursor pushes points away; formed points barely move.
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.hypot(dx, dy);
        const radius = 140;
        const push = d < radius && d > 0 ? ((1 - d / radius) * 28 * (1 - e * 0.8)) / d : 0;
        pt.ox += (dx * push - pt.ox) * 0.12;
        pt.oy += (dy * push - pt.oy) * 0.12;
        x += pt.ox;
        y += pt.oy;
        pos[i] = { x, y, e: hasSlot ? e : -e };
      }

      // Constellation links fade out as the chart forms.
      const linkAlpha = 0.2 * (1 - p);
      if (linkAlpha > 0.005) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < pos.length; i++) {
          for (let j = i + 1; j < pos.length; j++) {
            const dx = pos[i].x - pos[j].x;
            const dy = pos[i].y - pos[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 > linkDist * linkDist) continue;
            const a = (1 - Math.sqrt(d2) / linkDist) * linkAlpha;
            ctx.strokeStyle = `rgba(${SIGNAL[0]},${SIGNAL[1]},${SIGNAL[2]},${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[j].x, pos[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const { x, y, e } = pos[i];
        // Negative e: a point with no slot, fading away as the chart forms.
        const formed = Math.max(0, e);
        const alpha = e < 0 ? (0.5 + pt.r * 0.2) * (1 + e) : 0.45 + pt.r * 0.15 + formed * 0.35;
        if (alpha <= 0.01) continue;
        const to = pt.peak ? SKY : SIGNAL;
        const c = FG.map((v, k) => Math.round(v + (to[k] - v) * formed));
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${Math.min(1, alpha).toFixed(3)})`;
        const r = pt.r + (pitch * 0.28 - pt.r) * formed;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || raf || !visible) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    if (reduce) draw(false);
    else start();

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(false);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const unsubscribe = reduce ? progress.on("change", () => draw(false)) : undefined;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      unsubscribe?.();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [progress, layout]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
