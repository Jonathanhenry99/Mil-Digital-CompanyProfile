# MIL Digital Website — Project Specification

> Versi 0.2 · 17 Oktober 2026 · palet putih→biru, welcoming animation per section, homepage v1 dibangun
> Sumber: brief sitemap & page inventory MIL Digital ([docs/assets/sitemap-brief.png](assets/sitemap-brief.png))

Dokumen ini adalah acuan utama untuk membangun website company profile MIL Digital: arah desain, sistem animasi, struktur halaman, model CMS, fitur tambahan, dan tahapan pengerjaan. Bagian yang masih butuh keputusan tim MIL ditandai **[TBC]** dan dirangkum di [§14 Open Questions](#14-open-questions).

---

## Daftar Isi

1. [Tujuan & Prinsip](#1-tujuan--prinsip)
2. [Sitemap & Navigasi](#2-sitemap--navigasi)
3. [Page Inventory](#3-page-inventory)
4. [Arah Desain](#4-arah-desain)
5. [Sistem Animasi](#5-sistem-animasi)
6. [Spesifikasi Per Halaman](#6-spesifikasi-per-halaman)
7. [Fitur Tambahan](#7-fitur-tambahan)
8. [CMS & Model Data](#8-cms--model-data)
9. [Tech Stack & Arsitektur](#9-tech-stack--arsitektur)
10. [SEO & Analytics](#10-seo--analytics)
11. [Performa & Aksesibilitas](#11-performa--aksesibilitas)
12. [Struktur Repository](#12-struktur-repository)
13. [Tahapan Pengerjaan](#13-tahapan-pengerjaan)
14. [Open Questions](#14-open-questions)

---

## 1. Tujuan & Prinsip

### Tujuan bisnis

1. **Membangun kredibilitas** — calon klien langsung melihat bukti: klien, angka hasil (ROAS, growth), dan case study.
2. **Mengubah pengunjung jadi lead** — setiap halaman mengarah ke booking konsultasi, WhatsApp, atau quiz.
3. **Menjadi rumah konten** — Insights & Reports memposisikan MIL sebagai "data nerds" yang otoritatif.
4. **Menyiapkan panggung ATLAS** — teaser produk yang mudah dikembangkan jadi product page penuh.

### Prinsip desain

| Prinsip | Artinya dalam praktik |
|---|---|
| **Futuristik, tapi tetap profesional** | Animasi dipakai untuk menceritakan data dan proses, bukan sekadar hiasan. Satu momen "wow" per halaman, sisanya halus. |
| **Bukti di atas klaim** | Angka, logo klien, dan hasil kampanye selalu muncul dekat dengan klaim. |
| **Selalu ada langkah berikutnya** | Setiap section penting diakhiri CTA yang relevan (booking, WA, quiz, case study terkait). |
| **Cepat dulu, megah kemudian** | Konten dan teks tampil instan; WebGL & animasi berat dimuat belakangan dan punya fallback. |
| **Mudah dikelola tim** | Konten yang sering berubah (case study, artikel, report, lowongan, logo) dikelola lewat CMS tanpa developer. |

---

### Data perusahaan (dari website lama mildigital.id)

Diambil Oktober 2026 sebagai sumber fakta; struktur dan animasi situs lama (Wix) tidak dipakai.

| Data | Isi |
|---|---|
| Positioning | Digital Marketing Consultant & Advertising Agency. "We help brands grow their presence online." |
| Tagline | **"Let's grow miles away together"** |
| Tim | Sekelompok digital marketing expert, **7 tahun pengalaman gabungan** |
| Angka | **15** certified digital marketing expert · **10+** industri · **80+** klien ditangani (situs lama) / **150+** brand (Logofolio, lebih baru) · **100+** milestone klien |
| Sertifikasi | Meta Certified Media Buying Professional, Meta Certified Digital Marketing Associate |
| Core values | Integrity · Transparency · Tailored to Your Goals · Reliable · Knowledge Sharing |
| Layanan (situs lama) | Digital Marketing Strategy & Advertising (funnel awareness → consideration → conversion) · Optimizing Your Asset & Infrastructure · Measure & Achieve KPI · Content Creation |
| Founder & CEO | **Indra Pratama**, senior digital marketing consultant; S.E. Manajemen Pemasaran, Universitas Katolik Parahyangan |
| Sub-brand | Studio Imajin (muncul di bagian Content Creation) **[TBC: hubungannya dengan MIL]** |
| Testimoni | LYLA: "Kerjasama dengan MIL sebagai konsultan menyenangkan…" |
| Blog | "Aha! Moment", 1 artikel: *7 Cara Untuk Menentukan Harga Produk* (Derian Indra Bramantio, 21 Agu 2024) |
| Alamat | **Ruko B6 Paskal Hyper Square, Ciroyom, Bandung 40181** |
| Kontak | WhatsApp +62 821-2424-2194 · Instagram @mildigital.id · email belum tercantum **[TBC]** |
| Penawaran | Free consultation (1x) via form + booking session |

Aset asli yang diambil ada di `Assets/from-old-site/` (logo MIL putih & biru 4500px, foto tim, foto CEO, badge Meta, logo Studio Imajin).

---

## 2. Sitemap & Navigasi

### Sitemap

```
Homepage (/)
├── About MIL Digital ▾                     ← menu header
│   ├── About Us                            /about-mil-digital
│   ├── What We Do (Our Service)            /our-services
│   │   ├── Digital Marketing Consultation  /our-services/digital-marketing-consultation
│   │   ├── Advertising Strategy & Optim.   /our-services/advertising-strategy-optimization
│   │   └── Creative Solution               /our-services/creative-social-media-solution
│   └── Our Works                           /our-works-case-study          (CMS)
│       └── Case Study Detail               /our-works-case-study/[slug]   (CMS)
├── Team & Career ▾                         ← menu header
│   ├── Our Team                            /our-team
│   └── Career                              /career                        (CMS)
├── Insights ▾                              ← menu header
│   ├── Insights (Articles)                 /insights                      (CMS)
│   │   └── Article Detail                  /insights/[slug]               (CMS)
│   └── Reports                             /reports                       (CMS)
│       └── Industry Report Detail          /reports/[slug]                (CMS)
├── Contact Us                              /contact-us                    ← menu header
├── ATLAS by MIL Digital                    atlas.mildigital.id [TBC]      ← menu header
├── Personalized Service (Quiz)             /get-to-know-your-brand        (bukan menu header, diakses via CTA)
└── Utility                                 /privacy · /terms · 404
```

### Header

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ [MIL logo]   About MIL Digital ▾   Team & Career ▾   Insights ▾   Contact Us   ATLAS◦soon │  [Book a Consultation →] │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- **Mega menu** untuk item ber-dropdown: kolom link di kiri, kartu preview di kanan (mis. case study unggulan dari CMS pada "About MIL Digital", artikel terbaru pada "Insights").
- **ATLAS** memakai badge kecil "Soon" yang berdenyut halus.
- **Perilaku scroll:** header transparan di atas hero → berubah menjadi bar *glass* (blur + border tipis) setelah scroll 80px → tersembunyi saat scroll ke bawah, muncul lagi saat scroll ke atas.
- **Mobile:** menu fullscreen dengan link ber-stagger, CTA booking & WA menempel di bawah layar.
- **CTA header** "Book a Consultation" membuka modal Cal.com (lihat §7.2).

### Footer

1. **CTA band besar** — headline ajakan + tombol *Book a Consultation* + *Chat on WhatsApp*.
2. Kolom link: Company, Services, Insights, Contact.
3. Alamat kantor, email, nomor WA, sosial media.
4. Detail kecil yang menguatkan kesan tech: jam lokal Bandung (WIB, live), status "Accepting new projects", tahun berjalan.
5. Link legal: Privacy · Terms.

---

## 3. Page Inventory

| Page | URL | Purpose & Key Sections | CMS |
|---|---|---|---|
| Home | `/` | Hero, stats, portofolio, case study, why MIL & values, team, services, testimonials, articles & reports, contact form | Sebagian: logo, case study, teaser artikel/report, angka stats* |
| About Us | `/about-mil-digital` | Headline, what we believe, values, services (CTA), CEO notes, portofolio klien, highlight case study (CTA), info singkat ATLAS, tombol contact (WA) | — |
| Our Service | `/our-services` | Headline, highlight 3 service (CTA ke tiap service), layanan tambahan: Web SEO, Web Dev, User Research, personalized service, tombol contact (WA) | — |
| Digital Marketing Consultation | `/our-services/digital-marketing-consultation` | MIL sebagai partner, portofolio klien, approach (assess, strategize, monitor), frameworks, case study, tombol contact (WA) | — (case study ditarik dari CMS) |
| Advertising Strategy & Optimization | `/our-services/advertising-strategy-optimization` | MIL sebagai advertising strategist, portofolio klien, platform, quick info hasil ROAS, frameworks, case study, tombol contact (WA) | — (case study ditarik dari CMS) |
| Creative Solution | `/our-services/creative-social-media-solution` | Social Media Management & Branding, portofolio industri, klien & karya, frameworks (authority-first), values (data nerds) | — (case study ditarik dari CMS) |
| Case Study Category | `/our-works-case-study` | Daftar case study dengan filter industri & skala | Ya |
| Case Study Detail | `/our-works-case-study/[slug]` | Satu halaman per case study | Ya |
| Our Team | `/our-team` | Leadership, tim per fungsi, budaya, aktivitas internal, CTA ke Career | — |
| Career | `/career` | Budaya & lowongan terbuka → form lamaran | Ya |
| Insights | `/insights` | Daftar artikel dengan kategori | Ya |
| Article Detail | `/insights/[slug]` | Artikel, penulis, related posts, CTA konsultasi | Ya |
| Reports | `/reports` | Metodologi, kenapa report ini powerful, catatan dari researcher | Ya |
| Industry Report Detail | `/reports/[slug]` | Industri & detail report | Ya |
| Contact Us | `/contact-us` | Form inquiry, booking konsultasi, tombol WA, alamat & peta | — |
| ATLAS by MIL Digital | `atlas.mildigital.id` [TBC] | Coming soon: tentang ATLAS, kenapa menarik, subscribe waitlist | — |
| Personalized Service | `/get-to-know-your-brand` | Quiz yang merekomendasikan service | Pre-defined (di kode) |
| Utility | `/privacy` · `/terms` · `404` | Privacy policy, terms of service, halaman not-found | — |

\* *Angka stats di Home tidak ada di brief sebagai CMS; diusulkan dikelola lewat CMS (Global) supaya bisa di-update tanpa deploy.*

### Catatan konsistensi dari brief

- **Nama vs URL Creative:** sitemap menulis "Creative Solution", URL memakai `creative-social-media-solution`. Usulan: label menu "Creative Solution", URL tetap seperti di inventory.
- **URL Our Works cukup panjang** (`/our-works-case-study`). Usulan opsional: `/our-works` dengan redirect 301 dari URL panjang. **[TBC]**
- **Reports** berada di bawah menu Insights tetapi URL-nya di root (`/reports`). Tidak masalah; breadcrumb tetap menampilkan `Insights / Reports`.
- **Kategori Insights & filter Case Study** cukup sebagai filter di halaman listing (`?category=`, `?industry=`), tanpa halaman kategori terpisah, sesuai inventory.

---

## 4. Arah Desain

### Konsep: **"Signal from Noise"**

MIL Digital mengubah data yang berantakan menjadi strategi yang jelas. Konsep visual mengikuti cerita itu: **partikel/titik data yang bergerak acak lalu tersusun menjadi grid, grafik, dan bentuk yang rapi.** Hasilnya terasa futuristik (WebGL, grid presisi, label monospace) tapi tetap korporat (tipografi tegas, banyak ruang kosong, warna terkendali).

Bahasa visual:

- **Blueprint grid** — garis 1px tipis dan tanda crosshair di sudut section, seperti kertas teknik atau terminal.
- **Label monospace** — eyebrow, angka, tag, dan metadata memakai font mono (`01 — APPROACH`, `ROAS 4.2x`).
- **Data sebagai ornamen** — sparkline, angka counter, dan chart mini menggantikan ilustrasi dekoratif.
- **Terang (putih → biru)** sebagai dasar, sesuai warna MIL Digital. Ambience cerah dengan aurora biru lembut, bukan korporat yang kaku.
- **Band biru tua** (`.theme-deep`) sebagai ritme di beberapa section: logo klien, showreel, panel service, footer.

### Referensi yang diambil

| Referensi | Yang diambil |
|---|---|
| linear.app | Presisi UI, gradient halus di atas gelap, tipografi rapat |
| vercel.com | Grid garis tipis, estetika developer |
| stripe.com | Data dan grafik sebagai elemen hero, kualitas detail |
| lusion.co / activetheory.net | Hero WebGL interaktif, transisi halaman |
| basement.studio / instrument.com | Agency yang berani tapi tetap terstruktur |
| apps.shopify.com/loyaltribe | Format teaser produk untuk ATLAS (screenshot fitur, poin manfaat) |

### Design tokens

> Diambil dari logo MIL (Assets/): gradient **#1C4489 → #03A5E6**. Sumber kebenaran ada di `src/app/globals.css`.

**Warna**

| Token | Terang (default) | `.theme-deep` (band biru) | Kegunaan |
|---|---|---|---|
| `--brand-gradient` | `#1C4489 → #0A6FC2 → #03A5E6` | sama | CTA utama, band logo, footer |
| `--bg` | `#F5F8FC` | `#0B2A5B` | Background halaman |
| `--surface` | `#FFFFFF` | `#0F3470` | Kartu, panel |
| `--surface-raised` | `#EAF1FA` | `#164183` | Hover, tile kosong |
| `--line` | `rgb(16 52 110 / .10)` | `rgb(255 255 255 / .14)` | Grid, border |
| `--fg` | `#0A1F3F` (navy ink) | `#F3F8FF` | Teks utama |
| `--fg-muted` | `#52647E` | `#B4C6E3` | Teks sekunder |
| `--signal` | `#0B6BCB` | `#4FB3FF` | Link, fokus, aksen |
| `--signal-soft` / `--aqua` | `#0A8FD8` / `#0596D6` | `#8FD3FF` / `#7BE6FF` | Highlight angka & data |

Komponen hanya memakai token semantik, jadi otomatis benar di dalam `.theme-deep`.

**Tipografi**

| Peran | Font | Catatan |
|---|---|---|
| Display & body | **Geist Sans** (gratis) — alternatif premium: PP Neue Montreal | Display tracking `-0.03em` |
| Label & angka | **Geist Mono** | Uppercase, tracking `+0.08em` untuk eyebrow |

Skala fluid (clamp): Display XL `56→120px`, H1 `40→80px`, H2 `32→56px`, H3 `24→32px`, Body `16→18px`, Small `14px`, Mono label `12px`.

**Layout:** grid 12 kolom, max-width 1440px, gutter 24px, margin samping 16px (mobile) / 40px (desktop). Spasi section 96px (mobile) / 160px (desktop). Radius 4px (UI) / 12px (kartu) — sudut tajam memberi kesan presisi.

---

## 5. Sistem Animasi

### Library

| Library | Dipakai untuk |
|---|---|
| **Motion** (motion.dev, React) | Semua animasi scroll & komponen: `useScroll` untuk section yang di-pin, reveal, layout/FLIP, gesture, transisi quiz |
| **CSS** (keyframes, sticky) | Reveal headline hero sebelum hydration, odometer, marquee, panel service |
| **Lenis** | Smooth scroll (menggerakkan scroll native, jadi `sticky` & `useScroll` tetap bekerja) |
| **Canvas 2D** | Hero "Signal from Noise". Tanpa three.js agar first paint ringan; R3F tetap opsi untuk ATLAS |
| **View Transitions API** | Transisi antar halaman (kartu case study → hero detail), fase berikutnya |

GSAP belum dipakai. Tambahkan hanya jika ada timeline yang tidak praktis dibuat dengan Motion.

### Motion tokens

```css
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);   /* reveal, masuk */
--ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1);  /* transisi halaman */
--dur-fast: 150ms;  /* hover, fokus */
--dur-base: 300ms;  /* UI state */
--dur-slow: 600ms;  /* reveal section */
--dur-hero: 1200ms; /* intro hero */
--stagger:  60ms;
```

### Welcoming entrance (aturan wajib)

Setiap scroll harus terasa memberi pengalaman baru. Karena itu **setiap section utama di setiap halaman punya animasi masuk sendiri**, dengan dua lapis:

1. **Sheet entrance** (`SectionEntrance`, scroll-linked, bisa maju-mundur mengikuti scroll). Variannya digilir supaya dua section berurutan tidak pernah masuk dengan cara yang sama:
   - `rise`: kartu membulat yang membesar jadi full-bleed
   - `curtain`: jendela yang melebar dari tengah
   - `tilt`: lembaran yang rebah dari bawah
2. **Koreografi khusus section** di atasnya (`Reveal`: `up` / `left` / `right` / `blur` / `tilt` / `unfold`, `SplitText`, `Odometer`).

Urutan di homepage:

| Section | Sheet | Koreografi |
|---|---|---|
| Hero | (di-pin) | headline naik per kata, partikel tersusun jadi grafik saat scroll |
| Logo klien | rise | dua baris logo meluncur dari sisi berlawanan |
| Showreel | (di-pin) | kartu video membuka jadi full screen, milestone berganti per tahun |
| Stats | tilt | sel naik bergantian, digit bergulir, sparkline tergambar |
| Works | (di-pin) | drum kartu berayun masuk, lalu berputar per case study |
| Services | curtain | panel terbuka dari bawah bergantian |
| Galeri | rise | pita lengkung muncul dari blur |
| Why MIL | tilt | tiap nilai menyala saat lewat tengah layar, rail terisi |
| Testimonial | curtain | kutipan muncul dari blur, auto-advance |
| Insights | rise | panel galeri "shutter" terbuka bergantian |
| Footer CTA | curtain | judul naik per kata, glow melebar |

Halaman lain wajib mengikuti pola ini.

### Signature interactions

| # | Interaksi | Di mana | Detail |
|---|---|---|---|
| 1 | **Signal from Noise** | Hero Home | Ratusan titik (canvas 2D) bereaksi ke kursor; saat hero di-pin dan di-scroll, titik tersusun menjadi grafik batang yang naik. Reduced motion: satu frame diam. |
| 2 | **Line-mask text reveal** | Semua heading besar | Teks muncul per baris dari balik mask, stagger 60ms. |
| 3 | **Odometer counter** | Stats, hasil case study | Angka bergulir saat masuk viewport, font mono tabular. |
| 4 | **Pinned approach story** | Halaman service | *Assess → Strategize → Monitor* di-pin, scroll horizontal per tahap dengan diagram yang bergerak. |
| 5 | **Shared-element transition** | Works → detail | Gambar kartu "terbang" menjadi hero halaman detail. |
| 6 | **Magnetic CTA** | Tombol utama (desktop) | Tombol sedikit mengikuti kursor dalam radius 40px. |
| 7 | **Infinite logo marquee** | Portofolio klien | Dua baris berlawanan arah, berhenti saat hover, logo grayscale → warna. |
| 8 | **Scroll text-fill** | Manifesto About | Kalimat "what we believe" terisi warna mengikuti scroll. |
| 9 | **Hover metric reveal** | Kartu case study | Saat hover, overlay menampilkan metrik utama (mis. `ROAS 5.1x`) dengan counter. |
| 11 | **Work wheel** | Works Home | Case study di sisi drum yang berputar saat scroll, berhenti sejenak di tiap kartu; judul kiri, indeks kanan (klik untuk lompat). |
| 12 | **Curved gallery** | Galeri Home | `components/ui/tilted-grid-hero.tsx`: pita gambar melengkung yang terus mengalir. |
| 13 | **Expanding gallery** | Insights Home | `components/ui/image-gallery.tsx`: panel yang di-hover melebar dan menampilkan kartu penjelasan; tersusun vertikal di mobile. |
| 14 | **Journey film** | Showreel Home | Kartu video membuka jadi full screen lalu melangkah dari tahun pertama ke hari ini. Slot video siap untuk film MIL (Higgsfield). |

### Aturan animasi

1. Hanya animasikan `transform` dan `opacity` (plus `filter` sesekali). Jangan animasikan properti layout.
2. **Konten tidak boleh menunggu animasi.** Tidak ada preloader yang memblokir; intro hero berjalan di atas konten yang sudah ter-render.
3. **`prefers-reduced-motion`**: semua animasi diganti fade 150ms, WebGL berhenti di satu frame, smooth scroll dimatikan.
4. **Perangkat lemah** (`hardwareConcurrency ≤ 4`, `deviceMemory ≤ 4`, atau `saveData`): WebGL diganti poster, partikel dikurangi.
5. WebGL dan GSAP di-lazy load setelah konten utama tampil (`dynamic import` + `requestIdleCallback`).
6. Setiap animasi scroll harus tetap masuk akal jika pengguna lompat langsung ke tengah halaman (anchor/back navigation).

---

## 6. Spesifikasi Per Halaman

> Urutan section dari atas ke bawah. **CMS** = konten dari CMS; tanpa tanda = konten di kode (copy bisa dipindah ke CMS belakangan).

## Prinsip struktur

**Struktur utama mengikuti page inventory (§3).** Section atau halaman yang tidak ada di inventory tidak dibuat, kecuali diminta langsung oleh tim MIL (contoh: journey film).

### 6.1 Home — `/`

Urutan mengikuti inventory.

| # | Section (inventory) | Implementasi | Welcoming | Sumber |
|---|---|---|---|---|
| — | Hero | Headline, subcopy, foto tim + partikel "Signal from Noise", CTA booking & quiz | headline per kata, grafik terbentuk saat scroll | **CMS** (Homepage → Hero) |
| 01 | Stats (numbers) | 150+ brand, 15 certified experts, 10+ industri, 100+ milestone + badge Meta | tilt, odometer, sparkline | **CMS** (Homepage → Stats) |
| 02 | Portofolio | Marquee 52 logo klien | rise, dua baris dari sisi berlawanan | **CMS** (Clients) |
| 03 | Portofolio (karya) | Pita galeri melengkung | curtain, fokus dari blur | **CMS** (Homepage → Featured → Gallery) |
| 04 | Case study | Work wheel | drum berayun masuk | **CMS** (Case studies) |
| 05 | Why MIL Digital & values | 5 core values MIL | tilt, nilai menyala bergantian | Kode |
| 06 | *(diminta)* Journey film | Video perjalanan MIL + milestone | kartu membuka jadi full screen | **CMS** (Homepage → Journey film) |
| 07 | Team | Foto tim, founder, CTA Our Team & Career | rise, foto di-wipe, kartu founder masuk | Kode |
| 08 | Our services | 3 panel service + CTA quiz | curtain, panel terbuka bergantian | Kode |
| 09 | Testimonials | Testimoni klien (LYLA) | tilt, kutipan dari blur | **CMS** (Testimonials) |
| 10 | Articles & reports | Galeri yang melebar saat hover | rise, panel "shutter" | **CMS** (Articles, Reports) |
| 11 | Contact-us form | Form free consultation → CMS Leads + WA + alamat | tilt, copy & form masuk dari dua sisi | Kode → **Leads** |

### 6.2 About Us — `/about-mil-digital`

1. **Headline** — siapa MIL Digital dalam satu kalimat kuat.
2. **What we believe** — manifesto dengan efek scroll text-fill.
3. **Values** — 3–5 nilai sebagai kartu bernomor (`01`, `02`, …).
4. **Services** — ringkasan 3 service + CTA ke tiap halaman service.
5. **CEO notes** — kutipan, foto, dan tanda tangan CEO.
6. **Portofolio klien** — marquee logo (**CMS**).
7. **Highlight case study** — 2–3 kartu + CTA ke Our Works (**CMS**).
8. **ATLAS teaser** — blok singkat dengan mockup dashboard + link ke ATLAS.
9. **Contact** — CTA band dengan tombol WA.

### 6.3 Our Service — `/our-services`

1. **Headline** + subcopy.
2. **3 service utama** — kartu besar, masing-masing dengan ringkasan, deliverables, dan CTA ke halaman detail.
3. **Layanan tambahan** — Web SEO, Web Development, User Research (kartu lebih kecil).
4. **Personalized service** — blok ajakan quiz: *"Belum yakin butuh yang mana? Jawab 6 pertanyaan, 60 detik."*
5. **Contact** — CTA band WA.

### 6.4 Template halaman service

Ketiga halaman service memakai satu template dengan konfigurasi berbeda.

| Section | Consultation | Advertising | Creative |
|---|---|---|---|
| Hero / positioning | MIL sebagai partner | MIL sebagai advertising strategist | Social Media Management & Branding |
| Bukti | Portofolio klien | Portofolio klien + **platform** (Meta, Google, TikTok, marketplace ads [TBC]) | Portofolio industri, klien & karya |
| Highlight | — | **Quick info hasil ROAS** (counter besar) | **Values: data nerds** |
| Proses | **Approach: Assess → Strategize → Monitor** (pinned) | Frameworks | **Authority-first framework** |
| Frameworks | Ya | Ya | Ya |
| Case study | Filter `service = consultation` (**CMS**) | Filter `service = advertising` (**CMS**) | Filter `service = creative` (**CMS**) |
| CTA | WA dengan pesan sesuai halaman | sama | sama |

### 6.5 Our Works — `/our-works-case-study`

- **Filter bar**: Industri, Skala bisnis, Service. Filter tersimpan di URL (`?industry=fnb&scale=enterprise`) supaya bisa dibagikan.
- **Grid** dengan animasi layout (kartu bergeser mulus saat filter berubah), jumlah hasil, empty state yang mengajak ke quiz.
- **Kartu**: thumbnail (video preview saat hover jika ada), nama klien, industri, metrik utama.
- Pagination "Load more".

### 6.6 Case Study Detail — `/our-works-case-study/[slug]`

1. **Hero** — nama klien, judul, tag industri/skala/service, tahun; gambar hero (shared-element transition dari kartu).
2. **Results bar** — 3–4 metrik dengan odometer.
3. **Challenge** → **Approach** → **Execution** (galeri) → **Results** (rich text + chart opsional).
4. **Testimonial** klien.
5. **Next case study** — link besar full-width dengan preview saat hover.
6. CTA konsultasi.

### 6.7 Our Team — `/our-team`

1. **Leadership** — foto besar, nama, peran, LinkedIn.
2. **Tim per fungsi** — tab (Strategy, Ads, Creative, Data, …) dengan grid foto.
3. **Culture** — nilai kerja + foto.
4. **Internal activities** — galeri horizontal draggable.
5. **CTA ke Career**.

### 6.8 Career — `/career`

1. **Culture & benefits**.
2. **Open roles** (**CMS**) — filter departemen, tiap baris: posisi, tim, lokasi, tipe kerja.
3. **Detail lowongan**: accordion di halaman `/career` (tanpa halaman detail terpisah, sesuai inventory).
4. **Form lamaran** — nama, email, WA, link portofolio/LinkedIn, upload CV (PDF ≤ 5MB), pesan. Masuk ke koleksi `JobApplications` + notifikasi email ke HR.

### 6.9 Insights — `/insights`

- Artikel unggulan (hero card), filter kategori, grid artikel, "Load more".

### 6.10 Article Detail — `/insights/[slug]`

- Tema **paper** (terang) untuk keterbacaan.
- Reading progress bar, table of contents sticky (desktop), estimasi waktu baca otomatis.
- Info penulis (foto, peran), tanggal, kategori, tombol share.
- Blok konten kaya: callout, kutipan, gambar + caption, stat highlight, embed, CTA inline.
- **Related posts** (manual dari CMS, fallback otomatis berdasarkan kategori).
- **CTA konsultasi** di akhir artikel.

### 6.11 Reports — `/reports`

1. **Hero** — positioning MIL Research.
2. **Metodologi** — sumber data, sampel, periode (diagram animasi).
3. **Kenapa report ini powerful**.
4. **Notes from researcher** — kutipan dan profil researcher.
5. **Daftar report** (**CMS**) — filter industri & tahun.

### 6.12 Industry Report Detail — `/reports/[slug]`

- Industri, periode, ringkasan, 3–5 key findings (preview dengan angka besar).
- **Gated download** — isi nama, email, perusahaan → link PDF dikirim via email dan lead tercatat (`source: report`). Opsi ungated per report di CMS.

### 6.13 Contact Us — `/contact-us`

Layout dua kolom (desktop):

- **Kiri**: form inquiry, mengikuti form free consultation di situs lama: nama, email, nomor telepon/WA, nama brand, industri brand, budget iklan, lokasi, aktivitas digital marketing yang pernah dicoba (Advertising / Social Media / Branding / Influencer / Others, multi), dan apa yang ingin didiskusikan.
- **Kanan**: tab **"Book a call"** (embed Cal.com inline) / **"Chat on WhatsApp"**.
- Di bawah: alamat kantor, jam operasional, peta (dimuat lazy, styling gelap).

### 6.14 ATLAS by MIL Digital — `atlas.mildigital.id` [TBC]

Dibangun sebagai route `/atlas` di aplikasi yang sama, lalu disajikan lewat subdomain dengan rewrite di middleware. Jika ATLAS kelak menjadi produk terpisah, folder route ini tinggal dipindah.

1. **Hero** — "Coming soon", nama & tagline ATLAS, form waitlist.
2. **Tentang ATLAS** — brand analytics dashboard untuk siapa dan apa masalahnya.
3. **Kenapa menarik** — 3–4 manfaat utama.
4. **Feature preview** — mockup dashboard **dibangun dengan HTML/SVG** (bukan screenshot) sehingga bisa dianimasikan dan dipakai ulang di product page.
5. **FAQ**.
6. **Waitlist CTA** — lead `source: atlas-waitlist`.

Semua section dibuat sebagai blok yang dapat disusun ulang (Hero, FeatureGrid, Showcase, FAQ, CTA, dan slot Pricing yang disembunyikan) supaya transisi ke product page penuh cukup menambah blok.

### 6.15 Utility

- `/privacy`, `/terms` — tema paper, ToC sticky.
- `404` — partikel yang "hilang" dengan link kembali ke Home, Works, dan Contact.

---

## 7. Fitur Tambahan

### 7.1 Get to Know You — Quiz (`/get-to-know-your-brand`)

Quiz singkat bergaya game yang merekomendasikan service (**Consulting / Advertising / Creative**) dan model kerja (**Preliminary vs Retainer**).

**Alur**

```
Intro → Q1 … Q6 (satu pertanyaan per layar) → Result → Book consultation (Cal.com, jawaban terbawa)
                                                      └→ WhatsApp (ringkasan jawaban di pesan)
```

**Pertanyaan (draft, menunggu konfirmasi tim MIL [TBC])**

| # | Area | Pilihan |
|---|---|---|
| 1 | Jenis bisnis | Retail · F&B · B2B/Services · Lainnya |
| 2 | Kanal penjualan (multi) | Toko offline · Marketplace · Website · Social commerce · Sales B2B |
| 3 | Tantangan utama | Brand belum dikenal · Lead/penjualan stagnan · Biaya iklan tinggi / ROAS rendah · Konten tidak konsisten · Tidak punya data/insight |
| 4 | Tahap bisnis | Baru mulai · Bertumbuh · Scaling · Mapan |
| 5 | Tujuan 6 bulan (multi) | Awareness · Penjualan · Efisiensi iklan · Brand positioning · Strategi jangka panjang |
| 6 | Kesiapan tim internal | Belum ada tim marketing · Ada tim, butuh arahan · Ada tim, butuh eksekutor tambahan |

**Logika rekomendasi (scoring)**

Setiap jawaban menambah bobot ke tiga service dan ke sumbu engagement. Contoh:

| Jawaban | Consulting | Advertising | Creative | Engagement |
|---|---|---|---|---|
| Tantangan: Biaya iklan tinggi / ROAS rendah | +1 | **+3** | 0 | — |
| Tantangan: Konten tidak konsisten | 0 | +1 | **+3** | Retainer +1 |
| Tantangan: Tidak punya data/insight | **+3** | +1 | 0 | Preliminary +1 |
| Tahap: Baru mulai | +2 | 0 | +1 | Preliminary +2 |
| Tahap: Scaling | +1 | +2 | +1 | Retainer +2 |
| Tim: Belum ada tim marketing | 0 | +1 | +2 | Retainer +2 |

Skor tertinggi = rekomendasi utama; skor kedua ditampilkan sebagai "juga cocok". Bobot disimpan di satu file konfigurasi bertipe (`src/content/quiz.ts`) agar mudah disetel. Jika kelak perlu diubah tanpa deploy, file ini bisa dipindah menjadi Global di CMS.

**Result screen**

- Kartu rekomendasi: service + model kerja + 3 alasan yang diambil dari jawaban ("Karena kamu fokus di marketplace dan ROAS…").
- Satu case study yang cocok dengan industri pengunjung (**CMS**).
- CTA utama **Book a free consultation** → Cal.com dengan nama, email, dan ringkasan jawaban terisi otomatis, sehingga konsultan datang dengan persiapan.
- CTA sekunder: WhatsApp dengan ringkasan jawaban, atau "Kirim hasil ke email saya".

**UX game-like**

- Progress bar bersegmen, transisi kartu bergaya slide/flip, shortcut keyboard (`A–D`, `Enter`).
- Tombol kembali tanpa kehilangan jawaban; state disimpan di `sessionStorage`.
- Target durasi 60–90 detik.

**Penyimpanan lead** — *open question di brief.* **Rekomendasi:** simpan di koleksi `Leads` pada CMS (satu tempat dengan form lain), kirim notifikasi email ke tim sales, dan opsional sinkron ke Google Sheets/CRM via webhook. Lead dibuat saat pengunjung memberi kontak (email/WA); quiz yang selesai tanpa kontak hanya tercatat di analytics. **[TBC]**

### 7.2 Book a Consultation

**Calendar booking (Cal.com)**

- Embed `@calcom/embed-react`: **inline** di `/contact-us`, **modal** dari CTA header, footer, dan result quiz.
- Prefill: `name`, `email`, `notes` (ringkasan quiz/halaman asal), `metadata[leadId]`.
- Email konfirmasi ke pengunjung dikirim oleh Cal.com.
- Webhook Cal.com `BOOKING_CREATED` → `/api/webhooks/cal` (signature diverifikasi) → status lead menjadi `booked` + notifikasi internal.

**WhatsApp click-to-chat**

- Nomor: **+62 821-2424-2194**.
- Helper `buildWhatsAppLink({ page, context })` membuat link `https://wa.me/6282124242194?text=...` dengan pesan yang menyebut halaman asal, contoh:
  > Halo MIL Digital, saya tertarik dengan layanan *Advertising Strategy & Optimization* (dari halaman /our-services/advertising-strategy-optimization).
- Tombol WA melayang di mobile; di desktop berada di CTA section dan footer.

**Aturan global:** setiap halaman memiliki jalan ke contact/booking melalui tombol header dan CTA footer.

### 7.3 ATLAS (Coming Soon)

Lihat [§6.14](#614-atlas-by-mil-digital--atlasmildigitalid-tbc). Waitlist tersimpan sebagai lead `source: atlas-waitlist`, dengan email konfirmasi otomatis.

### 7.4 Di luar inventory (tidak dibuat kecuali diminta)

Command palette (⌘K), newsletter, halaman kategori terpisah, halaman detail lowongan, custom cursor, bilingual, dynamic OG image, scheduled publishing.

Cookie consent baru diperlukan jika analytics/pixel dipasang (UU PDP No. 27/2022).


---

## 8. CMS & Model Data

### Aset yang sudah tersedia

| Aset | Sumber | Dipakai di |
|---|---|---|
| Logo MIL | `Assets/images (1).jpeg` → `public/brand/mil-mark.png` (biru) & `mil-mark-white.png`, `src/app/icon.png` | Header, footer, favicon |
| 52 logo klien | `Assets/Logofolio (1).png`, `(2).png` → `public/clients/*.png` | Marquee "Trusted by 150+ brands" |

Butuh dari tim MIL: logo dalam format SVG, konfirmasi nama brand untuk logo inisial (V, CB), dan film perjalanan MIL.

### Pilihan CMS: **Payload CMS 3** (rekomendasi)

| Kriteria | Payload 3 | Sanity (alternatif) |
|---|---|---|
| Hosting | Berjalan di dalam aplikasi Next.js yang sama, admin di `/admin` | SaaS, Studio terpisah |
| Data & lead | Satu database (PostgreSQL) untuk konten **dan** lead/lamaran | Lead perlu layanan lain |
| Biaya | Open source, hanya biaya DB & storage | Free tier, berbayar saat tim/kuota bertambah |
| Kepemilikan data | Penuh | Di pihak vendor |
| Live preview, drafts, versi, role | Ya | Ya |

Payload dipilih karena lead (quiz, contact, report, waitlist, lamaran kerja) dan konten bisa dikelola di satu admin dengan hak akses per role.

### Koleksi (Collections)

**Konten**

| Koleksi | Field utama |
|---|---|
| `case-studies` | title, slug, client → `clients`, industry → `industries`, scale (select), services (multi-select: consultation/advertising/creative), year, heroMedia, summary, challenge, approach, execution (gallery), results (array: label, value, prefix, suffix), testimonial → `testimonials`, featured, seo, status/publishedAt |
| `clients` | name, logo (SVG), industry, website, showInMarquee, order |
| `industries` | name, slug |
| `testimonials` | quote, name, role, company, avatar, caseStudy |
| `articles` | title, slug, category → `insight-categories`, author → `authors`, cover, excerpt, content (rich text + blok kustom), readingTime (otomatis), relatedPosts, tags, seo, status/publishedAt |
| `insight-categories` | name, slug, description |
| `authors` | name, role, photo, bio, linkedin |
| `reports` | title, slug, industry, period/year, cover, summary, keyFindings (array: stat, label), methodology, researcherNote → `authors` + teks, file (PDF, akses privat), gated (bool), seo |
| `jobs` | title, slug, department, location, employmentType, workMode, description, requirements, status (open/closed), closingDate |
| `media` | file, alt (wajib), caption — disimpan di object storage |

**Data masuk (form)**

| Koleksi | Field utama |
|---|---|
| `leads` | source (quiz / contact / booking / report / atlas-waitlist), name, email, phone, company, serviceInterest, quizAnswers (JSON), recommendation, pageOrigin, utm (source/medium/campaign), calBookingId, status (new / contacted / qualified / won / lost), assignedTo, notes |
| `job-applications` | job → `jobs`, name, email, phone, portfolioUrl, cv (privat), message, status |

**Globals**

| Global | Isi |
|---|---|
| `site-settings` | Kontak (email, WA, alamat, koordinat peta), sosial media, SEO default, status "accepting projects" |
| `home` | Hero (headline, subcopy, **foto background** upload + focal point), stats (array: value, suffix, label), featured case studies, featured articles/report, film journey (video + milestones) |
| `navigation` | Kartu preview mega menu, link footer |

### Role & hak akses

| Role | Akses |
|---|---|
| Admin | Semua |
| Editor | Konten (case study, artikel, report, klien, testimonial, media) |
| HR | `jobs`, `job-applications` |
| Sales | `leads` (baca & ubah status) |

File privat (CV, PDF report gated) tidak bisa diakses publik dan hanya dikirim lewat signed URL.

---

## 9. Tech Stack & Arsitektur

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js** (App Router, versi stabil terbaru) + **TypeScript** | SSG/ISR untuk performa & SEO, Server Actions untuk form |
| CMS | **Payload CMS 3** | Lihat §8 |
| Database | **PostgreSQL** (Neon / Supabase) | Dipakai Payload |
| Media storage | **Cloudflare R2** atau Vercel Blob | Murah, cepat via CDN |
| Styling | **Tailwind CSS v4** + CSS variables (design tokens) | Konsisten dengan token di §4 |
| UI primitives | Radix UI | Aksesibel (dialog, tabs, dropdown) |
| Animasi | Motion, GSAP (ScrollTrigger, SplitText), Lenis | Lihat §5 |
| 3D | React Three Fiber + drei | Hero WebGL |
| Form | React Hook Form + Zod + Server Actions | Validasi di klien & server dengan skema yang sama |
| Anti-spam | Cloudflare Turnstile + honeypot + rate limit | Tanpa CAPTCHA yang mengganggu |
| Email | **Resend** + React Email | Notifikasi lead, email report, waitlist |
| Booking | **Cal.com** embed + webhook | Sesuai brief |
| Analytics | GA4 via GTM (+ Meta Pixel jika diperlukan) — dimuat setelah consent | Tracking iklan klien MIL sendiri |
| Hosting | **Vercel** (frontend + Payload) | Preview deploy per branch, edge CDN |
| Monitoring | Sentry, Vercel Speed Insights | Error & Core Web Vitals |

### Strategi rendering

| Halaman | Strategi |
|---|---|
| Halaman statis (About, Services, Team, Contact, ATLAS, legal) | Static (SSG) |
| Halaman CMS (Home, Works, Insights, Reports, Career) | Static + **on-demand revalidation** — saat konten di-publish di Payload, hook `afterChange` me-revalidate path terkait |
| Quiz | Client component di dalam shell statis |
| Form & webhook | Server Actions / Route Handlers |

### Environment variables

```
DATABASE_URL=
PAYLOAD_SECRET=
NEXT_PUBLIC_SITE_URL=https://mildigital.id
S3_BUCKET= / S3_ENDPOINT= / S3_ACCESS_KEY_ID= / S3_SECRET_ACCESS_KEY=
RESEND_API_KEY=
LEAD_NOTIFICATION_EMAIL=
CAL_WEBHOOK_SECRET=
NEXT_PUBLIC_CAL_LINK=mildigital/consultation
NEXT_PUBLIC_WHATSAPP_NUMBER=6282124242194
TURNSTILE_SECRET_KEY= / NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_GTM_ID=
REVALIDATE_SECRET=
```

---

## 10. SEO & Analytics

### SEO

- Metadata per halaman (title, description, canonical); field SEO di setiap dokumen CMS.
- **JSON-LD**: `Organization` & `WebSite` (global), `Article` (artikel), `BreadcrumbList` (semua halaman dalam), `JobPosting` (lowongan), `Service` (halaman service), `FAQPage` (ATLAS).
- `sitemap.xml` dan `robots.txt` dibuat otomatis termasuk konten CMS.
- OG image dinamis via `next/og`.
- `hreflang` jika bilingual disetujui.
- Redirect 301 dari URL lama website MIL (jika ada) — perlu daftar URL lama. **[TBC]**

### Event tracking

| Event | Trigger | Properti |
|---|---|---|
| `cta_click` | Klik CTA booking/quiz | `location` (header/footer/section), `page` |
| `whatsapp_click` | Klik tombol WA | `page` |
| `quiz_start` / `quiz_step` / `quiz_complete` | Alur quiz | `step`, `answers`, `recommendation` |
| `booking_open` / `booking_created` | Modal Cal.com / webhook | `source` |
| `form_submit` | Contact, report, waitlist, lamaran | `form`, `page` |
| `case_study_filter` | Ubah filter Works | `industry`, `scale`, `service` |
| `report_download` | Unduh report | `report` |

UTM dari kunjungan pertama disimpan di cookie first-party dan ikut ke setiap lead.

---

## 11. Performa & Aksesibilitas

### Performance budget (mobile, 4G)

| Metrik | Target |
|---|---|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| Lighthouse Performance (mobile) | ≥ 90 |
| JS awal (sebelum WebGL/GSAP) | < 170KB gzip |

Teknik: `next/image` (AVIF/WebP), `next/font` dengan subset, WebGL & GSAP lazy load, video hanya diputar saat terlihat, embed (Cal.com, peta) dimuat saat diperlukan.

### Aksesibilitas (WCAG 2.1 AA)

- Kontras teks ≥ 4.5:1 (cek ulang `--fg-muted` di atas `--bg`).
- Semua fitur bisa dipakai dengan keyboard; focus ring terlihat jelas (`--accent`).
- Quiz memakai pola radio/checkbox yang benar, perubahan langkah diumumkan ke screen reader.
- Marquee & carousel bisa dihentikan; menghormati `prefers-reduced-motion`.
- Alt text wajib di CMS (field `alt` required).
- Target sentuh ≥ 44×44px.

### Dukungan browser

Dua versi terakhir Chrome, Safari (macOS & iOS), Edge, Firefox; Samsung Internet. WebGL punya fallback untuk browser yang tidak mendukung.

---

## 12. Struktur Repository

```
.
├── docs/
│   ├── PROJECT_SPEC.md            # dokumen ini
│   └── assets/                    # brief, moodboard
├── public/                        # favicon, font lokal, poster fallback
├── src/
│   ├── app/
│   │   ├── (frontend)/            # semua halaman publik
│   │   │   ├── page.tsx                           # /
│   │   │   ├── about-mil-digital/
│   │   │   ├── our-services/[service]/
│   │   │   ├── our-works-case-study/[slug]/
│   │   │   ├── our-team/
│   │   │   ├── career/
│   │   │   ├── insights/[slug]/
│   │   │   ├── reports/[slug]/
│   │   │   ├── contact-us/
│   │   │   ├── get-to-know-your-brand/
│   │   │   ├── atlas/
│   │   │   ├── privacy/  terms/
│   │   │   └── not-found.tsx
│   │   ├── (payload)/admin/       # Payload admin
│   │   └── api/                   # webhooks (cal), revalidate
│   ├── collections/               # skema Payload
│   ├── globals/
│   ├── components/
│   │   ├── ui/                    # Button, Input, Badge, Card…
│   │   ├── layout/                # Header, MegaMenu, Footer
│   │   ├── sections/              # Hero, Stats, LogoMarquee, CaseStudyGrid, CTABand…
│   │   ├── motion/                # Reveal, SplitText, Counter, Magnetic, PinnedSection
│   │   └── three/                 # DataConstellation + fallback
│   ├── content/                   # quiz.ts, services.ts (konten pre-defined)
│   ├── lib/                       # whatsapp.ts, cal.ts, analytics.ts, seo.ts
│   └── styles/                    # tokens.css, globals.css
├── payload.config.ts
└── .env.example
```

---

## 13. Tahapan Pengerjaan

| Fase | Lingkup | Hasil |
|---|---|---|
| **0. Fondasi** | Setup Next.js + Payload + DB, design tokens, font, motion primitives, Header/Mega menu/Footer, CTA band, WA helper | Kerangka situs yang bisa di-deploy ke preview |
| **1. Halaman inti** | Home (dengan fallback hero), About, Our Service, template 3 service | Halaman marketing utama |
| **2. Konten CMS** | Koleksi & globals, Works + detail, Insights + detail, Reports + detail, Career + form lamaran, revalidation | Tim MIL bisa mengisi konten |
| **3. Konversi** | Quiz, Cal.com (modal & inline + webhook), Contact form, koleksi Leads, email notifikasi, report gating | Alur lead lengkap |
| **4. Signature & ATLAS** | Page transitions, ATLAS teaser + waitlist | Lapisan "high-end" |
| **5. Launch** | SEO (JSON-LD, sitemap, OG), analytics & consent, aksesibilitas, uji performa, QA lintas perangkat, redirect, domain | Go-live |

**Definition of done per halaman:** sesuai spesifikasi §6, responsif 360px–1920px, lolos budget §11, keyboard-accessible, metadata SEO terisi, event analytics terpasang, mode reduced-motion dicek.

---

## 14. Open Questions

| # | Pertanyaan | Usulan default |
|---|---|---|
| 1 | Brand guideline final (logo SVG, font)? | Warna sudah diambil dari logo (§4); font Geist sampai ada guideline |
| 2 | Website bilingual (ID/EN) atau satu bahasa? | Inggris dulu, struktur siap bilingual |
| 3 | Pertanyaan & bobot quiz final | Draft §7.1 |
| 4 | Lead disimpan di mana? | Payload `leads` + email notifikasi, opsional sinkron Sheets/CRM |
| 5 | ATLAS: subdomain `atlas.mildigital.id` atau `/atlas`? | Route `/atlas` + rewrite subdomain |
| 6 | Angka stats Home (data resmi) | Placeholder sampai dikonfirmasi |
| 7 | Akun Cal.com & event type konsultasi (durasi, siapa konsultannya) | Satu event "Free Consultation 30 menit" |
| 8 | Report gated (wajib isi form) atau terbuka? | Gated, bisa diubah per report |
| 9 | Lamaran via form di website atau email/link eksternal? | Form di website |
| 10 | Siapa penulis copy & penyedia foto (tim, kantor, karya)? | — |
| 11 | Kisaran budget perlu ditanyakan di form contact? | Opsional, tidak wajib |
| 12 | Preferensi hosting (Vercel atau server sendiri)? | Vercel |
| 13 | URL `/our-works-case-study` dipersingkat jadi `/our-works`? | Tetap sesuai brief, siapkan redirect |
| 14 | Apakah ada website lama yang URL-nya perlu di-redirect? | — |
