/*
 * The office illustration behind <GrowthScroll>: one room that builds up as
 * scroll progress goes 0 → 1 (bare shell, planning, busy floor, milestone
 * wall). People are drawn like the "i" in the MIL logo. Static shapes live in
 * SCENE_MARKUP; repeated ones are generated in buildScene(), which returns a
 * render(progress) function. Brand colours from the Brand Book 2025.
 */

const NS = "http://www.w3.org/2000/svg";

export const SCENE_MARKUP = `
<defs>
  <linearGradient id="gs-sky" x1="0" y1="0" x2="0" y2="1">
    <stop data-sky="top" offset="0" stop-color="#8fa3bd"/><stop data-sky="bottom" offset="1" stop-color="#cfd8e3"/>
  </linearGradient>
  <linearGradient id="gs-floor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#46536b"/><stop offset="1" stop-color="#1b2437"/>
  </linearGradient>
  <linearGradient id="gs-col" x1="0" x2="1">
    <stop offset="0" stop-color="#55637b"/><stop offset=".5" stop-color="#7a889f"/><stop offset="1" stop-color="#58667d"/>
  </linearGradient>
  <linearGradient id="gs-shaft" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".36"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="gs-shaft-warm" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FAAF40" stop-opacity=".55"/><stop offset="1" stop-color="#FAAF40" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="gs-screen" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1B3C7F"/><stop offset="1" stop-color="#00ADEE"/>
  </linearGradient>
  <linearGradient id="gs-leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6bb27d"/><stop offset="1" stop-color="#3d8658"/></linearGradient>
  <radialGradient id="gs-glow"><stop offset="0" stop-color="#FAAF40" stop-opacity=".8"/><stop offset="1" stop-color="#FAAF40" stop-opacity="0"/></radialGradient>
  <radialGradient id="gs-wash" cx=".78" cy=".32" r=".85">
    <stop offset="0" stop-color="#FAAF40" stop-opacity=".85"/><stop offset=".6" stop-color="#FAAF40" stop-opacity=".25"/><stop offset="1" stop-color="#FAAF40" stop-opacity="0"/>
  </radialGradient>
  <filter id="gs-grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 .05  0 0 0 0 .08  0 0 0 0 .14  1.4 0 0 0 -.5"/>
  </filter>
</defs>

<!-- shell: ceiling, back wall, concrete seams -->
<rect x="0" y="0" width="1600" height="126" fill="#19233b"/>
<rect x="0" y="98" width="1600" height="28" fill="#232f4d"/>
<rect x="0" y="66" width="1600" height="12" fill="#0c1426"/>
<path d="M120 66V98M420 66V98M720 66V98M1020 66V98M1320 66V98M1580 66V98" stroke="#0c1426" stroke-width="5"/>
<rect x="0" y="126" width="1600" height="594" fill="#69778f"/>
<path d="M0 214H1600M0 302H1600M0 390H1600M0 478H1600M0 566H1600M0 654H1600" stroke="#000" stroke-opacity=".13" stroke-width="2"/>
<rect x="0" y="126" width="1600" height="594" filter="url(#gs-grain)" opacity=".4"/>

<!-- step 02: wall gets painted, navy accent behind the board -->
<g class="fx" data-fx="wipe" data-in=".22,.38">
  <rect x="270" y="126" width="740" height="594" fill="#e6e3dc"/>
  <rect x="660" y="126" width="350" height="594" fill="#1B3C7F"/>
  <rect x="270" y="702" width="740" height="18" fill="#cdc9bf"/>
</g>

<!-- window -->
<rect x="1010" y="140" width="550" height="550" fill="url(#gs-sky)"/>
<path d="M1010 610C1090 548 1160 592 1230 566S1400 540 1560 596V690H1010Z" fill="#53688a" opacity=".5"/>
<path d="M1010 640C1100 600 1190 628 1290 606S1460 600 1560 632V690H1010Z" fill="#41567a" opacity=".6"/>
<g fill="#34486b" opacity=".7">
  <rect x="1060" y="560" width="30" height="100"/><rect x="1100" y="590" width="24" height="70"/>
  <rect x="1232" y="548" width="34" height="112"/><rect x="1272" y="580" width="22" height="80"/>
  <rect x="1420" y="566" width="30" height="96"/><rect x="1458" y="596" width="26" height="66"/>
</g>
<circle class="fx" data-in=".76,.92" cx="1420" cy="330" r="190" fill="url(#gs-glow)"/>
<path d="M1010 140H1250L1010 400Z" fill="#fff" opacity=".07"/>
<rect x="1010" y="140" width="550" height="550" fill="none" stroke="#0f1a30" stroke-width="14"/>
<path d="M1194 140V690M1378 140V690M1010 415H1560" stroke="#0f1a30" stroke-width="9"/>
<rect x="1000" y="690" width="570" height="14" fill="#2b3752"/>

<!-- concrete column -->
<rect x="170" y="0" width="100" height="720" fill="url(#gs-col)"/>
<rect x="170" y="0" width="100" height="720" filter="url(#gs-grain)" opacity=".35"/>
<rect x="176" y="0" width="4" height="720" fill="#fff" opacity=".1"/>
<rect x="158" y="700" width="124" height="20" fill="#4a566c"/>

<!-- floor and light from the window -->
<rect x="0" y="704" width="1600" height="196" fill="url(#gs-floor)"/>
<path d="M0 764H1600M0 836H1600" stroke="#fff" stroke-opacity=".05" stroke-width="2"/>
<polygon points="1010,704 1560,704 1440,900 640,900" fill="url(#gs-shaft)" opacity=".5"/>
<polygon class="fx" data-in=".72,.95" data-max=".9" points="1010,704 1560,704 1440,900 640,900" fill="url(#gs-shaft-warm)"/>

<g data-layer="pendants"></g>

<!-- step 01 leftovers, they leave in step 02 -->
<g class="fx" data-out=".2,.34" data-dx="-60">
  <ellipse cx="760" cy="784" rx="76" ry="8" fill="#000" opacity=".3"/>
  <rect x="700" y="704" width="112" height="78" fill="#a98d69"/>
  <rect x="748" y="704" width="16" height="78" fill="#c8b18a"/>
  <rect x="728" y="642" width="80" height="62" fill="#b79a74"/>
  <rect x="760" y="642" width="14" height="62" fill="#cdb78f"/>
  <polygon points="826,792 968,782 996,832 846,852" fill="#d8d2c6" opacity=".5"/>
  <g transform="rotate(-8 296 712)">
    <rect x="286" y="560" width="20" height="152" rx="10" fill="#d4e2f5"/>
    <path d="M286 602H306M286 692H306" stroke="#00ADEE" stroke-width="3"/>
  </g>
</g>
<g class="fx" data-out=".2,.34" data-dx="30">
  <rect x="984" y="610" width="12" height="76" rx="6" fill="#2a3a5c"/>
  <rect x="984" y="676" width="64" height="11" rx="5" fill="#2a3a5c"/>
  <rect x="1013" y="687" width="6" height="30" fill="#18233c"/>
  <path d="M990 722H1042" stroke="#18233c" stroke-width="5" stroke-linecap="round"/>
</g>

<!-- desk: always here -->
<ellipse cx="1180" cy="730" rx="150" ry="9" fill="#000" opacity=".28"/>
<rect x="1060" y="654" width="10" height="72" fill="#7a5a3a"/>
<rect x="1290" y="654" width="10" height="72" fill="#7a5a3a"/>
<rect x="1050" y="640" width="260" height="14" rx="3" fill="#b88a5a"/>
<rect x="1122" y="628" width="70" height="12" rx="3" fill="#c9d1dc"/>
<rect x="1058" y="632" width="24" height="8" rx="2" fill="#1d2433"/>
<path d="M1070 632L1062 600L1100 586" stroke="#1d2433" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1092 580L1112 590L1100 598Z" fill="#1d2433"/>

<!-- step 03: desk row grows, monitors switch on -->
<g class="fx" data-in=".5,.57" data-dx="40">
  <rect x="1310" y="640" width="190" height="14" rx="3" fill="#b88a5a"/>
  <rect x="1478" y="654" width="10" height="72" fill="#7a5a3a"/>
</g>
<g data-layer="monitors"></g>

<!-- step 02: whiteboard + trinity diagram -->
<g class="fx" data-in=".26,.35" data-dy="24">
  <path d="M736 632L728 744M906 632L914 744" stroke="#59657c" stroke-width="6" stroke-linecap="round"/>
  <circle cx="728" cy="749" r="5" fill="#2a3347"/><circle cx="914" cy="749" r="5" fill="#2a3347"/>
  <rect x="716" y="480" width="200" height="152" rx="6" fill="#f4f6fa" stroke="#aeb7c6" stroke-width="6"/>
  <rect x="740" y="632" width="152" height="7" rx="3" fill="#8793a8"/>
</g>
<g data-layer="diagram"></g>

<g data-layer="people-back"></g>

<!-- communal table + laptops -->
<g class="fx" data-in=".28,.37" data-dx="60">
  <ellipse cx="1180" cy="806" rx="310" ry="12" fill="#000" opacity=".3"/>
  <rect x="900" y="730" width="560" height="74" fill="#a47848"/>
  <rect x="900" y="730" width="560" height="6" fill="#000" opacity=".12"/>
  <rect x="892" y="716" width="576" height="16" rx="4" fill="#c99d68"/>
</g>
<g data-layer="table"></g>

<!-- step 04 -->
<g data-layer="milestones"></g>
<g data-layer="people-front"></g>

<!-- light -->
<rect data-layer="dim" x="0" y="0" width="1600" height="900" fill="#07112a" opacity=".46"/>
<g data-layer="glow">
  <circle cx="1100" cy="612" r="110" fill="url(#gs-glow)" opacity=".55"/>
</g>
<rect class="fx" data-in=".74,.96" data-max=".6" x="0" y="0" width="1600" height="900" fill="url(#gs-wash)" style="mix-blend-mode:soft-light"/>
<g data-layer="confetti"></g>
`;

type Attrs = Record<string, string | number>;
type Fx = { in?: number[]; out?: number[]; dx?: number; dy?: number; fx?: "grow" | "wipe" | "draw" | "pop"; max?: number };
type Person = {
  x: number;
  y: number;
  c: string;
  in: number[];
  sc?: number;
  bh?: number;
  sit?: boolean;
  point?: [number, number];
  notebook?: boolean;
  phone?: boolean;
  cheer?: number[] | false;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => {
  t = clamp(t);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mixHex = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  return "#" + A.map((v, i) => Math.round(mix(v, B[i], t)).toString(16).padStart(2, "0")).join("");
};

/** Fills the generated layers of the scene and returns its renderer. */
export function buildScene(svg: SVGSVGElement) {
  const layer = (name: string) => svg.querySelector<SVGGElement>(`[data-layer="${name}"]`)!;
  const el = (tag: string, attrs: Attrs, parent: Element) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    parent.appendChild(e);
    return e;
  };
  // Describes when and how a node appears; in/out are scroll-progress windows [start, end].
  const fx = <T extends SVGElement>(node: T, o: Fx) => {
    node.classList.add("fx");
    if (o.in) node.dataset.in = o.in.join(",");
    if (o.out) node.dataset.out = o.out.join(",");
    if (o.dx) node.dataset.dx = String(o.dx);
    if (o.dy) node.dataset.dy = String(o.dy);
    if (o.fx) node.dataset.fx = o.fx;
    if (o.max) node.dataset.max = String(o.max);
    return node;
  };
  const g = (parent: Element, o: Fx) => fx(el("g", {}, parent) as SVGGElement, o);

  /* people, drawn like the logo's "i" (round head, rounded-top body) */
  function person(parent: Element, o: Person) {
    const sc = o.sc ?? 1;
    const w = 34 * sc;
    const bh = (o.bh ?? 104) * sc;
    const r = 14 * sc;
    const { x, y, c } = o;
    const p = g(parent, { in: o.in, dy: 14 });
    if (!o.sit) el("ellipse", { cx: x, cy: y + 2, rx: 24 * sc, ry: 5 * sc, fill: "#000", "fill-opacity": 0.3 }, p);
    el("path", { d: `M${x - w / 2} ${y}V${y - bh + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w / 2} ${y - bh + w / 2}V${y}Z`, fill: c }, p);
    el("circle", { cx: x, cy: y - bh - r - 4 * sc, r, fill: c }, p);
    const shoulderY = y - bh + 16 * sc;
    if (o.point) {
      const a = g(p, { out: [0.88, 0.94] });
      el("line", { x1: x + w / 2 - 4, y1: shoulderY, x2: o.point[0], y2: o.point[1], stroke: c, "stroke-width": 9 * sc, "stroke-linecap": "round" }, a);
    }
    if (o.notebook) {
      const a = g(p, { out: [0.88, 0.94] });
      el("rect", { x: x + 14 * sc, y: shoulderY + 18 * sc, width: 18 * sc, height: 24 * sc, rx: 2, fill: "#f4f6fa", transform: `rotate(-12 ${x + 20 * sc} ${shoulderY + 30 * sc})` }, a);
    }
    if (o.phone) {
      const px = x + w / 2 + 8 * sc;
      const py = y - bh - 10 * sc;
      el("rect", { x: px, y: py, width: 13 * sc, height: 23 * sc, rx: 3, fill: "#0b1427", transform: `rotate(-18 ${px} ${py})` }, p);
      el("rect", { x: px + 2, y: py + 2, width: 9 * sc, height: 17 * sc, rx: 2, fill: "#00ADEE", transform: `rotate(-18 ${px} ${py})` }, p);
    }
    if (o.cheer !== false) {
      const a = g(p, { in: o.cheer || [0.9, 0.96], dy: 8 });
      [-1, 1].forEach((s) =>
        el("line", { x1: x + s * (w / 2 - 3), y1: shoulderY, x2: x + s * (w / 2 + 22 * sc), y2: y - bh - 38 * sc, stroke: c, "stroke-width": 9 * sc, "stroke-linecap": "round" }, a),
      );
    }
  }

  const back = layer("people-back");
  const front = layer("people-front");
  // step 02: strategist at the board, colleague taking notes
  person(back, { x: 880, y: 802, c: "#00ADEE", in: [0.34, 0.43], point: [852, 640] });
  person(back, { x: 690, y: 802, c: "#EAF1FA", in: [0.37, 0.46], notebook: true });
  // step 03: seated behind the communal table
  (
    [
      [966, "#EAF1FA", 0.54],
      [1060, "#FAAF40", 0.57, true],
      [1166, "#1B3C7F", 0.6],
      [1260, "#FAAF40", 0.63],
      [1348, "#1B3C7F", 0.66],
    ] as const
  ).forEach(([x, c, s, phone]) => person(back, { x, y: 736, c, in: [s, s + 0.08], sit: true, bh: 64, phone: Boolean(phone) }));
  // step 04: the team gathers in front
  (
    [
      [640, "#EAF1FA", 0.82],
      [736, "#00ADEE", 0.84],
      [818, "#FAAF40", 0.86],
      [1002, "#EAF1FA", 0.88],
      [1100, "#00ADEE", 0.9],
    ] as const
  ).forEach(([x, c, s]) => person(front, { x, y: 856, sc: 1.14, c, in: [s, s + 0.07], cheer: [0.92, 0.97] }));

  /* the Trinity on the whiteboard (step 02) */
  const dg = layer("diagram");
  const ring = (cx: number, cy: number, r: number, stroke: string, a: number, b: number) =>
    fx(el("path", { d: `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`, fill: "none", stroke, "stroke-width": 4, "stroke-linecap": "round", pathLength: 1 }, dg) as SVGElement, { fx: "draw", in: [a, b] });
  ring(780, 528, 28, "#00ADEE", 0.32, 0.38);
  ring(812, 528, 28, "#1B3C7F", 0.34, 0.4);
  ring(796, 556, 28, "#FAAF40", 0.36, 0.42);
  (
    [
      [852, 40, "#1B3C7F", 0.4, 0.44],
      [872, 62, "#00ADEE", 0.42, 0.46],
      [892, 84, "#FAAF40", 0.44, 0.48],
    ] as const
  ).forEach(([x, h, c, a, b]) => fx(el("rect", { x, y: 608 - h, width: 14, height: h, rx: 2, fill: c }, dg) as SVGElement, { fx: "grow", in: [a, b] }));
  fx(el("path", { d: "M846 611H910", stroke: "#8793a8", "stroke-width": 3, "stroke-linecap": "round" }, dg) as SVGElement, { in: [0.4, 0.46] });
  fx(el("rect", { x: 860, y: 490, width: 18, height: 18, fill: "#FAAF40", transform: "rotate(-8 869 499)" }, dg) as SVGElement, { in: [0.42, 0.48] });
  fx(el("rect", { x: 884, y: 494, width: 18, height: 18, fill: "#00ADEE", transform: "rotate(7 893 503)" }, dg) as SVGElement, { in: [0.44, 0.5] });

  /* table items: laptops, notes, plants, award */
  const tb = layer("table");
  [966, 1166, 1348].forEach((cx, i) => {
    const l = g(tb, { in: [0.34 + i * 0.02, 0.42 + i * 0.02], dy: 10 });
    el("rect", { x: cx - 32, y: 676, width: 64, height: 40, rx: 4, fill: "#cdd5df" }, l);
    el("circle", { cx, cy: 696, r: 3.5, fill: "#aeb8c6" }, l);
  });
  (
    [
      [1030, "#FAAF40"],
      [1250, "#00ADEE"],
      [1432, "#EAF1FA"],
    ] as const
  ).forEach(([x, c], i) => fx(el("rect", { x, y: 706, width: 14, height: 10, fill: c }, tb) as SVGElement, { in: [0.4 + i * 0.02, 0.46 + i * 0.02], dy: 6 }));
  const plant = (x: number, a: number) => {
    const pg = g(tb, { fx: "grow", in: [a, a + 0.08] });
    el("path", { d: `M${x - 11} 716l3 -20h16l3 20z`, fill: "#e6e3dc" }, pg);
    [
      [-8, -26],
      [0, -34],
      [8, -26],
    ].forEach(([dx, dy], k) =>
      el("ellipse", { cx: x + dx, cy: 696 + dy / 2 - 6, rx: 5, ry: 14, fill: k === 1 ? "#4f9d6a" : "#3f8a5a", transform: `rotate(${(k - 1) * 28} ${x + dx} 696)` }, pg),
    );
  };
  plant(1100, 0.56);
  plant(1296, 0.6);
  plant(1420, 0.64);
  const trophy = g(tb, { fx: "pop", in: [0.88, 0.94] });
  el("path", { d: "M1196 678h28v16a14 14 0 0 1-28 0z", fill: "#FAAF40" }, trophy);
  el("path", { d: "M1196 682h-8a8 8 0 0 0 8 12M1224 682h8a8 8 0 0 1-8 12", fill: "none", stroke: "#FAAF40", "stroke-width": 3 }, trophy);
  el("rect", { x: 1207, y: 704, width: 6, height: 8, fill: "#FAAF40" }, trophy);
  el("rect", { x: 1198, y: 710, width: 24, height: 6, rx: 2, fill: "#e08f1c" }, trophy);

  /* monitors (step 03) */
  const mon = layer("monitors");
  [1215, 1318, 1410].forEach((x, i) => {
    const m = g(mon, { in: [0.52 + i * 0.03, 0.6 + i * 0.03] });
    el("rect", { x: x + 32, y: 624, width: 8, height: 12, fill: "#0b1427" }, m);
    el("rect", { x: x + 20, y: 636, width: 32, height: 4, rx: 2, fill: "#0b1427" }, m);
    el("rect", { x, y: 578, width: 72, height: 46, rx: 4, fill: "#0b1427" }, m);
    const s = g(m, { in: [0.6 + i * 0.03, 0.68 + i * 0.03] });
    el("rect", { x: x + 4, y: 582, width: 64, height: 38, rx: 2, fill: "url(#gs-screen)" }, s);
    if (i === 1) {
      fx(el("path", { d: `M${x + 9} 610L${x + 23} 600L${x + 35} 606L${x + 49} 592L${x + 63} 586`, fill: "none", stroke: "#fff", "stroke-width": 2.6, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 1 }, s) as SVGElement, { fx: "draw", in: [0.66, 0.74] });
      el("circle", { cx: x + 63, cy: 586, r: 3, fill: "#FAAF40" }, s);
    } else {
      [14, 22, 18, 30].forEach((h, j) =>
        fx(el("rect", { x: x + 10 + j * 13, y: 616 - h, width: 8, height: h, rx: 1.5, fill: j === 3 ? "#FAAF40" : "#fff", "fill-opacity": j === 3 ? 1 : 0.88 }, s) as SVGElement, {
          fx: "grow",
          in: [0.64 + i * 0.03 + j * 0.01, 0.71 + i * 0.03 + j * 0.012],
        }),
      );
    }
  });

  /* pendants (step 03) */
  const pd = layer("pendants");
  const gl = layer("glow");
  [770, 1000, 1230].forEach((x, i) => {
    const l = g(pd, { in: [0.54 + i * 0.02, 0.62 + i * 0.02], dy: -70 });
    el("path", { d: `M${x} 120V230`, stroke: "#0c1426", "stroke-width": 3 }, l);
    el("path", { d: `M${x - 30} 264Q${x - 30} 226 ${x} 226T${x + 30} 264Z`, fill: "#e6e3dc" }, l);
    fx(el("circle", { cx: x, cy: 276, r: 150, fill: "url(#gs-glow)" }, gl) as SVGElement, { in: [0.6 + i * 0.02, 0.72 + i * 0.02], max: 0.42 });
  });

  /* milestone wall (step 04) */
  const mw = layer("milestones");
  const base = 400;
  [40, 80, 120, 165, 215].forEach((h, i) => {
    const x = 720 + i * 52;
    const a = 0.76 + i * 0.028;
    fx(el("rect", { x, y: base - h, width: 38, height: h, rx: 9, fill: i === 4 ? "#FAAF40" : "#00ADEE" }, mw) as SVGElement, { fx: "grow", in: [a, a + 0.06] });
    if (i > 0) {
      const f = g(mw, { in: [0.84 + i * 0.018, 0.9 + i * 0.018], dy: 8 });
      el("rect", { x: x + 18, y: base - h - 28, width: 3, height: 28, fill: "#fff" }, f);
      el("path", { d: `M${x + 21} ${base - h - 28}l17 7l-17 7z`, fill: "#fff" }, f);
    }
  });
  el("path", { d: "M706 403H982", stroke: "#fff", "stroke-opacity": 0.4, "stroke-width": 3, "stroke-linecap": "round" }, mw);
  fx(el("path", { d: "M708 352C790 342 860 282 960 152", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", pathLength: 1 }, mw) as SVGElement, { fx: "draw", in: [0.86, 0.95] });
  fx(el("path", { d: "M936 160L960 150L957 176", fill: "none", stroke: "#fff", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, mw) as SVGElement, { in: [0.94, 0.98] });

  // fiddle-leaf fig, right edge
  const fig = g(mw, { fx: "grow", in: [0.78, 0.9] });
  el("path", { d: "M1508 760h54l-6 42h-42z", fill: "#e6e3dc" }, fig);
  el("path", { d: "M1535 762C1531 700 1541 620 1535 520", fill: "none", stroke: "#6b4f35", "stroke-width": 6, "stroke-linecap": "round" }, fig);
  [
    [-1, 722],
    [1, 690],
    [-1, 652],
    [1, 616],
    [-1, 580],
    [1, 548],
    [0, 508],
  ].forEach(([s, y], i) => el("ellipse", { cx: 1535 + s * 34, cy: y, rx: 24, ry: 46, fill: i % 2 ? "url(#gs-leaf)" : "#3f8a5a", transform: `rotate(${s * 48} ${1535 + s * 34} ${y})` }, fig));

  /* confetti */
  const cf = g(layer("confetti"), { in: [0.93, 1], max: 0.95 });
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const cols = ["#FAAF40", "#00ADEE", "#EAF1FA", "#F13F2D"];
  for (let i = 0; i < 26; i++) {
    const c = el("rect", { x: 690 + rnd() * 780, y: 140 + rnd() * 240, width: 6 + rnd() * 5, height: 4 + rnd() * 4, rx: 1, fill: cols[i % 4], class: "conf" }, cf) as SVGElement;
    c.style.setProperty("--d", (-rnd() * 3).toFixed(2) + "s");
    c.style.setProperty("--dur", (2.4 + rnd() * 2).toFixed(2) + "s");
  }

  /* renderer */
  const nodes = [...svg.querySelectorAll<SVGElement>(".fx")].map((n) => {
    const [s, e] = (n.dataset.in || "-1,0").split(",").map(Number);
    return {
      n,
      s,
      e,
      out: n.dataset.out ? n.dataset.out.split(",").map(Number) : null,
      dx: Number(n.dataset.dx) || 0,
      dy: Number(n.dataset.dy) || 0,
      max: n.dataset.max ? Number(n.dataset.max) : 1,
      kind: n.dataset.fx || "fade",
    };
  });
  const dim = layer("dim");
  const skyTop = svg.querySelector('[data-sky="top"]')!;
  const skyBottom = svg.querySelector('[data-sky="bottom"]')!;

  return function render(p: number) {
    for (const o of nodes) {
      let a = ease((p - o.s) / (o.e - o.s));
      if (o.out) a = Math.min(a, 1 - ease((p - o.out[0]) / (o.out[1] - o.out[0])));
      const st = o.n.style;
      if (o.kind === "grow") {
        st.opacity = a > 0.001 ? "1" : "0";
        st.transform = `scaleY(${a})`;
      } else if (o.kind === "wipe") {
        st.opacity = a > 0.001 ? "1" : "0";
        st.transform = `scaleX(${a})`;
      } else if (o.kind === "draw") {
        st.opacity = a > 0.001 ? "1" : "0";
        st.strokeDashoffset = String(1 - a);
      } else if (o.kind === "pop") {
        st.opacity = String(a);
        st.transform = `scale(${0.4 + 0.6 * a})`;
      } else {
        st.opacity = String(a * o.max);
        st.transform = o.dx || o.dy ? `translate(${o.dx * (1 - a)}px, ${o.dy * (1 - a)}px)` : "";
      }
    }
    dim.setAttribute("opacity", (0.46 * (1 - ease((p - 0.02) / 0.86))).toFixed(3));
    const t = ease((p - 0.7) / 0.22);
    skyTop.setAttribute("stop-color", mixHex("#8fa3bd", "#f4bf68", t));
    skyBottom.setAttribute("stop-color", mixHex("#cfd8e3", "#ffe9bd", t));
  };
}

/** Crops the 1600×900 scene to the element's aspect ratio, keeping the action in frame. */
export function fitScene(svg: SVGSVGElement) {
  const r = svg.getBoundingClientRect();
  const asp = (r.width || innerWidth) / (r.height || innerHeight);
  let vw: number, vh: number, vx: number, vy: number;
  if (asp >= 16 / 9) {
    vw = 1600;
    vh = 1600 / asp;
    vx = 0;
    vy = clamp(470 - vh / 2, 0, 900 - vh);
  } else {
    vh = 900;
    vw = 900 * asp;
    vx = clamp(mix(880, 1000, clamp((16 / 9 - asp) / (16 / 9 - 0.5))) - vw / 2, 0, 1600 - vw);
    vy = 0;
  }
  svg.setAttribute("viewBox", `${vx.toFixed(1)} ${vy.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`);
}
