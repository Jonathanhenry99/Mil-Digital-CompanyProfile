# MIL Digital — Company Profile Website

Website company profile MIL Digital: tampilan high-end dengan animasi futuristik, konten dikelola lewat CMS, dan alur konversi (quiz, booking konsultasi, WhatsApp).

## Dokumentasi

- [Project Specification](docs/PROJECT_SPEC.md) — arah desain, sistem animasi, spesifikasi halaman, model CMS, tech stack, dan tahapan pengerjaan.
- [Brief sitemap & page inventory](docs/assets/sitemap-brief.png)

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion · Lenis · Payload CMS 3 · Neon Postgres · (rencana: Cal.com · Resend · Vercel)

## Menjalankan

```bash
npm install
cp .env.example .env.local   # isi DATABASE_URL (Neon) dan PAYLOAD_SECRET
npm run dev                  # website: http://localhost:3000
                             # CMS:     http://localhost:3000/admin
npm run build                # build produksi
```

## CMS (Payload)

- Buka `/admin`. Akun pertama yang dibuat otomatis menjadi **Admin**; akun berikutnya dibuat dari menu Users (role: Admin, Editor, HR, Sales).
- **Pages → Homepage**: hero (judul, teks, foto background), journey film & milestone, stats, case study unggulan, galeri, report unggulan.
- **Portfolio**: Case studies, Clients (logo marquee), Testimonials. **Insights**: Articles, Reports. **Library**: Media.
- Foto hero: upload di Homepage → Hero → Background image. Atur titik fokus foto di Media (klik bagian yang harus tetap terlihat).
- Setiap kali disimpan, halaman terkait langsung diperbarui (cache di-expire otomatis).
- `npm run seed` mengisi CMS kosong dengan konten awal dari `src/content/home.ts`; `npm run payload run src/seed/company-data.ts` menerapkan data asli MIL (foto tim, stats, testimoni, artikel) ke CMS yang sudah di-seed.
- `npm run generate:types` setelah mengubah skema di `src/collections` / `src/globals`.

> File upload saat ini disimpan di folder lokal `media/` (tidak ikut Git). Database ada di Neon, jadi data teks terlihat di semua mesin, tapi file gambarnya hanya ada di mesin yang mengunggah. Sebelum deploy, pindahkan ke cloud storage (mis. Vercel Blob).

## Struktur singkat

- `src/app/` — halaman (App Router). Homepage di `src/app/page.tsx`.
- `src/components/sections/` — section homepage (hero, works wheel, services, …).
- `src/components/motion/` — primitive animasi (`SectionEntrance`, `Reveal`, `SplitText`, `Odometer`, `Magnetic`).
- `src/components/ui/` — komponen UI (shadcn-style), termasuk `tilted-grid-hero` dan `image-gallery`.
- `src/collections/`, `src/globals/`, `src/payload.config.ts` — skema CMS. `src/lib/cms.ts` — pengambilan data untuk halaman.
- `src/content/` — konten awal (dipakai seed dan sebagai cadangan bila CMS kosong).
- `public/clients/`, `public/brand/` — logo klien & logo MIL (diolah dari `Assets/`).

## Status

Fase 2 — homepage terhubung ke CMS (konten sebagian masih placeholder). Halaman lain, quiz, booking dan cloud storage menyusul.
