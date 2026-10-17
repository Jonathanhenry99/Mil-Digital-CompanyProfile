# MIL Digital — Company Profile Website

Website company profile MIL Digital: tampilan high-end dengan animasi futuristik, konten dikelola lewat CMS, dan alur konversi (quiz, booking konsultasi, WhatsApp).

## Dokumentasi

- [Project Specification](docs/PROJECT_SPEC.md) — arah desain, sistem animasi, spesifikasi halaman, model CMS, tech stack, dan tahapan pengerjaan.
- [Brief sitemap & page inventory](docs/assets/sitemap-brief.png)

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion · Lenis · (rencana: Payload CMS 3 · PostgreSQL · Cal.com · Resend · Vercel)

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi
```

## Struktur singkat

- `src/app/` — halaman (App Router). Homepage di `src/app/page.tsx`.
- `src/components/sections/` — section homepage (hero, works wheel, services, …).
- `src/components/motion/` — primitive animasi (`SectionEntrance`, `Reveal`, `SplitText`, `Odometer`, `Magnetic`).
- `src/components/ui/` — komponen UI (shadcn-style), termasuk `tilted-grid-hero` dan `image-gallery`.
- `src/content/` — konten sementara dengan bentuk data yang sama dengan koleksi CMS nanti.
- `public/clients/`, `public/brand/` — logo klien & logo MIL (diolah dari `Assets/`).

## Status

Fase 1 — homepage v1 (konten sebagian masih placeholder). Halaman lain, CMS (Payload), quiz dan booking menyusul.
